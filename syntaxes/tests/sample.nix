let
  a = abort "will never happen";
  b = "hello";
  c = "world";
  path = ./relative/path
  sp_path = ./relative/${path}
in b + c