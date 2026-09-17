# ADR 002 — Uso do Prisma como ORM

- **Status**: Aceito
- **Data**: AAAA-MM-DD

## Contexto

Precisamos de um ORM tipado, com migrations versionadas e boa integração com TypeScript.

## Decisão

Usar **Prisma ORM** com **PostgreSQL**.

## Justificativa

- Tipagem gerada a partir do schema.
- Migrations declarativas e versionadas.
- Prisma Studio para inspeção de dados.
- Suporte a transações e relacionamentos complexos.

## Consequências

- Necessidade de rodar `prisma generate` após mudanças no schema.
- Build depende do client gerado.
- Deployment precisa aplicar migrations (`prisma migrate deploy`).

## Alternativas consideradas

- Drizzle: mais leve, mas ecossistema menor.
- TypeORM: mais verboso e tipagem inferior.
- SQL puro: perda de produtividade.