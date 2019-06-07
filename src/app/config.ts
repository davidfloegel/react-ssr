// import { Config } from 'typings/config';

const env = process.env.NODE_ENV || 'development';

interface IConfig {
  appEnv: string;
  port: number;

  isDev: boolean;
  isStaging: boolean;
  isProd: boolean;
}

const config: IConfig = {
  appEnv: env,
  port: Number(process.env.PORT || 3030),

  // environments
  isDev: env === 'development',
  isStaging: env === 'staging',
  isProd: env === 'production'

  // you can do more configurations here
};

export default config;
