const Webpack = require("webpack");
const path = require("path");
const package = require("./package.json");

module.exports = {
  entry: {
    StormDB: "./src/stormdb.js",
    BrowserEngine: "./src/engine/browser.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].min.js",
    library: "[name]"
  },
  plugins: [new Webpack.BannerPlugin(`StormDB ${package.version}`)]
};
