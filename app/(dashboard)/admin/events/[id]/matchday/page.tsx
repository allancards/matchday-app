import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MatchdayClient } from "./_components/matchday-client";

// A página recebe params como Promise (no App Router)
export default async function LiveMatchdayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // extrai o id da URL

  // Busca o evento com as presenças confirmadas
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

  // Mapeia os jogadores confirmados
  const confirmedPlayers = event.attendances.map((a) => ({
    id: a.player.id,
    name: a.player.name,
  }));

  // Passa os dados para o componente cliente
  return <MatchdayClient confirmedPlayers={confirmedPlayers} eventId={id} />;
}