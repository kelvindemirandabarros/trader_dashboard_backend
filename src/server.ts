import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { connect_db } from './config/db';
import { event_router } from './routes/event.routes';
import { init_websocket } from './utils/websocket';

dotenv.config();

const app = express();
const server = http.createServer(app);
init_websocket(server);

app.use(cors());
app.use(express.json());

app.use('/api', event_router);

connect_db().then(() => {
  server.listen(process.env.PORT || 3000, () => {
    console.log(`[Server] Rodando na porta ${process.env.PORT || 3000}`);
  });
});
