import type { ExtensionContext } from "vscode";
import * as vscode from "vscode";
import * as client from "./client";
import { config } from "./configuration";
import { formattingProviders } from "./formatter";
import { startLinting } from "./linter";

async function restartLSP(context: ExtensionContext) {
  if (config.LSPEnabled) {
    await client.restart(context);
  } else {
    await client.activate(context).catch(async () => {
      await startLinting(context);
    });
  }
}

async function onConfigChange(
  event: vscode.ConfigurationChangeEvent,
  context: ExtensionContext,
) {
  if (!config.requiresServerRestart(event)) {
    return;
  }
  const choice = await vscode.window.showWarningMessage(
    "Configuration change requires (re)starting the language server",
    "Restart",
  );
  if (choice === "Restart") {
    await restartLSP(context);
  }
}

async function registerNoLspSubs(context: ExtensionContext) {
  await startLinting(context);
  const subs = [
    vscode.languages.registerDocumentFormattingEditProvider,
    vscode.languages.registerDocumentRangeFormattingEditProvider,
  ].map((func) => func("nix", formattingProviders));
  context.subscriptions.push(...subs);
}

/**
 * Activate this extension.
 *
 * If LSP is enabled
 *    then support IDE features with an available LSP
 * Else
 *    Format with nixpkgs-format
 *    validate with nix-instantiate
 *
 * @param context The context for this extension
 * @return A promise for the initialization
 */
export async function activate(context: ExtensionContext): Promise<void> {
  vscode.workspace.onDidChangeConfiguration(async (event) => {
    await onConfigChange(event, context);
  });
  context.subscriptions.push(
    vscode.commands.registerCommand("nix-ide.restartLanguageServer", () =>
      restartLSP(context),
    ),
  );

  if (!config.LSPEnabled) {
    await registerNoLspSubs(context);
    return;
  }

  try {
    await client.activate(context);
  } catch (err) {
    console.error(err);
    await registerNoLspSubs(context);
  }
}

export async function deactivate(): Promise<void> {
  await client.deactivate();
}
