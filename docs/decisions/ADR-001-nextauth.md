
```md
# ADR 001 — Uso do NextAuth para autenticação

- **Status**: Aceito
- **Data**: AAAA-MM-DD

## Contexto

Precisamos de autenticação com suporte a OAuth (Google), sessão persistente e integração simples com o App Router do Next.js.

## Decisão

Usar **NextAuth.js** com o provedor Google.

## Justificativa

- Integração nativa com Next.js.
- Suporte a múltiplos provedores OAuth.
- Sessões via cookies HTTP-only.
- Boa comunidade e documentação.

## Consequências

- Dependência de OAuth externo (Google Cloud Console).
- Necessidade de `AUTH_SECRET` e variáveis relacionadas.
- Callback URLs precisam ser configuradas em cada ambiente.

## Alternativas consideradas

- Clerk / Auth0: mais features, porém com custo e lock-in.
- Autenticação própria: complexidade desnecessária.

