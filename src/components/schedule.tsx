"use client"
import type { Event } from "@/lib/event";
import { formatMilitaryTime } from "@/lib/event";
import { formatDate } from "@/lib/date";
import Link from "next/link";

export function Schedule({ date, events }: { date: string, events: Event[] }) {
  const sortedEvents = [...events].sort((a, b) => {
    return parseInt(a.time) - parseInt(b.time);
  });

  return (
    <div className="min-w-[300x] max-w-[300px] mx-auto p-4">
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
          No events for today. Enjoy your rest!
        </div>
      )}
    </div>
  )

}


export function EventView({ event }: { event: Event }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-md bg-white w-full max-w-sm transition-transform duration-200 hover:scale-102 hover:shadow-lg">
      <div className="relative">
        <Link href={`/${event.id}`}>
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-48 object-cover"
          />
        </Link>

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 font-medium px-3 py-1 rounded-full shadow-sm">
          {formatMilitaryTime(event.time)}
        </div>
        <div className="absolute top-3 left-3 flex flex-col">
          <button className="bg-white/90 p-1 rounded-full hover:bg-white-300 hover:scale-110 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
          </button>
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
