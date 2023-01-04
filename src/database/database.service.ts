import { Injectable } from '@nestjs/common';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import { DatabaseConfig } from '../config/database.config';
import { AppConfig } from '../config/app.config';
import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';


@Injectable()
export class DatabaseService implements MongooseOptionsFactory {
    private readonly config: DatabaseConfig;
    private readonly env: string;
    private readonly host: string;
    private readonly database: string;
    private readonly user: string;
    private readonly password: string;
    private readonly srv: boolean;
    private readonly admin: boolean;
    private readonly ssl: boolean;
    private readonly debug: boolean;
    private readonly option: string;

    constructor( private readonly configService: ConfigService) {
        this.config = this.configService.get<DatabaseConfig>('database');
        this.env = this.configService.get<AppConfig>('app').env;
        this.host = this.config.host;
        this.database = this.config.name;
        this.user = this.config.user;
        this.password = this.config.password;
        this.srv = this.config.srv;
        this.admin = this.config.admin;
        this.ssl = this.config.ssl;
        this.debug = this.config.debug;
        this.option = this.config.option ? `?${this.config.option}` : '';
    }


    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
        const uri = `mongodb${this.srv ? '+srv' : ''}://${this.host}/${this.database}${this.option}`; 

        if (this.env !== 'production' && this.env !== 'testing') {
            mongoose.set('debug', this.debug);
        }

        const mongooseOptions: MongooseModuleOptions = {
          uri,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          // useMongoClient: true
        };

        if (this.admin) {
            mongooseOptions.authSource = 'admin';
        }

        if (this.user && this.password) {
            mongooseOptions.auth = {
                username: this.user,
                password: this.password
            }
        }

        if (this.ssl) {
            mongooseOptions.ssl = true;
        }

        return mongooseOptions;

    } //end mongooseOptions
}//end class
