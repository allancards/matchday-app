// app/actions/player.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Schema de validação
const playerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  position: z.enum(["GK", "DEF", "MID", "FWD"]),
});

export type PlayerFormData = z.infer<typeof playerSchema>;

export async function createPlayer(data: PlayerFormData) {
  const validated = playerSchema.parse(data);

  await prisma.player.create({
    data: {
      name: validated.name,
      position: validated.position,
      isActive: true,
    },
  });


  revalidatePath("/admin/players");
}


export async function togglePlayerActive(playerId: string, isActive: boolean) {
  await prisma.player.update({
    where: { id: playerId },
    data: { isActive },
  });
  revalidatePath("/admin/players");
}

export async function deletePlayer(playerId: string) {
  await prisma.player.delete({ where: { id: playerId } });
  revalidatePath("/admin/players");
}