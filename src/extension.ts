import * as vscode from "vscode";
import { ExtensionContext } from "vscode";
import { formattingProviders } from "./formatter";
import { startLinting } from "./linter";

/**
 * Activate this extension.
 *
 * Format with nixpkgs-format
 * validate with nix-instantiate
 *
 * @param context The context for this extension
 * @return A promise for the initialization
 */
export const activate = async (context: ExtensionContext): Promise<any> => {
  startLinting(context);

  let subs = [
    vscode.languages.registerDocumentFormattingEditProvider,
    vscode.languages.registerDocumentRangeFormattingEditProvider,
  ].map((func) => func("nix", formattingProviders));

  context.subscriptions.concat(subs);
};
