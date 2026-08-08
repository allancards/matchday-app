"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // <- adicionado
import { Button } from "@/components/ui/button";
import { drawBalancedTeams, Team, PlayerForDraw } from "@/lib/team-balancer";
import { Shuffle, Users, Shield, Copy, Check, ArrowLeft } from "lucide-react";

export function DrawClient({ confirmedPlayers, eventId }: { confirmedPlayers: PlayerForDraw[]; eventId: string }) {
  const [numberOfTeams, setNumberOfTeams] = useState<number>(2);
  const [teams, setTeams] = useState<Team[]>([]);
  const [copied, setCopied] = useState(false);
  

  const router = useRouter();

  function handleDraw() {
    const result = drawBalancedTeams(confirmedPlayers, numberOfTeams);
    setTeams(result);
  }

  function handleCopyWhatsApp() {
    if (teams.length === 0) return;
    let text = "⚽ *SORTEIO DOS TIMES - MATCHDAY* ⚽\n\n";
    teams.forEach((team) => {
      text += `*${team.name.toUpperCase()}* (Nível Médio: ${(
        team.totalRating / (team.players.length || 1)
      ).toFixed(1)} ⭐)\n`;
      team.players.forEach((p) => {
        const posTag = p.position === "GOALKEEPER" ? "🧤 " : "🏃 ";
        text += `${posTag}${p.name}\n`;
      });
      text += "\n";
    });
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 ">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Shuffle className="w-6 h-6 text-emerald-600" />
            Sorteio Inteligente de Times
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {confirmedPlayers.length} jogadores confirmados para o sorteio.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm font-semibold text-slate-700">Qtd. de Times:</label>
          <select
            value={numberOfTeams}
            onChange={(e) => setNumberOfTeams(Number(e.target.value))}
            className="p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800"
          >
            <option value={2}>2 Times</option>
            <option value={3}>3 Times</option>
            <option value={4}>4 Times</option>
          </select>

          <Button
            onClick={handleDraw}
            disabled={confirmedPlayers.length === 0}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 px-5 py-2.5 rounded-xl shadow-md"
          >
            <Shuffle className="w-4 h-4" />
            Sortear
          </Button>
        </div>
      </div>

      {teams.length > 0 ? (
        <div className="space-y-6">
          <div className="flex justify-end">
            <Button
              onClick={handleCopyWhatsApp}
              variant="outline"
              className="gap-2 border-slate-300 hover:bg-emerald-50 hover:text-emerald-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copiado!" : "Copiar para WhatsApp"}
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push(`/admin/events/${eventId}`)}
              className="text-slate-600 border-slate-300 hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
                  <h3 className="font-extrabold text-lg flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    {team.name}
                  </h3>
                </div>
                <ul className="divide-y divide-slate-100 p-2">
                  {team.players.map((player) => (
                    <li key={player.id} className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 rounded-lg">
                      <span className="font-semibold text-slate-800 text-sm">
                        {player.position === "GOALKEEPER" && "🧤 "}
                        {player.name}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                        {player.position}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
          <Users className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p className="font-medium text-slate-600">
            {confirmedPlayers.length === 0 ? "Ninguém confirmou presença ainda." : "Nenhum sorteio realizado ainda."}
          </p>
        </div>
      )}
    </div>
  );
}