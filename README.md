# Nix IDE ✨💡🌟

Adds [Nix](https://nixos.org/) language support for [Visual Studio Code](https://code.visualstudio.com/).

## Quickstart 🚀

1. [Install](./install.md) the extension, and open a Nix file.  
1. [Syntax highlighting](./images/docs/nix-syntax-highlight.png) should work out of the box. Nix code blocks inside `markdown` files are also [supported](./images/docs/md-embed-nix.png).  
1. Auto-formatting should work if [`nixfmt`](https://github.com/NixOS/nixfmt) or [`nixpkgs-fmt`](https://github.com/nix-community/nixpkgs-fmt) is available in `$PATH`. A custom formatter can be set by [configuring `nix.formatterPath`](#custom-formatter).  
1. Syntax errors are [linted](./images/docs/linting.png) using `nix-instantiate`.  
1. Full language support can be enabled by configuring a language server. See [LSP Plugin Support](#lsp-plugin-support) for more information.
1. Snippets are provided for conditional expressions, `let`/`with` expressions, and `rec`ursive sets.  
1. Path completion is supported using the [Path Intellisense](https://github.com/ChristianKohler/PathIntellisense) extension.  

## Settings ⚙️

### LSP Plugin Support

Full language support can be enabled by using a language server. Generally, any Nix [LSP](https://microsoft.github.io/language-server-protocol/) implementation should work. Some examples are given below for [`nil`](https://github.com/oxalica/nil?tab=readme-ov-file#vscodevscodium-with-nix-ide) and [`nixd`](https://github.com/nix-community/nixd).

```json5
{
  "nix.enableLanguageServer": true,
  "nix.serverPath": "nil", // or "nixd"
  // LSP config can be passed via the ``nix.serverSettings.{lsp}`` as shown below.
  "nix.serverSettings": {
    // check https://github.com/oxalica/nil/blob/main/docs/configuration.md for all options available
    "nil": {
      // "diagnostics": {
      //  "ignored": ["unused_binding", "unused_with"],
      // },
      "formatting": {
        "command": ["nixfmt"],
      },
    },
    // check https://github.com/nix-community/nixd/blob/main/nixd/docs/configuration.md for all nixd config
    "nixd": {
      "formatting": {
        "command": ["nixfmt"],
      },
      "options": {
        // By default, this entry will be read from `import <nixpkgs> { }`.
        // You can write arbitrary Nix expressions here, to produce valid "options" declaration result.
        // Tip: for flake-based configuration, utilize `builtins.getFlake`
        "nixos": {
          "expr": "(builtins.getFlake \"/absolute/path/to/flake\").nixosConfigurations.<name>.options",
        },
        "home-manager": {
          "expr": "(builtins.getFlake \"/absolute/path/to/flake\").homeConfigurations.<name>.options",
        },
        // Tip: use ${workspaceFolder} variable to define path
        "nix-darwin": {
          "expr": "(builtins.getFlake \"${workspaceFolder}/path/to/flake\").darwinConfigurations.<name>.options",
        },
      },
    }
  }
}
```

### Custom Formatter

It can be changed by setting `nix.formatterPath` to any command which can accept file contents on stdin and return formatted text on stdout. If you are using an LSP server, then this configuration is not used.

```json5
{
    "nix.formatterPath": "nixfmt" // or "nixpkgs-fmt" or "alejandra" or "nix3-fmt" or pass full list of args such as  or `["treefmt", "--stdin", "{file}"]`
}
```

## Contributing 💪

We welcome contributions to this extension. Kindly start with any of open issues or feature requests.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more information.

## Credits

Special thanks to:

- [@wmertens](https://github.com/wmertens) for [writing the grammar](https://github.com/wmertens/sublime-nix/blob/master/nix.tmLanguage).
- The [vscode-fish](https://github.com/bmalehorn/vscode-fish/) extension, which was modified to work for Nix in this extension.
