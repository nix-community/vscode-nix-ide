# SYNTAX TEST "source.nix" "sample testcase"

let
  a = abort "will never happen";
  b = "hello";
  c = "world";
  # the following lines miss semi-colons on purpose
  path = ./relative/path
  sp_path = ./relative/${path}
in b + c