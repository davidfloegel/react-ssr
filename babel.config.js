// const loadableBabelPlugin = require('@loadable/babel-plugin');
const sharedConf = require('./shared.config');

function isWebTarget(caller) {
  return Boolean(caller && caller.target === 'web');
}

function isWebpack(caller) {
  return Boolean(caller && caller.name === 'babel-loader');
}

module.exports = api => {
  const web = api.caller(isWebTarget);
  const webpack = api.caller(isWebpack);

  const presets = [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        useBuiltIns: web ? 'entry' : false,
        targets: !web ? { node: 'current' } : undefined,
        modules: webpack ? false : 'commonjs'
      }
    ]
  ];

  const plugins = [
    'babel-plugin-styled-components',
    '@babel/plugin-syntax-dynamic-import',
    '@loadable/babel-plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: sharedConf.alias
      }
    ]
  ];

  if (!webpack) {
    plugins.push('dynamic-import-node');
  }

  return {
    presets,
    plugins
  };
};
