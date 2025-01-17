# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.0](https://github.com/nix-community/vscode-nix-ide/compare/v0.4.0...v1.0.0) (2025-01-17)


### ⚠ BREAKING CHANGES

* upgrade dependencies

### Features

* add esbuild bundling ([2ee7a3f](https://github.com/nix-community/vscode-nix-ide/commit/2ee7a3f99e25c895fa39be3cde210d7a748d4bee))
* add fable to project ([e7b4962](https://github.com/nix-community/vscode-nix-ide/commit/e7b49622ed06a2ad7d9bb7d69ed5a1ef6d0af9e5))
* add grammar test ([018be88](https://github.com/nix-community/vscode-nix-ide/commit/018be88ba0d6d0104e9d57b9250bb36c84ea52ed))
* add initial integration test ([e25320f](https://github.com/nix-community/vscode-nix-ide/commit/e25320f9e6c2979d94b05c7ef09fd5380d74de71))
* add license info ([f559fc3](https://github.com/nix-community/vscode-nix-ide/commit/f559fc3cd41980d698fb62a18c5f4b636d32c403))
* add linter for nix files with nix-instantiate ([cbf6abe](https://github.com/nix-community/vscode-nix-ide/commit/cbf6abef33a948bdbc5c9c54019e93d0320ba965))
* add nix-shell and direnv support ([#251](https://github.com/nix-community/vscode-nix-ide/issues/251)) ([d78b62d](https://github.com/nix-community/vscode-nix-ide/commit/d78b62ded8e575c01922ff781884af026578c7a4))
* add release-please action ([50b5921](https://github.com/nix-community/vscode-nix-ide/commit/50b59213beb401641d8ae17bcd4d6e4ef1e28815))
* add restarting language server command ([#381](https://github.com/nix-community/vscode-nix-ide/issues/381)) ([c52dc29](https://github.com/nix-community/vscode-nix-ide/commit/c52dc292a7d3b356bc1a18d31f9df8395770d679))
* add rnix LSP support ([ec3dee3](https://github.com/nix-community/vscode-nix-ide/commit/ec3dee34ba273d181593e647f305de10d54e5e10))
* add setting to suppress error notifications ([4913819](https://github.com/nix-community/vscode-nix-ide/commit/4913819384f2fe70e15ea7c814a739926a5d1280))
* adding basic snippets ([02e1995](https://github.com/nix-community/vscode-nix-ide/commit/02e199541e6db1f74c6a2de680957f81a9afa498))
* antiquotation brackets ([55e9258](https://github.com/nix-community/vscode-nix-ide/commit/55e92589b9b73eda3314a7b14e059c0ff77a1bfb))
* check rnix-lsp and suggest if not installed ([e09563f](https://github.com/nix-community/vscode-nix-ide/commit/e09563f849fd7cb9d28c688a1c0c3bd2da890041))
* create vsix artifacts part of release ([6e2c1fe](https://github.com/nix-community/vscode-nix-ide/commit/6e2c1fe962744936669b47a5b42b57f6d19b304c))
* declare support for nil ([#276](https://github.com/nix-community/vscode-nix-ide/issues/276)) ([c19ceba](https://github.com/nix-community/vscode-nix-ide/commit/c19ceba897f4e23aba6bad543a16ee901f4195f6))
* delay activation ([#424](https://github.com/nix-community/vscode-nix-ide/issues/424)) ([7038804](https://github.com/nix-community/vscode-nix-ide/commit/7038804b9e06d04df254fc4b516363a53a7f063e))
* initial commit ([35d49df](https://github.com/nix-community/vscode-nix-ide/commit/35d49df84975c0f3940173f0be517f5bc94528b3))
* **linter:** Allow symbol errors to show (static analysys) ([041dffc](https://github.com/nix-community/vscode-nix-ide/commit/041dffc92fae798c41ed211ee805ee6ce5772c5f))
* make the formatter path configurable ([03c25cb](https://github.com/nix-community/vscode-nix-ide/commit/03c25cb57dc36cf23dd2641abe3d34fbec01eb4a))
* markdown embedded support ([4debbfd](https://github.com/nix-community/vscode-nix-ide/commit/4debbfd90884930c5e7f5d49141fd5017dd23d56))
* migrate eslint config ([5fd26eb](https://github.com/nix-community/vscode-nix-ide/commit/5fd26eb00f6c3c9fabbf9fce4c43b6259fa6d1ed))
* passing settings to lsp ([#294](https://github.com/nix-community/vscode-nix-ide/issues/294)) ([c898347](https://github.com/nix-community/vscode-nix-ide/commit/c89834791c8eb8230cd5d07d3754bdb30ed8b822))
* path angle brackets ([f79b542](https://github.com/nix-community/vscode-nix-ide/commit/f79b54226f2ad5a6ddbe968c632c4c75b2141974))
* set file icon ([f7c2244](https://github.com/nix-community/vscode-nix-ide/commit/f7c22449ca7de99a6421a9694c606486eee607a8))
* support use vscode variables in settings ([#399](https://github.com/nix-community/vscode-nix-ide/issues/399)) ([a602050](https://github.com/nix-community/vscode-nix-ide/commit/a6020509005221a0bb885b2d5914fd8f4563f97d))
* update language configuration ([188c9cf](https://github.com/nix-community/vscode-nix-ide/commit/188c9cfecbcf5b8cb73f1c98ba9435eb68c394b6))
* upgrade dependencies to latest versions ([072b823](https://github.com/nix-community/vscode-nix-ide/commit/072b823d1f8fa6a55a870a94233e44af6ee14e57))
* word pattern ([d1389f6](https://github.com/nix-community/vscode-nix-ide/commit/d1389f6c479ceee7813635f793d7d3c02e27329c))


### Bug Fixes

* auto close at end of string ([ae0c981](https://github.com/nix-community/vscode-nix-ide/commit/ae0c981de0a60a5910dca472643bbbf43ef51c63))
* auto close double quotes in comments ([aab9cef](https://github.com/nix-community/vscode-nix-ide/commit/aab9ceffa3e52a4938b5907697b7edadd51069fb))
* biome linter fixes ([e5c15ed](https://github.com/nix-community/vscode-nix-ide/commit/e5c15edad557f08f69178d466a42201c753d4e6d))
* catch error if serverPath doesn't exist ([#267](https://github.com/nix-community/vscode-nix-ide/issues/267)) ([95caf81](https://github.com/nix-community/vscode-nix-ide/commit/95caf810a2f0415103ebc5c3dfde7b78729be4c3))
* default to nixfmt formatter ([#441](https://github.com/nix-community/vscode-nix-ide/issues/441)) ([582c364](https://github.com/nix-community/vscode-nix-ide/commit/582c3642df2188c3096ac646c575e386ae04923e))
* dependabot config ([df48657](https://github.com/nix-community/vscode-nix-ide/commit/df4865707169754900a2f609eacd38f82586b8ed))
* don't auto close single quotes ([c912fc8](https://github.com/nix-community/vscode-nix-ide/commit/c912fc8c128c0bc1c4600ae2aa904237cb13e780))
* eslint errors ([de74fc2](https://github.com/nix-community/vscode-nix-ide/commit/de74fc218d73fbb22fe97708a666798dee35335f))
* folding marker comments ([bab9fdf](https://github.com/nix-community/vscode-nix-ide/commit/bab9fdfcbb2ae2fcceb8c11cec2c1e96d6f14c45))
* mark interpolation as meta.embedded instead of markup.italic ([cd420d0](https://github.com/nix-community/vscode-nix-ide/commit/cd420d0bcea26cf1cf650f47c738bd1b6658a80c))
* quotes inside attributes ([b003401](https://github.com/nix-community/vscode-nix-ide/commit/b0034014a1b96ac862e4ff678e2f93917fdd7f91)), closes [#189](https://github.com/nix-community/vscode-nix-ide/issues/189)
* release to ovsx registry ([b07688e](https://github.com/nix-community/vscode-nix-ide/commit/b07688ec19d97337be8e8b1371e911b6b908884a))
* reload language server client on restart ([#420](https://github.com/nix-community/vscode-nix-ide/issues/420)) ([4c48cb0](https://github.com/nix-community/vscode-nix-ide/commit/4c48cb06cddf439f65d6ec066f41c6a6432ffa5a)), closes [#419](https://github.com/nix-community/vscode-nix-ide/issues/419)
* since update to lsp-client v7 ([e3fa686](https://github.com/nix-community/vscode-nix-ide/commit/e3fa686464dcac5319ddae5a5d23904c4f5bc487))
* syntax file name ([3113b30](https://github.com/nix-community/vscode-nix-ide/commit/3113b3073f1ec62bed8a4eddc9cb7dab994b97c9))
* update branch names in ci configs ([66e6991](https://github.com/nix-community/vscode-nix-ide/commit/66e69919cf84fd4465378368a8525a935ce9c81a))
* vsce latest ([cecea30](https://github.com/nix-community/vscode-nix-ide/commit/cecea3041cfdb0aebc6c7e6c02dfeca193c360d6))


### Miscellaneous Chores

* upgrade dependencies ([3778ed6](https://github.com/nix-community/vscode-nix-ide/commit/3778ed648f1a0f73b8826860f591ab7b9e9bb355))

## [0.4.0](https://github.com/nix-community/vscode-nix-ide/compare/v0.3.7...v0.4.0) (2025-01-17)


### Features

* add grammar test ([018be88](https://github.com/nix-community/vscode-nix-ide/commit/018be88ba0d6d0104e9d57b9250bb36c84ea52ed))
* add initial integration test ([e25320f](https://github.com/nix-community/vscode-nix-ide/commit/e25320f9e6c2979d94b05c7ef09fd5380d74de71))
* add release-please action ([50b5921](https://github.com/nix-community/vscode-nix-ide/commit/50b59213beb401641d8ae17bcd4d6e4ef1e28815))


### Bug Fixes

* default to nixfmt formatter ([#441](https://github.com/nix-community/vscode-nix-ide/issues/441)) ([582c364](https://github.com/nix-community/vscode-nix-ide/commit/582c3642df2188c3096ac646c575e386ae04923e))

## [0.3.7](https://github.com/nix-community/vscode-nix-ide/compare/v0.3.6...v0.3.7) (2025-01-16)


### Bug Fixes

* biome linter fixes ([e5c15ed](https://github.com/nix-community/vscode-nix-ide/commit/e5c15edad557f08f69178d466a42201c753d4e6d))

## [0.3.6](https://github.com/nix-community/vscode-nix-ide/compare/v0.3.5...v0.3.6) (2024-09-20)


### Features

* delay activation ([#424](https://github.com/nix-community/vscode-nix-ide/issues/424)) ([7038804](https://github.com/nix-community/vscode-nix-ide/commit/7038804b9e06d04df254fc4b516363a53a7f063e))

### [0.3.5](https://github.com/nix-community/vscode-nix-ide/compare/v0.3.4...v0.3.5) (2024-09-13)


### Bug Fixes

* reload language server client on restart ([#420](https://github.com/nix-community/vscode-nix-ide/issues/420)) ([4c48cb0](https://github.com/nix-community/vscode-nix-ide/commit/4c48cb06cddf439f65d6ec066f41c6a6432ffa5a)), closes [#419](https://github.com/nix-community/vscode-nix-ide/issues/419)

### [0.3.4](https://github.com/nix-community/vscode-nix-ide/compare/v0.3.3...v0.3.4) (2024-09-10)


### Features

* add setting to suppress error notifications ([4913819](https://github.com/nix-community/vscode-nix-ide/commit/4913819384f2fe70e15ea7c814a739926a5d1280))

### [0.3.3](https://github.com/nix-community/vscode-nix-ide/compare/v0.3.2...v0.3.3) (2024-08-02)


### Bug Fixes

* vsce latest ([cecea30](https://github.com/nix-community/vscode-nix-ide/commit/cecea3041cfdb0aebc6c7e6c02dfeca193c360d6))

### [0.3.2](https://github.com/nix-community/vscode-nix-ide/compare/v0.3.1...v0.3.2) (2024-08-02)


### Features

* add restarting language server command ([#381](https://github.com/nix-community/vscode-nix-ide/issues/381)) ([c52dc29](https://github.com/nix-community/vscode-nix-ide/commit/c52dc292a7d3b356bc1a18d31f9df8395770d679))
* migrate eslint config ([5fd26eb](https://github.com/nix-community/vscode-nix-ide/commit/5fd26eb00f6c3c9fabbf9fce4c43b6259fa6d1ed))
* support use vscode variables in settings ([#399](https://github.com/nix-community/vscode-nix-ide/issues/399)) ([a602050](https://github.com/nix-community/vscode-nix-ide/commit/a6020509005221a0bb885b2d5914fd8f4563f97d))


### Bug Fixes

* dependabot config ([df48657](https://github.com/nix-community/vscode-nix-ide/commit/df4865707169754900a2f609eacd38f82586b8ed))
* eslint errors ([de74fc2](https://github.com/nix-community/vscode-nix-ide/commit/de74fc218d73fbb22fe97708a666798dee35335f))

### [0.3.1](https://github.com/nix-community/vscode-nix-ide/compare/v0.3.0...v0.3.1) (2024-03-12)

## [0.3.0](https://github.com/nix-community/vscode-nix-ide/compare/v0.2.2...v0.3.0) (2024-03-12)


### ⚠ BREAKING CHANGES

* upgrade dependencies

* upgrade dependencies ([3778ed6](https://github.com/nix-community/vscode-nix-ide/commit/3778ed648f1a0f73b8826860f591ab7b9e9bb355))

### [0.2.2](https://github.com/nix-community/vscode-nix-ide/compare/v0.2.1...v0.2.2) (2023-07-26)


### Features

* set file icon ([f7c2244](https://github.com/nix-community/vscode-nix-ide/commit/f7c22449ca7de99a6421a9694c606486eee607a8))

### [0.2.1](https://github.com/nix-community/vscode-nix-ide/compare/v0.1.23...v0.2.1) (2022-10-14)


### Features

* declare support for nil ([#276](https://github.com/nix-community/vscode-nix-ide/issues/276)) ([c19ceba](https://github.com/nix-community/vscode-nix-ide/commit/c19ceba897f4e23aba6bad543a16ee901f4195f6))
* passing settings to lsp ([#294](https://github.com/nix-community/vscode-nix-ide/issues/294)) ([c898347](https://github.com/nix-community/vscode-nix-ide/commit/c89834791c8eb8230cd5d07d3754bdb30ed8b822))

### [0.1.24](https://github.com/nix-community/vscode-nix-ide/compare/v0.1.23...v0.1.24) (2022-10-14)

### [0.1.23](https://github.com/nix-community/vscode-nix-ide/compare/v0.1.22...v0.1.23) (2022-08-16)


### Features

* add nix-shell and direnv support ([#251](https://github.com/nix-community/vscode-nix-ide/issues/251)) ([d78b62d](https://github.com/nix-community/vscode-nix-ide/commit/d78b62ded8e575c01922ff781884af026578c7a4))


### Bug Fixes

* catch error if serverPath doesn't exist ([#267](https://github.com/nix-community/vscode-nix-ide/issues/267)) ([95caf81](https://github.com/nix-community/vscode-nix-ide/commit/95caf810a2f0415103ebc5c3dfde7b78729be4c3))

### [0.1.22](https://github.com/nix-community/vscode-nix-ide/compare/v0.1.20...v0.1.22) (2022-08-14)


### Bug Fixes

* mark interpolation as meta.embedded instead of markup.italic ([cd420d0](https://github.com/nix-community/vscode-nix-ide/commit/cd420d0bcea26cf1cf650f47c738bd1b6658a80c))

### [0.1.21](https://github.com/nix-community/vscode-nix-ide/compare/v0.1.20...v0.1.21) (2022-08-14)


### Bug Fixes

* mark interpolation as meta.embedded instead of markup.italic ([cd420d0](https://github.com/nix-community/vscode-nix-ide/commit/cd420d0bcea26cf1cf650f47c738bd1b6658a80c))

### [0.1.20](https://github.com/nix-community/vscode-nix-ide/compare/v0.1.19...v0.1.20) (2022-02-23)

### [0.1.19](https://github.com/nix-community/vscode-nix-ide/compare/v0.1.18...v0.1.19) (2022-01-02)


### Features

* antiquotation brackets ([55e9258](https://github.com/nix-community/vscode-nix-ide/commit/55e92589b9b73eda3314a7b14e059c0ff77a1bfb))
* path angle brackets ([f79b542](https://github.com/nix-community/vscode-nix-ide/commit/f79b54226f2ad5a6ddbe968c632c4c75b2141974))
* word pattern ([d1389f6](https://github.com/nix-community/vscode-nix-ide/commit/d1389f6c479ceee7813635f793d7d3c02e27329c))


### Bug Fixes

* auto close at end of string ([ae0c981](https://github.com/nix-community/vscode-nix-ide/commit/ae0c981de0a60a5910dca472643bbbf43ef51c63))
* auto close double quotes in comments ([aab9cef](https://github.com/nix-community/vscode-nix-ide/commit/aab9ceffa3e52a4938b5907697b7edadd51069fb))
* don't auto close single quotes ([c912fc8](https://github.com/nix-community/vscode-nix-ide/commit/c912fc8c128c0bc1c4600ae2aa904237cb13e780))
* folding marker comments ([bab9fdf](https://github.com/nix-community/vscode-nix-ide/commit/bab9fdfcbb2ae2fcceb8c11cec2c1e96d6f14c45))
* quotes inside attributes ([b003401](https://github.com/nix-community/vscode-nix-ide/commit/b0034014a1b96ac862e4ff678e2f93917fdd7f91)), closes [#189](https://github.com/nix-community/vscode-nix-ide/issues/189)
* update branch names in ci configs ([66e6991](https://github.com/nix-community/vscode-nix-ide/commit/66e69919cf84fd4465378368a8525a935ce9c81a))

### [0.1.18](https://github.com/nix-community/vscode-nix-ide/compare/v0.1.17...v0.1.18) (2021-10-12)

### [0.1.17](https://github.com/nix-community/vscode-nix-ide/compare/v0.1.16...v0.1.17) (2021-10-12)


### Features

* make the formatter path configurable ([03c25cb](https://github.com/nix-community/vscode-nix-ide/commit/03c25cb57dc36cf23dd2641abe3d34fbec01eb4a))


### Bug Fixes

* release to ovsx registry ([b07688e](https://github.com/nix-community/vscode-nix-ide/commit/b07688ec19d97337be8e8b1371e911b6b908884a))

### [0.1.16](https://github.com/nix-community/vscode-nix-ide/compare/v0.1.15...v0.1.16) (2021-08-20)


### Features

* add esbuild bundling ([2ee7a3f](https://github.com/nix-community/vscode-nix-ide/commit/2ee7a3f99e25c895fa39be3cde210d7a748d4bee))

### [0.1.15](https://github.com/nix-community/vscode-nix-ide/compare/v0.1.14...v0.1.15) (2021-08-16)

### [0.1.14](https://github.com/nix-community/vscode-nix-ide/compare/v0.1.13...v0.1.14) (2021-08-16)


### Features

* upgrade dependencies to latest versions ([072b823](https://github.com/nix-community/vscode-nix-ide/commit/072b823d1f8fa6a55a870a94233e44af6ee14e57))

### [0.1.13](https://github.com/nix-community/vscode-nix-ide/compare/v0.1.12...v0.1.13) (2021-08-16)

### [0.1.12](https://github.com/nix-community/vscode-nix-ide/compare/v0.1.11...v0.1.12) (2021-05-08)

### [0.1.11](https://github.com/nix-community/vscode-nix-ide/compare/v0.1.10...v0.1.11) (2021-05-08)


### Features

* **linter:** Allow symbol errors to show (static analysys) ([041dffc](https://github.com/nix-community/vscode-nix-ide/commit/041dffc92fae798c41ed211ee805ee6ce5772c5f))

### [0.1.10](https://github.com/nix-community/vscode-nix-ide/compare/v0.1.9...v0.1.10) (2021-03-24)

### [0.1.9](https://github.com/nix-community/vscode-nix-ide/compare/v0.1.8...v0.1.9) (2021-03-24)

### [0.1.8](https://github.com/nix-community/vscode-nix-ide/compare/v0.1.7...v0.1.8) (2020-12-23)


### Features

* create vsix artifacts part of release ([6e2c1fe](https://github.com/nix-community/vscode-nix-ide/commit/6e2c1fe962744936669b47a5b42b57f6d19b304c))

### [0.1.7](https://github.com/nix-community/vscode-nix-ide/compare/v0.1.6...v0.1.7) (2020-12-23)

### [0.1.6](https://github.com/nix-community/vscode-nix-ide/compare/v0.1.5...v0.1.6) (2020-12-23)


### Features

* add rnix LSP support ([ec3dee3](https://github.com/nix-community/vscode-nix-ide/commit/ec3dee34ba273d181593e647f305de10d54e5e10)), closes [#10](https://github.com/nix-community/vscode-nix-ide/issues/10)
* check rnix-lsp and suggest if not installed ([e09563f](https://github.com/nix-community/vscode-nix-ide/commit/e09563f849fd7cb9d28c688a1c0c3bd2da890041))


### Bug Fixes

* since update to lsp-client v7 ([e3fa686](https://github.com/nix-community/vscode-nix-ide/commit/e3fa686464dcac5319ddae5a5d23904c4f5bc487))

### [0.1.5](https://github.com/nix-community/vscode-nix-ide/compare/v0.1.3...v0.1.5) (2020-10-24)

### [0.1.3](https://github.com/nix-community/vscode-nix-ide/compare/v0.1.2...v0.1.3) (2020-08-16)

### [0.1.2](https://github.com/nix-community/vscode-nix-ide/compare/v0.1.1...v0.1.2) (2020-08-16)

### 0.1.1 (2020-08-16)


### Features

* add fable to project ([e7b4962](https://github.com/nix-community/vscode-nix-ide/commit/e7b49622ed06a2ad7d9bb7d69ed5a1ef6d0af9e5))
* add license info ([f559fc3](https://github.com/nix-community/vscode-nix-ide/commit/f559fc3cd41980d698fb62a18c5f4b636d32c403))
* add linter for nix files with nix-instantiate ([cbf6abe](https://github.com/nix-community/vscode-nix-ide/commit/cbf6abef33a948bdbc5c9c54019e93d0320ba965))
* adding basic snippets ([02e1995](https://github.com/nix-community/vscode-nix-ide/commit/02e199541e6db1f74c6a2de680957f81a9afa498))
* initial commit ([35d49df](https://github.com/nix-community/vscode-nix-ide/commit/35d49df84975c0f3940173f0be517f5bc94528b3))
* markdown embedded support ([4debbfd](https://github.com/nix-community/vscode-nix-ide/commit/4debbfd90884930c5e7f5d49141fd5017dd23d56))
* update language configuration ([188c9cf](https://github.com/nix-community/vscode-nix-ide/commit/188c9cfecbcf5b8cb73f1c98ba9435eb68c394b6))


### Bug Fixes

* syntax file name ([3113b30](https://github.com/nix-community/vscode-nix-ide/commit/3113b3073f1ec62bed8a4eddc9cb7dab994b97c9))

### 0.0.2 (2020-08-16)


### Features

* add fable to project ([e7b4962](https://github.com/nix-community/vscode-nix-ide/commit/e7b49622ed06a2ad7d9bb7d69ed5a1ef6d0af9e5))
* add license info ([f559fc3](https://github.com/nix-community/vscode-nix-ide/commit/f559fc3cd41980d698fb62a18c5f4b636d32c403))
* add linter for nix files with nix-instantiate ([cbf6abe](https://github.com/nix-community/vscode-nix-ide/commit/cbf6abef33a948bdbc5c9c54019e93d0320ba965))
* adding basic snippets ([02e1995](https://github.com/nix-community/vscode-nix-ide/commit/02e199541e6db1f74c6a2de680957f81a9afa498))
* initial commit ([35d49df](https://github.com/nix-community/vscode-nix-ide/commit/35d49df84975c0f3940173f0be517f5bc94528b3))
* markdown embedded support ([4debbfd](https://github.com/nix-community/vscode-nix-ide/commit/4debbfd90884930c5e7f5d49141fd5017dd23d56))
* update language configuration ([188c9cf](https://github.com/nix-community/vscode-nix-ide/commit/188c9cfecbcf5b8cb73f1c98ba9435eb68c394b6))


### Bug Fixes

* syntax file name ([3113b30](https://github.com/nix-community/vscode-nix-ide/commit/3113b3073f1ec62bed8a4eddc9cb7dab994b97c9))

# Change Log

All notable changes to the "nix" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

- Initial release
