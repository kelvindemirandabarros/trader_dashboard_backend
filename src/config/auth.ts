const is_production_env = process.env.NODE_ENV === 'production';

import dotenv from 'dotenv';
dotenv.config({ path: is_production_env ? '.env' : '.env.test' });

export const auth_config = {
  jwt: {
    secret: process.env.TOKEN_SECRET as string,
    expires_in: '7d',
    utilities: {
      login: 'login'
    }
  }
};
