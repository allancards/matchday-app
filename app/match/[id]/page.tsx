import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MapPin, Calendar, Clock, CheckCircle2, XCircle } from "lucide-react";
import { AttendanceModal } from "./_components/attendance-modal";

export default async function PublicMatchPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Busca o evento com as presenças confirmadas
  const {id} = await params;
  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      attendances: {
        include: {
          player: true,
        },
      },
    },
  });

  // 2. Busca a lista de todos os jogadores para popular o Select no Modal
  const allPlayers = await prisma.player.findMany({
    orderBy: { name: "asc" },
  });

  if (!event) {
    notFound();
  }

  const going = event.attendances.filter((a) => a.status === "GOING");
  const notGoing = event.attendances.filter((a) => a.status === "NOT_GOING");

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      {/* Header do Evento */}
      <div className="bg-emerald-600 px-4 pt-12 pb-24 rounded-b-[40px] shadow-lg relative">
        <div className="max-w-xl mx-auto text-center">
          <span className="bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 inline-block">
            ⚽ Convocação Oficial
          </span>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">
            {event.title}
          </h1>
          
          <div className="flex flex-col items-center gap-2 mt-6 text-emerald-50">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="w-4 h-4" />
              {format(new Date(event.date), "EEEE, dd 'de' MMMM", { locale: ptBR })}
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <Clock className="w-4 h-4" />
              {format(new Date(event.date), "HH:mm", { locale: ptBR })}
            </div>
            {event.location && (
              <div className="flex items-center gap-2 text-sm font-medium mt-1 bg-emerald-700/50 px-3 py-1.5 rounded-lg">
                <MapPin className="w-4 h-4" />
                {event.location}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 -mt-12 space-y-6">
        
        {/* Card de Ação com o Modal */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 text-center">
          <h2 className="text-lg font-bold text-slate-800 mb-1">Vai participar?</h2>
          <p className="text-sm text-slate-500 mb-5">Confirme ou recuse sua presença na lista abaixo.</p>
          
          {/* Componente Modal */}
          <AttendanceModal eventId={event.id} players={allPlayers} />
        </div>

        {/* Confirmados */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-5 py-4 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Confirmados
            </h3>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
              {going.length}
            </span>
          </div>
          
          {going.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              Ninguém confirmou presença ainda.
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {going.map((attendance, index) => (
                <li key={attendance.id} className="px-5 py-3.5 flex items-center gap-3">
                  <span className="text-slate-300 font-bold text-sm w-5 text-right">{index + 1}.</span>
                  <span className="font-semibold text-slate-700">{attendance.player.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Fora da pelada */}
        {notGoing.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-5 py-4 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-400" />
                Estão fora
              </h3>
              <span className="bg-rose-50 text-rose-600 text-xs font-bold px-2.5 py-1 rounded-full">
                {notGoing.length}
              </span>
            </div>
            <ul className="divide-y divide-slate-100">
              {notGoing.map((attendance) => (
                <li key={attendance.id} className="px-5 py-3 flex items-center gap-3 opacity-60">
                  <span className="font-medium text-slate-600 line-through decoration-slate-300">
                    {attendance.player.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}