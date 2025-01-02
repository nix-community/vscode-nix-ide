# Nix IDE

Adds [Nix](https://nixos.org/) language support for [Visual Studio Code](https://code.visualstudio.com/).

## Installation

Available on both the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=jnoortheen.nix-ide) and the [Open VSX Registry](https://open-vsx.org/extension/jnoortheen/nix-ide).

You can also open the Command Palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> on Windows/Linux or <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> on macOS) and enter `ext install jnoortheen.nix-ide` to install the extension, or download it from the [latest release](https://github.com/nix-community/vscode-nix-ide/releases/latest).

## Features

The basic language integration is supported out of the box using `nixpkgs-fmt` and `nix instantiate`.

<details>
  <summary>Syntax Highlighting support</summary>
  <img src="./images/docs/nix-syntax-highlight.png" alt="syntax highlighting"/>
</details>


<details>
  <summary>Syntax highlighting of Nix code blocks inside `markdown` files also work.</summary>
  <img src="./images/docs/md-embed-nix.png" alt="embedded syntax highlighting"/>
</details>

<details>
  <summary>Syntax Errors are reported using `nix-instantiate`</summary>
  <img src="./images/docs/linting.png" alt="Screenshot of an error message tooltip"/>
</details>

<details>
  <summary>
    Auto-Formatting is handled by `nixpkgs-fmt` by default.
  </summary>

It can be changed by setting `nix.formatterPath` to any command which can accept file contents on stdin and return formatted text on stdout.
```jsonc
{
"nix.formatterPath": "nixpkgs-fmt"
    // "nix.formatterPath": "nixfmt"
    // "nix.formatterPath": ["treefmt", "--stdin", "{file}"]
    // "nix.formatterPath": ["nix", "fmt", "--", "--"] // using flakes with `formatter = pkgs.alejandra;`
}
```

</details>

 - Snippets are provided for conditional expressions, `let` expressions, `with` expressions, and `rec`ursive sets.
 - Path completion support using https://github.com/ChristianKohler/PathIntellisense extension


## LSP Plugin Support

Full language support can be enabled by using a language server. Generally, any Nix [LSP](https://microsoft.github.io/language-server-protocol/) implementation should work.

The following have been tested so far:

* [nil](https://github.com/oxalica/nil)
* [nixd](https://github.com/nix-community/nixd)

```jsonc
{
  "nix.enableLanguageServer": true,

  "nix.serverPath": "nil",
  // or
  "nix.serverPath": "nixd"
}
```

<details>
      <summary>Advanced settings </summary>


  Pass settings to the language server via the `serverSettings` option.

```jsonc
{
  "nix.serverSettings": {
    "nil": {
      "diagnostics": {
        "ignored": ["unused_binding", "unused_with"]
      },
      "formatting": {
        "command": ["nixpkgs-fmt"]
      }
    }
  }
}
```

```jsonc
{
    "nix.serverSettings": {
        "nixd": {
            "formatting": {
                "command": [ "nixpkgs-fmt" ]
            },
            "options": {
                // By default, this entry will be read from `import <nixpkgs> { }`.
                // You can write arbitrary Nix expressions here, to produce valid "options" declaration result.
                // Tip: for flake-based configuration, utilize `builtins.getFlake`
                "nixos": {
                    "expr": "(builtins.getFlake \"/absolute/path/to/flake\").nixosConfigurations.<name>.options"
                },
                "home-manager": {
                    "expr": "(builtins.getFlake \"/absolute/path/to/flake\").homeConfigurations.<name>.options"
                },
                // Tip: use ${workspaceFolder} variable to define path
                "nix-darwin": {
                  "expr": "(builtins.getFlake \"${workspaceFolder}/path/to/flake\").darwinConfigurations.<name>.options"
                }
            }
        }
    }
}
```
</details>

## Contributing

We welcome contributions to this extension. Kindly start with any of open issues or feature requests.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more information.

## Credits

Special thanks to:

- [@wmertens](https://github.com/wmertens) for [writing the grammar](https://github.com/wmertens/sublime-nix/blob/master/nix.tmLanguage).
- The [vscode-fish](https://github.com/bmalehorn/vscode-fish/) extension, which was modified to work for Nix in this extension.
