
```md
# Setup do ambiente

## Requisitos

- Node.js 18+
- Gerenciador de pacotes (pnpm recomendado)
- PostgreSQL 14+
- Conta Google para OAuth

## Passo a passo

### 1. Clonar e instalar

```bash
git clone <repo-url>
cd matchday
pnpm install
```
### 2. Variáveis de ambiente

Crie .env na raiz:
``` bash

DATABASE_URL="postgresql://usuario:senha@localhost:5432/matchday"
AUTH_SECRET="gere-com-openssl-rand-base64-32"
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
```

## 3. Banco de dados
```bash
pnpm prisma migrate dev
```

## 4. Rodar
```bash
pnpm dev
```
Acesse http://localhost:3000.

Configurando OAuth Google

    Acesse Google Cloud Console.

    Crie um projeto.

    Ative a "Google+ API" (ou "People API").

    Crie credenciais OAuth 2.0.

    URI de redirecionamento autorizado:

```text
http://localhost:3000/api/auth/callback/google
```
Copie Client ID e Client Secret para o .env.


Scripts úteis
|  Comando    |	Descrição  |
|------------|-----------------------------|
|pnpm dev    |	Servidor de desenvolvimento|
|pnpm build  |	Build de produção|
|pnpm start  |	Servidor de produção|
|pnpm lint   |	Lint|
|pnpm prisma studio  |	UI do banco|
|pnpm prisma migrate dev    |	Nova migration|

Problemas comuns

    Erro de conexão com o banco: verifique DATABASE_URL.

    OAuth invalid: verifique URIs de redirecionamento no Google Cloud.

    Sessão não persiste: confirme AUTH_SECRET e NEXTAUTH_URL.