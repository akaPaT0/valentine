// app/components/track-home-open.tsx
"use client";

import { useEffect, useRef } from "react";

export default function TrackHomeOpen() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const isPc = window.matchMedia("(min-width: 1024px)").matches; // Tailwind lg
    const mode = isPc ? "pc" : "mobile";

    try {
      window.va?.("event", { name: "open_home", mode });
    } catch {}
  }, []);

  return null;
}
