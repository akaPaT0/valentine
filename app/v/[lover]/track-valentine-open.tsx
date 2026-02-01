// app/v/[lover]/track-valentine-open.tsx
"use client";

import { useEffect, useRef } from "react";

export default function TrackValentineOpen({
  lover,
  from,
  number,
}: {
  lover: string;
  from: string;
  number: string;
}) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const isPc = window.matchMedia("(min-width: 1024px)").matches;
    const mode = isPc ? "pc" : "mobile";

    try {
      window.va?.("event", {
        name: "open_valentine_page",
        mode,
        lover,
        from,
        number, // full number (as you asked)
      });
    } catch {}
  }, [lover, from, number]);

  return null;
}
