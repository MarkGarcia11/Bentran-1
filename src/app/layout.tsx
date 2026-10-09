import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import {
  BRAND_NAME,
  BRAND_PROMISE,
  CONTACT,
  LICENSE,
  OWNER,
  SITE_URL,
  addressOneLine,
} from "@/lib/brand";
import { IMAGES } from "@/lib/images";
import { BookingProvider } from "@/lib/booking-context";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { LocalBusinessSchema, ServiceSchema, WebSiteSchema } from "@/components/JsonLd";

const title = `${BRAND_NAME} — Corporate Chauffeur & Airport Transfers | DC · VA · MD`;
const description = `${BRAND_PROMISE} Reliable, discreet corporate transportation in Washington DC, Northern Virginia and Maryland, personally driven by ${OWNER.firstName}. Book a ride in under a minute or call ${CONTACT.phoneDisplay}.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s · ${BRAND_NAME}`,
  },
  description,
  keywords: [
    "corporate chauffeur Washington DC",
    "executive car service Northern Virginia",
    "airport transfer DCA IAD BWI",
    "black car service Maryland",
    "hourly chauffeur DC",
    BRAND_NAME,
  ],
  authors: [{ name: BRAND_NAME, url: SITE_URL }],
  creator: BRAND_NAME,
  publisher: BRAND_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: BRAND_NAME,
    title,
    description,
    images: [
      {
        url: IMAGES.hero.src,
        width: 2200,
        height: 1467,
        alt: IMAGES.hero.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [IMAGES.hero.src],
    creator: "@bntran", // PLACEHOLDER handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "transportation",
  other: {
    "contact.email": CONTACT.email,
    "business.licence": LICENSE.line,
    "geo.region": "US-DC",
    "geo.placename": "Washington, D.C.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F1B2D",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BRAND_NAME,
  telephone: CONTACT.phoneDial,
  address: addressOneLine,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/*
          Fonts are loaded with <link> (not next/font) so the build stays
          portable on Vercel, Netlify or any Node host with no font cache.
          Display: swap keeps text visible and Lighthouse happy.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600&family=Inter:wght@300..700&family=Caveat:wght@500;700&display=swap"
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-ivory text-body antialiased">
        <BookingProvider>
          <SiteChrome>
            {children}
            <LocalBusinessSchema />
            <ServiceSchema />
            <WebSiteSchema />
          </SiteChrome>
        </BookingProvider>
      </body>
    </html>
  );
}
