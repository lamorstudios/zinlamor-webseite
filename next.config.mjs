/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    // Preserve SEO value of legacy WordPress URLs by redirecting to the new structure.
    return [
      { source: '/neuhausen', destination: '/standorte/neuhausen', permanent: true },
      { source: '/berg-am-laim', destination: '/standorte/berg-am-laim', permanent: true },
      { source: '/wolfratshausen', destination: '/standorte/wolfratshausen', permanent: true },
      { source: '/location/wolfratshausen', destination: '/standorte/wolfratshausen', permanent: true },
      { source: '/mallorca', destination: '/standorte/peguera', permanent: true },
      { source: '/peguera', destination: '/standorte/peguera', permanent: true },
      { source: '/about', destination: '/ueber-uns', permanent: true },
    ];
  },
};

export default nextConfig;
