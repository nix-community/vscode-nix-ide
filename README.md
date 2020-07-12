# nix README

Adds [nix](https://nixos.org/) language support for VSCode Editor.

## Features

* Syntax Highlight
  + Thanks to https://github.com/wmertens/sublime-nix for the grammer file
* Formatting support
  + with the help of [nixpkgs-format](https://github.com/nix-community/nixpkgs-fmt)
* Error Report
  + Using `nix-instantiate`

## Installation

### Visual Studio Code

Hit `F1` and enter the `ext install nix-ide` command.

### Installing the extension Locally

Just clone the [GitHub repository](https://github.com/bbenoist/vscode-nix) under your local extensions folder:

* Windows: `%USERPROFILE%\.vscode\extensions`
* Mac / Linux: `$HOME/.vscode/extensions`

## Contributing

I have created this since the other nix-language extension hasn't been updated over an year. I just wanted to add formatting and error detection quickly. Contributions are very welcome. But please follow the below points.

* Indent your code by 2 spaces.
* Document the purpose of functions and classes.
* Document other code where useful.
* When adding a new feature, please mention it in the `README.md` Features section. Use screenshots when applicable.
* [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) style should be used for commit messages as it is used to generate changelog.
