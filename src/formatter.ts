import {
  type DocumentFormattingEditProvider,
  type DocumentRangeFormattingEditProvider,
  Range,
  type TextDocument,
  TextEdit,
//# #if HAVE_VSCODE
} from "vscode";
import * as vscode from "vscode";
//# #elif HAVE_COC_NVIM
//# Uri
//# } from "coc.nvim";
//# #endif
import { config } from "./configuration";
import { type IProcessResult, runInWorkspace } from "./process-runner";

const FORMATTER: Array<string> = Array.isArray(config.formatterPath)
  ? config.formatterPath
  : [config.formatterPath];

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
  //# #if HAVE_VSCODE
  const actualRange = document.validateRange(
    range || new Range(0, 0, Number.MAX_VALUE, Number.MAX_VALUE),
  );
  //# #elif HAVE_COC_NVIM
  //# const actualRange = range || Range.create(0, 0, Number.MAX_VALUE, Number.MAX_VALUE);
  //# #endif
  let result: IProcessResult;
  try {
    //# #if HAVE_VSCODE
    FORMATTER.forEach((elm, i) => {
      FORMATTER[i] = elm.replace("{file}", document.fileName);
    });
    //# #elif HAVE_COC_NVIM
    //# FORMATTER.forEach(
    //#   (elm, i) => {
    //#     FORMATTER[i] = elm.replace(
    //#       "{file}",
    //#       Uri.parse(document.uri).fsPath /* document.fileName */,
    //#     )
    //#   },
    //# );
    //# #endif
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
 * Formatting providers for fish documents.
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
