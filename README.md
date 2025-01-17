# Nix IDE ✨💡🌟

Adds [Nix](https://nixos.org/) language support for [Visual Studio Code](https://code.visualstudio.com/).

## Installation 🔨

Available on both the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=jnoortheen.nix-ide) and the [Open VSX Registry](https://open-vsx.org/extension/jnoortheen/nix-ide).

You can also open the Command Palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> on Windows/Linux or <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> on macOS) and enter `ext install jnoortheen.nix-ide` to install the extension, or download it from the [latest release](https://github.com/nix-community/vscode-nix-ide/releases/latest).

## Quickstart 🚀

1. Install the extension
2. Open a Nix file
3. Syntax highlighting should work out of the box.
4. Formatting the code should work if [`nixfmt`](https://github.com/NixOS/nixfmt) (or the archived [`nixpkgs-fmt`](https://github.com/nix-community/nixpkgs-fmt)) is installed and available on the `$PATH`.
5. Full language support is available if you have a language server installed and enabled. See [LSP Plugin Support](#lsp-plugin-support) for more information.

## Features 🎯

- [Syntax Highlighting](./images/docs/nix-syntax-highlight.png) support. Also Nix code blocks inside `markdown` files also [highlighted](./images/docs/md-embed-nix.png).
- The basic language integration is supported out of the box using `nixfmt` and `nix-instantiate`. Syntax Errors are [linted](./images/docs/linting.png) using `nix-instantiate` while Auto-Formatting is handled by `nixfmt` by default. Custom formatter can be set by [setting `nix.formatterPath`](#custom-formatter).
- The full language support is enabled by [configuring an LSP server](#lsp-plugin-support).
- Snippets are provided for conditional expressions, `let` expressions, `with` expressions, and `rec`ursive sets.
- Path completion support using [PathIntellisense](https://github.com/ChristianKohler/PathIntellisense) extension

## Settings ⚙️

### Custom Formatter

It can be changed by setting `nix.formatterPath` to any command which can accept file contents on stdin and return formatted text on stdout.

```json5
{ 
    "nix.formatterPath": "nixfmt" // or "nixpkgs-fmt" or ["treefmt", "--stdin", "{file}"]
    // or using flakes with `formatter = pkgs.alejandra;`
    // "nix.formatterPath": ["nix", "fmt", "--", "--"]
}
```

### LSP Plugin Support

Full language support can be enabled by using a language server. Generally, any Nix [LSP](https://microsoft.github.io/language-server-protocol/) implementation should work.

```json5
{
  "nix.enableLanguageServer": true,
  "nix.serverPath": "nil", // or "nixd"
  // Pass settings to the language server via the `serverSettings` option.
  "nix.serverSettings": { ... }
}
```
Some examples of advanced settings are provided below for [`nil`](https://github.com/oxalica/nil) and [`nixd`](https://github.com/nix-community/nixd).

* [`nil` Advanced Settings](./docs/snippets/advanced-nil-settings.jsonc)
  * See the [settings documentation](https://github.com/oxalica/nil/blob/main/docs/configuration.md)
* [`nixd` Advanced Settings](./docs/snippets/advanced-nixd-settings.jsonc)
  * See the [settings documentation](https://github.com/nix-community/nixd/blob/main/nixd/docs/configuration.md)

## Contributing 💪

We welcome contributions to this extension. Kindly start with any of open issues or feature requests.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more information.

## Credits 

Special thanks to:

- [@wmertens](https://github.com/wmertens) for [writing the grammar](https://github.com/wmertens/sublime-nix/blob/master/nix.tmLanguage).
- The [vscode-fish](https://github.com/bmalehorn/vscode-fish/) extension, which was modified to work for Nix in this extension.
