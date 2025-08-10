import { Request, Response, Router } from 'express';
import { z as zod } from 'zod';

// Models:
import { EventModel } from '../../models/event.model';

// Utils:
import { io } from '../../utils/websocket';

const event_schema = zod.object({
  userId: zod.string(),
  type: zod.string(),
  value: zod.number(),
  timestamp: zod.string().optional(),
  metadata: zod.record(zod.any()).optional()
});

const event_create_route = Router();

event_create_route.post(
  '/webhook/event',

  // MIDDLEWARE PARA CHEGAR ORIGEM DA REQUISIÇÃO AO WEBHOOK...

  async function (request: Request, response: Response): Promise<Response> {
    try {
      const data = event_schema.parse(request.body);

      const event = await EventModel.create(data);

      io.emit('new_event', event);

      return response
        .status(201)
        .json({ message: 'Evento criado com sucesso.', event: event });
    } catch (error: unknown) {
      console.error();
      return response.status(400).json({ message: 'Não foi possível ' });
    }
  }
);

export { event_create_route };
