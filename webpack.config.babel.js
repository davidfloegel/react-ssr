import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import LoadablePlugin from '@loadable/webpack-plugin';

import { alias } from './shared.config';

const DIST_PATH = path.resolve(__dirname, 'public/dist');
const production = process.env.NODE_ENV === 'production';
const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const getConfig = target => {
  const mainEntry = `./src/client/${
    target === 'web' ? 'index.js' : 'main-node.js'
  }`;

  let entry = [mainEntry];

  let plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new LoadablePlugin()
  ];

  if (target === 'web') {
    entry = [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?name=web',
      mainEntry
    ];
  }

  return {
    name: target,
    mode: development ? 'development' : 'production',
    target,
    entry,
    module: {
      rules: [
        // TODO looks like babel-loader isn't needed anymore as everything is handled by typescript itself
        // {
        //   test: /\.(js|jsx)?$/,
        //   exclude: /node_modules/,
        //   use: {
        //     loader: 'babel-loader',
        //     options: {
        //       caller: { target }
        //     }
        //   }
        // },
        {
          test: /\.(js|ts|tsx)?$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
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
      extensions: ['.ts', '.tsx', '.js', '.json'],
      alias
    },
    plugins
  };
};

export default [getConfig('web'), getConfig('node')];
