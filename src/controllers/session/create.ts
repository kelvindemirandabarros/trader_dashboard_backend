import { Request, Response, Router } from 'express';
import { compare } from 'bcryptjs';
import { z as zod } from 'zod';

// Models:
import { UserModel } from '../../models/user.model.js';

// Utils:
import { generate_access_token } from '../../services/generate_token.js';

// Consts:
import { error_messages } from '../../errors/Messages.js';

async function session_create(request: Request, response: Response) {
  const session_schema = zod.object({
    email: zod.string().email().nonempty('Email é obrigatório'),
    password: zod
      .string()
      .min(6, 'Senha mínima 6 caracteres')
      .max(12)
      .nonempty('Senha é obrigatória')
  });

  const parsed = session_schema.safeParse(request.body);
  if (!parsed.success) {
    return response.status(400).json({
      message: error_messages.session.invalid_data,
      errors: parsed.error.issues
    });
  }

  const { email, password } = parsed.data;

  try {
    const email_lowercase = email.toLowerCase();

    const user = await UserModel.findOne({ email: email_lowercase }).exec();

    if (!user) {
      return response.status(400).json({
        message: error_messages.session.wrong_email_or_password
      });
    }

    const password_matched = await compare(password, user.password as string);

    if (!password_matched) {
      return response.status(400).json({
        message: error_messages.session.wrong_email_or_password
      });
    }

    const { token } = generate_access_token({
      user_id: String(user._id),
      use: 'login'
      // expires_in: '1m'
    });

    return response.status(201).json({
      user: {
        _id: user._id,
        full_name: user.full_name,
        email: user.email,
        token: token
      }
    });
  } catch (error) {
    console.log('Erro ao tentar fazer login:');
    console.error(error);

    return response.status(500).json({
      message: error_messages.session.unknown_reason_connection_failed,
      error: JSON.stringify(error)
    });
  }
}

const session_create_route = Router();

session_create_route.post(
  '/api/session',

  session_create
);

export { session_create_route };
