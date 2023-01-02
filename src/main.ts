declare const module: any;

import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppConfig } from './config/app.config';
import { DatabaseConfig } from './config/database.config';


async function bootstrap() {
  //logger
  const context = 'NestApp';
  const logger = new Logger(context);
  
  //load Application 
  const app = await NestFactory.create(AppModule);
  
  // configuration file
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');
  const dbConfig = configService.get<DatabaseConfig>('database');

  //Application config
  app.enableCors();
  app.setGlobalPrefix(appConfig.globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    }),
  );
  setupOpenAPI(app);
  
  //hot reload 
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  // check running server and database 
  const server = await app.listen(appConfig.http.port, appConfig.http.host)
  if (appConfig.env === 'production') {
    server.setTimeout(appConfig.timeout);
  }

  logger.debug(`Server environtment ${appConfig.env}`);
  logger.log(`Database running on ${dbConfig.host}/${dbConfig.name}`);
  Logger.log(`Server running on ${await app.getUrl()}`);  

}
bootstrap();


const setupOpenAPI = (app: NestApplication) => {

};