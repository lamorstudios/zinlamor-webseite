"use client";

import { useState } from "react";
import type { Merchant } from "@/lib/types/database";
import { BrandingScope } from "@/lib/branding/BrandingStyle";
import { StampCard } from "@/components/StampCard";
import { updateBranding, type ActionResult } from "@/app/actions/merchants";

const COLOR_FIELDS: { key: keyof Merchant; label: string }[] = [
  { key: "primary_color", label: "Primärfarbe" },
  { key: "secondary_color", label: "Sekundärfarbe" },
  { key: "background_color", label: "Hintergrund" },
  { key: "card_color", label: "Kartenfarbe" },
  { key: "text_color", label: "Textfarbe" },
];

export function BrandingForm({ merchant }: { merchant: Merchant }) {
  // Lokaler State nur für die Live-Vorschau.
  const [draft, setDraft] = useState<Merchant>(merchant);
  const [result, setResult] = useState<ActionResult | null>(null);
  const [saving, setSaving] = useState(false);

  function set<K extends keyof Merchant>(key: K, value: Merchant[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  async function onSubmit(formData: FormData) {
    setSaving(true);
    const res = await updateBranding(formData);
    setResult(res);
    setSaving(false);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Formular */}
      <form action={onSubmit} className="space-y-5">
        <input type="hidden" name="merchant_id" value={merchant.id} />

        <Field label="Händlername">
          <input
            name="name"
            value={draft.name}
            onChange={(e) => set("name", e.target.value)}
            className="input"
          />
        </Field>

        <Field label="Logo-URL (optional)">
          <input
            name="logo_url"
            value={draft.logo_url ?? ""}
            onChange={(e) => set("logo_url", e.target.value)}
            placeholder="https://…/logo.png"
            className="input"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {COLOR_FIELDS.map(({ key, label }) => (
            <Field key={key} label={label}>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={draft[key] as string}
                  onChange={(e) => set(key, e.target.value as Merchant[typeof key])}
                  className="h-9 w-9 cursor-pointer rounded border border-white/20 bg-transparent"
                />
                <input
                  name={key}
                  value={draft[key] as string}
                  onChange={(e) => set(key, e.target.value as Merchant[typeof key])}
                  className="input w-full font-mono text-xs"
                />
              </div>
            </Field>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Stempel bis zur Prämie">
            <input
              type="number"
              name="stamps_required"
              min={1}
              max={100}
              value={draft.stamps_required}
              onChange={(e) => set("stamps_required", Number(e.target.value))}
              className="input"
            />
          </Field>
          <Field label="Prämienbeschreibung">
            <input
              name="reward_description"
              value={draft.reward_description}
              onChange={(e) => set("reward_description", e.target.value)}
              className="input"
            />
          </Field>
        </div>

        <Field label="Willkommenstext (optional)">
          <textarea
            name="welcome_text"
            value={draft.welcome_text ?? ""}
            onChange={(e) => set("welcome_text", e.target.value)}
            rows={2}
            className="input"
          />
        </Field>

        <button
          disabled={saving}
          className="rounded-brand bg-brand-primary px-5 py-2.5 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Speichern…" : "Branding speichern"}
        </button>

        {result && (
          <p className={result.ok ? "text-green-400" : "text-red-400"}>
            {result.message}
          </p>
        )}
      </form>

      {/* Live-Vorschau */}
      <div>
        <p className="mb-3 text-sm font-semibold opacity-70">Live-Vorschau</p>
        <BrandingScope branding={draft} className="rounded-brand p-6">
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-xl font-bold">{draft.name}</h3>
            {draft.welcome_text && (
              <p className="text-center text-sm opacity-80">
                {draft.welcome_text}
              </p>
            )}
            <StampCard branding={draft} current={3} />
          </div>
        </BrandingScope>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          background: rgba(255,255,255,0.05);
          padding: 0.5rem 0.75rem;
          outline: none;
          border: 1px solid rgba(255,255,255,0.12);
        }
        .input:focus { border-color: var(--brand-primary); }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm opacity-70">{label}</span>
      {children}
    </label>
  );
}
