# nix-ide

Ported from [vscode-nix-ide](https://github.com/nix-community/vscode-nix-ide).

Because some APIs of [vscode](github.com/microsoft/vscode) are missing in
[coc.nvim](https://github.com/neoclide/coc.nvim), disable some features
temporarily:

- validate range: miss `vscode.document.validateRange()`
- rerun linter only when document is dirty: miss `vscode.document.isDirty`
- open URL of language server: miss `vscode.env.openExternal()`

## Install

- [coc-marketplace](https://github.com/fannheyward/coc-marketplace)
- [npm](https://www.npmjs.com/package/coc-nix)
- vim:

```vim
" command line
CocInstall coc-nix
" or add the following code to your vimrc
let g:coc_global_extensions = ['coc-nix', 'other coc-plugins']
```

## Usage

Refer [vscode-nix-ide](https://github.com/nix-community/vscode-nix-ide).
