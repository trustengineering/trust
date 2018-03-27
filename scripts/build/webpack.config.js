const path = require('path');

const lambdaName = 'messenger';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

module.exports = {
  entry: `./core/src/index.js`,
  target: 'node',
  output: {
    filename: `index.js`,
    path: path.resolve(__dirname, '..', '..', `./core/`),
    library: "Core",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
