// app/components/valentine-form.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

type FormState = {
  sender: string;
  lover: string;
  number: string;
};

function slugifyName(input: string) {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/['"]/g, "")
    // ✅ keep letters & numbers from ANY language (Arabic/English/etc.)
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

function buildLink(lover: string, sender: string, number: string) {
  const slug = slugifyName(lover) || "love";

  const params = new URLSearchParams();
  if (sender.trim()) params.set("from", sender.trim());
  if (number.trim()) params.set("n", number.trim());

  const qs = params.toString();
  // ✅ go to the music start gate first
  return `/v/${slug}/start${qs ? `?${qs}` : ""}`;
}

export default function ValentineForm({ mode }: { mode: "mobile" | "pc" }) {
  const [form, setForm] = useState<FormState>({
    sender: "",
    lover: "",
    number: "",
  });

  // prevents hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const link = useMemo(
    () => buildLink(form.lover, form.sender, form.number),
    [form.lover, form.sender, form.number]
  );

  const disabled = !form.lover.trim();

  // Vercel Analytics event helper
  function track(name: string, props?: Record<string, any>) {
    try {
      window.va?.("event", { name, ...props });
    } catch {}
  }

  async function copyLink() {
    const full = `${window.location.origin}${link}`;
    await navigator.clipboard.writeText(full);

    track("generate_link", {
      mode,
      sender: form.sender.trim(),
      lover: form.lover.trim(),
      number: form.number.trim(), // FULL NUMBER (as requested)
      link: full,
    });
  }

  async function shareLink() {
    const full = `${window.location.origin}${link}`;
    const text = `Open this 😌`;

    track("share_link", {
      mode,
      sender: form.sender.trim(),
      lover: form.lover.trim(),
      number: form.number.trim(), // FULL NUMBER (as requested)
      link: full,
    });

    if (navigator.share) {
      await navigator.share({ title: "Valentine?", text, url: full });
    } else {
      await navigator.clipboard.writeText(full);
    }
  }

  const wrapClass =
    mode === "mobile"
      ? "w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
      : "w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-7";

  const titleClass = mode === "mobile" ? "text-xl" : "text-3xl";
  const subClass = mode === "mobile" ? "text-sm" : "text-base";
  const inputClass =
    "w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-white/25";

  const buttonBase =
    "rounded-xl px-4 py-3 font-semibold border border-white/10 transition active:scale-[0.99]";
  const primaryBtn = buttonBase + " bg-[#e5284c]/90 hover:bg-[#e5284c]";
  const ghostBtn = buttonBase + " bg-white/5 hover:bg-white/10";

  return (
    <div className={wrapClass}>
      <div className="space-y-2">
        <h2 className={`${titleClass} font-semibold`}>Generate your link</h2>
        <p className={`${subClass} text-white/70`}>
          Put the names, generate a custom link, then copy or share. Enjoy!
        </p>
      </div>

      <div className="mt-5 space-y-3">
        <div className="space-y-2">
          <label className="text-sm text-white/70">Your name</label>
          <input
            className={inputClass}
            value={form.sender}
            onChange={(e) => setForm((s) => ({ ...s, sender: e.target.value }))}
            placeholder="Patrick"
            autoComplete="off"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/70">Their name (required)</label>
          <input
            className={inputClass}
            value={form.lover}
            onChange={(e) => setForm((s) => ({ ...s, lover: e.target.value }))}
            placeholder="Angelina Jolie"
            autoComplete="off"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/70">
            Your number (Required if you want answer)
          </label>
          <input
            className={inputClass}
            value={form.number}
            onChange={(e) => setForm((s) => ({ ...s, number: e.target.value }))}
            placeholder="+961 ..."
            autoComplete="off"
          />
        </div>

        <div className="pt-2 space-y-2">
          <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/80 break-all">
            {mounted ? link : "/v/maria/start?from=..."}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              className={primaryBtn}
              onClick={copyLink}
              disabled={disabled}
            >
              Copy
            </button>
            <button
              className={ghostBtn}
              onClick={shareLink}
              disabled={disabled}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
