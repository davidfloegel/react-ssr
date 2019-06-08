const path = require('path');

// export alias definition used by both webpack.config.babel.js, babel.config.js and tslint.json
const alias = {
  app: './src/app',
  pages: './src/app/pages',
  components: './src/app/components',
  lib: './src/app/lib',
  typings: './src/app/typings',
  uikit: './src/app/uikit',
  utils: './src/app/utils'
};

module.exports = {
  alias
};
