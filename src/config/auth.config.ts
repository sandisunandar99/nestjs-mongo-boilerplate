import { registerAs } from "@nestjs/config";

export interface AuthConfig {
    jwt : {
        secretKey: string,
        expirationTime: string
    }
}


export default registerAs(
  'auth',
  (): AuthConfig => ({
    jwt: {
      secretKey: process.env.AUTH_JWT_ACCESS_TOKEN_SECRET_KEY || '1234567890',
      expirationTime: process.env.AUTH_JWT_EXPIRATION_TIME || '1h'
    },
  }),
);