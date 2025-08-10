import { Request, Response, Router } from 'express';

// Models:
import { EventModel } from '../../models/event.model';
import { auth_middleware } from '../../middlewares/auth.middleware';

const events_get_route = Router();

events_get_route.get(
  '/events',

  auth_middleware,

  async function (request: Request, response: Response): Promise<Response> {
    try {
      const events = await EventModel.find().sort({ timestamp: -1 }).limit(100);

      return response.json({ events });
    } catch (error: unknown) {
      return response.status(500).json({
        message:
          'Não foi possível pegar os eventos neste momento. Por favor, tente novamente em breve.'
      });
    }
  }
);

export { events_get_route };
