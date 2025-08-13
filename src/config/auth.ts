const is_production_env = process.env.NODE_ENV === 'production';

import dotenv from 'dotenv';
dotenv.config();

export const auth_config = {
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expires_in: '7d',
    utilities: {
      login: 'login'
    }
  }
};
