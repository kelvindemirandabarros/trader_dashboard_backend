# PROJETO — Backend: Trader Monitor (Checklist)

Use este arquivo para rastrear progresso. Marque cada item com `[X]` quando concluído.

---

## Visão geral
Backend REST em Node.js + TypeScript para um dashboard de monitoramento de traders em tempo real. Recebe eventos via webhook, persiste no banco (MongoDB), agrega dados, emite atualizações via WebSocket e gera insights usando OpenAI.

---

## Stack (decidido)
- [ ] Node.js 24.x + TypeScript
- [ ] Express.js
- [ ] MongoDB (Mongoose)
- [ ] Zod (validação)
- [ ] JWT (autenticação leve)
- [ ] Socket.IO (tempo real)
- [ ] OpenAI SDK (insights)
- [ ] Docker + docker-compose
- [ ] ESLint + Prettier

> Observação: marque somente o que você implementou no backend.

---

## Requisitos principais (API / comportamentos)

### Modelo de Evento / Ação
- [ ] Criar model `Event` com campos:
  - [ ] `id` (gerado pelo Mongo)
  - [ ] `userId: string`
  - [ ] `type: string` (ex.: login, purchase)
  - [ ] `value: number`
  - [ ] `timestamp: Date` (default: NOW)
  - [ ] `metadata: Record<string, any>` (opcional)
- Critério de aceitação: esquema no `src/models/event.model.ts` com validação Mongoose e tipagens TypeScript.

### Endpoints REST
- [ ] `POST /api/webhook/event` — receber novo evento (public)
  - Aceita payload validado por Zod.
  - Persiste no Mongo.
  - Emite `new_event` via Socket.IO.
- [ ] `GET /api/events` — listar eventos (protegido)
  - Paginação (limit, page)
  - Filtros por `type`, `userId`, `date_range`
- [ ] `GET /api/events/summary` — agregações (protegido)
  - Total por tipo, ticket médio, top N usuários por valor/frequência
- [ ] Outros endpoints auxiliares (marcar se aplicou)
  - [ ] `GET /api/events/:id`
  - [ ] `DELETE /api/events/:id` (admin)

### Autenticação
- [ ] Implementar registro/login (opcional para admin)
- [ ] Login retorna JWT
- [ ] Middleware `auth_middleware` que:
  - Verifica header `Authorization: Bearer <token>`
  - Injeta `req.user` com payload tipado
- Critério: rotas protegidas rejeitam sem token (401).

### Webhook / Processamento
- [ ] Endpoint aceita webhooks idempotentes (opcional: dedupe)
- [ ] Retry/backoff ao processar webhook com falha (pode ser simulado)
- Critério: webhook com erro 5xx pode ser reenviado e o backend lida sem duplicar dados (ou marcar duplicidade).

### Tempo real (Socket.IO)
- [ ] Inicializar Socket.IO
- [ ] Emitir evento `new_event` para todos os clientes ao persistir evento
- [ ] Rota ou namespace específico para dashboard (opcional)
- Critério: frontend conectado recebe eventos sem reload.

### Integração OpenAI
- [ ] Serviço `openai.service.ts` com função que:
  - Recebe agregações recentes
  - Retorna resumo/insight textual
- [ ] Endpoint para gerar insight on-demand (`POST /api/insights` ou `GET /api/insights?range=24h`)
- Critério: chamado com agregações retorna texto e custo/logging mínimo.

---

## Persistência e seed
- [ ] MongoDB configurado (variável `MONGO_URI`)
- [ ] Script de seed `scripts/seed.ts` que:
  - Popula usuários de teste
  - Popula eventos sintéticos (ex.: últimos 30 dias)
- [ ] `docker-compose.yml` com serviço `mongo` e volume `mongo_data`
- Critério: rodar `npm run seed` e ver dados no banco.

---

## Agregações e Cache
- [ ] Implementar agregações via `aggregate()` no Mongoose
- [ ] Cache simples em memória (TTL) para consultas pesadas
- [ ] (Opcional) Redis para cache distribuído
- Critério: resumo/summary usa cache por X segundos para reduzir carga.

---

## Paginação e Feed
- [ ] Endpoint de listagem suporta `limit`, `page`, `sort`
- [ ] Feed com websocket e endpoint paginado
- Critério: frontend pode pedir página N e receber lista correta.

---

## Testes
- [ ] Testes unitários para handler do webhook
- [ ] Testes para geração de insight (mock OpenAI)
- [ ] Testes integrados básicos (in-memory Mongo / MongoMemoryServer)
- Critério: `npm test` roda testes críticos.

---

## Observabilidade e Resiliência
- [ ] Logs estruturados (ex.: console + formato JSON opcional)
- [ ] Health-check endpoint (`GET /api/health`)
- [ ] Monitoramento de latência ou Sentry (opcional)
- Critério: health-check responde 200 e logs mostram erros com stack.

---

## Docker / Deploy
- [ ] `Dockerfile` para dev e prod (multi-stage)
- [ ] `docker-compose.yml` com `backend` + `mongo`
- [ ] Instruções para rodar local (`docker compose up --build`)
- [ ] CI: build e testes em pipeline (opcional)
- Critério: `docker compose up` levanta API e Mongo.

---

## Segurança
- [ ] Não retornar `password` em respostas
- [ ] Hash de senhas com bcryptjs
- [ ] Rate limiting no endpoint de webhook ou auth (opcional)
- [ ] Configurar CORS restrito para produção
- Critério: senhas só persistidas como hash; endpoints críticos protegidos.

---

## Qualidade de código
- [ ] TypeScript com tipagem robusta (`Promise<>`, interfaces)
- [ ] ESLint configurado e rodando (`npm run lint`)
- [ ] Prettier configurado
- [ ] Regras do projeto atendidas (snake_case em variáveis, comentários em PT-BR, etc.)
- Critério: passar lint sem erros.

---

## Extras desejáveis (priorize conforme necessidade)
- [ ] Retry/backoff para processamento de webhooks
- [ ] Cache distribuído (Redis)
- [ ] Página de métricas (Prometheus) ou integração com Grafana
- [ ] Paginação cursor-based para alta performance
- [ ] Webhook signing (assinatura HMAC) para autenticar remetente
- [ ] Refresh tokens e revogação de tokens
- [ ] Documentação OpenAPI / Swagger
- [ ] Rate limiter global e por rota
- [ ] Docker image size otimizada
- [ ] Scripts de migração (se migrar modelo)

---

## Checklist de entrega mínima (MVP)
- [ ] Receber eventos via webhook e persistir no Mongo
- [ ] Emitir eventos via Socket.IO quando chegam novos eventos
- [ ] Endpoints protegidos por JWT para listagem e resumo
- [ ] Script de seed para dados sintéticos
- [ ] Endpoint que chama OpenAI para gerar insight com base nas agregações
- [ ] Docker + docker-compose para executar local

---

## Anotações e decisões arquiteturais
- Banco escolhido: **MongoDB** (esquema flexível para eventos, escrita intensa).  
  - Pense em migrar para PostgreSQL+Prisma se precisar de transações complexas e joins.
- Autenticação: JWT simples. Considere refresh tokens para UX em produção.
- OpenAI: usar com limites e cache dos insights para reduzir custo.

---

## Como usar este arquivo
1. Faça download do arquivo `PROJETO.md`.  
2. Marque com `[X]` cada item concluído.  
3. Use a seção "MVP" como alvo mínimo a entregar.  
4. Atualize as decisões arquiteturais conforme avanços.

---

## Contato rápido
Se quiser, eu transformo essa checklist em Issues (GitHub) ou em um projeto no GitLab com tarefas automatizadas. Quer que eu faça isso?  
