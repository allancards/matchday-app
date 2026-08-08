"use client";

import { finishMatchAndSaveStats } from "@/app/actions/event";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // <- adicionado
import { Play, Pause, Plus, Award, CheckCircle2, X, ArrowLeft } from "lucide-react"; // <- ArrowLeft

interface Player {
  id: string;
  name: string;
}

export function MatchdayClient({ confirmedPlayers, eventId }: { confirmedPlayers: Player[]; eventId: string }) {
  const router = useRouter(); // <- para navegação

  const [isSaving, setIsSaving] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [scoreTeamA, setScoreTeamA] = useState(0);
  const [scoreTeamB, setScoreTeamB] = useState(0);
  const [events, setEvents] = useState<{
    id: number;
    text: string;
    time: string;
    scorerId: string;
    assistId?: string;
  }[]>([]);

  // Estados do Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [scoringTeam, setScoringTeam] = useState<"A" | "B" | null>(null);
  const [scorerId, setScorerId] = useState("");
  const [assistId, setAssistId] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => setSeconds((sec) => sec + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  function openGoalModal(team: "A" | "B") {
    setScoringTeam(team);
    setScorerId("");
    setAssistId("");
    setModalOpen(true);
  }

  function handleConfirmGoal() {
    if (!scorerId) return alert("Selecione o autor do gol!");

    const scorerName = confirmedPlayers.find((p) => p.id === scorerId)?.name;
    const assistName = confirmedPlayers.find((p) => p.id === assistId)?.name;

    if (scoringTeam === "A") setScoreTeamA((prev) => prev + 1);
    if (scoringTeam === "B") setScoreTeamB((prev) => prev + 1);

    const eventText = assistName
      ? `⚽ Gol de ${scorerName} (Assist: ${assistName}) - Time ${scoringTeam}`
      : `⚽ Gol de ${scorerName} - Time ${scoringTeam}`;

    setEvents((prev) => [
      {
        id: Date.now(),
        text: eventText,
        time: formatTime(seconds),
        scorerId,
        assistId: assistId || undefined,
      },
      ...prev,
    ]);

    setModalOpen(false);
  }

  // Função para resetar a partida (nova partida)
  const resetMatch = () => {
    setSeconds(0);
    setIsActive(false);
    setScoreTeamA(0);
    setScoreTeamB(0);
    setEvents([]);
  };

  async function handleEndMatch() {
    const confirm = window.confirm("Deseja realmente encerrar a partida e salvar as estatísticas?");
    if (!confirm) return;

    setIsSaving(true);
    setIsActive(false); // Pausa o cronômetro

    try {
      const result = await finishMatchAndSaveStats(eventId, events);

      if (result.success) {
        alert("Partida encerrada com sucesso! Estatísticas salvas.");
        resetMatch(); // Zera a tela para nova partida (sem redirecionar)
      } else {
        alert("Erro ao salvar os dados.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro inesperado ao salvar.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6 pb-20 relative">
      {/* Botão Voltar */}
      <div className="flex justify-start">
        <Button
          variant="outline"
          onClick={() => router.push(`/admin/events/${eventId}`)}
          className="text-slate-600 border-slate-300 hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
      </div>

      {/* Placar e Cronômetro */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-2xl border border-slate-800 text-center">
        <div className="inline-flex items-center gap-2 bg-slate-800 px-4 py-1.5 rounded-full text-emerald-400 font-mono font-bold text-lg mb-6 border border-slate-700">
          <span className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`} />
          {formatTime(seconds)}
        </div>

        <div className="grid grid-cols-3 items-center mb-6">
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-slate-400 mb-1">Time A</span>
            <span className="text-5xl font-black text-white">{scoreTeamA}</span>
          </div>
          <span className="text-2xl font-bold text-slate-600">VS</span>
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-slate-400 mb-1">Time B</span>
            <span className="text-5xl font-black text-white">{scoreTeamB}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-center gap-3">
            <Button
              onClick={() => setIsActive(!isActive)}
              className={`${isActive ? "bg-amber-500 hover:bg-amber-600" : "bg-emerald-500 hover:bg-emerald-600"} text-slate-950 font-black px-6 rounded-xl`}
            >
              {isActive ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
              {isActive ? "Pausar" : "Iniciar"}
            </Button>
          </div>

          <Button
            onClick={handleEndMatch}
            disabled={isSaving || events.length === 0}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-6 rounded-xl border border-slate-700 flex items-center justify-center gap-2"
          >
            {isSaving ? "Salvando Estatísticas..." : "Encerrar Partida e Salvar Súmula"}
          </Button>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => openGoalModal("A")} className="bg-emerald-600 hover:bg-emerald-700 text-white font-black p-5 rounded-2xl shadow-lg flex flex-col items-center gap-2 cursor-pointer">
          <Plus className="w-8 h-8" />
          <span className="text-sm">+ Gol Time A</span>
        </button>
        <button onClick={() => openGoalModal("B")} className="bg-emerald-600 hover:bg-emerald-700 text-white font-black p-5 rounded-2xl shadow-lg flex flex-col items-center gap-2 cursor-pointer">
          <Plus className="w-8 h-8" />
          <span className="text-sm">+ Gol Time B</span>
        </button>
      </div>

      {/* Feed de Eventos */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <h3 className="font-extrabold text-slate-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
          <Award className="w-4 h-4 text-emerald-600" /> Eventos da Partida
        </h3>
        <div className="space-y-3">
          {events.length === 0 ? (
            <p className="text-slate-400 text-sm">Nenhum evento registrado ainda.</p>
          ) : (
            events.map((e) => (
              <div key={e.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-sm border border-slate-100">
                <span className="font-semibold text-slate-800">{e.text}</span>
                <span className="text-xs font-mono font-bold text-slate-400 bg-slate-200 px-2 py-0.5 rounded">{e.time}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de Gol */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black text-slate-800 mb-4">Registrar Gol</h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Autor do Gol *</label>
                <select value={scorerId} onChange={(e) => setScorerId(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl">
                  <option value="">Selecione o artilheiro</option>
                  {confirmedPlayers.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Assistência (Opcional)</label>
                <select value={assistId} onChange={(e) => setAssistId(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl">
                  <option value="">Nenhuma / Jogada Solo</option>
                  {confirmedPlayers.map(p => (
                    <option key={p.id} value={p.id} disabled={p.id === scorerId}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <button onClick={handleConfirmGoal} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Confirmar Gol
            </button>
          </div>
        </div>
      )}
    </div>
  );
}