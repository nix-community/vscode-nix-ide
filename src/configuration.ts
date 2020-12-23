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

  private get<T>(path: string): T {
    return this.cfg.get<T>(path)!;
  }

  get serverPath(): string {
    return this.get<string>("serverPath");
  }

  get LSPEnabled(): boolean {
    return this.get<boolean>("enableLanguageServer");
  }
}
export const config = new Config();
