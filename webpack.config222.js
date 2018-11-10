const path = require('path')
const LoadablePlugin = require('@loadable/webpack-plugin')

const DIST_PATH = path.resolve(__dirname, 'public/dist')
const production = process.env.NODE_ENV === 'production'

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
  output: {
    path: path.join(DIST_PATH, 'web'),
    filename: production ? '[name]-bundle-[chunkhash:8].js' : '[name].js',
    publicPath: `/dist/web`
  },
  plugins: [new LoadablePlugin()],
}
