import { LSPObject } from "vscode-languageclient";
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
      Object.keys(cfg).forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        cfg[key] = transformConfigValueByVscodeVariables(cfg[key]);
      });
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
