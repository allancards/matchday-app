
```md
# Server Actions

Todas as mutações são feitas por **Server Actions** em `app/actions/event.ts`. Elas são chamadas do cliente com `useTransition` ou diretamente em formulários.

## `createEvent(data)`
Cria um novo evento.

**Parâmetros**
- `data`: objeto com `title`, `date`, `location?`, `description?`

**Retorno**
- `{ success: true, event }` ou `{ success: false, error }`

---

## `deleteEvent(eventId)`
Remove um evento (e dependências em cascata).

**Parâmetros**
- `eventId: string`

**Retorno**
- `{ success: boolean }`

---

## `setAttendance(eventId, playerId, status)`
Define ou atualiza a presença de um jogador em um evento.

**Parâmetros**
- `eventId: string`
- `playerId: string`
- `status: "GOING" | "NOT_GOING" | "MAYBE"`

**Retorno**
- `{ success: boolean }`

**Efeitos**
- `revalidatePath` na página do evento.

---

## `addGoal(eventId, playerId, assistId?)`
Registra um gol.

**Parâmetros**
- `eventId: string`
- `playerId: string` (autor)
- `assistId?: string` (opcional)

**Retorno**
- `{ success: boolean }`

---

## `removeGoal(goalId)`
Remove um gol.

**Parâmetros**
- `goalId: string`

**Retorno**
- `{ success: boolean }`

---

## `finishMatchAndSaveStats(eventId, events)`
Encerra uma partida e persiste as estatísticas.

**Parâmetros**
- `eventId: string`
- `events`: array de eventos da partida
  ```ts
  {
    id: number;
    text: string;
    time: string;
    scorerId: string;
    assistId?: string;
  }[]

Comportamento

    Cria os Goal correspondentes no banco.

    Pode registrar metadados adicionais da partida (ex: placar).

    Retorna { success: true } em caso de sucesso.

Nota

    Aceita events vazio (partida 0x0).



getEventById(id)

Busca um evento com presenças, jogadores e gols.

Retorno

    Evento completo ou null.