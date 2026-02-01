"use client";

import { useEffect } from "react";

export default function TrackHomeOpen({ mode }: { mode: "mobile" | "pc" }) {
  useEffect(() => {
    try {
      window.va?.("event", { name: "open_home", mode });
    } catch {}
  }, [mode]);

  return null;
}