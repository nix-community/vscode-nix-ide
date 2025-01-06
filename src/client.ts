// from PR of https://github.com/nix-community/vscode-nix-ide/pull/16/

// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import { inspect } from "util";
import { sync as commandExistsSync } from "command-exists";
import {
  type Disposable,
  type ExtensionContext,
  Uri,
  window,
  workspace,
  //# #if HAVE_VSCODE
  env,
} from "vscode";
//# #elif HAVE_COC_NVIM
//# } from "coc.nvim";
//# #endif
import type {
  CancellationToken,
  ConfigurationParams,
  LSPArray,
  LanguageClientOptions,
  MessageSignature,
  //# #if HAVE_VSCODE
} from "vscode-languageclient";
//# #elif HAVE_COC_NVIM
//# } from "coc.nvim";
//# #endif
import {
  type Executable,
  LanguageClient,
  type ServerOptions,
  //# #if HAVE_VSCODE
} from "vscode-languageclient/node";
//# #elif HAVE_COC_NVIM
//# } from "coc.nvim";
//# #endif
import { type UriMessageItem, config } from "./configuration";

class Client extends LanguageClient {
  disposables: Disposable[] = [];

  //# #if HAVE_VSCODE
  override handleFailedRequest<T>(
    type: MessageSignature,
    token: CancellationToken | undefined,
    error: unknown,
    defaultValue: T,
    showNotification?: boolean,
  ): T {
    if (config.hiddenErrorKinds.includes(type.method)) {
      this.outputChannel.appendLine(
        `Suppressing failed ${inspect(type.method)} notification`,
      );
      return super.handleFailedRequest(type, token, error, defaultValue, false);
    }
    return super.handleFailedRequest(
      type,
      token,
      error,
      defaultValue,
      showNotification,
    );
  }

  override dispose(timeout?: number): Promise<void> {
    let timedOut = false;
    if (timeout) {
      setTimeout(() => {
        timedOut = true;
      }, timeout);
    }

    for (const disposable of this.disposables) {
      if (timedOut) {
        break;
      }
      disposable.dispose();
    }

    return Promise.resolve();
  }
  //# #endif
}

let client: Client;

export async function activate(context: ExtensionContext): Promise<void> {
  //# #if HAVE_VSCODE
  if (!commandExistsSync(config.serverPath)) {
    const selection = await window.showErrorMessage<UriMessageItem>(
      `Command ${config.serverPath} not found in $PATH`,
      {
        title: "Install language server",
        uri: Uri.parse(
          "https://github.com/nix-community/vscode-nix-ide?tab=readme-ov-file#language-servers",
        ),
      },
    );
    if (selection?.uri !== undefined) {
      await env.openExternal(selection?.uri);
      return;
    }
  }
  //# #endif
  const serverExecutable: Executable = {
    command: await config.serverPath,
  };
  const serverOptions: ServerOptions = serverExecutable;

  const nixDocumentSelector: { scheme: string; language: string }[] = [
    { scheme: "file", language: "nix" },
    { scheme: "untitled", language: "nix" },
  ];

  const outputChannel = window.createOutputChannel("Nix");
  const fileEvents = workspace.createFileSystemWatcher("**/*.nix");

  const clientOptions: LanguageClientOptions = {
    documentSelector: nixDocumentSelector,
    synchronize: {
      fileEvents,
      configurationSection: [config.rootSection],
    },
    outputChannel,
    middleware: {
      workspace: {
        configuration: (params: ConfigurationParams): LSPArray[] => {
          const items = params.items || [];
          const res: LSPArray = [];
          const settings = config.serverSettings;
          for (const item of items) {
            if (!item?.section) {
              continue;
            }
            res.push(settings[item.section as keyof typeof settings] ?? null);
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return res;
        },
      },
    },
  };

  client = new Client("nix", "Nix", serverOptions, clientOptions);
  client.disposables.push(outputChannel, fileEvents);
  //# #if HAVE_VSCODE
  client.registerProposedFeatures();
  //# #endif
  await client.start();

  context.subscriptions.push(client);
}

export async function deactivate(): Promise<void> {
  if (client?.needsStop()) {
    await client.stop();
  }
  //# #if HAVE_VSCODE
  await client.dispose();
  //# #endif
}

export async function restart(context: ExtensionContext): Promise<void> {
  //# #if HAVE_VSCODE
  const restartingMsg = window.setStatusBarMessage(
    "$(loading~spin) Restarting Nix language server",
  );
  //# #endif

  try {
    await deactivate();
    await activate(context);
  } catch (error) {
    client?.error("Failed to restart Nix language server", error
      //# #if HAVE_VSCODE
      , "force"
      //# #endif
    );
  } finally {
  //# #if HAVE_VSCODE
    restartingMsg.dispose();
  //# #endif
  }
}
