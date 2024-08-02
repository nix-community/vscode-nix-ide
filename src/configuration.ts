import { WorkspaceConfiguration, workspace } from "vscode";
import { LSPObject } from "vscode-languageclient";

import { MessageItem, Uri } from "vscode";
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
    return this.get<string>("formatterPath", "nixpkgs-fmt");
  }

  get serverPath(): string {
    return this.get<string>("serverPath", "nil");
  }

  get LSPEnabled(): boolean {
    return this.get<boolean>("enableLanguageServer", false);
  }

  get serverSettings(): LSPObject {
    return this.get<LSPObject>("serverSettings", {});
  }
}
export const config = new Config();
