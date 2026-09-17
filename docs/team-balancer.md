
```md
# Team Balancer

Algoritmo responsável por sortear e/ou equilibrar os times a partir dos jogadores confirmados.

Localização: `lib/team-balancer.ts`

## Tipos

```ts
export interface PlayerForDraw {
  id: string;
  name: string;
  position: "GOALKEEPER" | "DEFENDER" | "MIDFIELDER" | "FORWARD" | string;
  rating?: number;
}

export interface Team {
  name: string;
  players: PlayerForDraw[];
  totalRating: number;
}


Modos
Aleatório (drawRandomTeams)

    Embaralha todos os jogadores com Fisher-Yates.

    Distribui em rodadas: um jogador por time, ciclicamente.

    Não considera posição nem rating.

Balanceado (drawBalancedTeams)

    Separa goleiros de jogadores de linha.

    Distribui um goleiro por time, se possível.

    Ordena jogadores de linha por rating (maior → menor).

    Aplica snake draft (serpentina):

        Vai do time A → N, depois N → A, e assim por diante.

    Aceita um parâmetro opcional shuffle para embaralhar antes de ordenar, tornando o resultado não determinístico.

Algoritmo do snake draft
```text

Ordem dos jogadores: [P1, P2, P3, P4, P5, P6]
Times: A, B, C

Rodada 1 (direção →): P1→A, P2→B, P3→C
Rodada 2 (direção ←): P4→C, P5→B, P6→A
```
Isso garante equilíbrio de rating entre os times, distribuindo os melhores alternadamente.



Como o rating é definido

    Se ausente, assume-se 3 como padrão.

    Pode ser preenchido manualmente no cadastro do jogador.

    No futuro, pode ser calculado a partir de estatísticas (gols, assistências, presenças).

Fisher-Yates (embaralhamento)
```ts
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
```

Considerações

    Aleatório é ideal quando se quer imprevisibilidade total.

    Balanceado é ideal para partidas equilibradas.

    Combinar shuffle + sort quebra a repetição sem perder balanceamento.

Possíveis melhorias futuras

    Balanceamento por posição (quantidade igual de defensores, meio-campistas, atacantes).

    Considerar histórico de vitórias.

    Suportar número ímpar de jogadores com "reservas".