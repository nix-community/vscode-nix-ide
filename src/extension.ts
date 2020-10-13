import { ExtensionContext } from 'vscode';
import * as client from './client';

/**
 * Activate this extension.
 *
 * Format and validate with {@link https://github.com/nix-community/rnix-lsp|rnix-lsp}
 *
 * @param context The context for this extension
 * @return A promise for the initialization
 */
export async function activate(context: ExtensionContext): Promise<void> {
  await client.activate(context);
}

export async function deactivate(): Promise<void> {
  await client.deactivate();
}
