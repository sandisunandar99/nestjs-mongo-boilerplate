declare const module: any;

import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppConfig } from './config/app.config';
import { DatabaseConfig } from './config/database.config';
import { OpenApiConfig } from './config/open-api.config';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger/dist';


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
  const openApiConfig = configService.get<OpenApiConfig>('open-api');

  //Application config
  app.enableCors();
  app.setGlobalPrefix(appConfig.globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  //hot reload
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  // setup Document Open-API using swager
  const config = new DocumentBuilder()
    .setTitle(openApiConfig.title)
    .setDescription(openApiConfig.description)
    .setVersion(openApiConfig.version)
    .setContact(openApiConfig.author.name, openApiConfig.author.url, openApiConfig.author.email)
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [],
  });

  const options: SwaggerCustomOptions = {
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  };

  SwaggerModule.setup(`${appConfig.globalPrefix}`, app, document, options);

  
  // check running server and database
  const server = await app.listen(appConfig.http.port, appConfig.http.host);
  if (appConfig.env === 'production') {
    server.setTimeout(appConfig.timeout);
  }

  logger.debug(`Server environtment ${appConfig.env}`);
  logger.log(`Database running on ${dbConfig.host}/${dbConfig.name}`);
  Logger.log(`Server running on ${await app.getUrl()}`);
}
bootstrap();