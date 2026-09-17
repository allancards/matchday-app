
```md
# Fluxos principais

## 1. Autenticação

```mermaid
sequenceDiagram
    participant U as Usuário
    participant S as SignInPage
    participant N as NextAuth
    participant G as Google

    U->>S: Clica "Entrar com Google"
    S->>N: signIn("google")
    N->>G: Redireciona
    G-->>N: Callback com perfil
    N-->>U: Sessão criada
    U->>U: Redirecionado para /admin

## 2. Criação e confirmação de presença

    Admin cria evento em /admin/events.

    Jogadores acessam a página do evento e confirmam presença.

    setAttendance é chamada via Server Action.

    A UI atualiza com o novo status.

## 3. Sorteio de times

    Admin acessa /admin/events/[id]/draw.

    Seleciona o número de times e o modo (aleatório ou balanceado).

    O algoritmo em lib/team-balancer.ts distribui os jogadores.

    O resultado pode ser copiado para o WhatsApp.

Detalhes em team-balancer.md.

## 4. Matchday (placar ao vivo)

    Admin acessa /admin/events/[id]/matchday.

    Inicia o cronômetro.

    Registra gols (com autor e assistência).

    Ao encerrar, finishMatchAndSaveStats salva os dados.

    A tela é resetada para permitir uma nova partida no mesmo evento.

    O botão "Voltar" retorna à página do evento.

Estados do matchday

    seconds, isActive: cronômetro.

    scoreTeamA, scoreTeamB: placar.

    events: feed de eventos (gols).

    isSaving: feedback durante persistência.

## 5. Encerramento de evento

    O evento permanece disponível para consulta.

    Estatísticas ficam salvas em Goal.

    Pode ser excluído via deleteEvent.