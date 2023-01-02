import { registerAs } from "@nestjs/config"


export interface Author {
  name: string;
  url: string;
  email: string;
}

export interface OpenApiConfig {
  title: string;
  description: string;
  version: string;
  author: Author;
}


export default registerAs(
  'open-api',
  (): OpenApiConfig => ({
    title: 'NestJs Mongo Boilerplate',
    description: 'RestAPI using Nest JS and Database Mongo DB for Backend Only :)',
    version: '1.0.0.0',
    author: {
      name: 'sandi sunandar',
      url: 'https://github.com/sandisunandar99',
      email: 'sandisunandar99@gmail.com'
    },
  }),
);