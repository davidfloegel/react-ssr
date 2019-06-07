const path = require('path');

// export alias definition used by both webpack and babel.config.js
const alias = {
  app: path.join(__dirname, 'src/app'),
  pages: path.join(__dirname, 'src/app/pages'),
  components: path.join(__dirname, 'src/app/components'),
  lib: path.join(__dirname, 'src/app/lib'),
  typings: path.join(__dirname, 'src/app/typings'),
  uikit: path.join(__dirname, 'src/app/uikit'),
  util: path.join(__dirname, 'src/app/util')
};

module.exports = {
  alias
};
