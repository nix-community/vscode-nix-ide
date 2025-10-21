import type { MessageItem, Uri } from "vscode";
import {
  type ConfigurationChangeEvent,
  type WorkspaceConfiguration,
  workspace,
} from "vscode";
import type { LSPObject } from "vscode-languageclient";
import { transformConfigValueByVscodeVariables } from "./utils";

export interface UriMessageItem extends MessageItem {
  uri: Uri;
}

export class Config {
  readonly rootSection = "nix";

  private get cfg(): WorkspaceConfiguration {
    return workspace.getConfiguration(this.rootSection);
  }

  private get<T extends string | boolean | LSPObject>(
    path: string,
    def_val: T,
  ): T {
    return transformConfigValueByVscodeVariables(
      this.cfg.get<T>(path) ?? def_val,
    );
  }

  get enableSemanticTokens(): boolean {
    return this.get("enableSemanticTokens", true);
  }

  get formatterPath(): Array<string> {
    const path: Array<string> | string = this.get("formatterPath", "nixfmt");
    if (typeof path === "string") {
      switch (path) {
        case "nix3-fmt":
          return ["nix", "fmt", "--", "--"];
        case "treefmt":
          return ["treefmt", "--stdin", "{file}"];
        default:
          return [path];
      }
    }
    return path;
  }

  get serverPath(): Array<string> {
    const path: Array<string> | string = this.get("serverPath", "nil");
    if (typeof path === "string") {
      return [path];
    }
    return path;
  }

  get LSPEnabled(): boolean {
    return this.get<boolean>("enableLanguageServer", false);
  }

  get hiddenErrorKinds(): string[] {
    return this.get("hiddenLanguageServerErrors", []);
  }

  get serverSettings(): LSPObject {
    return this.get<LSPObject>("serverSettings", {});
  }

  requiresServerRestart(change: ConfigurationChangeEvent): boolean {
    // NOTE: this might be easier if all the settings were nested under
    // e.g. `"nix.languageServer" or something like that, to deduplicate keys
    return (
      change.affectsConfiguration("nix.serverPath") ||
      change.affectsConfiguration("nix.enableLanguageServer") ||
      change.affectsConfiguration("nix.enableSemanticTokens")
    );
  }
}
export const config = new Config();
