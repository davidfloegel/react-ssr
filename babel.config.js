const loadableBabelPlugin = require('@loadable/babel-plugin')

function isWebTarget(caller) {
  return Boolean(caller && caller.target === 'web')
}

function isWebpack(caller) {
  return Boolean(caller && caller.name === 'babel-loader')
}

module.exports = api => {
  const web = api.caller(isWebTarget)
  const webpack = api.caller(isWebpack)

  const presets = [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        useBuiltIns: web ? 'entry' : undefined,
        targets: !web ? { node: 'current' } : undefined,
        modules: webpack ? false : 'commonjs',
      },
    ],
  ]

  const plugins = [
      "babel-plugin-styled-components",
      '@babel/plugin-syntax-dynamic-import',
      loadableBabelPlugin,
  ]

    if (!webpack) {
      plugins.push('dynamic-import-node')
    }

  return {
    presets, plugins
  }
}
