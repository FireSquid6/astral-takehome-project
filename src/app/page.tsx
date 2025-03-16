"use client"
import { Schedule } from "@/components/schedule";
import { eventsAtom } from "@/lib/state";
import { useAtomValue } from "jotai";

export default () => {
  const events = useAtomValue(eventsAtom);
  const dates = Object.getOwnPropertyNames(events);

  return (
    <div className="flex flex-col">
      {dates.map((date, i) => (
        <Schedule key={i} date={date} events={events[date]} />
      ))}
    </div>
  );
}

