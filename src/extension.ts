import * as vscode from "vscode";
import { ExtensionContext } from "vscode";
import { formattingProviders } from "./formatter";
import { startLinting } from "./linter";
import { config } from "./configuration";
import * as client from "./client";

const storePath = process.env["NIX_STORE_DIR"] || "/nix/store";
const storeRegex = new RegExp(`${storePath}/.{32}-[^/]*/([^:]*)`, "g");

interface StoreTerminalLink extends vscode.TerminalLink {
  relPath: string;
  absPath: string;
}

/**
 * Activate this extension.
 *
 * If LSP is enabled
 *    then support IDE features with {@link https://github.com/nix-community/rnix-lsp|rnix-lsp}
 * Else
 *    Format with nixpkgs-format
 *    validate with nix-instantiate
 *
 * @param context The context for this extension
 * @return A promise for the initialization
 */
export async function activate(context: ExtensionContext): Promise<void> {
  if (config.LSPEnabled) {
    await client.activate(context);
  } else {
    await startLinting(context);
    const subs = [
      vscode.languages.registerDocumentFormattingEditProvider,
      vscode.languages.registerDocumentRangeFormattingEditProvider,
    ].map((func) => func("nix", formattingProviders));
    context.subscriptions.concat(subs);
  }

  vscode.window.registerTerminalLinkProvider({
    provideTerminalLinks: (
      context: vscode.TerminalLinkContext,
      token: vscode.CancellationToken
    ) => {
      const matches = [...context.line.matchAll(storeRegex)];
      if (matches.length === 0) {
        return [];
      }

      return matches.map((match) => {
        return {
          startIndex: context.line.indexOf(match[0]),
          length: match[0].length,
          tooltip: `Open file in workspace ${match[1]}`,
          absPath: match[0],
          relPath: match[1],
        };
      });
    },
    handleTerminalLink: (link: StoreTerminalLink) => {
      // get absolute path to workspace, if it exists
      const root = vscode.workspace.workspaceFolders
        ? vscode.workspace.workspaceFolders[0].uri
        : vscode.Uri.file("");
      let uri = vscode.Uri.joinPath(root, link.relPath);

      try {
        // check if file exists
        void vscode.workspace.fs.stat(uri);
      } catch {
        // if not, use store path
        uri = vscode.Uri.file(link.absPath);
      } finally {
        void vscode.commands.executeCommand("vscode.open", uri);
      }
    },
  });
}

export async function deactivate(): Promise<void> {
  if (config.LSPEnabled) {
    await client.deactivate();
  }
}
