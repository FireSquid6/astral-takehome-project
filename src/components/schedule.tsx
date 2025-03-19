"use client"
import type { Event, EventsByDate } from "@/lib/event";
import { formatDate } from "@/lib/date";
import { useAtom } from "jotai";
import { eventsAtom, pickedUpEventAtom } from "@/lib/state";
import { EventCard } from "@/components/event-card";

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
    // first, clone events but without the picked up event
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
              <div key={i} className="top-animation">
                <EventCard event={event} date={date} />
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


