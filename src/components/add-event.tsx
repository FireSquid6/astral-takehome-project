import { useState, useEffect, useRef } from "react";
import type { Event } from "@/lib/event";


interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: Omit<Event, "id">, date: string) => void;
  initialDate?: string; // Optional pre-selected date
}


export function AddEventModal({ isOpen, onClose, onAddEvent, initialDate }: AddEventModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("https://placehold.co/600x400");
  const [date, setDate] = useState(initialDate ?? "");
  const [time, setTime] = useState("0900"); // Default to 9:00 AM

  const modalRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDescription('');
      setImageUrl('');
      setTime('0900');

      setTimeout(() => {
        initialFocusRef.current?.focus();
      }, 10);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && isOpen) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const convertToMilitaryTime = (timeString: string): string => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}${minutes}`;
  };

  const convertFromMilitaryTime = (militaryTime: string): string => {
    const hours = militaryTime.substring(0, 2);
    const minutes = militaryTime.substring(2, 4);
    return `${hours}:${minutes}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !imageUrl.trim() || !time) {
      alert('Please fill out all fields');
      return;
    }

    onAddEvent({
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      time
    }, date);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 id="modal-title" className="text-xl font-bold text-gray-800">
            Add New Event
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="event-title" className="block text-sm font-medium text-gray-700 mb-1">
                Event Title *
              </label>
              <input
                ref={initialFocusRef}
                id="event-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter event title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="event-description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="event-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter event description"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="event-description" className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                id="event-description"
                value={date}
                type="date"
                onChange={(e) => setDate(e.target.value)}
                placeholder="Enter date for the event"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="event-image" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL *
              </label>
              <input
                id="event-image"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="event-time" className="block text-sm font-medium text-gray-700 mb-1">
                Time *
              </label>
              <input
                id="event-time"
                type="time"
                value={convertFromMilitaryTime(time)}
                onChange={(e) => setTime(convertToMilitaryTime(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
