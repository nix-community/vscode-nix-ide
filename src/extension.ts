import type { ExtensionContext } from "vscode";
import * as vscode from "vscode";
import * as client from "./client";
import { config } from "./configuration";
import { formattingProviders } from "./formatter";
import { startLinting } from "./linter";

/**
 * Activate this extension.
 *
 * If LSP is enabled
 *    then support IDE features with {@link https://github.com/oxalica/nil|nil}
 * Else
 *    Format with nixpkgs-format
 *    validate with nix-instantiate
 *
 * @param context The context for this extension
 * @return A promise for the initialization
 */
export async function activate(context: ExtensionContext): Promise<void> {
  if (config.LSPEnabled) {
    try {
      await client.activate(context);
    } catch (err) {
      console.error(err);
    }
  } else {
    await startLinting(context);
    if (config.formattingEnabled) {
      const subs = [
        vscode.languages.registerDocumentFormattingEditProvider,
        vscode.languages.registerDocumentRangeFormattingEditProvider,
      ].map((func) => func("nix", formattingProviders));
      context.subscriptions.concat(subs);
    }
  }

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "nix-ide.restartLanguageServer",
      async () => {
        if (config.LSPEnabled) {
          await client.restart(context);
        }
      },
    ),
  );

  vscode.workspace.onDidChangeConfiguration(async (event) => {
    if (config.requiresServerRestart(event)) {
      const choice = await vscode.window.showWarningMessage(
        "Configuration change requires restarting the language server",
        "Restart",
      );
      if (choice === "Restart") {
        await client.restart(context);
      }
    }
  });
}

export async function deactivate(): Promise<void> {
  await client.deactivate();
}
