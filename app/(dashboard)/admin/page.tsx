import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Users,
  Calendar,
  Goal,
  Trophy,
  UserPlus,
  PlusCircle,
  MapPin,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session) redirect("/sign-in");

  // Buscar estatísticas em paralelo para performance
  const [
    totalPlayers,
    totalEvents,
    totalGoals,
    totalAttendances,
    upcomingEvents,
    topScorers,
  ] = await Promise.all([
    prisma.player.count({ where: { isActive: true } }),
    prisma.event.count(),
    prisma.goal.count(),
    prisma.attendance.count({ where: { status: "GOING" } }),
    prisma.event.findMany({
      where: { date: { gte: new Date() } },
      orderBy: { date: "asc" },
      take: 3,
      include: {
        attendances: true,
        goals: true,
      },
    }),
    prisma.goal
      .groupBy({
        by: ["playerId"],
        _count: { playerId: true },
        orderBy: { _count: { playerId: "desc" } },
        take: 3,
      })
      .then(async (result) => {
        const playerIds = result.map((r) => r.playerId);
        const players = await prisma.player.findMany({
          where: { id: { in: playerIds } },
          select: { id: true, name: true },
        });
        return result.map((r) => ({
          player: players.find((p) => p.id === r.playerId),
          goals: r._count.playerId,
        }));
      }),
  ]);

  const stats = [
    {
      label: "Jogadores Ativos",
      value: totalPlayers,
      icon: Users,
      color: "text-emerald-600 bg-emerald-500/10 border-emerald-200",
      link: "/admin/players",
    },
    {
      label: "Eventos Criados",
      value: totalEvents,
      icon: Calendar,
      color: "text-blue-600 bg-blue-500/10 border-blue-200",
      link: "/admin/events",
    },
    {
      label: "Gols Marcados",
      value: totalGoals,
      icon: Goal,
      color: "text-amber-600 bg-amber-500/10 border-amber-200",
      link: "/admin/events",
    },
    {
      label: "Presenças Confirmadas",
      value: totalAttendances,
      icon: UserPlus,
      color: "text-purple-600 bg-purple-500/10 border-purple-200",
      link: "/admin/events",
    },
  ];

  // Cores de pódio para o ranking de artilheiros
  const rankBadges = [
    "bg-amber-100 text-amber-800 border-amber-300 font-bold", // 1º lugar (Ouro)
    "bg-slate-200 text-slate-700 border-slate-300 font-bold", // 2º lugar (Prata)
    "bg-amber-700/10 text-amber-900 border-amber-700/20 font-bold", // 3º lugar (Bronze)
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Container Principal Centralizado */}
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                ⚽ Dashboard Matchday
              </h1>
            </div>
            <p className="text-slate-500 mt-1 text-sm sm:text-base">
              Bem-vindo de volta, <span className="font-semibold text-slate-700">{session.user?.name}</span>! Aqui está o resumo das suas peladas.
            </p>
          </div>
          <Link href="/admin/events/new" className="shrink-0">
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-5 rounded-xl shadow-sm hover:shadow transition-all duration-200 active:scale-[0.98]">
              <PlusCircle className="h-5 w-5" />
              <span>Novo Evento</span>
            </button>
          </Link>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <Link key={stat.label} href={stat.link} className="group block">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-black text-slate-900 mt-2 tracking-tight">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3.5 rounded-xl border ${stat.color} transition-transform group-hover:scale-110`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Seção Principal: Próximos Eventos e Artilheiros */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Próximos Eventos (2 Colunas) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-emerald-600" />
                  Próximos Eventos
                </h2>
                <Link
                  href="/admin/events"
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
                >
                  Ver todos <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {upcomingEvents.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-xl">
                  <p className="text-slate-400 text-sm">Nenhum evento agendado por enquanto.</p>
                  <Link
                    href="/admin/events/new"
                    className="inline-block mt-3 text-sm font-semibold text-emerald-600 hover:underline"
                  >
                    Criar primeira pelada →
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => {
                    const going = event.attendances.filter((a) => a.status === "GOING").length;
                    return (
                      <Link key={event.id} href={`/admin/events/${event.id}`} className="block group">
                        <div className="border border-slate-200/80 rounded-xl p-4 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all duration-200">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="space-y-1">
                              <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                                {event.title}
                              </h3>
                              <p className="text-xs font-medium text-slate-500">
                                {format(new Date(event.date), "EEEE, dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                              </p>
                              {event.location && (
                                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                                  {event.location}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-2 self-start sm:self-center">
                              <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                                {going} confirmados
                              </span>
                              <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                                {event.goals.length} gols
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Ranking de Artilheiros (1 Coluna) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  Top Artilheiros
                </h2>
                <Sparkles className="h-4 w-4 text-amber-400" />
              </div>

              {topScorers.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-xl">
                  <p className="text-slate-400 text-sm">Nenhum gol registrado ainda.</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {topScorers.map((item, index) => (
                    <li
                      key={item.player?.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs border ${
                            rankBadges[index] || "bg-slate-200 text-slate-600 border-slate-300"
                          }`}
                        >
                          {index + 1}º
                        </span>
                        <span className="font-semibold text-slate-800 text-sm">
                          {item.player?.name || "Desconhecido"}
                        </span>
                      </div>
                      <span className="bg-amber-500/10 text-amber-700 border border-amber-200/60 font-bold px-2.5 py-1 rounded-lg text-xs">
                        {item.goals} {item.goals === 1 ? "gol" : "gols"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link
              href="/admin/players"
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline block text-right mt-6"
            >
              Ver ranking completo →
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}