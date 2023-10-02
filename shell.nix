{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs
    yarn
    esbuild
  ];
  shellHook = ''
    yarn install
  '';
}
