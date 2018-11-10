const path = require('path')
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals')
const LoadablePlugin = require('@loadable/webpack-plugin')

const DIST_PATH = path.resolve(__dirname, 'public/dist')
const production = process.env.NODE_ENV === 'production'

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
    path: path.join(DIST_PATH, 'node'),
    publicPath: '/dist/node',
    libraryTarget: 'commonjs2',
    filename: production ? '[name]-bundle-[chunkhash:8].js' : '[name].js',
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
