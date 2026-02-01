// app/components/background.tsx
"use client";

import { useEffect, useState } from "react";

type Heart = {
  top: number;   // 0..100
  left: number;  // 0..100
  size: number;  // px
  shade: 1 | 2 | 3 | 4;
  dur: number;   // seconds
  delay: number; // seconds
  drift: number; // px
};

function makeHearts(count: number): Heart[] {
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;
  const shades = [1, 2, 3, 4] as const;

  return Array.from({ length: count }, () => ({
    top: rand(0, 100),
    left: rand(0, 100),
    size: rand(10, 28),
    shade: shades[Math.floor(Math.random() * shades.length)],
    dur: rand(3.2, 7.5),
    delay: rand(0, 2.5),
    drift: rand(-24, 24),
  }));
}

function HeartLayer({ count }: { count: number }) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    setHearts(makeHearts(count));
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {hearts.map((h, i) => (
        <span
          key={i}
          className={`cd-heart cd-shade-${h.shade}`}
          style={{
            top: `${h.top}%`,
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.dur}s`,
            animationDelay: `${h.delay}s`,
            ["--drift" as any]: `${h.drift}px`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

export default function background() {
  return (
    <>
      {/* Mobile */}
      <div className="block lg:hidden">
        <HeartLayer count={34} />
      </div>

      {/* PC */}
      <div className="hidden lg:block">
        <HeartLayer count={70} />
      </div>
    </>
  );
}
