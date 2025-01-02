# Nix IDE

Adds [Nix](https://nixos.org/) language support for [Visual Studio Code](https://code.visualstudio.com/).

## Installation

Available on both the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=jnoortheen.nix-ide) and the [Open VSX Registry](https://open-vsx.org/extension/jnoortheen/nix-ide).

You can also open the Command Palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> on Windows/Linux or <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> on macOS) and enter `ext install jnoortheen.nix-ide` to install the extension, or download it from the [latest release](https://github.com/nix-community/vscode-nix-ide/releases/latest).

## Quickstart

1. Install the extension
2. Open a Nix file
3. Syntax highlighting should work out of the box.
4. Formatting the code should work if `nixpkgs-fmt` is installed and available on the PATH.
5. Full language support is available if you have a language server installed and enabled. See [LSP Plugin Support](#lsp-plugin-support) for more information.

## Features

The basic language integration is supported out of the box using `nixpkgs-fmt` and `nix instantiate`.

- [Syntax Highlighting](./images/docs/nix-syntax-highlight.png) support. Also Nix code blocks inside `markdown` files also [highlighted](./images/docs/md-embed-nix.png). Syntax Errors are [linted](./images/docs/linting.png) using `nix-instantiate`.
- Auto-Formatting is handled by `nixpkgs-fmt` by default. It can be changed by [setting `nix.formatterPath`](#custom-formatter).
- Support for [LSP Plugin Support](#lsp-plugin-support).
- Snippets are provided for conditional expressions, `let` expressions, `with` expressions, and `rec`ursive sets.
- Path completion support using https://github.com/ChristianKohler/PathIntellisense extension

## Settings

### Custom Formatter

It can be changed by setting `nix.formatterPath` to any command which can accept file contents on stdin and return formatted text on stdout.

```json
{
"nix.formatterPath": "nixpkgs-fmt" // or "nixfmt"
    // "nix.formatterPath": ["treefmt", "--stdin", "{file}"]
    // using flakes with `formatter = pkgs.alejandra;`
    // "nix.formatterPath": ["nix", "fmt", "--", "--"]
}
```

### LSP Plugin Support

Full language support can be enabled by using a language server. Generally, any Nix [LSP](https://microsoft.github.io/language-server-protocol/) implementation should work.

```json
{
  "nix.enableLanguageServer": true,
  "nix.serverPath": "nil", // or "nixd"
  // Pass settings to the language server via the `serverSettings` option.
  "nix.serverSettings": { ... }
}
```
Some examples of advanced settings are provided below for [nil](https://github.com/oxalica/nil) and [nixd](https://github.com/nix-community/nixd).

* [Nil Advanced Settings](./docs/snippets/advanced-nil-settings.jsonc)
* [Nixd Advanced Settings](./docs/snippets/advanced-nixd-settings.jsonc)

## Contributing

We welcome contributions to this extension. Kindly start with any of open issues or feature requests.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more information.

## Credits

Special thanks to:

- [@wmertens](https://github.com/wmertens) for [writing the grammar](https://github.com/wmertens/sublime-nix/blob/master/nix.tmLanguage).
- The [vscode-fish](https://github.com/bmalehorn/vscode-fish/) extension, which was modified to work for Nix in this extension.
