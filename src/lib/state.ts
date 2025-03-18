import { atom } from "jotai";
import { Event, startingEvents } from "./event";

// handled
export const isMobileAtom = atom<boolean>(false);

// core state for all events
export const eventsAtom = atom(startingEvents);

// handle pickup up and dropping events
export const pickedUpEventAtom = atom<Event | null>(null);
// we would use the dom rect here but it doesn't work with next js
interface ElementRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const pickedUpBoxAtom = atom<ElementRect>({ top: 0, left: 0, width: 0, height: 0 });


