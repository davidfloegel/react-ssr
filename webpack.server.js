const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals')
const LoadablePlugin = require('@loadable/webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/server.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    libraryTarget: 'commonjs2',
    filename: 'server.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    proxy: {
      '/': 'http://localhost:3000'
    }
  },
  node: {
    __dirname: false,
    __filename: false
  },
  target: 'node',
  externals: [nodeExternals()],
  plugins: [new LoadablePlugin()],
};
