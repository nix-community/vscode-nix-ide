## Contributing

- Document the purpose of functions and classes.
- Please mention new features in the `README.md` features section. Use screenshots when applicable.
- The [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) style should be used for commit messages as it is used to generate the changelog.

## Development

There is [direnv](https://direnv.net/) and [nix-shell](https://nixos.wiki/wiki/Development_environment_with_nix-shell) support so a dev environment can be created with the `nix-shell` command or a one-time `direnv allow` at the root of the repo.

Press `F5` in VSCode to run an Extension Development Host instance with the extension installed.

TypeScript is used to develop the extension.

```sh
bun install # install dependencies
bun run build   # build the extension
```

## Releasing a new version

Complete `.env` with environment variables based on `.env.template`,

```sh
# this will generate changelog and will create a GitHub release. This will also trigger jobs to publish the extension.
bun run release

# to manually publish the extension
bun run publish
```

# VS Code Extension Quickstart

## What's in the folder

* This folder contains all of the files necessary for your extension.
* `package.json` - this is the manifest file in which you declare your language support and define the location of the grammar file that has been copied into your extension.
* `syntaxes/nix.YAML-tmLanguage` - this is the Text mate grammar file that is used for tokenization. This will get compiled to `syntaxes/nix.tmLanguage.json` during build.
* `language-configuration.json` - this is the language configuration, defining the tokens that are used for comments and brackets.

## Get up and running straight away

* Make sure the language configuration settings in `language-configuration.json` are accurate.
* Press `F5` to open a new window with your extension loaded.
* Create a new file with a file name suffix matching your language.
* Verify that syntax highlighting works and that the language configuration settings are working.

## Make changes

* You can relaunch the extension from the debug toolbar after making changes to the files listed above.
* You can also reload ( `Ctrl+R` or `Cmd+R` on Mac) the VS Code window with your extension to load your changes.

## Add more language features

* To add features such as intellisense, hovers and validators check out the VS Code extenders documentation at https://code.visualstudio.com/docs

## Install your extension

* To start using your extension with Visual Studio Code copy it into the `<user home>/.vscode/extensions` folder and restart Code.
* To share your extension with the world, read on https://code.visualstudio.com/docs about publishing an extension.
