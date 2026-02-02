"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Background from "@/app/components/background";

declare global {
  interface Window {
    __bgMusicPlay?: () => Promise<void>;
  }
}

export default function LoverStartPage({
  params,
}: {
  params: { lover: string };
}) {
  const router = useRouter();
  const sp = useSearchParams();

  const loverSlug = params.lover;

  // keep the same query params (from, n, etc.)
  const qs = sp.toString();
  const target = qs ? `/v/${loverSlug}?${qs}` : `/v/${loverSlug}`;

  const loverName =
    decodeURIComponent(loverSlug).replace(/-/g, " ").trim() || "love";

  const onStart = async () => {
    await window.__bgMusicPlay?.(); // user gesture -> starts music
    router.push(target);
  };

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <Background />

      <section className="relative z-10 min-h-screen px-6 flex items-center justify-center">
        <div className="w-full max-w-xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
            <span className="text-sm text-white/80">💌 Valentine</span>
            <span className="text-xs text-white/40">tap to begin</span>
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl font-semibold tracking-tight">
            Hey {loverName} 💘
          </h1>

          <p className="mt-4 text-white/70 leading-relaxed">
            Press start to open your message.
          </p>

          <div className="mt-8 flex items-center justify-center">
            <button
              onClick={onStart}
              className="rounded-2xl px-6 py-3 text-base font-semibold
                         border border-white/15 bg-white/10 hover:bg-white/15
                         backdrop-blur-xl transition"
            >
              ▶ Start
            </button>
          </div>

          <p className="mt-4 text-xs text-white/35">
            Music starts when you press Start.
          </p>
        </div>
      </section>
    </main>
  );
}
