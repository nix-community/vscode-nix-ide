# nix README

Adds [nix](https://nixos.org/) language support for VSCode Editor.

## Features

* Syntax Highlight
  + Thanks to https://github.com/wmertens/sublime-nix for the grammer file
* Formatting support
  + with the help of [nixpkgs-format](https://github.com/nix-community/nixpkgs-fmt)
* Error Report
  + Using `nix-instantiate`
* Snippets

## Todos

* embedded language syntax support for bash
* path completion - https://github.com/ChristianKohler/PathIntellisense

## Installation

### Visual Studio Code

Hit `F1` and enter the `ext install nix-ide` command.

### Installing the extension Locally

Just clone the [GitHub repository](https://github.com/bbenoist/vscode-nix) under your local extensions folder:

* Windows: `%USERPROFILE%\.vscode\extensions`
* Mac / Linux: `$HOME/.vscode/extensions`

## Contributing

I have created this since the other nix-language extension hasn't been updated over an year. I just wanted to add formatting and error detection quickly. Contributions are very welcome. But please follow the below points.

* Document the purpose of functions and classes.
* When adding a new feature, please mention it in the `README.md` Features section. Use screenshots when applicable.
* [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) style should be used for commit messages as it is used to generate changelog.

## Development

* `F#/Fable` is used to write the `JS` part of the extension.
* `dotnet >= 3.1` required
* install dependencies with

``` 
  dotnet tool restore
  dotnet paket restore
  yarn install
```

---
Special thanks to
 * [article](https://blog.nojaf.com/2018/12/17/writing-a-vscode-extension-with-fable-2-1/) to have all the pieces in one place to develop vscode extension with `Fable` .
 * Many of the functions are copied from [vscode-fish](https://github.com/bmalehorn/vscode-fish/)
