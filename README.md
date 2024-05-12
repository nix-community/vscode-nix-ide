# Nix IDE

Adds [Nix](https://nixos.org/) language support for [Visual Studio Code](https://code.visualstudio.com/).

## Installation

Available on both the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=jnoortheen.nix-ide) and the [Open VSX Registry](https://open-vsx.org/extension/jnoortheen/nix-ide).

You can also open the Command Palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> on Windows/Linux or <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> on macOS) and enter `ext install jnoortheen.nix-ide` to install the extension, or download it from the [latest release](https://github.com/nix-community/vscode-nix-ide/releases/latest).

## Features

### Syntax Highlighting

> [!NOTE]
> Thanks to https://github.com/wmertens/sublime-nix for the original grammar!

![](./images/docs/nix-syntax-highlight.png)

Nix code snippets inside `markdown` files also work.

![](./images/docs/md-embed-nix.png)

### Language Servers

Full editing support when using a language server. Generally, any Nix [LSP](https://microsoft.github.io/language-server-protocol/) implementation should work.

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
                // By default, this entriy will be read from `import <nixpkgs> { }`.
                // You can write arbitary Nix expressions here, to produce valid "options" declaration result.
                // Tip: for flake-based configuration, utilize `builtins.getFlake`
                "nixos": {
                    "expr": "(builtins.getFlake \"/absolute/path/to/flake\").nixosConfigurations.<name>.options"
                },
                "home-manager": {
                    "expr": "(builtins.getFlake \"/absolute/path/to/flake\").homeConfigurations.<name>.options"
                }
            }
        }
    }
}
```

### Formatting

Enable formatting support by setting `nix.formatterPath` to any command which can accept file contents on stdin and return formatted text on stdout.

```jsonc
{
  "nix.formatterPath": "nixpkgs-fmt"
}
```

```jsonc
{
  "nix.formatterPath": "nixfmt"
}
```

```jsonc
{
  "nix.formatterPath": ["treefmt", "--stdin", "{file}"]
}
```

```jsonc
{
  "nix.formatterPath": ["nix", "fmt", "--", "-"] // using flakes with `formatter = pkgs.alejandra;`
}
```

### Error Reporting

Errors reported using `nix-instantiate`.

![Screenshot of an error message tooltip](./images/docs/linting.png)

### Snippets

Snippets are provided for conditional expressions, `let` expressions, `with` expressions, and `rec`ursive sets.

## Todos

- [Embedded language](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#embedded-languages) support for Bash.
- Path completion.

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
# this is needed to publish extensions to [openvsx](https://open-vsx.org/) from local machine.
yarn env-cmd

# this will generate changelog and will create a GitHub release. This will also trigger jobs to publish the extension.
yarn release

# to manually publish the extension
yarn publish
```

## Credits

Special thanks to:

- [@wmertens](https://github.com/wmertens) for [writing the grammar](https://github.com/wmertens/sublime-nix/blob/master/nix.tmLanguage).
- The [vscode-fish](https://github.com/bmalehorn/vscode-fish/) extension, which was modified to work for Nix in this extension.
