"use client";

import { useState, useTransition } from "react";
import { setAttendance } from "@/app/actions/event";

type Player = {
  id: string;
  name: string;
};

export default function AttendanceButton({
  player,
  eventId,
  currentStatus,
}: {
  player: Player;
  eventId: string;
  currentStatus: "GOING" | "NOT_GOING" | "MAYBE";
}) {
  const [status, setStatus] = useState(currentStatus);
  const [isPending, startTransition] = useTransition();

  const handleChange = (newStatus: "GOING" | "NOT_GOING" | "MAYBE") => {
    startTransition(async () => {
      await setAttendance(eventId, player.id, newStatus);
      setStatus(newStatus);
    });
  };

  const getColor = (s: string) => {
    if (s === "GOING") return "bg-green-500 text-white";
    if (s === "NOT_GOING") return "bg-red-500 text-white";
    return "bg-gray-200 text-gray-800";
  };

  return (
    <div className="flex items-center justify-between py-1">
      <span className="font-medium">{player.name}</span>
      <div className="flex gap-1">
        {["GOING", "NOT_GOING", "MAYBE"].map((s) => (
          <button
            key={s}
            onClick={() => handleChange(s as "GOING" | "NOT_GOING" | "MAYBE")}
            disabled={isPending}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              status === s ? getColor(s) : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {s === "GOING" ? "Vou" : s === "NOT_GOING" ? "Não" : "Talvez"}
          </button>
        ))}
      </div>
    </div>
  );
}