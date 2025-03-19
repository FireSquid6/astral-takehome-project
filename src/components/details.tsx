import { Event } from "@/lib/event";
import Link from "next/link";
import { formatMilitaryTime } from "@/lib/event";

export function EventDetails({ event }: { event: Event }) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white min-h-screen flex flex-col">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm p-4 border-b">
        <Link
          href="/"
          className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
          aria-label="Go back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back</span>
        </Link>
      </div>

      <div className="w-full relative bg-gray-100">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full object-cover max-h-96"
        />

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 font-medium px-4 py-2 rounded-lg shadow-sm">
          {formatMilitaryTime(event.time)}
        </div>
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {event.title}
        </h1>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="text-sm uppercase text-gray-500 font-medium mb-2">
            Details
          </h2>
          <p className="text-gray-700 whitespace-pre-line">
            {event.description}
          </p>
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm uppercase text-gray-500 font-medium mb-1">
                Event ID
              </h2>
              <p className="text-gray-700">
                {event.id}
              </p>
            </div>

            <div className="text-right">
              <h2 className="text-sm uppercase text-gray-500 font-medium mb-1">
                Time
              </h2>
              <p className="text-gray-700 font-medium">
                {formatMilitaryTime(event.time)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
