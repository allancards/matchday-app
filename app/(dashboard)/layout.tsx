import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Users, LogOut, LayoutDashboard, Shield } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  // Gera as iniciais do nome do usuário caso ele não tenha foto de perfil
  const userInitials = session.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-50/50 flex flex-col gap-6 font-sans antialiased">
      {/* Header Fixo com Blur */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo e Navegação Principal */}
            <div className="flex items-center gap-8">
              <Link href="/admin" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-lg shadow-sm group-hover:scale-105 transition-transform duration-200">
                  ⚽
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                    MatchDay
                  </span>
                  <span className="text-[10px] font-bold tracking-wider text-emerald-600 uppercase -mt-1 flex items-center gap-0.5">
                    <Shield className="w-2.5 h-2.5 inline" /> Admin
                  </span>
                </div>
              </Link>

              {/* Links do Menu (Visíveis em telas médias e grandes) */}
              <nav className="hidden md:flex items-center gap-1">
                <Link
                  href="/admin"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-slate-400" />
                  Dashboard
                </Link>
                <Link
                  href="/admin/events"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-slate-400" />
                  Eventos
                </Link>
                <Link
                  href="/admin/players"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <Users className="w-4 h-4 text-slate-400" />
                  Jogadores
                </Link>
              </nav>
            </div>

            {/* Perfil e Botão Sair */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 pr-2 sm:border-r sm:border-slate-200">
                {/* Foto do Google ou Iniciais */}
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "Avatar"}
                    className="w-8 h-8 rounded-full border border-slate-200 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center border border-emerald-200">
                    {userInitials}
                  </div>
                )}

                <div className="hidden sm:flex flex-col">
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    {session.user?.name}
                  </span>
                  <span className="text-[10px] text-slate-400 leading-tight truncate max-w-[130px]">
                    {session.user?.email}
                  </span>
                </div>
              </div>

              {/* Ação de Logout */}
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  type="submit"
                  className="text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg gap-1.5 text-xs font-semibold transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sair</span>
                </Button>
              </form>
            </div>

          </div>
        </div>
      </header>

      {/* Conteúdo Renderizado da Página (`page.tsx`) */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}