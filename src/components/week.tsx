"use client"
import { EventsByDate } from "@/lib/event";
import { useState, useRef, useEffect } from "react";
import { Schedule } from "./schedule";
import { useAtomValue } from "jotai";
import { isMobileAtom } from "@/lib/state";


function formatDayButton(dateString: string): string {
  const date = new Date(dateString);
  const weekdays = ["S", "M", "Tu", "W", "Th", "F", "S"]
  let dayOfMonth = date.getUTCDate().toString();

  if (dayOfMonth.length === 1) {
    dayOfMonth = "0" + dayOfMonth;
  }

  return weekdays[date.getUTCDay()] + " " + dayOfMonth;
};


interface WeekViewProps {
  events: EventsByDate,
  slideDirection?: "left" | "right",
  slideNumber?: number,
  onNext?: () => void,
  onPrevious?: () => void

}

export function WeekView({ events, slideDirection, slideNumber, onNext, onPrevious }: WeekViewProps) {
  const dates = Object.keys(events);

  const [selectedDate, setSelectedDate] = useState<string>(dates[0] || "");
  const isMobile = useAtomValue(isMobileAtom);
  const desktopRef = useRef<HTMLDivElement | null>(null);

  const animationClass = slideDirection === undefined ? "" : `week-slide-${slideDirection}`;

  const playAnimation = () => {
    const element = desktopRef.current;
    if (element === null) {
      return;
    }


    const animations = element.getAnimations();

    for (const animation of animations) {
      animation.cancel();
      animation.play();
    }
  }

  useEffect(() => {
    if (slideDirection !== undefined) {
      playAnimation();
    }
  }, [slideDirection, slideNumber]);




  useEffect(() => {
    if (dates.length > 0 && !dates.includes(selectedDate)) {
      setSelectedDate(dates[0]);
    }
  }, [dates, selectedDate]);

  const onNavigate = (direction: number) => {
    let position = dates.findIndex((date) => date === selectedDate);

    // this should be impossible!
    if (position === -1) {
      throw new Error("State is so incredibly screwed I can't even describe what this error is");
    }

    let nextPosition = position + direction;

    if (nextPosition < 0) {
      nextPosition = 0;
      if (onPrevious) onPrevious();
    }

    if (nextPosition >= dates.length) {
      nextPosition = dates.length - 1;
      if (onNext) onNext();
    }

    setSelectedDate(dates[nextPosition]);
  }


  return (
    <div className="mx-auto">
      {isMobile && (
        <>
          <div className="flex w-full overflow-x-auto">
            <div className="flex overflow-x-auto p-2 mb-4 bg-white sticky top-0 z-10 mx-auto shadow-sm">
              {dates.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-2 py-1 mx-1 rounded-full flex-shrink-0 transition-colors duration-200 
                  ${selectedDate === date
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {formatDayButton(date)}
                </button>
              ))}
            </div>
          </div>

          {/* Show the selected day */}
          <div className="transition-opacity flex flex-col duration-300 overflow-hidden">
            <div className="mx-auto">
              <Schedule 
                onNavigateRight={() => {
                  onNavigate(1);
                }}
                onNavigateLeft={() => {
                  onNavigate(-1);
                }}
                swipable 
                date={selectedDate} 
                events={events[selectedDate] || []} 
              />
            </div>
          </div>
        </>
      )}

      {/* Desktop View with All Days */}
      {!isMobile && (
        <div ref={desktopRef} className={`flex flex-row ${animationClass}`}>
          {dates.map((date) => (
            <div key={date} className="pb-6 mb-6">
              <Schedule date={date} events={events[date]} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
