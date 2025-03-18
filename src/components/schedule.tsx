"use client"
import type { Event, EventsByDate } from "@/lib/event";
import { formatMilitaryTime } from "@/lib/event";
import { formatDate } from "@/lib/date";
import Link from "next/link";
import { useRef } from "react";
import { useAtom } from "jotai";
import { eventsAtom, pickedUpBoxAtom, pickedUpEventAtom } from "@/lib/state";

export function Schedule({ date, events }: { date: string, events: Event[] }) {
  const [allEvents, setEvents] = useAtom(eventsAtom);
  const [pickedUp, setPickedUp] = useAtom(pickedUpEventAtom);

  const sortedEvents = [...events].sort((a, b) => {
    return parseInt(a.time) - parseInt(b.time);
  });

  const onDropTo = () => {
    console.log("dropped to ", date);
    if (pickedUp === null) {
      throw new Error("onDropTo called when there is no floating event");
    }

    // move the picked up date
    // first, clone events but without the picked up
    // event
    const newEvents: EventsByDate = {};
    for (const d in allEvents) {
      newEvents[d] = [];
      for (const e of allEvents[d]) {
        if (e.id !== pickedUp?.id) {
          newEvents[d].push(e);
        }
      }
    }

    // add the picked up event where its supposed to be
    if (newEvents[date] === undefined) {
      newEvents[date] = [];
    }
    newEvents[date].push(pickedUp);

    setEvents(newEvents);
    setPickedUp(null);
  }

  return (
    <div className="min-w-[250x] max-w-[250px] mx-auto p-4">
      <button disabled={pickedUp === null} onClick={onDropTo}>
        <h2 className={`text-2xl font-bold mb-6 transition-all ${pickedUp === null ? "text-gray-800" : "border-b-2 text-blue-400 hover:scale-105 hover:text-blue-500"
          }`}>
          {formatDate(date)}
        </h2>
      </button>
      {sortedEvents.length > 0 ? (
        <div className="space-y-4">
          {
            sortedEvents.map((event, i) => (
              <div key={i} className="top-animation" style={{
                animationDelay: `${100 * i}ms`,
              }}>
                <EventView event={event} />
              </div>
            ))
          }

        </div>
      ) : (
        <div className="space-y-4 text-center py-8 text-gray-500">
          No events for today. Enjoy your rest!
        </div>
      )}
    </div>
  )

}


export function EventView({ event }: { event: Event }) {
  const [_, setPickedUpBox] = useAtom(pickedUpBoxAtom);
  const [pickedUpEvent, setPickedUpEvent] = useAtom(pickedUpEventAtom);

  const ref = useRef<HTMLDivElement | null>(null);
  const pickUp = () => {
    const element = ref.current
    if (element === null) {
      throw new Error("you forgot to assign the ref");
    }

    const box = element.getBoundingClientRect();
    setPickedUpBox({
      top: box.top,
      left: box.left,
      width: box.width,
      height: box.height
    });
    setPickedUpEvent(event);
  }

  const unfocused = pickedUpEvent !== null && pickedUpEvent.id !== event.id;

  return (
    <div ref={ref} className={`rounded-lg overflow-hidden shadow-md bg-white w-full max-w-sm transition-transform duration-200 hover:scale-102 hover:shadow-lg ${unfocused ? "scale-95 brightness-90 pointer-events-none" : ""}`}>
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
          <button disabled={pickedUpEvent !== null} onClick={pickUp} className="bg-white/90 p-1 rounded-full hover:bg-white-300 hover:scale-110 transition-all">
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
