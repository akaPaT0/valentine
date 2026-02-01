// app/v/[lover]/runaway.tsx
"use client";

import { useEffect } from "react";

function isActuallyVisible(el: HTMLElement) {
  // display:none => no client rects
  return el.getClientRects().length > 0;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function Runaway() {
  useEffect(() => {
    const btns = Array.from(
      document.querySelectorAll<HTMLButtonElement>("[data-runaway='no']")
    );

    btns.forEach((btn) => {
      let activated = false;

      const move = () => {
        if (!isActuallyVisible(btn)) return;

        // first time: freeze it exactly where it is, then start running
        if (!activated) {
          activated = true;
          const rect = btn.getBoundingClientRect();

          btn.style.position = "fixed";
          btn.style.left = `${rect.left + rect.width / 2}px`;
          btn.style.top = `${rect.top + rect.height / 2}px`;
          btn.style.transform = "translate(-50%, -50%)";
          btn.style.zIndex = "50";
        }

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const rect = btn.getBoundingClientRect();
        const pad = 14;

        const x = Math.random() * (vw - rect.width - pad * 2) + pad;
        const y = Math.random() * (vh - rect.height - pad * 2) + pad;

        const cx = clamp(x, pad, vw - rect.width - pad);
        const cy = clamp(y, pad, vh - rect.height - pad);

        btn.style.left = `${cx + rect.width / 2}px`;
        btn.style.top = `${cy + rect.height / 2}px`;
      };

      // PC hover
      btn.addEventListener("mouseenter", move);

      // Mobile touch + click attempts
      btn.addEventListener(
        "touchstart",
        (e) => {
          e.preventDefault();
          move();
        },
        { passive: false }
      );

      btn.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        move();
      });
    });

    return () => {};
  }, []);

  return null;
}
