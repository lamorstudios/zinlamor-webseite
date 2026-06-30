/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Logos der Händler werden aus Supabase Storage geladen.
    // Host hier ergänzen, sobald die Supabase-URL feststeht (siehe .env.example).
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
