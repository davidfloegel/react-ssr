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
        corejs: web ? '2.0.0' : undefined,
        targets: !web ? { node: 'current' } : undefined,
        modules: webpack ? false : 'commonjs'
      }
    ],
    '@babel/preset-typescript',
  ];

  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@loadable/babel-plugin',
    'babel-plugin-styled-components',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: sharedConf.alias,
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
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
