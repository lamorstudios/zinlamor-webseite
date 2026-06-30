import { notFound } from "next/navigation";
import { getPublicMerchantBySlug } from "@/lib/merchants";
import { BrandingScope } from "@/lib/branding/BrandingStyle";
import { StampCard } from "@/components/StampCard";

/**
 * Gebrandete Händler-Landingpage: /shop/<slug>
 * Beweist das White-Labeling – Farben, Logo, Texte kommen aus der DB.
 */
export default async function ShopLandingPage({
  params,
}: {
  params: { slug: string };
}) {
  const merchant = await getPublicMerchantBySlug(params.slug);
  if (!merchant) notFound();

  return (
    <BrandingScope branding={merchant} className="min-h-screen">
      <main className="mx-auto flex max-w-lg flex-col items-center gap-8 px-6 py-16 text-center">
        {merchant.logo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={merchant.logo_url}
            alt={merchant.name}
            className="h-20 w-20 rounded-2xl object-cover shadow-lg"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-primary text-3xl font-bold text-white shadow-lg">
            {merchant.name.charAt(0)}
          </div>
        )}

        <div>
          <h1 className="text-3xl font-bold">{merchant.name}</h1>
          {merchant.welcome_text && (
            <p className="mt-3 opacity-80">{merchant.welcome_text}</p>
          )}
        </div>

        <StampCard branding={merchant} current={0} />

        <a
          href="#"
          className="rounded-brand bg-brand-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Meine Treuekarte starten
        </a>
        <p className="text-xs opacity-50">
          In Phase 2 erstellt dieser Button eine echte Kundenkarte mit
          QR-Code.
        </p>
      </main>
    </BrandingScope>
  );
}
