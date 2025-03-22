"use client"
import type { Event, EventsByDate } from "@/lib/event";
import { formatDate } from "@/lib/date";
import { TouchEventHandler, useRef, useState, useEffect } from "react";
import { useAtom } from "jotai";
import { eventsAtom, pickedUpEventAtom } from "@/lib/state";
import { EventCard } from "@/components/event-card";

const MIN_DRAG = 100;

export interface ScheduleProps {
  date: string;
  events: Event[];
  swipable?: boolean;
  onNavigateRight?: () => void;
  onNavigateLeft?: () => void;

  // we use the same animation logic that the week uses
  slideDirection?: "left" | "right";
  slideNumber: number;
}

export function Schedule({ date, events, swipable, onNavigateLeft, onNavigateRight, slideDirection, slideNumber }: ScheduleProps) {
  const [allEvents, setEvents] = useAtom(eventsAtom);
  const [pickedUp, setPickedUp] = useAtom(pickedUpEventAtom);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [swipeOffset, setSwipeOffset] = useState<number>(0);
  const [swiping, setSwiping] = useState<boolean>(false);

  const animationClass = slideDirection === undefined ? "" : `schedule-slide-${slideDirection}`;
  const ref = useRef<HTMLDivElement | null>(null);

  const sortedEvents = [...events].sort((a, b) => {
    return parseInt(a.time) - parseInt(b.time);
  });


  const playAnimation = () => {
    const element = ref.current;
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

  const onTouchStart: TouchEventHandler = (e) => {
    if (!swipable) return;

    setSwiping(true);
    setTouchStart(e.targetTouches[0].clientX);

  }

  const onTouchMove: TouchEventHandler = (e) => {
    if (!swipable || !swiping) return;

    const current = e.targetTouches[0].clientX;
    setSwipeOffset(current - touchStart);
    setTouchEnd(current);
  }

  const onTouchEnd: TouchEventHandler = () => {
    if (!swipable || !swiping) return;

    const distance = touchEnd - touchStart;

    console.log(`Finished ${distance} long drag`);

    setSwiping(false);
    setSwipeOffset(0);
    setTouchEnd(0);
    setTouchStart(0);

    if (Math.abs(distance) >= MIN_DRAG) {
      if (Math.sign(distance) === -1 && onNavigateRight) {
        onNavigateRight();
      } else if (onNavigateLeft) {
        onNavigateLeft();
      }
    }
  }

  const scale = swiping ? -(1 / 100) * Math.sqrt(Math.abs(swipeOffset)) + 1 : 1;

  return (
    <div className={animationClass} ref={ref}>
      <div
        className="min-w-[250x] max-w-[250px] h-full mx-auto p-4"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          transform: `translateX(${swipeOffset}px) scale(${scale})`,
        }}
      >
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
    </div>
  )

}


