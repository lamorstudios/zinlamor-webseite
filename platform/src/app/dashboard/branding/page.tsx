import { getSessionContext } from "@/lib/auth";
import { getMerchantById } from "@/lib/merchants";
import { BrandingForm } from "./BrandingForm";

/**
 * Branding-Einstellungen.
 * Wählt standardmäßig den ersten verwaltbaren Laden des Users.
 * Super-Admins können per ?merchant=<id> einen beliebigen Laden bearbeiten.
 */
export default async function BrandingPage({
  searchParams,
}: {
  searchParams: { merchant?: string };
}) {
  const ctx = await getSessionContext();
  if (!ctx) return null;

  let merchantId = searchParams.merchant;
  if (!merchantId) {
    const manageable = ctx.memberships.find(
      (m) => m.role === "owner" || m.role === "admin",
    );
    merchantId = manageable?.merchant.id;
  }

  if (!merchantId) {
    return (
      <div className="rounded-brand border border-white/10 bg-brand-card p-6">
        <p className="font-semibold">Kein verwaltbarer Laden</p>
        <p className="mt-1 text-sm opacity-70">
          Du benötigst die Rolle „Inhaber“ oder „Admin“, um Branding zu
          bearbeiten.
        </p>
      </div>
    );
  }

  const merchant = await getMerchantById(merchantId);
  if (!merchant) {
    return (
      <p className="text-red-400">
        Laden nicht gefunden oder keine Berechtigung.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Branding</h1>
        <p className="opacity-70">
          Farben, Logo und Texte für <strong>{merchant.name}</strong>. Änderungen
          erscheinen sofort in der Vorschau.
        </p>
      </div>
      <BrandingForm merchant={merchant} />
    </div>
  );
}
