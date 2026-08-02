import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocation, getLocationSlugs } from '@/data/locations';
import { siteConfig } from '@/data/site';
import { LocationDetail } from '@/components/locations/LocationDetail';
import { RestaurantSchema, FaqSchema } from '@/components/seo/StructuredData';
import de from '@/i18n/dictionaries/de';

export function generateStaticParams() {
  return getLocationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) return {};

  // Eindeutiger Titel/Description pro Standort (keine identischen SEO-Texte)
  const title = `${location.shortName} · Spanisches Restaurant in ${location.city}`;
  const description = `${location.tagline} ${location.name}, ${location.address}. Tapas, Paella & Sangria — jetzt Tisch reservieren.`;
  const url = `/standorte/${location.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      title: `${title} — La Tasca Flamenca`,
      description,
      url: `${siteConfig.url}${url}`,
      images: [{ url: '/images/og/og-default.jpg', width: 1200, height: 630, alt: location.name }],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  // FAQ-Schema aus dem deutschen Master-Wörterbuch (sichtbare, echte Fragen)
  const faqs = [
    { q: de['faq.reserve.q'], a: de['faq.reserve.a'] },
    { q: de['faq.groups.q'], a: de['faq.groups.a'] },
    { q: de['faq.veggie.q'], a: de['faq.veggie.a'] },
    { q: de['faq.parking.q'], a: de['faq.parking.a'] },
  ];

  return (
    <>
      <RestaurantSchema location={location} />
      <FaqSchema faqs={faqs} />
      <LocationDetail location={location} />
    </>
  );
}
