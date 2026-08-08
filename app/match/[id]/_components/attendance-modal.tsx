"use client";

import { useState } from "react";
import { setAttendance } from "@/app/actions/event";
import { CheckCircle2, XCircle, UserCheck, Loader2 } from "lucide-react";

interface Player {
  id: string;
  name: string;
}

interface AttendanceModalProps {
  eventId: string;
  players: Player[];
}

export function AttendanceModal({ eventId, players }: AttendanceModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleConfirm(status: "GOING" | "NOT_GOING") {
    if (!selectedPlayerId) {
      alert("Por favor, selecione seu nome na lista.");
      return;
    }

    setIsLoading(true);
    const result = await setAttendance(
        eventId,
        selectedPlayerId,
        status
    );

    setIsLoading(false);

    if (result.success){
      setIsOpen(false);
      setSelectedPlayerId("");
    } else {
      alert(result.error);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-2 cursor-pointer"
      >
        <UserCheck className="w-5 h-5 text-emerald-400" />
        Confirmar Minha Presença
      </button>

      {/* Backdrop / Fundo Escuro do Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-black text-slate-800 mb-2">
              Quem é você na pelada?
            </h3>
            <p className="text-sm text-slate-500 mb-5">
              Selecione o seu nome na lista de convocados abaixo:
            </p>

            {/* Select de Jogadores */}
            <div className="mb-6">
              <select
                value={selectedPlayerId}
                onChange={(e) => setSelectedPlayerId(e.target.value)}
                className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">-- Selecione seu nome --</option>
                {players.map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Botões de Ação */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <button
                disabled={isLoading || !selectedPlayerId}
                onClick={() => handleConfirm("GOING")}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Vou Jogar
                  </>
                )}
              </button>

              <button
                disabled={isLoading || !selectedPlayerId}
                onClick={() => handleConfirm("NOT_GOING")}
                className="bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <XCircle className="w-5 h-5" />
                    Tô Fora
                  </>
                )}
              </button>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-slate-400 hover:text-slate-600 text-sm font-medium py-2 text-center"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}