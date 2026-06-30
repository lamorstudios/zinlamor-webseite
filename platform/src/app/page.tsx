import Link from "next/link";

/** Plattform-Startseite (Marketing / Einstieg). */
export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-8 px-6 text-center">
      <div>
        <h1 className="text-4xl font-bold sm:text-5xl">
          Digitale Stempelkarten.{" "}
          <span className="text-brand-primary">Ohne App.</span>
        </h1>
        <p className="mt-4 text-lg opacity-80">
          Eine White-Label-Plattform für Kundenkarten, Gutscheine und
          QR-Code-Treueprogramme. Jeder Händler – sein eigenes Branding.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/login"
          className="rounded-brand bg-brand-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Anmelden
        </Link>
        <Link
          href="/shop/gelato-di-monaco"
          className="rounded-brand border border-white/20 px-6 py-3 font-semibold transition hover:bg-white/5"
        >
          Demo-Händler ansehen
        </Link>
      </div>

      <p className="text-sm opacity-50">
        Phase 1: Auth, Merchants & Branding-System aktiv.
      </p>
    </main>
  );
}
