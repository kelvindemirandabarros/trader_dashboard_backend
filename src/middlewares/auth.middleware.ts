import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Interface para tipar o payload do JWT
interface JwtPayload {
  userId: string;
}

export function auth_middleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const auth_header = request.headers.authorization;

    if (!auth_header || !auth_header.startsWith('Bearer ')) {
      response.status(401).json({ error: 'Token não fornecido' });
      return;
    }

    const token = auth_header.split(' ')[1];

    const secret_key = process.env.JWT_SECRET as string;

    if (!secret_key) {
      throw new Error('JWT_SECRET não configurado no ambiente');
    }

    const decoded = jwt.verify(token, secret_key) as JwtPayload;

    // Injeta os dados do usuário no request
    (request as any).user = decoded;

    // Passa para o próximo middleware ou rota
    next();
  } catch (error: unknown) {
    return response.status(401).json({ error: 'Token inválido ou expirado' });
  }
}
