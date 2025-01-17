const { defineConfig } = require('@vscode/test-cli');

module.exports = defineConfig({ files: 'out/src/**/*.test.ts', mocha: { ui: 'bdd' } });
