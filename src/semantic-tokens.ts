import * as vscode from "vscode";

/**
 * Semantic token types used in Nix files
 */
enum NixTokenTypes {
  Class = "class",
  Function = "function",
  Variable = "variable",
  Property = "property",
  Parameter = "parameter",
  Number = "number",
  String = "string",
  Keyword = "keyword",
  Comment = "comment",
  Operator = "operator",
}

/**
 * Provides semantic highlighting for Nix files
 */
export class NixSemanticTokensProvider
  implements vscode.DocumentSemanticTokensProvider
{
  private readonly legend: vscode.SemanticTokensLegend;
  private readonly tokenTypes: string[];

  constructor() {
    // Define supported token types
    this.tokenTypes = [
      NixTokenTypes.Class,
      NixTokenTypes.Function,
      NixTokenTypes.Variable,
      NixTokenTypes.Property,
      NixTokenTypes.Parameter,
      NixTokenTypes.Number,
      NixTokenTypes.String,
      NixTokenTypes.Keyword,
      NixTokenTypes.Comment,
      NixTokenTypes.Operator,
    ];

    this.legend = new vscode.SemanticTokensLegend(this.tokenTypes);
  }

  async provideDocumentSemanticTokens(
    document: vscode.TextDocument,
    token: vscode.CancellationToken,
  ): Promise<vscode.SemanticTokens> {
    const builder = new vscode.SemanticTokensBuilder(this.legend);

    // Simple example tokens - in a real implementation, you'd want to use a proper parser
    for (let lineIndex = 0; lineIndex < document.lineCount; lineIndex++) {
      if (token.isCancellationRequested) {
        break;
      }

      const line = document.lineAt(lineIndex);
      const text = line.text;

      // Match some basic patterns - this is a simplified example

      // Functions/variables
      const funcVarRegex = /\b([a-zA-Z][a-zA-Z0-9_-]*)\s*=/g;
      let funcMatch = funcVarRegex.exec(text);
      while (funcMatch !== null) {
        const startChar = funcMatch.index;
        const length = funcMatch[1].length;
        builder.push(
          lineIndex,
          startChar,
          length,
          this.tokenTypes.indexOf(NixTokenTypes.Function),
        );
        funcMatch = funcVarRegex.exec(text);
      }

      // Keywords
      const keywordRegex = /\b(with|let|in|inherit|rec|if|then|else)\b/g;
      let keywordMatch = keywordRegex.exec(text);
      while (keywordMatch !== null) {
        const startChar = keywordMatch.index;
        const length = keywordMatch[0].length;
        builder.push(
          lineIndex,
          startChar,
          length,
          this.tokenTypes.indexOf(NixTokenTypes.Keyword),
        );
        keywordMatch = keywordRegex.exec(text);
      }

      // Numbers
      const numberRegex = /\b\d+\b/g;
      let numMatch = numberRegex.exec(text);
      while (numMatch !== null) {
        const startChar = numMatch.index;
        const length = numMatch[0].length;
        builder.push(
          lineIndex,
          startChar,
          length,
          this.tokenTypes.indexOf(NixTokenTypes.Number),
        );
        numMatch = numberRegex.exec(text);
      }
    }

    return builder.build();
  }

  getLegend(): vscode.SemanticTokensLegend {
    return this.legend;
  }
}
