import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-5xl font-bold text-brand-primary">404</p>
      <h1 className="text-xl font-semibold">Seite nicht gefunden</h1>
      <p className="opacity-70">
        Dieser Laden oder diese Seite existiert nicht (mehr).
      </p>
      <Link
        href="/"
        className="rounded-brand bg-brand-primary px-5 py-2.5 font-semibold text-white"
      >
        Zur Startseite
      </Link>
    </main>
  );
}
