import { config } from 'dotenv';

config();

const env = process.env;

export const environments = {
  port: Number(env.PORT || 3000),
  accessTokenSecret: env.JWT_ACCESS_TOKEN_SECRET,
  accessTokenExpiration: env.JWT_ACCESS_TOKEN_EXPIRATION,
  refreshTokenSecret: env.JWT_REFRESH_TOKEN_SECRET,
  refreshTokenExpiration: env.JWT_REFRESH_TOKEN_EXPIRATION,
};
