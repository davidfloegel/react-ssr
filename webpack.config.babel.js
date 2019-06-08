import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import LoadablePlugin from '@loadable/webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

import { alias } from './shared.config';

const production = process.env.NODE_ENV === 'production';
const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const DIST_PATH = path.resolve(
  __dirname,
  development ? 'public/dist' : 'build/dist'
);

const getConfig = target => {
  const mainEntry = `./src/client/${
    target === 'web' ? 'index.tsx' : 'main-node.ts'
  }`;

  let entry = [mainEntry];

  let plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new LoadablePlugin()
  ];

  plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        WEB: target === 'web' ? JSON.stringify(true) : JSON.stringify(false)
      }
    }),
    ...plugins
  ];

  if (target === 'web') {
    entry = [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?name=web',
      mainEntry
    ];
  }

  let minimizer = [];
  if (production) {
    minimizer = [
      new TerserPlugin({
        extractComments: 'all',
        parallel: true,
        sourceMap: true
      })
    ];
  }

  return {
    name: target,
    mode: development ? 'development' : 'production',
    target,
    entry,
    module: {
      rules: [
        {
          test: /\.(js|ts)(x?)?$/,
          exclude: /node_modules/,
          use: [{ loader: 'babel-loader', options: { caller: { target } } }]
        }
      ]
    },
    externals:
      target === 'node' ? ['@loadable/component', nodeExternals()] : undefined,
    output: {
      path: path.join(DIST_PATH, target),
      filename: production ? '[name]-bundle-[hash:8].js' : '[name].js',
      publicPath: `/dist/${target}/`,
      libraryTarget: target === 'node' ? 'commonjs2' : undefined
    },
    resolve: {
      modules: ['./src', 'node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias
    },
    plugins,
    optimization: {
      minimizer: [...minimizer, new OptimizeCSSAssetsPlugin({})],
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'initial',
            name: 'vendor',
            test: 'vendor',
            enforce: true
          }
        }
      },
      noEmitOnErrors: true
    }
  };
};

export default [getConfig('web'), getConfig('node')];
