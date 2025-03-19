"use client"
import { AddEventModal } from "@/components/add-event";
import { FloatingEvent } from "@/components/floating-event";
import { WeekHeader } from "@/components/header";
import { WeekView } from "@/components/week";
import { getWeekOf } from "@/lib/date";
import type { EventsByDate, Event } from "@/lib/event";
import { eventsAtom } from "@/lib/state";
import { useAtom } from "jotai";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export default () => {
  const [events, setEvents] = useAtom(eventsAtom);

  // slide number is incremented so that we can always replay the animation
  const [lastSlide, setLastSlide] = useState<undefined | "left" | "right">(undefined);
  const [slideNumber, setSlideNumber] = useState<number>(0);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // we start here since that's where the mock data is
  // could easily be adjusted to start at the current
  // date by default
  const [datesInWeek, setDatesInWeek] = useState<string[]>(
    getWeekOf(new Date("2024-03-14"))
  )

  const eventsForThisWeek: EventsByDate = {};
  for (const date of datesInWeek) {
    eventsForThisWeek[date] = events[date] ?? [];
  }

  const addEvent = (event: Omit<Event, "id">, date: string) => {
    const id = uuid();
    const newEvents = {...events};

    if (newEvents[date] === undefined) {
      newEvents[date] = [{ ...event, id }];
    } else {
      newEvents[date].push({ ...event, id });
    }
    setEvents(newEvents);
  }

  return (
    <>
      <FloatingEvent />
      <AddEventModal
        isOpen={modalOpen}
        onAddEvent={addEvent}
        initialDate={datesInWeek[0]}
        onClose={() => {
          setModalOpen(false);
        }}
      />

      <div className="flex flex-col">

        <WeekHeader
          first={datesInWeek[0]}
          last={datesInWeek[6]}
          onPrevious={() => {
            const prevMonday = new Date(datesInWeek[0]);
            prevMonday.setUTCDate(prevMonday.getUTCDate() - 8);
            setDatesInWeek(getWeekOf(prevMonday));

            setLastSlide("left");
            setSlideNumber(slideNumber === 100 ? 0 : slideNumber + 1);
          }}
          onNext={() => {
            const nextMonday = new Date(datesInWeek[0]);
            nextMonday.setUTCDate(nextMonday.getUTCDate() + 8);
            console.log(nextMonday);
            setDatesInWeek(getWeekOf(nextMonday));

            setLastSlide("right");
            setSlideNumber(slideNumber === 100 ? 0 : slideNumber + 1);
          }}
          onAddEvent={() => {
            setModalOpen(true);
          }}
        />
        <WeekView events={eventsForThisWeek} slideDirection={lastSlide} slideNumber={slideNumber} />
      </div>
    </>
  );
}

