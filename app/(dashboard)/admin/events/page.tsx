import { getEvents } from "@/app/actions/event";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Calendar, MapPin, Users, Goal } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function EventsPage() {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const events = await getEvents();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">⚽ Eventos</h1>
        <Link href="/admin/events/new">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded inline-flex items-center gap-2">
            <Plus className="h-4 w-4" /> Novo Evento
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => {
          const going = event.attendances.filter(a => a.status === "GOING").length;
          const totalGoals = event.goals.length;
          return (
            <Link key={event.id} href={`/admin/events/${event.id}`}>
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{format(new Date(event.date), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" /> {going} confirmados
                    </span>
                    <span className="flex items-center gap-1">
                      <Goal className="h-4 w-4" /> {totalGoals} gols
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
        {events.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            Nenhum evento criado. <Link href="/admin/events/new" className="text-blue-600 hover:underline">Crie o primeiro!</Link>
          </div>
        )}
      </div>
    </div>
  );
}