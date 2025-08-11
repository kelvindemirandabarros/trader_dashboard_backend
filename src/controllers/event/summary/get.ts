import { Request, Response, Router } from 'express';

// Models:
import { EventModel } from '../../../models/event.model.js';

// Middlewares:
import { auth_middleware } from '../../../middlewares/auth.middleware.js';

const event_summary_get_route = Router();

event_summary_get_route.get(
  '/events/summary',

  auth_middleware,

  async function (request: Request, response: Response): Promise<Response> {
    try {
      const total_by_type = await EventModel.aggregate([
        {
          $group: {
            _id: '$type',
            total: { $sum: 1 },
            total_value: { $sum: '$value' }
          }
        }
      ]);

      return response.json({ total_by_type: total_by_type });
    } catch (error: unknown) {
      return response.status(500).json({
        message: 'Não foi possível pegar o sumário dos eventos.',
        error: JSON.stringify(error)
      });
    }
  }
);

export { event_summary_get_route };
