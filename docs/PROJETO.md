# PROJETO — Trader Dashboard - Backend

"Construa um dashboard de monitoramento de performance e atividade de usuários que consuma eventos vindos de webhooks, os persista, agregue, exiba em gráficos e atualize em tempo real. Além disso, utilize a OpenAI API para gerar insights automáticos sobre os dados."

Checklist para desenvolvimento do backend. Itens concluídos marcados com :white_check_mark:.

# Índice

- [Tasks](#tasks)
- [Descrição](#description)

---

## Tasks

:white_check_mark: CRUD básico de “eventos” ou “ações de usuário” com campos sugeridos:

- :white_check_mark: id, userId, type (ex: login, purchase), value, timestamp, metadata

- [ ] Endpoint REST para:
- :white_check_mark: Receber novo evento via webhook (POST /webhook/event)

  - [ ] Buscar dados brutos e agregados (ex: total por tipo, ticket médio, top usuários)

- [ ] Integração com OpenAI API para gerar um resumo/insight dos dados (ex: diário ou on demand), tipo:
  > “Nas últimas 24h: X eventos, Y compras, ticket médio Z, top 3 usuários A,B,C...”
- [ ] WebSocket que emite novas atualizações quando chegam eventos via webhook (sem reload)

:white_check_mark: Autenticação simples para acesso ao dashboard (JWT, sessão leve, etc.)

:white_check_mark: Modelo implementado em MongoDB (escolhido por facilidade para construir MVP e experiência prévia)

- [ ] Script(s) de seed para popular com dados sintéticos (para ver o dashboard sem gerar manualmente)
- [ ] Retry/backoff ao processar webhooks com falha (pode ser simulado)
- [ ] Testes (unitários/integrados) em ao menos uma parte crítica (ex: handler do webhook ou geração de insight)
- [ ] Dockerização do backend + banco para execução local fácil

:white_check_mark: ESLint + Prettier + tipagem robusta em TypeScript

- [ ] README.md com:

  :white_check_mark: Como rodar localmente (sem Docker)

  - [ ] Como rodar localmente (com Docker)

  - [ ] Escolha de banco de dados e justificativa

  - [ ] Como disparar o webhook (ex: exemplo com curl)

  - [ ] Como obter/atualizar o insight da OpenAI (configuração de chave via .env.example)

- [ ] Endpoint de webhook documentado (payload de exemplo)

:white_check_mark: (Opcional) Deploy mínimo (backend hospedado [AQUI](https://trader-dashboard-backend.onrender.com/))

## Descrição

Projeto: Painel de Trader com IA e Gráficos

Desenvolvimento e manutenção de um Painel de Trader já estruturado, com foco em gráficos, IA e integração com corretoras.

- Análise de gráficos de candles
- Bot baseado em IA estilo ChatGPT
- Módulos com liberação por produto adquirido
- Dashboard com métricas operacionais
- Integração com corretora via API
- Área de membros com permissões
- Funções manuais e automáticas para operações

### STACKS USADAS:

- Node.js 24.5.0, JavaScript / TypeScript
- Banco de dados: MongoDB (escolhido por facilidade para construir MVP e experiência prévia)
- Integrações: API REST, Webhooks, OpenAI API
- Real-time: WebSocket
- Autenticação leve (JWT / sessão)
