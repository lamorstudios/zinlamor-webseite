import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loyalty Platform",
  description:
    "White-Label-Plattform für digitale Stempelkarten, Gutscheine & QR-Kundenkarten – ohne App-Download.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-brand-background text-brand-text antialiased">
        {children}
      </body>
    </html>
  );
}
