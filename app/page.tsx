import Background from "./components/background";
import ValentineForm from "./components/valentine-form";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* MOBILE */}
      <section className="relative block min-h-screen lg:hidden">
        <Background />
        <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
          <ValentineForm mode="mobile" />
        </div>
      </section>

      {/* PC */}
      <section className="relative hidden min-h-screen lg:block">
        <Background />
        <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
          <ValentineForm mode="pc" />
        </div>
      </section>
    </main>
  );
}
