import { window } from "vscode";
import type { LSPObject } from "vscode-languageclient";
import variables from "vscode-variables";

/**
 * transform config value by vscode variables
 * @link https://www.npmjs.com/package/vscode-variables?activeTab=readme
 */
export const transformConfigValueByVscodeVariables = <
  T extends string | boolean | LSPObject,
>(
  _cfg: T,
): T => {
  let cfg = _cfg;
  try {
    if (typeof cfg === "string") {
      cfg = variables(cfg) as T;
    } else if (!!cfg && typeof cfg === "object") {
      for (const key of Object.keys(cfg)) {
        cfg[key] = transformConfigValueByVscodeVariables(cfg[key]);
      }
    } else if (Array.isArray(cfg) && cfg.length > 0) {
      cfg = cfg.map(
        (item) => transformConfigValueByVscodeVariables(item) as unknown,
      ) as T;
    }
    return cfg;
  } catch (err) {
    console.error(err);
    return cfg;
  }
};

export const outputChannel = window.createOutputChannel("Nix");

export function logOut(messageOrCallback: string | (() => string), data?: any) {
  const timestamp = new Date().toISOString();
  const message =
    typeof messageOrCallback === "function"
      ? messageOrCallback()
      : messageOrCallback;
  outputChannel.appendLine(`[${timestamp}] ${message}`);
  if (data) {
    outputChannel.appendLine(JSON.stringify(data, null, 2));
  }
}
