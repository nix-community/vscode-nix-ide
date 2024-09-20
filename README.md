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

- Document the purpose of functions and classes.
- Please mention new features in the `README.md` features section. Use screenshots when applicable.
- The [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) style should be used for commit messages as it is used to generate the changelog.

## Development

There is [direnv](https://direnv.net/) and [nix-shell](https://nixos.wiki/wiki/Development_environment_with_nix-shell) support so a dev environment can be created with the `nix-shell` command or a one-time `direnv allow` at the root of the repo.

Press `F5` in VSCode to run an Extension Development Host instance with the extension installed.

TypeScript is used to develop the extension.

```sh
yarn install # install dependencies
yarn build   # build the extension
```

## Releasing a new version

Complete `.env` with environment variables based on `.env.template`,

```sh
# this will generate changelog and will create a GitHub release. This will also trigger jobs to publish the extension.
yarn release

# to manually publish the extension
yarn env-cmd && yarn publish
```

## Credits

Special thanks to:

- [@wmertens](https://github.com/wmertens) for [writing the grammar](https://github.com/wmertens/sublime-nix/blob/master/nix.tmLanguage).
- The [vscode-fish](https://github.com/bmalehorn/vscode-fish/) extension, which was modified to work for Nix in this extension.
