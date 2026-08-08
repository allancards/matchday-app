"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";

// Schema para criar evento
const eventSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().optional(),
  date: z.string().transform((str) => new Date(str)), // espera string ISO
  location: z.string().optional(),
});

export type EventFormData = z.infer<typeof eventSchema>;

// Criar evento
export async function createEvent(data: EventFormData) {
  const session = await auth();
  if (!session) throw new Error("Não autorizado");

  // Buscar o usuário no banco pelo email
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });
  if (!user) throw new Error("Usuário não encontrado no banco");

  const validated = eventSchema.parse(data);
  
  await prisma.event.create({
    data: {
      title: validated.title,
      description: validated.description || "",
      date: validated.date,
      location: validated.location || "",
      createdById: user.id, // Usa o ID real do banco
    },
  });

  revalidatePath("/admin/events");
}

// Listar eventos (com contagem de presenças e gols)
export async function getEvents() {
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
    include: {
      attendances: true,
      goals: true,
      createdBy: { select: { name: true } },
    },
  });
  return events;
}

// Buscar um evento específico com detalhes
export async function getEventById(eventId: string) {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      attendances: {
        include: { player: true },
      },
      goals: {
        include: { 
          player: true,
          assist: true,
        },
      },
      createdBy: { select: { name: true } },
    },
  });
  return event;
}

// Confirmar presença
export async function setAttendance(eventId: string, playerId: string, status: "GOING" | "NOT_GOING" | "MAYBE") {
  try{

    
    await prisma.attendance.upsert({
      where: {
        eventId_playerId: { eventId, playerId },
      },
      update: { status },
      create: {
        eventId,
        playerId,
        status,
      },
    });
    revalidatePath(`/admin/events/${eventId}`);
    return { success: true };
  }
  catch (error) {
    console.error("Erro ao confirmar presença:", error);
    return { sucess: false, error: "Erro ao confirmar presença. Tente novamente." };
  }
}

// Adicionar gol
export async function addGoal(eventId: string, playerId: string, assistId?: string) {
  await prisma.goal.create({
    data: {
      eventId,
      playerId,
      assistId: assistId || null,
    },
  });
  revalidatePath(`/admin/events/${eventId}`);
}

// Remover gol (opcional)
export async function removeGoal(goalId: string) {
  await prisma.goal.delete({ where: { id: goalId } });
  revalidatePath(`/admin/events`);
}

// Excluir evento
export async function deleteEvent(eventId: string) {
  await prisma.event.delete({ where: { id: eventId } });
  revalidatePath("/admin/events");
}

export async function finishMatchAndSaveStats(
  eventId: string,
  matchEvents: { scorerId: string; assistId?: string }[]
) {
  try {
    // Usamos o $transaction para garantir que ou salva todos os gols, ou não salva nenhum (evita dados pela metade se a internet cair)
    await prisma.$transaction(
      matchEvents.map((event) => {
        return prisma.goal.create({
          data: {

            eventId: eventId,
            playerId: event.scorerId,
            assistId: event.assistId || null,
            
            // Se houver uma coluna de assistência no seu banco, adicione aqui:
            // assistId: event.assistId || null, 
          },
        });
      })
    );
    // Opcional: Você pode querer mudar o status do evento para "FINALIZADO"
    /*
    await prisma.event.update({
      where: { id: eventId },
      data: { status: "FINISHED" }
    });
    */

    revalidatePath(`/admin/events/${eventId}`);
    revalidatePath(`/admin/events/${eventId}/matchday`);
    
    return { success: true };
  } catch (error) {
    console.error("Erro ao salvar estatísticas da partida:", error);
    return { success: false, error: "Falha ao salvar os dados da partida." };
  }
}