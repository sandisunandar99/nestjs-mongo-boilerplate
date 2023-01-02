import { registerAs } from "@nestjs/config"


interface HttpConfig {
    host: string,
    port: number
}

export interface AppConfig {
    env: string,
    name: string,
    globalPrefix: string,
    timeout: number,
    language: string,
    http: HttpConfig,
    timezone: string,
    locale: string,
    debug: boolean
}


export default registerAs(
  'app',
  (): AppConfig => ({
    name: process.env.APP_NAME || 'nest-mongo-boilerplate',
    env: process.env.APP_ENV || 'development',
    globalPrefix: process.env.APP_GLOBAL_PREFIX || 'api/v1',
    timeout: parseInt(process.env.APP_TIMEOUT) || 5000,
    language: process.env.APP_LANGUAGE || 'id',
    http: {
      host: process.env.APP_HOST || 'localhost',
      port: parseInt(process.env.APP_PORT) || 3000,
    },
    timezone: process.env.APP_TZ || 'Asia/Jakarta',
    locale: process.env.APP_LOCALE || 'id-ID',
    debug: process.env.DEBUG === 'true' || false,
  }),
);