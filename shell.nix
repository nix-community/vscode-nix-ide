{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs
    esbuild
    bun
  ];
  shellHook = ''
    bun install
  '';
}
