import {
  addressOneLine,
  BRAND_NAME,
  BRAND_PROMISE,
  CONTACT,
  LICENSE,
  SERVICE_AREAS,
  SITE_URL,
} from "@/lib/brand";
import { SERVICES } from "@/lib/content";

/**
 * Structured data — LocalBusiness, Service, FAQPage and BreadcrumbList.
 * Rendered as JSON-LD scripts so search engines can read the business.
 */
export function LocalBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AutomotiveBusiness"],
    "@id": `${SITE_URL}/#business`,
    name: BRAND_NAME,
    description: BRAND_PROMISE,
    slogan: BRAND_PROMISE,
    url: SITE_URL,
    telephone: CONTACT.phoneDial,
    email: CONTACT.email,
    image: `${SITE_URL}/og-image.png`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address.street,
      addressLocality: CONTACT.address.city,
      addressRegion: CONTACT.address.region,
      postalCode: CONTACT.address.postal,
      addressCountry: CONTACT.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: 38.8951, longitude: -77.0364 },
    areaServed: SERVICE_AREAS.map((area) => ({ "@type": "Place", name: area.name })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "04:30",
        closes: "23:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "05:00",
        closes: "23:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "00:00",
        closes: "23:59",
        description: "By request — airport runs are 24/7.",
      },
    ],
    founder: { "@type": "Person", name: "Ben", jobTitle: "Chauffeur & Owner" },
    sameAs: ["https://www.linkedin.com/", "https://www.instagram.com/", "https://www.facebook.com/"],
    knowsAbout: [
      "corporate chauffeur service",
      "airport transfers",
      "executive transportation",
      "Washington DC",
      "Northern Virginia",
      "Maryland",
    ],
    additionalProperty: { "@type": "PropertyValue", name: "Licensing", value: LICENSE.line },
  };

  return <Script id="localbusiness" data={data} />;
}

export function ServiceSchema({ slugs }: { slugs?: string[] } = {}) {
  const list = slugs ? SERVICES.filter((s) => slugs.includes(s.slug)) : SERVICES;
  const data = {
    "@context": "https://schema.org",
    "@graph": list.map((service) => ({
      "@type": "Service",
      name: service.name,
      serviceType: service.name,
      description: service.body,
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: SERVICE_AREAS.map((area) => ({ "@type": "Place", name: area.name })),
      url: `${SITE_URL}/services#${service.slug}`,
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        description: service.from,
        availability: "https://schema.org/InStock",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${service.name} includes`,
        itemListElement: service.bullets.map((bullet) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: bullet },
        })),
      },
    })),
  };
  return <Script id="services" data={data} />;
}

export function FaqSchema({ items }: { items: { q: string; a: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return <Script id="faq" data={data} />;
}

export function BreadcrumbSchema({
  trail,
}: {
  trail: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
  return <Script id="breadcrumb" data={data} />;
}

export function WebSiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#business` },
    inLanguage: "en-US",
    description: BRAND_PROMISE,
  };
  return <Script id="website" data={data} />;
}

function Script({ id, data }: { id: string; data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      data-schema={id}
    />
  );
}

export { addressOneLine };
