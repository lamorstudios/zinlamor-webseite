import { createAdminClient, createClient } from "@/lib/supabase/server";
import type { Merchant } from "@/lib/types/database";

/**
 * Öffentliches Laden eines Händlers per slug (für die Landingpage).
 * Nutzt den Admin-Client, da die Landingpage ohne Login funktioniert –
 * gibt aber nur unkritische, ohnehin öffentliche Branding-Felder weiter.
 */
export async function getPublicMerchantBySlug(
  slug: string,
): Promise<Merchant | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("merchants")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();
  return (data as Merchant) ?? null;
}

/** Lädt einen Händler im eingeloggten Kontext (RLS-geschützt). */
export async function getMerchantById(id: string): Promise<Merchant | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("merchants")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return (data as Merchant) ?? null;
}
