"use client";

import { useState, useTransition } from "react";
import { addGoal } from "@/app/actions/event";

type Player = {
  id: string;
  name: string;
};

export default function GoalForm({
  eventId,
  players,
  goingPlayers,
}: {
  eventId: string;
  players: Player[];
  goingPlayers: Player[];
}) {
  const [playerId, setPlayerId] = useState("");
  const [assistId, setAssistId] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerId) return;
    startTransition(async () => {
      await addGoal(eventId, playerId, assistId || undefined);
      setPlayerId("");
      setAssistId("");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Quem fez o gol?</label>
        <select
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          className="border rounded px-2 py-1"
          required
        >
          <option value="">Selecione</option>
          {goingPlayers.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Assistência (opcional)</label>
        <select
          value={assistId}
          onChange={(e) => setAssistId(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">Nenhuma</option>
          {players.filter(p => p.id !== playerId).map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={isPending || !playerId}
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
      >
        + Adicionar Gol
      </button>
    </form>
  );
}