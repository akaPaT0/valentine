// app/page.tsx
"use client";

import { useRouter } from "next/navigation";
import Background from "./components/background";

declare global {
  interface Window {
    __bgMusicPlay?: () => Promise<void>;
  }
}

export default function StartPage() {
  const router = useRouter();

  const onStart = async () => {
    // Start music on user click (avoids autoplay block)
    await window.__bgMusicPlay?.();
    router.push("/main");
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
            One question.
            <br />
            One button.
          </h1>

          <p className="mt-4 text-white/70 leading-relaxed">
            Enter names, share the link, and let fate do the rest.
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
