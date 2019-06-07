import Config from 'typings/config';

const env = process.env.NODE_ENV || 'development';

const config: Config = {
  appEnv: env,
  port: process.env.PORT || 3030,

  // environments
  isDev: env === 'development',
  isStaging: env === 'staging',
  isProd: env === 'production'

  // you can do more configurations here
};

export default config;
