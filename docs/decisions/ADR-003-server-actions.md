# ADR 003 — Uso de Server Actions em vez de API Routes

- **Status**: Aceito
- **Data**: AAAA-MM-DD

## Contexto

Precisamos de mutações (criar evento, confirmar presença, registrar gol) com boa DX e tipagem ponta a ponta.

## Decisão

Usar **Server Actions** do Next.js em vez de API Routes.

## Justificativa

- Tipagem compartilhada entre cliente e servidor.
- Sem necessidade de criar endpoints REST manuais.
- Menos boilerplate.
- Revalidação integrada via `revalidatePath`.

## Consequências

- Não há endpoints REST públicos (para uso externo seria preciso criar API Routes).
- Chamadas só funcionam a partir do próprio app Next.js.
- Erros precisam ser tratados manualmente (`try/catch`).

## Alternativas consideradas

- API Routes: mais flexíveis para integrações externas.
- tRPC: excelente tipagem, mas adiciona complexidade.