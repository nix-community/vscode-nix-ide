// from PR of https://github.com/nix-community/vscode-nix-ide/pull/16/

// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import { inspect } from "util";
import { sync as commandExistsSync } from "command-exists";
import {
  type Disposable,
  type ExtensionContext,
  Uri,
  env,
  window,
  workspace,
} from "vscode";
import type {
  CancellationToken,
  ConfigurationParams,
  LSPArray,
  LanguageClientOptions,
  MessageSignature,
} from "vscode-languageclient";
import {
  type Executable,
  LanguageClient,
  type ServerOptions,
} from "vscode-languageclient/node";
import { type UriMessageItem, config } from "./configuration";

class Client extends LanguageClient {
  disposables: Disposable[] = [];

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
}

let client: Client;

export async function activate(context: ExtensionContext): Promise<void> {
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
  const serverExecutable: Executable = {
    command: config.serverPath,
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
            const sectionSettings = settings[item.section as keyof typeof settings]
            if (!sectionSettings) {
              client.warn(`failed to find "${item.section}" in "nix.serverSettings"`)
            }
            res.push(sectionSettings ?? null);
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return res;
        },
      },
    },
  };

  client = new Client("nix", "Nix", serverOptions, clientOptions);
  client.disposables.push(outputChannel, fileEvents);
  client.registerProposedFeatures();
  await client.start();

  context.subscriptions.push(client);
}

export async function deactivate(): Promise<void> {
  if (client?.needsStop()) {
    await client.stop();
  }
  await client.dispose();
}

export async function restart(context: ExtensionContext): Promise<void> {
  const restartingMsg = window.setStatusBarMessage(
    "$(loading~spin) Restarting Nix language server",
  );

  try {
    await deactivate();
    await activate(context);
  } catch (error) {
    client?.error("Failed to restart Nix language server", error, "force");
  } finally {
    restartingMsg.dispose();
  }
}
