const HtmlWebpackPlugin = require("html-webpack-plugin")
const Path = require("path")
module.exports = {
  target: "web",
  mode: "production",
  entry: "./src-client/index.js",
  output: {
      libraryTarget: "var",
      library: "App"
  },
  plugins: [
      new HtmlWebpackPlugin({
          title: "Main Page",
          template: Path.resolve("./templates/index.html")
      })
  ]
}