import { atom } from "jotai";
import { Event, startingEvents } from "./event";

export const eventsAtom = atom(startingEvents);
export const pickedUpDateAtom = atom<Event | null>(null);
export const isMobileAtom = atom<boolean>(false);
