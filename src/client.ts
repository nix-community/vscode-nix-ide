// from PR of https://github.com/nix-community/vscode-nix-ide/pull/16/

import { env, ExtensionContext, Uri, window, workspace } from "vscode";
import {
  LanguageClientOptions,
  LSPArray,
  ConfigurationParams,
} from "vscode-languageclient";
import {
  Executable,
  LanguageClient,
  ServerOptions,
} from "vscode-languageclient/node";
import { config, UriMessageItem } from "./configuration";

import commandExists = require("command-exists");

let client: LanguageClient;

export async function activate(context: ExtensionContext): Promise<void> {
  if (!commandExists.sync(config.serverPath)) {
    const selection = await window.showErrorMessage<UriMessageItem>(
      `Command ${config.serverPath} not found in $PATH`,
      {
        title: "Install language server",
        uri: Uri.parse(
          "https://github.com/nix-community/vscode-nix-ide?tab=readme-ov-file#language-servers"
        ),
      }
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

  const clientOptions: LanguageClientOptions = {
    documentSelector: nixDocumentSelector,
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher("**/*.nix"),
      configurationSection: [config.rootSection],
    },
    outputChannel: window.createOutputChannel("Nix"),
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

  client = new LanguageClient("nix", "Nix", serverOptions, clientOptions);
  client.registerProposedFeatures();
  await client.start();

  context.subscriptions.push(client);
}

export function deactivate(): Thenable<void> | undefined {
  return client ? client.stop() : undefined;
}
