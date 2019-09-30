const path = require('path');

module.exports = {
  entry: './scripts/diff.js',
  output: {
    filename: 'webpack-bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
