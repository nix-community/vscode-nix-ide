# from https://github.com/nix-community/vscode-nix-ide/issues/508
{
  case_1 = (if 2 > 1 then "a" else "b");
  case_2 = (if 2 < 1 then "a" else "b");
  case_3 = (if 2 >= 1 then "a" else "b");
  case_4 = (if 2 <= 1 then "a" else "b");
  case_5 = (true -> true); # (implication operator)
}