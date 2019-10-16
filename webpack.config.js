// what's this 'require' for? do I need to require my node module here?
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {minimize: true}
          }
        ]
      }
    ]
  },
  entry: {
    content: "./scripts/content.js",
  },
  output: {
    filename: 'webpack-bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./views/popup.html",
      filename: "./popup.html"
    })
  ]
};
