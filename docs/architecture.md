# Arquitetura

## Visão geral

O **MatchDay** é uma aplicação full-stack construída sobre o **Next.js (App Router)**, utilizando **React Server Components (RSC)**, **Server Actions** e **Prisma ORM** para acesso a dados. A autenticação é feita com **NextAuth** (OAuth Google).

A arquitetura prioriza:

- Menos código no cliente (uso intensivo de RSC).
- Mutações via **Server Actions** em vez de API Routes.
- Tipagem ponta a ponta (TypeScript + tipos gerados do Prisma).
- Estilização utilitária com **Tailwind CSS**.

## Diagrama de alto nível

```mermaid
flowchart LR
    U[Usuário] -->|Navegador| N[Next.js App Router]
    N -->|RSC| DB[(PostgreSQL)]
    N -->|Server Actions| DB
    N -->|NextAuth| G[Google OAuth]
    subgraph Camadas
      N
      DB
      G
    end

Camadas



| Camada	|   Responsabilidade	|     Onde fica   |
|-----------|-----------------------|-----------------|
| Apresentação (RSC)    |	Renderização das páginas, dados iniciais    |	app/**/page.tsx|
| Interação (Client)    |	Formulários, cronômetro, modais, feedback   |	app/**/_components/*.tsx|
| Ações (Server Actions)    |	Mutações no banco, revalidação  |	app/actions/event.ts|
| Domínio	Regras de negócio   |  (ex: sorteio)    |	lib/team-balancer.ts|
| Persistência  |	Acesso a dados  |	lib/prisma.ts, prisma/schema.prisma|
| Autenticação  |	Login e sessão  |	auth.ts, app/sign-in|


Padrões adotados

    Server Actions para toda mutação (criar evento, registrar gol, encerrar partida).

    useTransition no cliente para chamar Server Actions e atualizar UI sem bloquear.

    revalidatePath após mutações relevantes.

    Separação clara entre RSC (busca de dados) e Client Components (interatividade).

    Tailwind com classes utilitárias e componentes base (<Button />).

Fluxo de renderização

    Usuário acessa uma rota (ex: /admin/events/[id]).

    O layout verifica a sessão (auth()).

    A page.tsx (RSC) consulta o banco via Prisma.

    Os dados são passados para Client Components específicos (botões, formulários, placar).

    As interações do usuário chamam Server Actions, que persistem e revalidam a rota.

Decisões arquiteturais

Consulte a pasta decisions/ para ADRs individuais.