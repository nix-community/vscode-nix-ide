/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-new */

import * as fs from "node:fs";
import * as path from "node:path";
import * as vscode from "vscode";
import { logOut } from "./utils";

// Legend must align with package.json's semanticTokenTypes and semanticTokenModifiers
const TOKEN_TYPES = [
  "boolean",
  "constant",
  "path",
  "punctuations",
  "string",
  "variable",
  "parameter",
  "property",
  "operator",
  "function",
];

const TOKEN_MODIFIERS = [
  "builtin",
  "conditional",
  "delimiter",
  "escape",
  "parenthesis",
  "unresolved",
  "withAttribute",
];

async function treeSitterParser(
  context: vscode.ExtensionContext,
): Promise<any> {
  const Parser = require("tree-sitter");
  const parser = new Parser();
  const lang = require("tree-sitter-nix");
  parser.setLanguage(lang);
  return parser;
}

async function webTreeSitterParser(
  context: vscode.ExtensionContext,
): Promise<any> {
  const { Parser, Language } = require("web-tree-sitter");
  await Parser.init().catch();
  const parser = new Parser();
  // Load WASM from packaged path
  // The wasm is expected at tree-sitter-nix/tree-sitter-nix.wasm relative to extension root
  const wasmPath = context.asAbsolutePath(
    path.join("tree-sitter-nix", "tree-sitter-nix.wasm"),
  );
  logOut(`Loading tree-sitter-nix from ${wasmPath}`);
  if (!fs.existsSync(wasmPath)) {
    throw new Error(`Tree-sitter wasm not found at ${wasmPath}`);
  }
  const lang = await Language.load(wasmPath);
  parser.setLanguage(lang);
  return parser;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function nodeRangeToVsCode(node: any) {
  const start = node.startPosition;
  const end = node.endPosition;
  return new vscode.Range(start.row, start.column, end.row, end.column);
}

function pushTokenFromRange(
  builder: vscode.SemanticTokensBuilder,
  range: vscode.Range,
  type: string,
  modifiers: string[] = [],
) {
  const line = range.start.line;
  const startChar = range.start.character;
  const length = range.end.character - range.start.character;
  const tokenType = TOKEN_TYPES.indexOf(type);
  let tokenModifier = 0;
  for (const m of modifiers) {
    const mi = TOKEN_MODIFIERS.indexOf(m);
    if (mi >= 0) tokenModifier |= 1 << mi;
  }
  if (tokenType >= 0 && length > 0) {
    builder.push(line, startChar, length, tokenType, tokenModifier);
  }
}

export class TreeSitterSemanticTokensProvider
  implements vscode.DocumentSemanticTokensProvider
{
  private legend = new vscode.SemanticTokensLegend(
    TOKEN_TYPES,
    TOKEN_MODIFIERS,
  );
  private context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  getLegend(): vscode.SemanticTokensLegend {
    return this.legend;
  }

  async provideDocumentSemanticTokens(
    document: vscode.TextDocument,
    token: vscode.CancellationToken,
  ): Promise<vscode.SemanticTokens> {
    const builder = new vscode.SemanticTokensBuilder(this.legend);

    const parser = await webTreeSitterParser(this.context);

    // const queryText = fs.readFileSync(config.highlights, "utf-8");
    // const highlightQuery = new ts.Query(lang, queryText);
    // let injectionQuery = undefined;
    // if (config.injections !== undefined) {
    //   const injectionText = fs.readFileSync(config.injections, "utf-8");
    //   injectionQuery = new ts.Query(lang, injectionText);
    // }
    // return {
    //   parser,
    //   highlightQuery,
    //   injectionQuery,
    //   semanticTokenTypeMappings: config.semanticTokenTypeMappings,
    // };

    const tree = parser.parse(document.getText());
    logOut(`Parsed document with tree-sitter ${tree?.rootNode.toString()}`);

    // Walk the tree and produce tokens for interesting node types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const visit = (node: ts.SyntaxNode) => {
      if (token.isCancellationRequested) return;

      const type = node.type;

      // map node types to token types/modifiers
      switch (type) {
        case "identifier":
        case "name":
        case "unary":
          pushTokenFromRange(builder, nodeRangeToVsCode(node), "variable");
          break;
        case "string":
        case "string_fragment":
          pushTokenFromRange(builder, nodeRangeToVsCode(node), "string");
          break;
        case "path":
        case "relative_path":
        case "abs_path":
          pushTokenFromRange(builder, nodeRangeToVsCode(node), "path");
          break;
        case "number":
          pushTokenFromRange(builder, nodeRangeToVsCode(node), "constant");
          break;
        case "if":
        case "then":
        case "else":
        case "with":
        case "let":
        case "in":
          pushTokenFromRange(builder, nodeRangeToVsCode(node), "boolean", [
            "conditional",
          ]);
          break;
        case "function_definition":
        case "lambda":
          pushTokenFromRange(builder, nodeRangeToVsCode(node), "function");
          break;
        case "attribute_name":
        case "attr_name":
          pushTokenFromRange(builder, nodeRangeToVsCode(node), "property");
          break;
        default:
          break;
      }

      for (let i = 0; i < node.namedChildCount; i++) {
        const child = node.namedChild(i);
        if (child) visit(child);
      }
    };

    if (tree) {
      visit(tree.rootNode);
    }

    return builder.build();
  }
}
