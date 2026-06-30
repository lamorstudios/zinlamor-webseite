/**
 * Handgepflegte Typen für die wichtigsten Tabellen.
 * (Später ersetzbar durch `supabase gen types typescript`.)
 */

export type MerchantRole = "owner" | "admin" | "staff";

export interface Merchant {
  id: string;
  slug: string;
  name: string;
  logo_url: string | null;
  primary_color: string;
  secondary_color: string;
  background_color: string;
  card_color: string;
  text_color: string;
  stamps_required: number;
  reward_description: string;
  welcome_text: string | null;
  active: boolean;
  settings: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  is_super_admin: boolean;
  created_at: string;
}

export interface MerchantUser {
  id: string;
  merchant_id: string;
  user_id: string;
  role: MerchantRole;
  created_at: string;
}

/** Felder, die White-Label-Branding ausmachen. */
export type BrandingFields = Pick<
  Merchant,
  | "name"
  | "logo_url"
  | "primary_color"
  | "secondary_color"
  | "background_color"
  | "card_color"
  | "text_color"
  | "reward_description"
  | "stamps_required"
  | "welcome_text"
>;
