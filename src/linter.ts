"use strict";

import * as vscode from "vscode";
import { Diagnostic, ExtensionContext, TextDocument } from "vscode";
import { runInWorkspace } from "./process-runner";

/**
 * Whether a given document is saved to disk and in Nix language.
 *
 * @param document The document to check
 * @return Whether the document is a Nix document saved to disk
 */
const isSavedDocument = (document: TextDocument): boolean =>
  !document.isDirty &&
  0 <
    vscode.languages.match(
      {
        language: "nix",
        scheme: "file",
      },
      document
    );

interface LintErrorType {
  msg: string;
  row: number;
  col: number;
}

/**
 * Exec pattern against the given text and return an array of all matches.
 *
 * @param text The output from nix-instantiate stderr
 * @return All matches of pattern in text.
 */
const getErrors = (text: string): ReadonlyArray<LintErrorType> => {
  const results = [];
  const pattern = /^error: (.+), at .+:(\d+):(\d+)$/gm;
  // We need to loop through the regexp here, so a let is required
  let match = pattern.exec(text);
  while (match !== null) {
    results.push({
      msg: match[1],
      row: parseInt(match[2]),
      // nix starts column indizes 0-indexed, but vscode is 1-indexed
      col: 1 + parseInt(match[3]),
    });
    match = pattern.exec(text);
  }
  return results;
};

/**
 * Parse errors from output for a given document.
 *
 * @param document The document to whose contents errors refer
 * @param output The error output from shell.
 * @return An array of all diagnostics
 */
const shellOutputToDiagnostics = (
  document: TextDocument,
  output: string
): ReadonlyArray<Diagnostic> => {
  const diagnostics: Array<Diagnostic> = [];
  for (const err of getErrors(output)) {
    const range = document.validateRange(
      new vscode.Range(err.row - 1, err.col - 2, err.row - 1, err.col + 2)
    );
    const diagnostic = new Diagnostic(range, err.msg);
    diagnostic.source = "nix";
    diagnostics.push(diagnostic);
  }
  return diagnostics;
};

/**
 * Start linting files.
 *
 * @param context The extension context
 */
export async function startLinting(context: ExtensionContext): Promise<void> {
  const diagnostics = vscode.languages.createDiagnosticCollection("nix");
  context.subscriptions.push(diagnostics);

  const lint = async (document: TextDocument) => {
    if (isSavedDocument(document)) {
      const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
      let d: ReadonlyArray<Diagnostic>
      try {
        const result = await runInWorkspace(workspaceFolder, [
          "nix-instantiate",
          "--parse",
          document.fileName,
        ]);
        d = shellOutputToDiagnostics(document, result.stderr);
      } catch (error) {
        if (error instanceof Error) {
          await vscode.window.showErrorMessage(error.message);
        }
        diagnostics.delete(document.uri);
        return;
      }
      diagnostics.set(document.uri, d as Diagnostic[]);
    }
  };

  vscode.workspace.onDidOpenTextDocument(lint, null, context.subscriptions);
  vscode.workspace.onDidSaveTextDocument(lint, null, context.subscriptions);
  for await (const textDocument of vscode.workspace.textDocuments) {
    await lint(textDocument);
  }
  // Remove diagnostics for closed files
  vscode.workspace.onDidCloseTextDocument(
    (d) => diagnostics.delete(d.uri),
    null,
    context.subscriptions
  );
};
