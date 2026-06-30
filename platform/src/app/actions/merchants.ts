"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getSessionContext } from "@/lib/auth";

export interface ActionResult {
  ok: boolean;
  message: string;
}

const COLOR_RE = /^#[0-9a-fA-F]{6}$/;

/**
 * Branding eines Händlers aktualisieren.
 * RLS lässt nur owner/admin (oder Super-Admin) durch – wir prüfen zusätzlich hier.
 */
export async function updateBranding(
  formData: FormData,
): Promise<ActionResult> {
  const merchantId = String(formData.get("merchant_id") ?? "");
  if (!merchantId) return { ok: false, message: "Kein Händler ausgewählt." };

  const colors = {
    primary_color: String(formData.get("primary_color") ?? ""),
    secondary_color: String(formData.get("secondary_color") ?? ""),
    background_color: String(formData.get("background_color") ?? ""),
    card_color: String(formData.get("card_color") ?? ""),
    text_color: String(formData.get("text_color") ?? ""),
  };
  for (const [key, val] of Object.entries(colors)) {
    if (!COLOR_RE.test(val)) {
      return { ok: false, message: `Ungültige Farbe bei ${key} (Format #rrggbb).` };
    }
  }

  const stamps = Number(formData.get("stamps_required"));
  if (!Number.isInteger(stamps) || stamps < 1 || stamps > 100) {
    return { ok: false, message: "Stempelanzahl muss zwischen 1 und 100 liegen." };
  }

  const supabase = createClient();
  const { error } = await supabase
    .from("merchants")
    .update({
      ...colors,
      name: String(formData.get("name") ?? "").trim(),
      reward_description: String(formData.get("reward_description") ?? "").trim(),
      welcome_text: String(formData.get("welcome_text") ?? "").trim() || null,
      logo_url: String(formData.get("logo_url") ?? "").trim() || null,
      stamps_required: stamps,
    })
    .eq("id", merchantId);

  if (error) return { ok: false, message: error.message };

  revalidatePath("/dashboard/branding");
  revalidatePath("/dashboard");
  return { ok: true, message: "Branding gespeichert." };
}

/**
 * Neuen Händler anlegen (nur Super-Admin). Legt optional den ersten
 * Owner anhand seiner E-Mail an, sofern dieser User bereits existiert.
 */
export async function createMerchant(
  formData: FormData,
): Promise<ActionResult> {
  const ctx = await getSessionContext();
  if (!ctx?.isSuperAdmin) {
    return { ok: false, message: "Nur Super-Admins dürfen Händler anlegen." };
  }

  const slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  const name = String(formData.get("name") ?? "").trim();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return { ok: false, message: "Slug nur Kleinbuchstaben, Zahlen, Bindestriche." };
  }
  if (!name) return { ok: false, message: "Name fehlt." };

  const supabase = createClient();
  const { error } = await supabase.from("merchants").insert({ slug, name });
  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin");
  return { ok: true, message: `Händler „${name}“ angelegt.` };
}
