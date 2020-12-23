// from PR of https://github.com/nix-community/vscode-nix-ide/pull/16/

import { env, ExtensionContext, Uri, window, workspace } from "vscode";
import { LanguageClientOptions } from "vscode-languageclient";
import {
  Executable,
  LanguageClient,
  ServerOptions,
} from "vscode-languageclient/node";
import { config, UriMessageItem } from "./configuration";

import commandExists = require("command-exists");

let client: LanguageClient;

export async function activate(context: ExtensionContext): Promise<void> {
  const cmdExists = await commandExists(config.serverPath);

  if (!cmdExists) {
    const selection = await window.showErrorMessage<UriMessageItem>(
      `Command ${config.serverPath} not found in $PATH`,
      {
        title: "Install language server",
        uri: Uri.parse("https://github.com/nix-community/rnix-lsp"),
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
    },
    outputChannel: window.createOutputChannel("Nix"),
  };

  client = new LanguageClient("nix", "Nix", serverOptions, clientOptions);
  client.registerProposedFeatures();
  context.subscriptions.push(client.start());
}

export function deactivate(): Thenable<void> | undefined {
  return client ? client.stop() : undefined;
}
