"use client"
import { AddEventModal } from "@/components/add-event";
import { WeekHeader } from "@/components/header";
import { WeekView } from "@/components/week";
import { getDaysInWeek } from "@/lib/date";
import type { EventsByDate, Event } from "@/lib/event";
import { eventsAtom } from "@/lib/state";
import { useAtom } from "jotai";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export default () => {
  const [events, setEvents] = useAtom(eventsAtom);

  // we start here since that's where the mock data is
  // could easily be adjusted to start at the current
  // date by default
  const [week, setWeek] = useState<number>(11);
  const [year, setYear] = useState<number>(2024);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const datesInWeek = getDaysInWeek(year, week);

  const eventsForThisWeek: EventsByDate = {};
  for (const date of datesInWeek) {
    eventsForThisWeek[date] = events[date] ?? [];
  }

  const addEvent = (event: Omit<Event, "id">, date: string) => {
    const id = uuid();

    console.log(id);
    console.log(event);
    console.log(date);
  }

  return (
    <>
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
          weekNumber={week}
          year={year}
          onPrevious={() => {
            if (week - 1 > 0) {
              setWeek(week - 1)
            } else {
              setWeek(52);
              setYear(year - 1)
            }
          }}
          onNext={() => {
            if (week + 1 <= 52) {
              setWeek(week + 1)
            } else {
              setWeek(1);
              setYear(year + 1);
            }
          }}
          onAddEvent={() => {
            setModalOpen(true);
          }}
        />
        <WeekView events={eventsForThisWeek} />
      </div>
    </>
  );
}

