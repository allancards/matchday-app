```md
# Banco de dados

O projeto usa **PostgreSQL** com **Prisma ORM**. O schema está em `prisma/schema.prisma`.

## Diagrama ER

```mermaid
erDiagram
    USER ||--o{ EVENT : cria
    EVENT ||--o{ ATTENDANCE : possui
    PLAYER ||--o{ ATTENDANCE : confirma
    EVENT ||--o{ GOAL : registra
    PLAYER ||--o{ GOAL : marca
    PLAYER ||--o{ GOAL : assiste

    USER {
      string id PK
      string name
      string email
      string image
    }

    EVENT {
      string id PK
      string title
      string description
      datetime date
      string location
      string createdById FK
    }

    PLAYER {
      string id PK
      string name
      string position
      boolean isActive
      int rating
    }

    ATTENDANCE {
      string id PK
      string eventId FK
      string playerId FK
      enum status "GOING | NOT_GOING | MAYBE"
    }

    GOAL {
      string id PK
      string eventId FK
      string playerId FK
      string assistId FK "nullable"
      datetime createdAt
    }


Modelos
User

Usuário autenticado via Google. Associado a eventos que criou.
Event

Partida/evento organizado. Possui data, local, descrição, criador e relações com presenças e gols.
Player

Jogador cadastrado. Pode estar ativo/inativo e possui posição e rating (usados no sorteio).

Attendance

Confirmação de presença de um jogador em um evento.
Status possíveis:

    GOING

    NOT_GOING

    MAYBE

Goal

Gol marcado em um evento, com autor e assistência opcional.


Migrations

# Criar nova migration
pnpm prisma migrate dev --name nome_da_migration

# Aplicar em produção
pnpm prisma migrate deploy

# Resetar (cuidado)
pnpm prisma migrate reset


Inspeção

pnpm prisma studio


Convenções

    IDs são cuid() por padrão.

    Datas armazenadas em UTC, formatadas no cliente com date-fns.

    Exclusões em cascata estão declaradas via onDelete: Cascade nos relacionamentos.

