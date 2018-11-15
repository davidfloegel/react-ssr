const path = require('path');

// export alias definition used by both webpack and babel.config.js
const alias = {
  app: path.join(__dirname, 'src/app')
};

module.exports = {
  alias
};
