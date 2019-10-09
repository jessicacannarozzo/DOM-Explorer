// what's this 'require' for? do I need to require my node module here?
const path = require('path');

module.exports = {
  entry: {
    content: "./scripts/content.js",
  },
  output: {
    filename: 'webpack-bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
