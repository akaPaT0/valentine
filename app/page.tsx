// app/page.tsx
import Background from "./components/background";
import ValentineForm from "./components/valentine-form";
import TrackHomeOpen from "./components/track-home-open";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <Background />
      <TrackHomeOpen />

      {/* MOBILE */}
      <section className="relative z-10 block min-h-screen lg:hidden">
        <div className="min-h-screen px-6 flex items-center justify-center">
          <ValentineForm mode="mobile" />
        </div>
      </section>

      {/* PC */}
      <section className="relative z-10 hidden min-h-screen lg:block">
        <div className="min-h-screen px-6 flex items-center justify-center">
          <ValentineForm mode="pc" />
        </div>
      </section>
    </main>
  );
}
