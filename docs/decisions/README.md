# Architecture Decision Records (ADRs)

Este diretório reúne as decisões arquiteturais do projeto no formato **ADR** (Architecture Decision Record).

## Índice

- [ADR-001 — Uso do NextAuth](./ADR-001-nextauth.md)
- [ADR-002 — Uso do Prisma](./ADR-002-prisma.md)
- [ADR-003 — Uso de Server Actions](./ADR-003-server-actions.md)

## Como criar um novo ADR

1. Copie o template abaixo para `docs/decisions/ADR-00X-titulo.md`.
2. Preencha as seções.
3. Adicione ao índice acima.

### Template

```md
# ADR 00X — Título

- **Status**: Proposto | Aceito | Rejeitado | Substituído por ADR-00Y
- **Data**: AAAA-MM-DD

## Contexto

Descreva o problema ou situação.

## Decisão

Qual foi a decisão tomada.

## Justificativa

Por que essa decisão foi escolhida.

## Consequências

Impactos positivos e negativos.

## Alternativas consideradas

O que foi descartado e por quê.



---

## Estrutura final esperada

```bash
docs/
├── README.md              (opcional: índice geral dos docs)
├── architecture.md
├── database.md
├── actions.md
├── flows.md
├── setup.md
├── team-balancer.md
└── decisions/
    ├── README.md
    ├── ADR-001-nextauth.md
    ├── ADR-002-prisma.md
    └── ADR-003-server-actions.md