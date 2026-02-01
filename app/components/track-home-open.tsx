// app/components/track-home-open.tsx
"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    va?: (event: string, props?: Record<string, any>) => void;
  }
}

export default function TrackHomeOpen({ mode }: { mode: "mobile" | "pc" }) {
  useEffect(() => {
    try {
      window.va?.("open_home", { mode });
    } catch {}
  }, [mode]);

  return null;
}
