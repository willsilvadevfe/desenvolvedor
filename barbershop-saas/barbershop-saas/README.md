# Barbearia — Sistema de Agendamento (SaaS)

Site de página única com calendário de agendamento + painel do barbeiro,
backend em Node/Express com SQLite e envio de e-mail de confirmação.

```
barbershop-saas/
├── backend/     -> API (Node + Express + SQLite + Nodemailer)
└── frontend/    -> Site (React + Vite + CSS puro, sem Tailwind)
```

## Como abrir no VSCode

1. Abra a pasta `barbershop-saas` inteira no VSCode.
2. Abra **dois terminais** (Terminal > Novo Terminal, e clique no `+` para abrir um segundo): um para o `backend` e outro para o `frontend`.

## 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Dependências instaladas pelo `npm install` (definidas no `package.json`):
- `express` — servidor HTTP / API
- `better-sqlite3` — banco de dados SQLite (arquivo local, sem precisar instalar servidor de banco separado)
- `cors` — libera o frontend para acessar a API
- `dotenv` — carrega o arquivo `.env`
- `nodemailer` — envio dos e-mails de confirmação
- `nodemon` (dev) — reinicia o servidor sozinho a cada alteração

Depois, edite o arquivo `backend/.env` com seus dados reais:
- `EMAIL_USER` / `EMAIL_PASS`: conta que vai enviar os e-mails. Recomendo Gmail com **Senha de App**:
  1. Ative a verificação em duas etapas em https://myaccount.google.com/security
  2. Gere uma senha de app em https://myaccount.google.com/apppasswords
  3. Cole a senha de 16 letras em `EMAIL_PASS` (sem espaços)
- `BARBER_EMAIL`: e-mail do barbeiro que recebe a notificação de cada novo agendamento
- `ADMIN_PASSWORD`: senha para entrar em `/admin`
- `FRONTEND_URL`: endereço onde o site vai rodar (padrão já configurado para `http://localhost:5173`)

Para rodar:

```bash
npm run dev
```

O backend sobe em `http://localhost:3001`. O banco `barbershop.db` é criado automaticamente na primeira execução — não precisa instalar MySQL/Postgres nem nada externo.

## 2. Frontend

Em outro terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Dependências instaladas pelo `npm install`:
- `react`, `react-dom` — base do React
- `react-router-dom` — rotas entre a página principal (`/`) e o painel (`/admin`)
- `vite`, `@vitejs/plugin-react` (dev) — ambiente de desenvolvimento e build

Acesse `http://localhost:5173` no navegador. O painel do barbeiro fica em `http://localhost:5173/admin`.

## Como funciona

- **Calendário**: o cliente escolhe um dia (segunda a sábado, sem domingo, sem datas passadas). Ao escolher o dia, o frontend busca em `/api/appointments/available?date=...` os horários das 8h às 17h em blocos de 30 minutos, já marcando quais estão ocupados.
- **Bloqueio de horário**: ao confirmar, o backend grava no SQLite com uma restrição `UNIQUE(date, time)` — ou seja, é fisicamente impossível dois agendamentos caírem no mesmo horário, mesmo que dois clientes cliquem ao mesmo tempo.
- **E-mails**: ao confirmar, o backend envia automaticamente um e-mail para o cliente (confirmação) e um para o barbeiro (aviso de novo agendamento), usando o Nodemailer.
- **Painel do barbeiro** (`/admin`): pede uma senha simples (definida em `ADMIN_PASSWORD`), depois lista todos os agendamentos com filtro por data e botão de cancelar.

## Build para produção

```bash
cd frontend
npm run build
```

Isso gera a pasta `frontend/dist` pronta para subir em qualquer hospedagem estática (Vercel, Netlify, etc.). O backend (`backend/`) pode ser hospedado separadamente (Render, Railway, VPS) — lembre de configurar as variáveis de ambiente lá também e apontar `VITE_API_URL` do frontend para a URL pública da API.

## Observações e limitações do escopo atual

- A autenticação do painel do barbeiro é simples (uma senha única, sem cadastro de usuários) — suficiente para uso de uma pessoa só. Se no futuro você quiser múltiplos barbeiros com login próprio, dá pra evoluir para autenticação com JWT, como no projeto da barbearia anterior.
- O token do painel expira quando o backend reinicia (precisa logar de novo) — proposital, para manter simples.
- Se quiser trocar o Gmail por outro provedor de e-mail (SendGrid, Mailgun, etc.), basta ajustar as variáveis `EMAIL_HOST`/`EMAIL_PORT` no `.env` do backend.
