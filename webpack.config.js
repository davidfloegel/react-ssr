const LoadablePlugin = require('@loadable/webpack-plugin')

module.exports = {
  mode: 'development',
  entry: `${__dirname}/src/client.js`,
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [new LoadablePlugin()],
}
