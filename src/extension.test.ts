import assert = require("node:assert");

import * as vscode from "vscode";

describe("The resources", () => {
  const extension = vscode.extensions.getExtension("jnoortheen.vscode-nix-ide");
  if (!extension) {
    assert.fail("Extension not found");
  }
  // const iconName = "images/icon.png";

  // it("provides valid icon paths", async () => {

  // });
});
