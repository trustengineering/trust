const path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

module.exports = {
  entry: `./src/index.js`,
  target: 'node',
  output: {
    filename: `index.js`,
    path: path.resolve(__dirname, `./@trust-core/`),
    library: '@trust-core',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
