"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createPlayer, PlayerFormData } from "@/app/actions/player";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  position: z.enum(["GK", "DEF", "MID", "FWD"]),
});

export default function NewPlayerPage() {
  const router = useRouter();
  const form = useForm<PlayerFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", position: "MID" },
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  async function onSubmit(data: PlayerFormData) {
    await createPlayer(data);
    router.push("/admin/players");
    router.refresh();
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">⚽ Novo Jogador</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            id="name"
            {...register("name")}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ex: João"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-700">Posição</label>
          <select
            id="position"
            {...register("position")}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="GK">Goleiro</option>
            <option value="DEF">Defensor</option>
            <option value="MID">Meio-campo</option>
            <option value="FWD">Atacante</option>
          </select>
          {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position.message}</p>}
        </div>

        <div className="flex gap-2">
          <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50">
            {isSubmitting ? "Salvando..." : "Salvar"}
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}