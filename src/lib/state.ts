import { atom } from "jotai";
import { startingEvents } from "./event";

export const eventsAtom = atom(startingEvents);

export const isMobileAtom = atom<boolean>(false);
