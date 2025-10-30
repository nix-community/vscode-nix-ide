/// Generate json files from the grammar definitions.

import * as helpers from "./helpers";
import { nixInjectionGrammar } from "./injection";
import { source_nix } from "./nix";

// This code only runs when 'bun run index.ts' is executed directly.
helpers.toJson("dist/injection.json", nixInjectionGrammar);
helpers.toJson("dist/nix.tmLanguage.json", source_nix);
