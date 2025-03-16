"use client"
import type { Event } from "@/lib/event";
import { formatDate, formatMilitaryTime } from "@/lib/event";

export function Schedule({ date, events }: { date: string, events: Event[] }) {
  const sortedEvents = [...events].sort((a, b) => {
    return parseInt(a.time) - parseInt(b.time);
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {formatDate(date)}
      </h2>
      {sortedEvents.length > 0 ? (
        <div className="space-y-4">
          {
            sortedEvents.map((event) => (
              <EventView key={event.id} event={event} />
            ))
          }

        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          Nothing for today. Enjoy some rest!
        </div>
      )}
    </div>
  )

}


export function EventView({ event }: { event: Event }) {

  return (
    <div className="rounded-lg overflow-hidden shadow-md bg-white w-full max-w-sm transition-transform duration-200 hover:scale-102 hover:shadow-lg">
      <div className="relative">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-48 object-cover"
        />

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 font-medium px-3 py-1 rounded-full shadow-sm">
          {formatMilitaryTime(event.time)}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {event.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3">
          {event.description}
        </p>
      </div>
    </div>
  );

}
