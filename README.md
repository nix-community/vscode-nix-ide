# nix README

Adds [nix](https://nixos.org/) language support for VSCode Editor.

## Features

* Syntax Highlight

  + Thanks to https://github.com/wmertens/sublime-nix for the grammer file

  ![](./images/docs/nix-syntax-highlight.png)

  + nix code snippets inside `markdown` files also work.

  ![](./images/docs/md-embed-nix.png)

* Full editing support with [rnix-LSP](https://github.com/nix-community/rnix-lsp)

* When `Language Server` support is not enabled the following tools are used to
  + Formatting support
    - with the help of [nixpkgs-format](https://github.com/nix-community/nixpkgs-fmt)
  + Error Report
    - Using `nix-instantiate` errors reported

  ![](./images/docs/linting.png)

* Snippets

## Todos

**PRs welcome** for them

* [embedded language](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#embedded-languages) syntax support for bash
* path completion - https://github.com/ChristianKohler/PathIntellisense

## Installation

### Visual Studio Code

Hit `F1` and enter the `ext install jnoortheen.nix-ide` command or search for `nix-ide` .

### *.vsix file

The extension can be downloaded from the release page.

### Installing the extension Locally

Just clone the [GitHub repository](https://github.com/bbenoist/vscode-nix) under your local extensions folder:

* Windows: `%USERPROFILE%\.vscode\extensions`
* Mac / Linux: `$HOME/.vscode/extensions`

## Contributing

* Document the purpose of functions and classes.
* When adding a new feature, please mention it in the `README.md` Features section. Use screenshots when applicable.
* [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) style should be used for commit messages as it is used to generate changelog.

## Development

* TypeScript is used to develop the extension

```sh
  yarn install
  yarn build # this will build the extension
```

## Releasing a new version

```sh
  export OVS_PAT=...
  yarn release
  yarn upload
```

---
Special thanks to
 * [article](https://blog.nojaf.com/2018/12/17/writing-a-vscode-extension-with-fable-2-1/) to have all the pieces in one place to develop vscode extension with `Fable` .
 * The extension [vscode-fish](https://github.com/bmalehorn/vscode-fish/) is modified to work for `nix` .

## Links

* [Extension page](https://marketplace.visualstudio.com/items?itemName=jnoortheen.nix-ide)
