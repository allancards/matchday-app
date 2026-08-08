"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { togglePlayerActive, deletePlayer } from "@/app/actions/player";

export function ToggleActiveButton({ playerId, isActive }: { playerId: string; isActive: boolean }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await togglePlayerActive(playerId, !isActive);
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      disabled={isPending}
    >
      {isActive ? "Desativar" : "Ativar"}
    </Button>
  );
}

export function DeletePlayerButton({ playerId }: { playerId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Tem certeza que deseja excluir este jogador?")) {
      startTransition(async () => {
        await deletePlayer(playerId);
      });
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isPending}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}