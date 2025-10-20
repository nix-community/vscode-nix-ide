/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import * as tm from "tmlanguage-generator";

export const bounded = (text: string) => `\\b${text}\\b`;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const after = (regex: string) => `(?<=${regex})`;
export const notAfter = (regex: string) => `(?<!${regex})`;
export const before = (regex: string) => `(?=${regex})`;
export const notBefore = (regex: string) => `(?!${regex})`;

function isGrammar(obj: any): obj is tm.Grammar {
  return obj && typeof obj === "object" && "$schema" in obj;
}

type Grammar = Map<string, any> | tm.Grammar;

export async function toJson(outputFile: string, grammar: Grammar) {
  try {
    // Convert the grammar object to a formatted JSON string (2-space indentation)
    const jsonString = isGrammar(grammar)
      ? await tm.emitJSON(grammar)
      : JSON.stringify(grammar, null, 2);
    // Use Bun.write to save the string to a file
    await Bun.write(outputFile, jsonString);
  } catch (error) {
    console.error("❌ Error converting or writing file:", error);
  }
  console.log(`✅ Success! Object successfully saved to ${outputFile}`);
}
