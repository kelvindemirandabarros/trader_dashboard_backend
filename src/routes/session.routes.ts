import { Router } from 'express';

// Rotas:
import { session_create_route } from '../controllers/session/create.js';

const session_router = Router();

// Evento:
session_router.use(session_create_route);

export { session_router };
