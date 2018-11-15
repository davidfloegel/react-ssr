import path from 'path';
import nodeExternals from 'webpack-node-externals';
import LoadablePlugin from '@loadable/webpack-plugin';

import { alias } from './shared.config';

const DIST_PATH = path.resolve(__dirname, 'public/dist');
const production = process.env.NODE_ENV === 'production';
const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const getConfig = target => ({
  name: target,
  mode: development ? 'development' : 'production',
  target,
  entry: `./src/client/${target === 'web' ? 'index.js' : 'main-node.js'}`,
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            caller: { target }
          }
        }
      }
    ]
  },
  externals:
    target === 'node' ? ['@loadable/component', nodeExternals()] : undefined,
  output: {
    path: path.join(DIST_PATH, target),
    filename: production ? '[name]-bundle-[chunkhash:8].js' : '[name].js',
    publicPath: `/dist/${target}/`,
    libraryTarget: target === 'node' ? 'commonjs2' : undefined
  },
  resolve: {
    modules: ['./src', 'node_modules'],
    alias
  },
  plugins: [new LoadablePlugin()]
});

export default [getConfig('web'), getConfig('node')];
