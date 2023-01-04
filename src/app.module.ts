import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config/dist';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import configs from './config/index'
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database/database.service';

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
    // DatabaseModule,
    MongooseModule.forRootAsync({
      inject: [DatabaseService],
      imports: [DatabaseModule],
      useFactory: (databaseService: DatabaseService) => databaseService.createMongooseOptions(),
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
