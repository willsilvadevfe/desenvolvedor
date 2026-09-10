import { useState, useEffect } from "react";

export function useTick(intervaloMs = 15000) {
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), intervaloMs);
    return () => clearInterval(id);
  }, [intervaloMs]);
}