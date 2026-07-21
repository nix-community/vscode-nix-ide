import { describe, expect, mock, test } from "bun:test";
import type { CancellationToken, TextDocument } from "vscode";

const formatterInvocations: string[][] = [];

mock.module("vscode", () => ({
  Range: class Range {},
  TextEdit: { replace: () => ({}) },
  window: { showErrorMessage: async () => undefined },
  workspace: { getWorkspaceFolder: () => undefined },
}));

mock.module("./configuration", () => ({
  config: { formatterPath: ["treefmt", "--stdin", "{file}"] },
}));

mock.module("./process-runner", () => ({
  runInWorkspace: async (_workspace: unknown, formatter: string[]) => {
    formatterInvocations.push([...formatter]);
    return { exitCode: 1, stderr: "", stdout: "" };
  },
}));

const { formattingProviders } = await import("./formatter");

const document = (fileName: string): TextDocument =>
  ({
    fileName,
    getText: () => "",
    uri: {},
    validateRange: (range: unknown) => range,
  }) as unknown as TextDocument;

const formattingOptions = { insertSpaces: true, tabSize: 2 };
const cancellationToken = {
  isCancellationRequested: false,
} as CancellationToken;

describe("fallback formatter command", () => {
  test("resolves the file placeholder for every document", async () => {
    await formattingProviders.provideDocumentFormattingEdits(
      document("/workspace/first.nix"),
      formattingOptions,
      cancellationToken,
    );
    await formattingProviders.provideDocumentFormattingEdits(
      document("/workspace/second.nix"),
      formattingOptions,
      cancellationToken,
    );

    expect(formatterInvocations).toEqual([
      ["treefmt", "--stdin", "/workspace/first.nix"],
      ["treefmt", "--stdin", "/workspace/second.nix"],
    ]);
  });
});
