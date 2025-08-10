import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

export let io: Server;

export function init_websocket(server: HttpServer): void {
  io = new Server(server, {
    cors: { origin: '*' }
  });
}
