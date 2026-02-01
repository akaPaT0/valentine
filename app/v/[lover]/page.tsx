// app/v/[lover]/page.tsx
import Background from "@/app/components/background";
import Runaway from "./runaway";
import YesButton from "./yes-button";
import TrackValentineOpen from "./track-valentine-open";

export default function LoverPage({
  params,
  searchParams,
}: {
  params: { lover: string };
  searchParams: { from?: string | string[]; n?: string | string[] };
}) {
  const lover =
    decodeURIComponent(params.lover).replace(/-/g, " ").trim() || "love";

  const fromRaw = Array.isArray(searchParams.from)
    ? searchParams.from[0]
    : searchParams.from;

  const nRaw = Array.isArray(searchParams.n) ? searchParams.n[0] : searchParams.n;

  const from = (fromRaw || "").trim();
  const n = (nRaw || "").trim();

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <Background />
      <Runaway />

      {/* TRACK OPEN (fires once per visit) */}
      <TrackValentineOpen lover={lover} from={from} number={n} />

      {/* MOBILE */}
      <section className="relative z-10 block min-h-screen lg:hidden">
        <div className="min-h-screen px-6 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-semibold">Hey {lover} 💘</h1>

          <p className="mt-3 text-white/75">
            Will you be my valentine{from ? `, from ${from}` : ""}?
          </p>

          <div className="mt-7 flex items-center justify-center gap-3">
            <YesButton number={n} lover={lover} from={from} size="md" />

            <button
              data-runaway="no"
              className="shrink-0 px-6 py-3 rounded-xl font-semibold bg-white text-[#e5284c] border border-white/20 hover:bg-white/90 active:scale-[0.99] select-none touch-none"
            >
              No
            </button>
          </div>
        </div>
      </section>

      {/* PC */}
      <section className="relative z-10 hidden min-h-screen lg:block">
        <div className="min-h-screen px-6 flex flex-col items-center justify-center text-center">
          <h1 className="text-6xl font-semibold">Hey {lover} 💘</h1>

          <p className="mt-4 text-white/75 text-xl">
            Will you be my valentine{from ? `, from ${from}` : ""}?
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <YesButton number={n} lover={lover} from={from} size="lg" />

            <button
              data-runaway="no"
              className="shrink-0 px-8 py-4 rounded-2xl text-lg font-semibold bg-white text-[#e5284c] border border-white/20 hover:bg-white/90 active:scale-[0.99] select-none touch-none"
            >
              No
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
