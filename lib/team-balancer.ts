export interface PlayerForDraw {
  id: string;
  name: string;
  position: "GOALKEEPER" | "DEFENDER" | "MIDFIELDER" | "FORWARD" | string;
  rating?: number; // Nota de 1 a 5 (ou calculado por estatísticas)
}

export interface Team {
  name: string;
  players: PlayerForDraw[];
  totalRating: number;
}

export function drawBalancedTeams(
  players: PlayerForDraw[],
  numberOfTeams: number
): Team[] {
  // Inicializa a estrutura dos times
  const teams: Team[] = Array.from({ length: numberOfTeams }, (_, i) => ({
    name: `Time ${String.fromCharCode(65 + i)}`, // Time A, Time B, Time C...
    players: [],
    totalRating: 0,
  }));

  if (players.length === 0 || numberOfTeams <= 0) return teams;

  // 1. Separa Goleiros dos Jogadores de Linha
  const goalkeepers = players.filter((p) => p.position === "GOALKEEPER");
  const fieldPlayers = players.filter((p) => p.position !== "GOALKEEPER");

  // Ordena os jogadores de linha por nota (da maior para a menor)
  fieldPlayers.sort((a, b) => (b.rating || 3) - (a.rating || 3));

  // 2. Distribui os Goleiros (um para cada time, se houver)
  goalkeepers.forEach((gk, index) => {
    const teamIndex = index % numberOfTeams;
    teams[teamIndex].players.push(gk);
    teams[teamIndex].totalRating += gk.rating || 3;
  });

  // 3. Distribui os Jogadores de Linha usando o algoritmo Snake Draft
  let currentTeamIndex = 0;
  let direction = 1; // 1 = avançando (0 -> N), -1 = voltando (N -> 0)

  fieldPlayers.forEach((player) => {
    teams[currentTeamIndex].players.push(player);
    teams[currentTeamIndex].totalRating += player.rating || 3;

    // Lógica da Serpente para equilíbrio
    if (direction === 1) {
      if (currentTeamIndex === numberOfTeams - 1) {
        direction = -1; // Chegou no fim, inverte a direção
      } else {
        currentTeamIndex++;
      }
    } else {
      if (currentTeamIndex === 0) {
        direction = 1; // Chegou no início, inverte a direção
      } else {
        currentTeamIndex--;
      }
    }
  });

  return teams;
}