"use client"

import React, { useState, TouchEventHandler } from "react"

interface SwipeableProps {
  children: React.ReactNode,
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  enableSwipe?: boolean,
}
const minSwipeDistance = 50;

export function Swipeable({ children, onSwipeLeft, onSwipeRight, enableSwipe }: SwipeableProps) {
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [swiping, setSwiping] = useState<boolean>(false);
  const [swipeOffset, setSwipeOffset] = useState(0);

  const onTouchStart: TouchEventHandler = (e) => {
    if (!enableSwipe) {
      return;
    }

    setTouchStart(e.targetTouches[0].clientX);
    setSwiping(true);
    setSwipeOffset(0);
  }

  const onTouchMove: TouchEventHandler = (e) => {
    if (!touchStart || !enableSwipe) return;

    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);

    // Calculate offset for visual feedback during swipe
    const offset = currentTouch - touchStart;
    setSwipeOffset(offset);
  }

  const onTouchEnd: TouchEventHandler = () => {
    setSwiping(false);
    setSwipeOffset(0);

    if (!touchStart || !touchEnd || !enableSwipe) return;

    const distance = touchEnd - touchStart;
    const isLeftSwipe = distance < -minSwipeDistance;
    const isRightSwipe = distance > minSwipeDistance;

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    } else if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }

    setTouchStart(0);
    setTouchEnd(0);
  }

  return (
    <div
      className="relative w-full h-full"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        transform: swiping ? `translateX(${swipeOffset}px)` : 'translateX(0)',
        transition: swiping ? 'none' : 'transform 0.3s ease-out'
      }}
    >
      {children}
    </div>
  );
}

interface SwipableCarouselProps<T> {
  items: T[],
  renderItem: (arg0: {
    item: T,
    index: number,
    isActive: boolean,
    isPrevious: boolean,
    isNext: boolean,
  }) => React.ReactNode,
  title?: string,
  subtitle?: string,
}

export function SwipableCarousel<T>({ items, renderItem, title, subtitle }: SwipableCarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto h-full">
      {(title || subtitle) && (
        <div className="text-center mb-4 mt-2">
          {title && <h2 className="text-xl font-bold">{title}</h2>}
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      )}

      {/* Cards container */}
      <div className="relative w-full h-96 overflow-hidden">
        <Swipeable
          onSwipeLeft={currentIndex < items.length - 1 ? goToNext : undefined}
          onSwipeRight={currentIndex > 0 ? goToPrevious : undefined}
          enableSwipe={true}
        >
          <div className="relative w-full h-full">
            {items.map((item, index) => {
                return renderItem({
                  item,
                  index,
                  isActive: index === currentIndex,
                  isPrevious: index === currentIndex - 1,
                  isNext: index === currentIndex + 1,
                });
            })}
          </div>
        </Swipeable>
      </div>

      {/* Navigation controls */}
      <div className="flex justify-between items-center w-full mt-6">
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className={`px-4 py-2 rounded-full ${currentIndex === 0 ? 'bg-gray-200 text-gray-400' : 'bg-gray-800 text-white'}`}
        >
          Previous
        </button>

        <button
          onClick={goToNext}
          disabled={currentIndex === items.length - 1}
          className={`px-4 py-2 rounded-full ${currentIndex === items.length - 1 ? 'bg-gray-200 text-gray-400' : 'bg-gray-800 text-white'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
