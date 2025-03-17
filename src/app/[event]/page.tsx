"use client"
import { EventDetails } from "@/components/details";
import { eventsAtom } from "@/lib/state";
import { useAtomValue } from "jotai";
import { use } from "react"

export default ({ params }: { params: Promise<{ event: string }> }) => {
  const events = useAtomValue(eventsAtom);
  const p = use(params);

  for (const key in events) {
    const list = events[key];

    for (const event of list) {
      if (event.id === p.event) {
        return (
          <EventDetails event={event} />
        )
      }
    }
  }
  
  return (
    <p>Event not found</p>
  )
}
