"use client"
import { EventsByDate } from "@/lib/event";
import { useState, useEffect } from "react";
import { Schedule } from "./schedule";


function formatDayButton(dateString: string): string {
  const date = new Date(dateString);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
  return weekdays[date.getUTCDay()] + " " + date.getUTCDate();
};

export function WeekView({ events }: { events: EventsByDate }) {
  const dates = Object.keys(events);

  const [selectedDate, setSelectedDate] = useState<string>(dates[0] || "");
  const [isMobile, setIsMobile] = useState<boolean>(false);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (dates.length > 0 && !dates.includes(selectedDate)) {
      setSelectedDate(dates[0]);
    }
  }, [dates, selectedDate]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Mobile View with Day Selector */}
      {isMobile && (
        <>
          <div className="flex overflow-x-auto p-2 mb-4 bg-white sticky top-0 z-10 shadow-sm">
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-4 py-2 mx-1 rounded-full flex-shrink-0 transition-colors duration-200 
                  ${selectedDate === date
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {formatDayButton(date)}
              </button>
            ))}
          </div>

          {/* Show the selected day */}
          <div className="transition-opacity duration-300">
            <Schedule date={selectedDate} events={events[selectedDate] || []} />
          </div>
        </>
      )}

      {/* Desktop View with All Days */}
      {!isMobile && (
        <div className="flex flex-row">
          {dates.map((date) => (
            <div key={date} className="border-b pb-6 mb-6 last:border-b-0">
              <Schedule date={date} events={events[date]} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
