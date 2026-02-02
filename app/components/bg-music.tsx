"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    __bgMusicPlay?: () => Promise<void>;
    __bgMusicPause?: () => void;
  }
}

export default function BgMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    a.volume = 0.25;

    // Expose play/pause so Start button can trigger it (counts as user gesture)
    window.__bgMusicPlay = async () => {
      try {
        await a.play();
        setOn(true);
      } catch {
        setOn(false);
      }
    };

    window.__bgMusicPause = () => {
      a.pause();
      setOn(false);
    };

    return () => {
      delete window.__bgMusicPlay;
      delete window.__bgMusicPause;
    };
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;

    if (a.paused) {
      await window.__bgMusicPlay?.();
    } else {
      window.__bgMusicPause?.();
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/og.mp3" loop preload="auto" />

      {/* Optional mini control */}
      <button
        onClick={toggle}
        className="fixed bottom-4 right-4 z-[9999] rounded-2xl px-4 py-2
                   border border-white/15 bg-white/10 hover:bg-white/15
                   backdrop-blur-xl transition text-sm"
        aria-label="Toggle background music"
        title="Background music"
      >
        {on ? "🔊 Music" : "🔇 Music"}
      </button>
    </>
  );
}
