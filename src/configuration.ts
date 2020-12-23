import * as vscode from "vscode";

import { MessageItem, Uri } from "vscode";

export interface UriMessageItem extends MessageItem {
  uri: Uri;
}

export class Config {
  readonly rootSection = "nix";

  private get cfg(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration(this.rootSection);
  }

  private get<T>(path: string, def_val: T): T {
    return this.cfg.get<T>(path) ?? def_val;
  }

  get serverPath(): string {
    return this.get<string>("serverPath", "rnix-lsp");
  }

  get LSPEnabled(): boolean {
    return this.get<boolean>("enableLanguageServer", false);
  }
}
export const config = new Config();
