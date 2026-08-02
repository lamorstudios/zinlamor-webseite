import type { Metadata, Viewport } from 'next';
import { fontSans, fontSerif } from './fonts';
import './globals.css';
import { siteConfig } from '@/data/site';
import { Providers } from '@/components/providers/Providers';
import { OrganizationSchema } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'La Tasca Flamenca — Bar de Tapas & Restaurant',
    template: '%s — La Tasca Flamenca',
  },
  description: siteConfig.shortDescription,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'La Tasca Flamenca — Bar de Tapas & Restaurant',
    description: siteConfig.shortDescription,
    images: [
      {
        url: '/images/og/og-default.jpg', // TODO: echtes OG-Bild (1200×630) hinterlegen
        width: 1200,
        height: 630,
        alt: 'La Tasca Flamenca — Bar de Tapas & Restaurant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La Tasca Flamenca — Bar de Tapas & Restaurant',
    description: siteConfig.shortDescription,
    images: ['/images/og/og-default.jpg'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🥘</text></svg>",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#5c1524',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`no-js ${fontSerif.variable} ${fontSans.variable}`}>
      <head>
        {/* Entfernt die no-js-Klasse, sobald JS läuft. Ohne JS bleiben alle
            Scroll-Reveals sichtbar (kritische Inhalte lesbar ohne JavaScript). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('no-js');`,
          }}
        />
      </head>
      <body>
        <OrganizationSchema />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
