import type { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site';
import { getLocationSlugs } from '@/data/locations';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticPaths = [
    '',
    '/ueber-uns',
    '/standorte',
    '/speisekarte',
    '/events-catering',
    '/foodtruck',
    '/franchise',
    '/kontakt',
    '/karriere',
    '/reservierung',
    '/impressum',
    '/datenschutz',
    '/cookie-einstellungen',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${base}${p}`,
    changeFrequency: p === '' ? 'weekly' : 'monthly',
    priority: p === '' ? 1 : p === '/standorte' || p === '/reservierung' ? 0.9 : 0.7,
  }));

  const locationEntries: MetadataRoute.Sitemap = getLocationSlugs().map((slug) => ({
    url: `${base}/standorte/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  return [...staticEntries, ...locationEntries];
}
