import { Router } from 'express';

// Rotas:
import { event_create_route } from '../controllers/event/create';
import { events_get_route } from '../controllers/event/get';
import { event_summary_get_route } from '../controllers/event/summary/get';

const event_router = Router();

// Evento:
event_router.use(events_get_route);
event_router.use(event_create_route);
// Sumário de evento:
event_router.use(event_summary_get_route);

export { event_router };
