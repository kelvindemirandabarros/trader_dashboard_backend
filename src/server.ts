import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';

// Database:
import { connect_db } from './config/db.js';

// Routes:
import { home_route } from './routes/home.routes.js';
import { event_router } from './routes/event.routes.js';
import { session_router } from './routes/session.routes.js';

// Websocket:
import { init_websocket } from './utils/websocket.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
init_websocket(server);

app.use(cors());
app.use(express.json());

app.use(home_route);
app.use('/api', event_router);
app.use(session_router);

connect_db().then(() => {
  server.listen(process.env.PORT || 3000, () => {
    console.log(`[Server] Rodando na porta ${process.env.PORT || 3000}`);
  });
});
