import { createClient } from "@/lib/supabase/server";
import type { Merchant, MerchantRole, Profile } from "@/lib/types/database";

export interface SessionContext {
  userId: string;
  email: string | null;
  profile: Profile | null;
  isSuperAdmin: boolean;
  memberships: { merchant: Merchant; role: MerchantRole }[];
}

/**
 * Lädt den aktuellen User samt Profil und Händler-Zugehörigkeiten.
 * Gibt null zurück, wenn nicht eingeloggt.
 */
export async function getSessionContext(): Promise<SessionContext | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  const { data: rows } = await supabase
    .from("merchant_users")
    .select("role, merchant:merchants(*)")
    .eq("user_id", user.id);

  const memberships =
    (rows ?? [])
      .filter((r) => r.merchant)
      .map((r) => ({
        merchant: r.merchant as unknown as Merchant,
        role: r.role as MerchantRole,
      })) ?? [];

  return {
    userId: user.id,
    email: user.email ?? null,
    profile: (profile as Profile) ?? null,
    isSuperAdmin: Boolean(profile?.is_super_admin),
    memberships,
  };
}
