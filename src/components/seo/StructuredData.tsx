import { siteConfig } from '@/data/site';
import { locations, type Location } from '@/data/locations';
import { toSchemaOpeningHours } from '@/lib/hours';

/** Rendert JSON-LD sicher (kein XSS, da wir eigene Daten serialisieren). */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.shortDescription,
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook, siteConfig.social.tripadvisor].filter(
      Boolean
    ),
    location: locations.map((l) => ({
      '@type': 'Restaurant',
      name: l.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: l.street,
        postalCode: l.postalCode,
        addressLocality: l.city,
        addressRegion: l.region,
        addressCountry: l.country,
      },
    })),
  };
  return <JsonLd data={data} />;
}

/**
 * Restaurant/LocalBusiness-Schema für eine EINZELNE Standortseite.
 * Enthält Adresse, Öffnungszeiten, Telefon. KEIN aggregateRating (keine
 * erfundenen Bewertungen). Geokoordinaten nur, wenn vorhanden.
 */
export function RestaurantSchema({ location }: { location: Location }) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${siteConfig.url}/standorte/${location.slug}#restaurant`,
    name: location.name,
    description: location.description,
    servesCuisine: ['Spanish', 'Mediterranean', 'Tapas'],
    priceRange: location.priceRange,
    url: `${siteConfig.url}/standorte/${location.slug}`,
    telephone: location.phoneHref,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.street,
      postalCode: location.postalCode,
      addressLocality: location.city,
      addressRegion: location.region,
      addressCountry: location.country,
    },
    openingHoursSpecification: toSchemaOpeningHours(location.openingHours),
    hasMap: location.mapsUrl,
    sameAs: location.social
      ? [location.social.instagram, location.social.facebook, location.social.tripadvisor].filter(Boolean)
      : undefined,
  };

  if (location.geo.lat !== null && location.geo.lng !== null) {
    data.geo = { '@type': 'GeoCoordinates', latitude: location.geo.lat, longitude: location.geo.lng };
  }

  return <JsonLd data={data} />;
}

/** FAQPage-Schema — nur mit echten, sichtbaren Fragen/Antworten verwenden. */
export function FaqSchema({ faqs }: { faqs: { q: string; a: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  return <JsonLd data={data} />;
}

export { JsonLd };
