import type { Event } from "@/lib/event";
import { formatMilitaryTime } from "@/lib/event";
import Link from "next/link";
import { useRef } from "react";
import { useAtom } from "jotai";
import { pickedUpBoxAtom, pickedUpEventAtom } from "@/lib/state";

export function EventCard({ event }: { event: Event }) {
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
