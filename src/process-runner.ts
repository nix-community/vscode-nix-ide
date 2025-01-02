import { execFile } from "node:child_process";
import type { WorkspaceFolder } from "vscode";

/**
 * A system error, i.e. an error that results from a syscall.
 */
interface ISystemError extends Error {
  readonly errno: string;
}

/**
 * Whether an error is a system error.
 *
 * @param error The error to check
 */
const isSystemError = (error: Error): error is ISystemError =>
  (error as ISystemError).errno !== undefined &&
  typeof (error as ISystemError).errno === "string";

/**
 * A process error.
 *
 * A process error occurs when the process exited with a non-zero exit code.
 */
interface IProcessError extends Error {
  /**
   * The exit code of the process.
   */
  readonly code: number;
}

/**
 * Whether an error is a process error.
 */
const isProcessError = (error: Error): error is IProcessError =>
  !isSystemError(error) &&
  (error as IProcessError).code !== undefined &&
  (error as IProcessError).code > 0;

/**
 * The result of a process.
 */
export interface IProcessResult {
  /**
   * The integral exit code.
   */
  readonly exitCode: number;
  /**
   * The standard output.
   */
  readonly stdout: string;
  /**
   * The standard error.
   */
  readonly stderr: string;
}

/**
 * Run a command in a given workspace folder.
 *
 * If the workspace folder is undefined run the command in the working directory
 * if the vscode instance.
 *
 * @param folder The folder to run the command in
 * @param command The command array
 * @param stdin An optional string to feed to standard input
 * @return The result of the process as promise
 */
export const runInWorkspace = (
  folder: WorkspaceFolder | undefined,
  command: ReadonlyArray<string>,
  stdin?: string,
): Promise<IProcessResult> =>
  new Promise((resolve, reject) => {
    const cwd = folder ? folder.uri.fsPath : process.cwd();
    const child = execFile(
      command[0],
      command.slice(1),
      { cwd },
      (error, stdout, stderr) => {
        if (error && !isProcessError(error)) {
          // Throw system errors, but do not fail if the command
          // fails with a non-zero exit code.
          console.error("Command error", command, error);
          reject(error); // eslint-disable-line @typescript-eslint/prefer-promise-reject-errors
        } else {
          const exitCode = error ? error.code : 0;
          resolve({ stdout, stderr, exitCode });
        }
      },
    );
    if (stdin && child.stdin) {
      child.stdin.end(stdin);
    }
  });
