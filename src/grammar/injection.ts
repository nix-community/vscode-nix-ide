const nixInjectionGrammar = {
  fileTypes: [],
  injectionSelector: "L:text.html.markdown",
  patterns: [
    {
      include: "#nix-code-block",
    },
  ],
  repository: {
    "nix-code-block": {
      begin: "(^|\\G)(\\s*)(\\`{3,}|~{3,})\\s*(?i:(nix)(\\s+[^`~]*)?$)",
      name: "markup.fenced_code.block.markdown",
      end: "(^|\\G)(\\2|\\s{0,3})(\\3)\\s*$",
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
          begin: "(^|\\G)(\\s*)(.*)",
          while: "(^|\\G)(?!\\s*([`~]{3,})\\s*$)",
          contentName: "meta.embedded.block.nix",
          patterns: [
            {
              include: "source.nix",
            },
          ],
        },
      ],
    },
  },
  scopeName: "markdown.nix.codeblock",
};

async function toJson() {
  const outputFile = "dist/injection.json";
  try {
    // Convert the object to a formatted JSON string (2-space indentation)
    const jsonString = JSON.stringify(nixInjectionGrammar, null, 2);

    // Use Bun.write to save the string to a file
    await Bun.write(outputFile, jsonString);
  } catch (error) {
    console.error("❌ Error converting or writing file:", error);
  }
  console.log(`✅ Success! Object successfully saved to ${outputFile}`);
}

if (import.meta.main) {
  // This code only runs when 'bun run index.ts' is executed directly.
  toJson();
}
