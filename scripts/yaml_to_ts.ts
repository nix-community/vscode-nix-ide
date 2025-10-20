#!/usr/bin/env bun
/**
 * YAML Grammar to TypeScript/JSON Converter
 * Converts TextMate grammar files from YAML to TypeScript or JSON format
 *
 * Usage:
 *   bun run convert-grammar.ts <input.yaml> [output.ts|output.json]
 */

import { readFileSync, writeFileSync } from "fs";
import { parse as parseYAML } from "yaml";
import { basename, extname } from "path";

interface GrammarPattern {
  name?: string;
  match?: string;
  begin?: string;
  end?: string;
  beginCaptures?: Record<string, { name: string }>;
  endCaptures?: Record<string, { name: string }>;
  captures?: Record<string, { name: string }>;
  patterns?: GrammarPattern[];
  include?: string;
  contentName?: string;
}

interface Grammar {
  name: string;
  scopeName: string;
  fileTypes?: string[];
  uuid?: string;
  patterns: GrammarPattern[];
  repository?: Record<string, { patterns?: GrammarPattern[] } | GrammarPattern>;
}

function escapeString(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t");
}

function formatValue(value: any, indent: number = 0): string {
  const spaces = "  ".repeat(indent);
  const nextSpaces = "  ".repeat(indent + 1);

  if (value === null || value === undefined) {
    return "null";
  }

  if (typeof value === "string") {
    return `"${escapeString(value)}"`;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value.map((item) => formatValue(item, indent + 1)).join(",\n" + nextSpaces);
    return `[\n${nextSpaces}${items}\n${spaces}]`;
  }

  if (typeof value === "object") {
    const entries = Object.entries(value);
    if (entries.length === 0) return "{}";

    const props = entries
      .map(([key, val]) => {
        const formattedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
        return `${formattedKey}: ${formatValue(val, indent + 1)}`;
      })
      .join(",\n" + nextSpaces);

    return `{\n${nextSpaces}${props}\n${spaces}}`;
  }

  return String(value);
}

function convertToTypeScript(grammar: Grammar, varName: string = "grammar"): string {
  const formatted = formatValue(grammar, 0);

  return `// Auto-generated TextMate grammar
// Source: ${grammar.name} Grammar
// Generated: ${new Date().toISOString()}

import type { IGrammar } from 'vscode-textmate';

export const ${varName}: IGrammar = ${formatted};

export default ${varName};
`;
}

function convertToJSON(grammar: Grammar): string {
  return JSON.stringify(grammar, null, 2);
}

function main(args:string[]) {
  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    console.log(`
Usage: bun run convert-grammar.ts <input.yaml> [output.ts|output.json]

Options:
  input.yaml          YAML grammar file to convert
  output.ts|.json     Output file (optional, defaults to .ts)
  --help, -h          Show this help message

Examples:
  bun run convert-grammar.ts nix.yaml
  bun run convert-grammar.ts nix.yaml nix.grammar.ts
  bun run convert-grammar.ts nix.yaml nix.tmLanguage.json
    `);
    process.exit(0);
  }

  const inputFile = args[0];
  let outputFile = args[1];

  // Determine output file if not specified
  if (!outputFile) {
    const base = basename(inputFile, extname(inputFile));
    outputFile = `${base}.grammar.ts`;
  }

  const outputExt = extname(outputFile).toLowerCase();
  const isTypeScript = outputExt === ".ts";
  const isJSON = outputExt === ".json";

  if (!isTypeScript && !isJSON) {
    console.error("Error: Output file must have .ts or .json extension");
    process.exit(1);
  }

  try {
    // Read and parse YAML
    console.log(`Reading ${inputFile}...`);
    const yamlContent = readFileSync(inputFile, "utf-8");

    // Remove YAML front matter if present
    const cleanYAML = yamlContent.replace(/^---\n/, "");

    console.log(`Parsing YAML grammar...`);
    const grammar = parseYAML(cleanYAML) as Grammar;

    // Validate grammar
    if (!grammar.name || !grammar.scopeName) {
      console.error("Error: Invalid grammar file. Missing 'name' or 'scopeName'");
      process.exit(1);
    }

    console.log(`Converting to ${isTypeScript ? "TypeScript" : "JSON"}...`);

    let output: string;
    if (isTypeScript) {
      const varName = grammar.scopeName.replace(/[.-]/g, "_");
      output = convertToTypeScript(grammar, varName);
    } else {
      output = convertToJSON(grammar);
    }

    // Write output
    writeFileSync(outputFile, output, "utf-8");

    console.log(`✓ Successfully converted to ${outputFile}`);
    console.log(`
Grammar Info:
  Name: ${grammar.name}
  Scope: ${grammar.scopeName}
  File Types: ${grammar.fileTypes?.join(", ") || "none"}
  Patterns: ${grammar.patterns?.length || 0}
  Repository Items: ${grammar.repository ? Object.keys(grammar.repository).length : 0}
    `);

  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error("Unknown error occurred");
    }
    process.exit(1);
  }
}

// main(process.argv.slice(2))
main(["syntaxes/nix.YAML-tmLanguage", "syntaxes/nix.grammar.ts"]);
