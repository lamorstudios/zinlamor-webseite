"use client";

import { useState } from "react";
import { createMerchant, type ActionResult } from "@/app/actions/merchants";

export function CreateMerchantForm() {
  const [result, setResult] = useState<ActionResult | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(formData: FormData) {
    setPending(true);
    const res = await createMerchant(formData);
    setResult(res);
    setPending(false);
  }

  return (
    <form
      action={onSubmit}
      className="flex flex-col gap-3 rounded-brand border border-white/10 bg-brand-card p-5 sm:flex-row sm:items-end"
    >
      <label className="flex-1">
        <span className="mb-1 block text-sm opacity-70">Name</span>
        <input
          name="name"
          required
          placeholder="Gelato di Monaco"
          className="w-full rounded-lg border border-white/12 bg-white/5 px-3 py-2 outline-none focus:border-brand-primary"
        />
      </label>
      <label className="flex-1">
        <span className="mb-1 block text-sm opacity-70">Slug (URL)</span>
        <input
          name="slug"
          required
          placeholder="gelato-di-monaco"
          className="w-full rounded-lg border border-white/12 bg-white/5 px-3 py-2 font-mono text-sm outline-none focus:border-brand-primary"
        />
      </label>
      <button
        disabled={pending}
        className="rounded-brand bg-brand-primary px-5 py-2 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Anlegen…" : "Händler anlegen"}
      </button>
      {result && (
        <p
          className={`text-sm ${result.ok ? "text-green-400" : "text-red-400"}`}
        >
          {result.message}
        </p>
      )}
    </form>
  );
}
