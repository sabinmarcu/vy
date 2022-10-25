const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new webpack.EnvironmentPlugin(['DEV']),
  new webpack.DefinePlugin({
    'process.platform': JSON.stringify(process.platform),
  }),
];
