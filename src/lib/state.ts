import { atom } from "jotai";
import { Event, startingEvents } from "./event";

// While using "Atom" as a suffix to each of these names seems redundant
// it's actually helpful

// we would use the dom rect here but it doesn't work with next js
interface ElementRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const eventsAtom = atom(startingEvents);
export const isMobileAtom = atom<boolean>(false);

// handle pickup up and dropping events
export const pickedUpEventAtom = atom<Event | null>(null);
export const pickedUpBoxAtom = atom<ElementRect>({ top: 0, left: 0, width: 0, height: 0 });

