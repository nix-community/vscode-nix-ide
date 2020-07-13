const path = require("path");

function resolve(relativePath) {
  return path.join(__dirname, relativePath);
}

module.exports = {
  entry: resolve("src/nix-ext.fsproj"),
  outDir: resolve("dist"),
  allFiles: true,
};
