"use client"
import { useEffect } from "react";
import { useAtom } from "jotai";
import { isMobileAtom } from "@/lib/state";

// dummy component with just a 
export function MobileListener() {
  const [_, setIsMobile] = useAtom(isMobileAtom);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <></>
  )
}
