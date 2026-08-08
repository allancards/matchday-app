"use client";

import { Goal } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { removeGoal } from "@/app/actions/event";

type GoalWithPlayer = Goal & {
  player: { name: string };
  assist: { name: string } | null;
};

export default function GoalList({ goals }: { goals: GoalWithPlayer[] }) {
  const [isPending, startTransition] = useTransition();

  const handleRemove = (goalId: string) => {
    if (confirm("Remover este gol?")) {
      startTransition(async () => {
        await removeGoal(goalId);
      });
    }
  };

  if (goals.length === 0) {
    return <p className="text-sm text-gray-500">Nenhum gol registrado.</p>;
  }

  return (
    <ul className="space-y-1">
      {goals.map((goal) => (
        <li key={goal.id} className="flex justify-between items-center text-sm">
          <span>
            <strong>{goal.player.name}</strong>
            {goal.assist && <span> (assist: {goal.assist.name})</span>}
          </span>
          <button
            onClick={() => handleRemove(goal.id)}
            disabled={isPending}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </li>
      ))}
    </ul>
  );
}