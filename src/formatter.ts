import * as vscode from "vscode";
import {
  type DocumentFormattingEditProvider,
  type DocumentRangeFormattingEditProvider,
  Range,
  type TextDocument,
  TextEdit,
} from "vscode";
import { config } from "./configuration";
import { type IProcessResult, runInWorkspace } from "./process-runner";

const FORMATTER: Array<string> = config.formatterPath;

/**
 * Get text edits to format a range in a document.
 *
 * @param document The document whose text to format
 * @param range The range within the document to format
 * @return A promise with the list of edits
 */
const getFormatRangeEdits = async (
  document: TextDocument,
  range?: Range,
): Promise<ReadonlyArray<TextEdit>> => {
  const actualRange = document.validateRange(
    range || new Range(0, 0, Number.MAX_VALUE, Number.MAX_VALUE),
  );
  let result: IProcessResult;
  try {
    FORMATTER.forEach((elm, i) => {
      FORMATTER[i] = elm.replace("{file}", document.fileName);
    });
    result = await runInWorkspace(
      vscode.workspace.getWorkspaceFolder(document.uri),
      FORMATTER,
      document.getText(actualRange),
    );
  } catch (error) {
    if (error instanceof Error) {
      await vscode.window.showErrorMessage(
        `Failed to run ${FORMATTER.join(" ")}: ${error.message}`,
      );
    }
    // Re-throw the error to make the promise fail
    throw error;
  }
  return result.exitCode === 0
    ? [TextEdit.replace(actualRange, result.stdout)]
    : [];
};

/**
 * A type for all formatting providers.
 */
type FormattingProviders = DocumentFormattingEditProvider &
  DocumentRangeFormattingEditProvider;

/**
 * Formatting providers
 */
export const formattingProviders: FormattingProviders = {
  provideDocumentFormattingEdits: (document, _, token) =>
    getFormatRangeEdits(document).then((edits) =>
      token.isCancellationRequested
        ? []
        : // tslint:disable-next-line:readonly-array
          (edits as TextEdit[]),
    ),
  provideDocumentRangeFormattingEdits: (document, range, _, token) =>
    getFormatRangeEdits(document, range).then((edits) =>
      token.isCancellationRequested
        ? []
        : // tslint:disable-next-line:readonly-array
          (edits as TextEdit[]),
    ),
};
