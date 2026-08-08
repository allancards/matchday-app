"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createEvent, EventFormData } from "@/app/actions/event";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().optional(),
  date: z.string().min(1, "Data é obrigatória"),
  location: z.string().optional(),
});

export default function NewEventPage() {
  const router = useRouter();
  const form = useForm<EventFormData & { date: string }>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      location: "",
    },
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  async function onSubmit(data: EventFormData & { date: string }) {
    await createEvent(data);
    router.push("/admin/events");
    router.refresh();
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">📅 Novo Evento</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
          <input
            id="title"
            {...register("title")}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ex: Pelada do Domingo"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição (opcional)</label>
          <textarea
            id="description"
            {...register("description")}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Detalhes do jogo..."
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Data e Hora</label>
          <input
            id="date"
            type="datetime-local"
            {...register("date")}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Local (opcional)</label>
          <input
            id="location"
            {...register("location")}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ex: Campo do Zé, Rua das Flores, 123"
          />
        </div>

        <div className="flex gap-2">
          <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50">
            {isSubmitting ? "Criando..." : "Criar Evento"}
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}