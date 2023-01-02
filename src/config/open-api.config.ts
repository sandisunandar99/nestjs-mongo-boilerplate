import { registerAs } from "@nestjs/config"

export interface OpenApiConfig {
    title: string,
    description: string,
    version: string,
    author: string
}

export default registerAs(
    'open-api',
    (): OpenApiConfig => ({
        title: 'NestJs Mongo Boilerplate',
        description: 'RestAPI using Nest JS and Database Mongo DB for Backend Only :)',
        version: '1.0.0.0',
        author: 'sandi sunandar (sandisunandar99@gmail.com) '
    })
)