⚽ MatchDay

Plataforma para organizar partidas de futebol, confirmar presença, sortear times equilibrados e acompanhar o placar ao vivo.

  Funcionalidades

    Autenticação com Google (NextAuth)

    Cadastro e gerenciamento de jogadores

    Criação de eventos/partidas

    Confirmação de presença: Vou, Não vou, Talvez

    Registro de gols e assistências

    Sorteio de times:

        Aleatório (sorteio puro)

        Balanceado (por posição e/ou rating)

    Placar ao vivo com:

        Cronômetro

        Registro de gols em tempo real

        Feed de eventos da partida

        Encerramento e salvamento de súmula

        Possibilidade de iniciar nova partida no mesmo evento

    Painel administrativo

    Estatísticas salvas no banco de dados

    🚀 Tecnologias

    Next.js (App Router)

    TypeScript

    Tailwind CSS

    Prisma ORM

    PostgreSQL (ou outro banco compatível)

    NextAuth.js

    Lucide React

    date-fns

    React Server Actions

📁 Estrutura do projeto

```text 
app/
  (dashboard)/
    admin/
      events/
        [id]/
          page.tsx          # Detalhes do evento
          draw/             # Sorteio de times
          matchday/         # Placar ao vivo
  actions/                  # Server Actions
  sign-in/                  # Login
components/                 # Componentes reutilizáveis
lib/                        # Utilitários, Prisma, team-balancer
prisma/                     # Schema e migrations

```

🔧 Pré-requisitos

    Node.js 18+

    pnpm / npm / yarn

    Banco de dados PostgreSQL

    Credenciais OAuth do Google

⚙️ Instalação

# Clone o repositório
git clone <repo-url>
cd matchday

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env
# edite .env com seus dados

# Rode as migrations
pnpm prisma migrate dev

# Inicie o servidor de desenvolvimento
pnpm dev

Acesse: http://localhost:3000

🔐 Variáveis de ambiente

Crie um arquivo .env na raiz:

DATABASE_URL="postgresql://usuario:senha@localhost:5432/matchday"
AUTH_SECRET="sua-chave-secreta"
AUTH_GOOGLE_ID="seu-client-id"
AUTH_GOOGLE_SECRET="seu-client-secret"
NEXTAUTH_URL="http://localhost:3000"

Ajuste os nomes conforme a versão do NextAuth (v4 ou v5) que estiver usando.

🧱 Banco de dados

# Criar/atualizar schema
pnpm prisma migrate dev

# Abrir Prisma Studio
pnpm prisma studio

📜 Scripts disponíveis
**Comando** | **Descrição**
|  --- | --- | 
| pnpm | dev |	Inicia o servidor de desenvolvimento |
| pnpm | build |	Gera build de produção |
| pnpm | start |	Inicia o servidor de produção |
| pnpm | lint |	Executa o linter |
| pnpm | prisma | ...	Comandos do Prisma |


🗺️ Rotas principais


|**Rota**  |	**Descrição**|
|--- | --- |
|/sign-in |	Login com Google|
|/admin |	Painel administrativo|
|/admin/events |	Lista de eventos|
|/admin/events/[id] |	Detalhes do evento|
|/admin/events/[id]/draw |	Sorteio de times|
|/admin/events/[id]/matchday |	Placar ao vivo|

🔄 Fluxo principal

    Admin cria um evento.

    Jogadores confirmam presença.

    Admin realiza o sorteio dos times.

    Partida ao vivo: cronômetro, gols e eventos.

    Ao encerrar, as estatísticas são salvas no banco.

    É possível iniciar uma nova partida no mesmo evento.

🚢 Deploy

Recomendado: Vercel + banco gerenciado (Neon, Supabase, Railway).
Configure as variáveis de ambiente no painel da Vercel.

🤝 Contribuição

    Faça um fork

    Crie uma branch: git checkout -b feature/minha-feature

    Commit: git commit -m 'feat: minha feature'

    Push: git push origin feature/minha-feature

    Abra um Pull Request

📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.