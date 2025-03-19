"use client"

import { TouchEventHandler, useRef } from "react"

interface SwipableProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  children: React.ReactElement;
}

export function Swipable(props: SwipableProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {

  }
  const onTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {

  }
  const onTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {

  }

  return (
    <div 
      ref={ref} 
      onTouchEnd={onTouchEnd} 
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    >
      {props.children}
    </div>
  )

}
