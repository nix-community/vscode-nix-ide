import { sync as commandExistsSync } from "command-exists";
import * as vscode from "vscode";
import { Diagnostic, type ExtensionContext, type TextDocument } from "vscode";
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
      document,
    );

interface LintErrorType {
  msg: string;
  row: number;
  col: number;
}

let nixDiagnostics: vscode.DiagnosticCollection | null = null;

/**
 * Exec pattern against the given text and return an array of all matches.
 *
 * @param text The output from nix-instantiate stderr
 * @return All matches of pattern in text.
 */
const getErrors = (text: string): ReadonlyArray<LintErrorType> => {
  const results = [];
  // matches both syntax error messages, like:
  // `error: syntax error, unexpected ']', expecting ';', at /home/foo/bar/shell.nix:19:3`
  // as well as symbol error messages, like
  // `error: undefined variable 'openjdk' at /home/foo/bar/shell.nix:14:5`
  const pattern = /^error: (.+) at .+:(\d+):(\d+)$/gm;
  // We need to loop through the regexp here, so a let is required
  let match = pattern.exec(text);
  while (match !== null) {
    results.push({
      msg: match[1],
      row: Number.parseInt(match[2], 10),
      col: Number.parseInt(match[3], 10),
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
  output: string,
): ReadonlyArray<Diagnostic> => {
  const diagnostics: Array<Diagnostic> = [];
  for (const err of getErrors(output)) {
    const range = document.validateRange(
      new vscode.Range(err.row - 1, err.col - 2, err.row - 1, err.col + 2),
    );
    const diagnostic = new Diagnostic(range, err.msg);
    diagnostic.source = "nix";
    diagnostics.push(diagnostic);
  }
  return diagnostics;
};

async function lintDocument(document: TextDocument) {
  if (!isSavedDocument(document)) {
    return;
  }
  const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
  let d: ReadonlyArray<Diagnostic>;
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
    nixDiagnostics?.delete(document.uri);
    return;
  }
  nixDiagnostics?.set(document.uri, d as Diagnostic[]);
}

/**
 * Start linting files.
 *
 * @param context The extension context
 */
export async function startLinting(context: ExtensionContext): Promise<void> {
  if (nixDiagnostics !== null) {
    // the linter is probably inited already
    return;
  }
  nixDiagnostics = vscode.languages.createDiagnosticCollection("nix");
  context.subscriptions.push(nixDiagnostics);

  // Check if nix-instantiate is available
  if (!commandExistsSync("nix-instantiate")) {
    await vscode.window.showWarningMessage(
      "nix-instantiate not found in $PATH. Linting is disabled.",
    );
    return;
  }

  vscode.workspace.onDidOpenTextDocument(
    lintDocument,
    null,
    context.subscriptions,
  );
  vscode.workspace.onDidSaveTextDocument(
    lintDocument,
    null,
    context.subscriptions,
  );
  for await (const textDocument of vscode.workspace.textDocuments) {
    await lintDocument(textDocument);
  }
  // Remove diagnostics for closed files
  vscode.workspace.onDidCloseTextDocument(
    (d) => nixDiagnostics?.delete(d.uri),
    null,
    context.subscriptions,
  );
}
