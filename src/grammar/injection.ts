// Define the regex patterns as constants for better maintainability
const LINE_START = String.raw`(^|\G)`; // Start of line or continuation
const INDENT = String.raw`(\s*)`; // Capture whitespace
const FENCE_CHARS = String.raw`(\`{3,}|~{3,})`; // Backticks or tildes
const NIX_LANG = String.raw`(?i:(nix)(\s+[^${"`"}~]*)?$)`; // Language identifier

// Compose the patterns using the building blocks
const BEGIN_FENCE = `${LINE_START}${INDENT}${FENCE_CHARS}\\s*${NIX_LANG}`;
const END_FENCE = `${LINE_START}(\\2|\\s{0,3})(\\3)\\s*$`; // Match indent and fence from begin
const BEGIN_CONTENT = `${LINE_START}${INDENT}(.*)`;
const WHILE_CONTENT = `${LINE_START}(?!\\s*([\`~]{3,})\\s*$)`;

const nixCodeBlock = {
  begin: BEGIN_FENCE,
  name: "markup.fenced_code.block.markdown",
  end: END_FENCE,
  beginCaptures: {
    "3": {
      name: "punctuation.definition.markdown",
    },
    "5": {
      name: "fenced_code.block.language",
    },
    "6": {
      name: "fenced_code.block.language.attributes",
    },
  },
  endCaptures: {
    "3": {
      name: "punctuation.definition.markdown",
    },
  },
  patterns: [
    {
      begin: BEGIN_CONTENT,
      while: WHILE_CONTENT,
      contentName: "meta.embedded.block.nix",
      patterns: [
        {
          include: "source.nix",
        },
      ],
    },
  ],
};

export const nixInjectionGrammar = {
  fileTypes: [],
  injectionSelector: "L:text.html.markdown",
  patterns: [
    {
      include: "#nix-code-block",
    },
  ],
  repository: {
    "nix-code-block": nixCodeBlock,
  },
  scopeName: "markdown.nix.codeblock",
};
