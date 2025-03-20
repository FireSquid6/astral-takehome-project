"use client"

import { TouchEventHandler, useRef, useState, ReactNode, createContext, useContext, Children, useEffect } from "react"

// Context to manage active swipe card
interface SwipeContextType {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  totalItems: number;
}

const SwipeContext = createContext<SwipeContextType | null>(null);

export function useSwipe() {
  const context = useContext(SwipeContext);
  if (!context) {
    throw new Error("useSwipe must be used within a SwipeContainer");
  }
  return context;
}

interface SwipeContainerProps {
  children: ReactNode;
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
}

export function SwipeContainer({ children, initialIndex = 0, onIndexChange }: SwipeContainerProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const childrenArray = Children.toArray(children);
  
  // Update active index and call callback
  const updateActiveIndex = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, childrenArray.length - 1));
    setActiveIndex(clampedIndex);
    onIndexChange?.(clampedIndex);
  };
  
  useEffect(() => {
    updateActiveIndex(initialIndex);
  }, [initialIndex]);

  return (
    <SwipeContext.Provider 
      value={{ 
        activeIndex, 
        setActiveIndex: updateActiveIndex, 
        totalItems: childrenArray.length 
      }}
    >
      <div className="w-full overflow-hidden relative">
        {children}
      </div>
    </SwipeContext.Provider>
  );
}

interface SwipableProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  children: ReactNode;
  index: number;
}

export function Swipable({ onSwipeLeft, onSwipeRight, children, index }: SwipableProps) {
  const { activeIndex, setActiveIndex, totalItems } = useSwipe();
  const ref = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const currentTranslate = useRef(0);
  const isActive = activeIndex === index;
  
  // Threshold to trigger swipe (in pixels)
  const SWIPE_THRESHOLD = 50;
  // Animation duration (in ms)
  const TRANSITION_DURATION = 300;

  const onTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    touchStartX.current = e.touches[0].clientX;
    
    // Remove transition during drag
    if (ref.current) {
      ref.current.style.transition = 'none';
    }
  };

  const onTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    if (touchStartX.current === null || !isActive) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX.current;
    currentTranslate.current = diff;
    
    // Limit how far user can swipe
    const maxSwipe = window.innerWidth * 0.5;
    const limitedTranslate = Math.max(Math.min(diff, maxSwipe), -maxSwipe);
    
    // Apply translation
    if (ref.current) {
      ref.current.style.transform = `translateX(${limitedTranslate}px)`;
    }
  };

  const onTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    if (touchStartX.current === null || !isActive) return;
    
    // Add transition for smooth return or swipe
    if (ref.current) {
      ref.current.style.transition = `transform ${TRANSITION_DURATION}ms ease-out`;
    }
    
    if (currentTranslate.current > SWIPE_THRESHOLD) {
      // Swipe right
      if (index > 0) {
        setActiveIndex(index - 1);
        onSwipeRight?.();
      } else {
        resetPosition();
      }
    } else if (currentTranslate.current < -SWIPE_THRESHOLD) {
      // Swipe left
      if (index < totalItems - 1) {
        setActiveIndex(index + 1);
        onSwipeLeft?.();
      } else {
        resetPosition();
      }
    } else {
      // Return to original position
      resetPosition();
    }
    
    // Reset
    touchStartX.current = null;
    currentTranslate.current = 0;
  };
  
  const resetPosition = () => {
    if (ref.current) {
      ref.current.style.transform = 'translateX(0)';
    }
  };
  
  // Position the card based on active index
  useEffect(() => {
    if (ref.current) {
      if (isActive) {
        ref.current.style.transform = 'translateX(0)';
        ref.current.style.opacity = '1';
        ref.current.style.zIndex = '10';
      } else if (index < activeIndex) {
        // Card is to the left
        ref.current.style.transform = 'translateX(-100%)';
        ref.current.style.opacity = '0';
        ref.current.style.zIndex = '5';
      } else {
        // Card is to the right
        ref.current.style.transform = 'translateX(100%)';
        ref.current.style.opacity = '0';
        ref.current.style.zIndex = '5';
      }
    }
  }, [activeIndex, isActive, index]);

  return (
    <div 
      ref={ref}
      className="absolute top-0 left-0 w-full h-full transition-transform"
      style={{
        transform: isActive ? 'translateX(0)' : (index < activeIndex ? 'translateX(-100%)' : 'translateX(100%)'),
        opacity: isActive ? 1 : 0,
        transition: `transform ${TRANSITION_DURATION}ms ease-out, opacity ${TRANSITION_DURATION}ms ease-out`,
        zIndex: isActive ? 10 : 5
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </div>
  );
}

// Optional navigation component to use with SwipeContainer
interface SwipeNavigationProps {
  className?: string;
}

export function SwipeNavigation({ className = "" }: SwipeNavigationProps) {
  const { activeIndex, setActiveIndex, totalItems } = useSwipe();
  
  return (
    <div className={`flex justify-center gap-2 mt-4 ${className}`}>
      <button 
        onClick={() => setActiveIndex(activeIndex - 1)}
        disabled={activeIndex === 0}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        Previous
      </button>
      <div className="flex items-center gap-1">
        {Array.from({ length: totalItems }).map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full ${activeIndex === i ? 'bg-blue-500' : 'bg-gray-300'}`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
      <button 
        onClick={() => setActiveIndex(activeIndex + 1)}
        disabled={activeIndex === totalItems - 1}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}