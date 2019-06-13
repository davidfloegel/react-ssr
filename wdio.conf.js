exports.config = {
  runner: 'local',

  /**
   * server configurations
   */
  hostname: 'localhost',
  port: 4444,

  /**
   * specify test files
   */
  specs: ['./bdd/features/**/*.feature'],

  /**
   * capabilities
   */
  capabilities: [
    {
      maxInstances: 5,
      //
      browserName: 'chrome',
      // chromeOptions: {
      //   args: ['--headless --disable-extensions'],
      // },
    },
  ],
  sync: true,
  services: ['selenium-standalone'],

  /**
   * test configurations
   */
  logLevel: 'debug',
  framework: 'cucumber',

  reporters: ['dot'],

  cucumberOpts: {
    strict: true,
    backtrace: false,
    compiler: ['js:babel-register'],
    failAmbiguousDefinitions: true,
    failFast: true,
    require: ['./bdd/step_definitions/**/*.js'],
  },

  before: function before() {
    /**
     * Setup the Chai assertion framework
     */
    const chai = require('chai');

    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should();
  },
};
