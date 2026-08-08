import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DeletePlayerButton, ToggleActiveButton } from "./_components/actions-buttons";

const positionLabels = {
  GK: "Goleiro",
  DEF: "Defensor",
  MID: "Meio-campo",
  FWD: "Atacante",
};

export default async function PlayersPage() {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const players = await prisma.player.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">👥 Jogadores</h1>
        <Link href="/admin/players/new">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded inline-flex items-center gap-2">
            <Plus className="h-4 w-4" /> Novo Jogador
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posição</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {players.map((player) => (
              <tr key={player.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{player.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{positionLabels[player.position]}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${player.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {player.isActive ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                  <ToggleActiveButton playerId={player.id} isActive={player.isActive} />
                  <DeletePlayerButton playerId={player.id} />
                </td>
              </tr>
            ))}
            {players.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  Nenhum jogador cadastrado. Crie o primeiro!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}