import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config/dist';
import { DatabaseModule } from './database/database.module';
import configs from './config/index'

@Module({
  imports: [
    // env variable config
    ConfigModule.forRoot({
      load: configs,
      cache: true,
      isGlobal: true,
      ignoreEnvFile: false,
      envFilePath:['.env']
    }),
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
