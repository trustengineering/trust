const path = require('path');

const lambdaName = 'messenger';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

module.exports = {
  entry: `./${lambdaName}/handler.js`,
  target: 'node',
  output: {
    filename: `${lambdaName}.js`,
    path: path.resolve(__dirname, `${lambdaName}/dist`)
  }
};
