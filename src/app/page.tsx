"use client"
import { WeekHeader } from "@/components/header";
import { WeekView } from "@/components/week";
import { getDaysInWeek } from "@/lib/date";
import type { EventsByDate } from "@/lib/event";
import { eventsAtom } from "@/lib/state";
import { useAtomValue } from "jotai";
import { useState } from "react";

export default () => {
  const events = useAtomValue(eventsAtom);

  // we start here since that's where the mock data is
  // could easily be adjusted to start at the current
  // date by default
  const [week, setWeek] = useState<number>(11);
  const [year, setYear] = useState<number>(2024);


  const datesInWeek = getDaysInWeek(year, week);

  const eventsForThisWeek: EventsByDate = {};
  for (const date of datesInWeek) {
    eventsForThisWeek[date] = events[date] ?? [];
  }

  return (
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
        onAddEvent={() => { }} 
      />
      <WeekView events={eventsForThisWeek} />
    </div>
  );
}

