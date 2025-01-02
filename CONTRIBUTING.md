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
