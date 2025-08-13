import { Router, Request, Response, NextFunction } from 'express';

// Routes:
import { home_router } from './home.routes.js';
import { session_router } from './session.routes.js';
import { event_router } from './event.routes.js';

// Utils:
import { show_time } from '../utils/time';

const routes = Router();

// Middleware for debugging:
routes.use((request: Request, response: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`----------------------------------`);
    console.log('Middleware para debugs.');
    console.log(`Requisição feita em: ${show_time()}`);

    const method = request.method;
    const route_address = request.originalUrl;
    console.log(`Rota: ${method} - ${route_address}`);
    console.log(`----------------------------------`);

    // console.log('Request:');
    // console.log(request);
    // console.log(request.ip);
  }

  next();
});

routes.use(home_router);
routes.use(session_router);
routes.use(event_router);

export { routes };
