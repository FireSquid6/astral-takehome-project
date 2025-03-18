import { pickedUpEventAtom, pickedUpBoxAtom } from "@/lib/state";
import { formatMilitaryTime } from "@/lib/event";
import { useAtom, useAtomValue } from "jotai";

export function FloatingEvent() {
  const box = useAtomValue(pickedUpBoxAtom);
  const [event, setEvent] = useAtom(pickedUpEventAtom);

  if (event === null) {
    return <></>
  }
  console.log(box);

  const drop = () => {
    setEvent(null);
  }

  // TODO: duplicated code from EventView
  // this will be made into a unified component at some point once
  // I fully understand what code is repeated in each
  return (
    <div className="z-50 rotate-animation rounded-lg overflow-hidden shadow-md bg-white w-full transition-transform duration-200" style={{
      top: `${box.top}px`,
      left: `${box.left}px`,
      width: `${box.width}px`,
      height: `${box.height}px`,
      position: "absolute",
    }}>
      <div className="relative">
        <div>
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-48 object-cover"
          />
        </div>

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 font-medium px-3 py-1 rounded-full shadow-sm">
          {formatMilitaryTime(event.time)}
        </div>
        <div className="absolute top-3 left-3 flex flex-col">
          <button onClick={drop} className="bg-white/90 p-1 rounded-full hover:bg-white-300 hover:scale-110 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {event.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3">
          {event.description}
        </p>
      </div>
    </div>
  )
}
