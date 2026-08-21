import { getEventById, deleteEvent } from "@/app/actions/event";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { ArrowLeft, Trash2, Dice1, Tv } from "lucide-react";

// Componentes client
import AttendanceButton from "./_components/attendance-button";
import GoalForm from "./_components/goal-form";
import GoalList from "./_components/goal-list";


export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const event = await getEventById((await params).id);
  if (!event) redirect("/admin/events");

  const players = await prisma.player.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
  });

  const goingPlayers = event.attendances.filter(a => a.status === "GOING").map(a => a.player);
  const goals = event.goals;

  return (
    <div>
      {/* Cabeçalho com título e ações */}
      <div className="flex items-center justify-between mb-4 ">
        <div className="flex items-center gap-4">
          <Link href="/admin/events">
            <button className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-6 w-6" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold">{event.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          {/* Botão Sorteio */}
          <Link href={`/admin/events/${event.id}/draw`}>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
              <Dice1 className="h-4 w-4" /> Sorteio
            </button>
          </Link>
          {/* Botão Placar ao Vivo */}
          <Link href={`/admin/events/${event.id}/matchday`}>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
              <Tv className="h-4 w-4" /> Placar ao Vivo
            </button>
          </Link>
          {/* Botão Excluir (já existente) */}
          <button
            onClick={async () => {
              "use server";
              await deleteEvent(event.id);
              redirect("/admin/events");
            }}
            className="text-red-600 hover:text-red-800 flex items-center gap-2 text-sm font-medium"
          >
            <Trash2 className="h-4 w-4" /> Excluir
          </button>
        </div>
      </div>

      {/* Detalhes do evento */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="font-medium">Data:</span> {format(new Date(event.date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</div>
          {event.location && <div><span className="font-medium">Local:</span> {event.location}</div>}
          <div><span className="font-medium">Criado por:</span> {event.createdBy.name}</div>
          <div><span className="font-medium">Confirmados:</span> {event.attendances.filter(a => a.status === "GOING").length}</div>
        </div>
        {event.description && <p className="mt-2 text-gray-600">{event.description}</p>}
      </div>

      {/* Grid de presenças e gols */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">👥 Presenças</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {players.map((player) => {
              const attendance = event.attendances.find(a => a.playerId === player.id);
              const status = attendance?.status || "MAYBE";
              return (
                <AttendanceButton
                  key={player.id}
                  player={player}
                  eventId={event.id}
                  currentStatus={status as "GOING" | "MAYBE" | "NOT_GOING"}
                />
              );
            })}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">⚽ Gols</h2>
          <GoalForm eventId={event.id} players={players} goingPlayers={goingPlayers} />
          <GoalList goals={goals} />
        </div>
      </div>
    </div>
  );
}