"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();

    const { error } =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    const dest = params.get("redirectedFrom") || "/dashboard";
    router.push(dest);
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <h1 className="mb-2 text-2xl font-bold">
        {mode === "login" ? "Anmelden" : "Konto erstellen"}
      </h1>
      <p className="mb-6 text-sm opacity-70">
        Für Händler, Mitarbeiter und Admins.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          required
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-brand bg-brand-card px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-brand-primary"
        />
        <input
          type="password"
          required
          minLength={6}
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-brand bg-brand-card px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-brand-primary"
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-brand bg-brand-primary px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {loading
            ? "Bitte warten…"
            : mode === "login"
              ? "Anmelden"
              : "Registrieren"}
        </button>
      </form>

      <button
        onClick={() => setMode(mode === "login" ? "signup" : "login")}
        className="mt-4 text-sm underline opacity-70 hover:opacity-100"
      >
        {mode === "login"
          ? "Noch kein Konto? Registrieren"
          : "Bereits ein Konto? Anmelden"}
      </button>
    </main>
  );
}
