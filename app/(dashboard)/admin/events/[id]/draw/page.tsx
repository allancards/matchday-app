import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { DrawClient } from "./_components/draw-client";

export default async function TeamDrawPage({ params }: { params: Promise<{ id: string }> }) {
  // Busca os jogadores que confirmaram presença neste evento específico
  const {id} = await params;
  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      attendances: {
        where: { status: "GOING" },
        include: { player: true },
      },
    },
  });

  if (!event) notFound();

  // Mapeia os dados do banco para o formato que o algoritmo de sorteio espera
  const confirmedPlayers = event.attendances.map((attendance) => ({
    id: attendance.player.id,
    name: attendance.player.name,
    position: attendance.player.position || "FORWARD", // Ajuste conforme seu banco
    rating: 3, // Aqui você pode puxar o rating real do jogador no futuro
  }));

  return <DrawClient confirmedPlayers={confirmedPlayers} eventId={event.id} />;
}