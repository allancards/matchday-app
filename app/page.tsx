import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Users,
  Trophy,
  CalendarCheck,
  Shuffle,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  QrCode,
  Sparkles,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* --- NAVBAR --- */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-bold text-lg shadow-lg shadow-emerald-500/20">
              ⚽
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              Match<span className="text-emerald-400">Day</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                Entrar
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-500/10">
                Acessar Painel
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        {/* Efeito Glow de fundo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Gestão inteligente de rachas e futebol
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
            A forma moderna de organizar o seu <span className="text-emerald-400">futebol da semana</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Elimine a bagunça no grupo do WhatsApp. Confirmação de presença via link público, sorteio de times por posição e estatísticas de artilharia em tempo real.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/match/cmsjdea2b00051075kk7g1scq" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-8 py-6 text-base rounded-xl shadow-xl shadow-emerald-500/20 gap-2">
                Ver Demonstração
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Destaque rápido */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-slate-400 text-sm font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Sem cadastro para jogadores
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Link direto no WhatsApp
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Painel Admin completo
            </span>
          </div>
        </div>
      </section>

      {/* --- RECURSOS (BENEFÍCIOS) --- */}
      <section className="py-20 bg-slate-900/50 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Tudo o que sua pelada precisa em um só lugar
            </h2>
            <p className="text-slate-400">
              Desenvolvido para simplificar a vida do organizador e dos atletas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Convocação & Presença</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Gere um link para cada jogo. O jogador clica, seleciona seu nome e marca presença instantaneamente, sem precisar logar.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
                <Shuffle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Sorteio de Times Inteligente</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Chega de times desequilibrados. Algoritmo que separa os times considerando posições e histórico de cada jogador.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Artilharia & Assistências</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Súmula digital do jogo. Acompanhe o ranking dos artilheiros da temporada e os líderes em assistências.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- COMO FUNCIONA --- */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Como funciona em 3 passos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold flex items-center justify-center mb-4 border border-emerald-500/30">
                1
              </div>
              <h4 className="font-bold text-white mb-1">Cadastre a Pelada</h4>
              <p className="text-slate-400 text-sm">Crie o evento no painel com data, hora e local do campo.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold flex items-center justify-center mb-4 border border-emerald-500/30">
                2
              </div>
              <h4 className="font-bold text-white mb-1">Mande no WhatsApp</h4>
              <p className="text-slate-400 text-sm">Envie o link público para a galera confirmar a lista de presença.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold flex items-center justify-center mb-4 border border-emerald-500/30">
                3
              </div>
              <h4 className="font-bold text-white mb-1">Rola a Bola!</h4>
              <p className="text-slate-400 text-sm">Gere os times e registre os gols durante ou após o jogo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER / PORTFÓLIO BANNER --- */}
      <footer className="border-t border-slate-800/80 py-12 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-white">MatchDay</span>
            <span className="text-xs text-slate-500">| Projeto para Portfólio</span>
          </div>

          <p className="text-xs text-slate-500 text-center md:text-right">
            Desenvolvido com Next.js (App Router), Tailwind CSS e Prisma ORM.
          </p>
        </div>
      </footer>

    </div>
  );
}