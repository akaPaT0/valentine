// app/v/[lover]/yes-button.tsx
"use client";

import { useState } from "react";

function normalizeWhatsApp(raw: string) {
  // digits only
  let d = (raw || "").replace(/[^\d]/g, "");

  // Lebanon quick normalize:
  // 0XXXXXXXX (9 digits starting with 0) -> remove 0
  // XXXXXXXX (8 digits) -> add 961
  if (d.length === 9 && d.startsWith("0")) d = d.slice(1);
  if (d.length === 8) d = `961${d}`;

  return d;
}

export default function YesButton({
  number,
  lover,
  from,
  size = "md",
}: {
  number?: string;
  lover: string;
  from?: string;
  size?: "md" | "lg";
}) {
  const [animating, setAnimating] = useState(false);
  const [error, setError] = useState("");

  const wa = normalizeWhatsApp(number || "");

  const msg = `GOOD NEWS 💘\n${lover} clicked YES!\n${from ? `From: ${from}\n` : ""}Time to act cool 😌`;

  const cls =
    size === "lg"
      ? "px-8 py-4 rounded-2xl text-lg"
      : "px-6 py-3 rounded-xl text-base";

  return (
    <div className="relative">
      <button
        onClick={() => {
          setError("");
          setAnimating(true);

          window.setTimeout(() => {
            setAnimating(false);

            if (!wa) {
              setError("No WhatsApp number was provided in the link 😅");
              return;
            }

            const url = `https://wa.me/${wa}?text=${encodeURIComponent(msg)}`;
            window.location.href = url;
          }, 900);
        }}
        className={[
          "cd-yes-btn",
          cls,
          "shrink-0 font-semibold border border-white/10 bg-[#e5284c]/90 hover:bg-[#e5284c] active:scale-[0.99]",
          animating ? "cd-yes-anim" : "",
        ].join(" ")}
      >
        Yes
      </button>

      {error ? <p className="mt-2 text-xs text-white/60">{error}</p> : null}
    </div>
  );
}
