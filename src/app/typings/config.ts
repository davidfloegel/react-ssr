export default interface {
  APP_ENV: 'development' | 'staging' | 'production';
  PORT: number;

  isDev: boolean;
  isStaging: boolean;
  isProd: boolean;
}
