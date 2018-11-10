const webpack = require('webpack');
const LoadablePlugin = require('@loadable/webpack-plugin')

module.exports = {
  entry: './src/client.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new LoadablePlugin()
  ],
  devServer: {
    contentBase: './dist',
    port: 3001,
    hot: true
  }
};
