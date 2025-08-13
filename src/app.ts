import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';

dotenv.config();

// Websocket:
import { init_websocket } from './utils/websocket.js';

// Rotas:
import { routes } from './routes/routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const server = http.createServer(app);
init_websocket(server);

export { server };
