# Trader Dashboard - Backend

Backend para o projeto de Dashboard para Trader. Mais detalhes em [`docs/PROJETO.md`](https://github.com/kelvindemirandabarros/trader_dashboard_backend/tree/master/docs/PROJETO.md).

Backend REST em Node.js + TypeScript para um dashboard de monitoramento de traders em tempo real.  
Recebe eventos via webhook, persiste em MongoDB, agrega dados, emite atualizações por WebSocket (Socket.IO) e gera insights via OpenAI.

Hospedado na plataforma Render.
Para ligar o servidor, acesse [AQUI](https://trader-dashboard-backend.onrender.com/) e aguarde até, no máximo, 1 minuto para que a plataforma inicie tudo.

O repositório do frontend está [AQUI](https://github.com/kelvindemirandabarros/trader_dashboard_frontend).

## Login no frontend

email => teste@email.com
senha => teste321

---

## Tecnologias

- Node.js 24.x + TypeScript
- Express.js
- Mongoose (MongoDB; escolhido por falicidade de alterações para se criar MVP)
- Zod (validação)
- JWT (autenticação leve)
- Socket.IO (tempo real)
- OpenAI SDK (insights de eventos)
- Docker + docker-compose (container; ainda não ativado)

---

## Estrutura (resumida)

```
backend/
  Dockerfile (Desativado para ser adicionado em futuro commit)
  docker-compose.yml (Desativado para ser adicionado em futuro commit)
  package.json
  tsconfig.json
  .env.example
  src/
    server.ts
    config/db.ts
    models/
    routes/
    controllers/
    services/
    middlewares/
    utils/
    scripts/seed.ts
```

---

## Variáveis de ambiente (`.env`)

Crie `.env` a partir de `.env.example`:

```
PORT=3000
# MONGO_URI=mongodb://mongo:27017/trader_dashboard_dev # Para Docker.
MONGO_URI=mongodb://127.0.0.1:27017/trader_dashboard_dev # Para MongoDB instalado na máquina.
JWT_SECRET=supersecret
OPENAI_API_KEY=openai_api_key
```

---

## Como iniciar (opções)

### A — Localmente (sem Docker)

Pré-requisitos:

- Node.js 24.5.0 (escolha sua forma favorita de baixar em [Node.js](https://nodejs.org/en/download/current))

1. Instalar dependências:

```bash
npm install
```

2. Rodar em dev (ex.: tsx):

```bash
npm run dev
```

3. Build e start:

```bash
npm run build
npm start
```

3.1. Para apagar a pasta dist e criar uma build do zero, use:

```bash
npm run build:clean
```

---

### B — Com Docker (em futuro commit) (recomendado no Windows 10)

Pré-requisitos: Docker Desktop + WSL2.

1. Na raiz do _backend_:

```bash
docker compose up --build
```

2. API disponível em `http://localhost:3000/api`.

Para rodar em background:

```bash
docker compose up -d --build
```

Parar e remover:

```bash
docker compose down
```

---

### C — Rodando seed de dados

Gera eventos sintéticos:

```bash
npm run seed
```

(Se rodando via Docker: execute dentro do container backend com `docker exec`.)

---

## Endpoints principais (prefixo `/api`)

- `POST /api/webhook/event` — receber evento via webhook (público)
- `POST /api/auth/register` — cadastrar usuário (opcional)
- `POST /api/auth/login` — obter JWT
- `GET  /api/events` — listar eventos (protegido)
- `GET  /api/events/summary` — agregações/insights (protegido)

---

## Exemplos de requests (curl)

> Substitua `localhost:3000` pelo host/porta do seu ambiente.

### 1) Registrar usuário

```bash
curl -sS -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SenhaF0rte!"
  }'
```

### 2) Login (gera token)

```bash
curl -sS -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SenhaF0rte!"
  }'
```

Resposta exemplo:

```json
{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..." }
```

### 3) Enviar evento via webhook (público)

```bash
curl -sS -X POST http://localhost:3000/api/webhook/event \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-123",
    "type": "purchase",
    "value": 249.9,
    "timestamp": "2025-08-10T12:34:56.000Z",
    "metadata": { "symbol": "BTCUSD", "leverage": 2 }
  }'
```

### 4) Listar eventos (rota protegida)

```bash
curl -sS -X GET http://localhost:3000/api/events \
  -H "Authorization: Bearer <TOKEN>"
```

### 5) Obter agregação / resumo (protegido)

```bash
curl -sS -X GET http://localhost:3000/api/events/summary \
  -H "Authorization: Bearer <TOKEN>"
```

---

## WebSocket (tempo real)

Backend emite `new_event` no Socket.IO quando um evento chega. Exemplo frontend:

```js
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');
socket.on('connect', () => console.log('connected', socket.id));
socket.on('new_event', (event) => console.log('Novo evento:', event));
```

---

## Validação (Zod)

- Use `schema.safeParse(body)` para validar sem exceções.
- Em caso de falha, retorne `400` com `error.issues`.

---

## Erros comuns e correções rápidas

- **Cannot find module '.../dist/config/db'**  
  → Em ESM, adicione extensão `.js` nos imports relativos antes do build (ex.: `import { connect_db } from './config/db.js'`) ou use CommonJS (`module: "CommonJS"`).

- **Must use import to load ES Module**  
  → Use `tsx` ou `ts-node-dev --loader ts-node/esm` no dev.

- **Cannot find module 'mongoose'**  
  → `npm install mongoose` e garanta `node_modules` disponível no container.

- **volume mongo_data undefined**  
  → Assegure `volumes:` no `docker-compose.yml`:

```yaml
volumes:
  mongo_data:
  node_modules:
```

---

## Sugestões de scripts (`package.json`)

```json
"scripts": {
  "dev": "tsx ./src/server.ts",
  "dev:debug": "cross-env NODE_ENV=development tsx --inspect-brk ./src/server.ts",
  "build": "tsc -p tsconfig.json",
  "start": "node dist/server.js",
  "seed": "ts-node scripts/seed.ts"
}
```

---

## Próximos passos recomendados

- Cache para agregações (Redis)
- Retry/backoff para webhooks falhados
- Paginação no feed de eventos
- Refresh tokens para JWT
- Monitoramento (Sentry, Prometheus)

---

## Notas finais

- Este README assume prefixo `/api`. Ajuste se necessário.
- Verifique `tsconfig.json` e `package.json` para compatibilidade ESM/CommonJS e paths de `outDir`.
