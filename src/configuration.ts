import {
  type ConfigurationChangeEvent,
  type WorkspaceConfiguration,
  workspace,
} from "vscode";
import type { LSPObject } from "vscode-languageclient";

import type { MessageItem, Uri } from "vscode";
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

  get formatterPath(): string | Array<string> {
    return this.get<string>("formatterPath", "nixfmt");
  }

  get serverPath(): string {
    return this.get<string>("serverPath", "nil");
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
      change.affectsConfiguration("nix.enableLanguageServer")
    );
  }
}
export const config = new Config();
