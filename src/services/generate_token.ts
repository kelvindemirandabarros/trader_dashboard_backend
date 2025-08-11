import jwt, { SignOptions } from 'jsonwebtoken';

// Consts:
import { auth_config } from '../config/auth';

import type { Token } from '../../types/Session';

interface GenerateAccessTokenInterface {
  user_id: string;
  expires_in?: SignOptions['expiresIn'];
  use?: 'login' | 'password_reset' | 'refresh_token';
}

/**
 *
 * @param user_id
 * @param expires_in
 * @param use é a usabilidade do token.
 * @returns
 */
export function generate_access_token({
  user_id,
  expires_in,
  use
}: GenerateAccessTokenInterface): Token {
  const token_secret = auth_config.jwt.secret;

  const token = jwt.sign(
    { user_id: user_id, use: use ? use : 'login' },

    token_secret,

    expires_in
      ? { expiresIn: expires_in }
      : {
          // expiresIn: auth_config.jwt.expires_in
        }
  );

  return { token: token };
}
