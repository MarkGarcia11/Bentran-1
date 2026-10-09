import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, MapPin, Plane } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { Badge } from "@/components/ui/card";
import { FinalCta } from "@/components/sections/CtaBand";
import { SERVICE_AREAS } from "@/lib/brand";
import { SERVICE_AREAS_COPY } from "@/lib/content";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Service Areas — DC, Northern Virginia, Maryland & Airports",
  description:
    "Chauffeur service across Washington DC, Arlington, Alexandria, Tysons, Bethesda, Silver Spring and Annapolis, plus DCA, IAD and BWI airport transfers with flight tracking.",
  alternates: { canonical: "/service-areas" },
};

const AIRPORTS = [
  { code: "DCA", name: "Reagan National", minutes: "15–25 min to Arlington & DC", x: 43, y: 58 },
  { code: "IAD", name: "Washington Dulles", minutes: "35–55 min to DC", x: 12, y: 32 },
  { code: "BWI", name: "Baltimore–Washington", minutes: "40–60 min to DC", x: 78, y: 16 },
];

const BEYOND = [
  "Richmond, VA",
  "Charlottesville, VA",
  "Baltimore, MD",
  "Annapolis, MD",
  "Philadelphia, PA",
  "Wilmington, DE",
  "New York, NY",
];

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Service areas"
        title={SERVICE_AREAS_COPY.headline}
        highlight={["Where"]}
        intro={SERVICE_AREAS_COPY.intro}
        image="dcSkyline"
        breadcrumb={[
          { name: "Home", url: "/" },
          { name: "Service Areas", url: "/service-areas" },
        ]}
      />

      {/* stylised map */}
      <Section tone="ivory" size="lg">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          <Reveal y={24}>
            <div className="relative overflow-hidden rounded-hero sunrise p-6 shadow-lift md:p-10">
              <svg
                viewBox="0 0 100 78"
                className="h-auto w-full"
                role="img"
                aria-label="Stylised map of Washington DC, Northern Virginia and Maryland with airport locations marked"
              >
                {/* land masses */}
                <path
                  d="M2 20 C 14 12, 30 8, 46 12 C 62 16, 76 10, 96 18 L 96 44 C 80 40, 66 46, 52 42 C 38 38, 20 44, 4 40 Z"
                  fill="rgba(251,247,240,0.07)"
                  stroke="rgba(201,162,75,0.35)"
                  strokeWidth="0.3"
                />
                <path
                  d="M4 44 C 20 48, 38 42, 52 46 C 66 50, 82 46, 96 50 L 96 74 C 78 78, 58 72, 40 76 C 24 79, 10 74, 3 70 Z"
                  fill="rgba(251,247,240,0.05)"
                  stroke="rgba(201,162,75,0.3)"
                  strokeWidth="0.3"
                />
                {/* potomac */}
                <path
                  d="M38 6 C 44 22, 40 34, 48 44 C 54 52, 52 64, 60 76"
                  fill="none"
                  stroke="rgba(242,166,90,0.35)"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
                {/* beltway */}
                <ellipse
                  cx="50"
                  cy="40"
                  rx="30"
                  ry="22"
                  fill="none"
                  stroke="rgba(227,200,138,0.28)"
                  strokeWidth="0.45"
                  strokeDasharray="2 2"
                />
                {/* routes */}
                {[
                  "M12 32 L 48 42",
                  "M43 58 L 48 42",
                  "M78 16 L 50 40",
                ].map((d, i) => (
                  <path
                    key={d}
                    d={d}
                    fill="none"
                    stroke="rgba(201,162,75,0.5)"
                    strokeWidth="0.4"
                    strokeDasharray="1.6 1.6"
                    style={{ animation: `dash 14s linear ${i * 2}s infinite` }}
                  />
                ))}

                {/* DC */}
                <g>
                  <circle cx="50" cy="40" r="4.6" fill="rgba(242,166,90,0.16)" />
                  <circle cx="50" cy="40" r="1.7" fill="#F2A65A" />
                  <text x="50" y="35.6" textAnchor="middle" fontSize="3" fill="#F4EFE6" fontFamily="Inter, sans-serif" fontWeight="600">
                    WASHINGTON DC
                  </text>
                </g>

                {/* airports */}
                {AIRPORTS.map((airport) => (
                  <g key={airport.code}>
                    <circle cx={airport.x} cy={airport.y} r="3.4" fill="rgba(201,162,75,0.14)" />
                    <circle cx={airport.x} cy={airport.y} r="1.2" fill="#C9A24B" />
                    <text
                      x={airport.x}
                      y={airport.y - 4.6}
                      textAnchor="middle"
                      fontSize="2.8"
                      fill="#E3C88A"
                      fontFamily="Inter, sans-serif"
                      fontWeight="700"
                      letterSpacing="0.4"
                    >
                      {airport.code}
                    </text>
                  </g>
                ))}

                {/* region labels */}
                {[
                  { label: "NORTHERN VIRGINIA", x: 30, y: 62 },
                  { label: "MARYLAND", x: 70, y: 26 },
                ].map((region) => (
                  <text
                    key={region.label}
                    x={region.x}
                    y={region.y}
                    textAnchor="middle"
                    fontSize="2.5"
                    fill="rgba(244,239,230,0.45)"
                    fontFamily="Inter, sans-serif"
                    letterSpacing="0.7"
                  >
                    {region.label}
                  </text>
                ))}
              </svg>

              <style>{`@keyframes dash { to { stroke-dashoffset: -60; } }`}</style>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {AIRPORTS.map((airport) => (
                  <div key={airport.code} className="rounded-card border border-cream/12 bg-navy/25 p-4">
                    <p className="flex items-center gap-2 font-serif text-[20px] text-gold-soft">
                      <Plane className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                      {airport.code}
                    </p>
                    <p className="mt-1 text-[14px] text-cream/78">{airport.name}</p>
                    <p className="mt-0.5 text-[12.5px] text-cream/62">{airport.minutes}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-[13px] text-cream/58">
                Stylised map — illustrative only, not for navigation.
              </p>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Coverage"
              title="Every neighborhood on this list is a place I know well."
              highlight={["know well"]}
              intro="Not a coverage circle drawn on a map by a dispatcher — streets I've driven for three decades, at every hour."
            />
            <ul className="mt-9 space-y-4">
              {SERVICE_AREAS.map((area, i) => {
                const isAirport = area.name.includes("(");
                return (
                  <Reveal as="li" key={area.name} delay={i * 0.05} y={16}>
                    <div className="card-lift flex gap-4 rounded-panel border border-navy/8 bg-pearl p-5 shadow-soft">
                      <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/8 text-gold-ink">
                        {isAirport ? (
                          <Plane className="h-5 w-5" strokeWidth={1.7} aria-hidden />
                        ) : (
                          <Building2 className="h-5 w-5" strokeWidth={1.7} aria-hidden />
                        )}
                      </span>
                      <div>
                        <h3 className="font-serif text-[22px] leading-snug text-navy">{area.name}</h3>
                        <p className="mt-1.5 text-[15.5px] leading-relaxed text-body/78">
                          {area.detail}
                        </p>
                        <p className="mt-1.5 text-[14px] italic text-body/65">{area.note}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </Section>

      {/* beyond */}
      <Section tone="pearl" size="md">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <Reveal x={-28}>
            <SmartImage
              source={IMAGES.nightRoad}
              alt={IMAGES.nightRoad.alt}
              ratio="4 / 3"
              className="rounded-hero shadow-lift"
              kenBurns
              parallax={26}
              sizes="(max-width: 1024px) 100vw, 44vw"
            />
          </Reveal>
          <div>
            <Reveal y={14}>
              <Badge tone="gold">Beyond the DMV</Badge>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 font-serif text-[32px] leading-[1.12] text-navy sm:text-[40px]">
                Road days are welcome. I'll tell you honestly if the drive makes sense.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[17.5px] leading-relaxed text-body/80">
                Richmond, Charlottesville, Baltimore, Philadelphia, Wilmington and New York are
                regular runs. Longer trips are quoted in advance with the return leg included, tolls
                and overnight if needed.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {BEYOND.map((place) => (
                  <li
                    key={place}
                    className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-ivory px-4 py-2.5 text-[15px] text-body/80 transition-all duration-400 ease-luxe hover:-translate-y-0.5 hover:border-gold/60"
                  >
                    <MapPin className="h-4 w-4 text-gold-ink" strokeWidth={1.8} aria-hidden />
                    {place}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/book"
                  className="btn-primary btn-sheen group inline-flex h-14 items-center gap-2.5 rounded-full px-8 text-[16px] font-semibold"
                >
                  Book a ride
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-400 ease-luxe group-hover:translate-x-1"
                    strokeWidth={2}
                    aria-hidden
                  />
                </Link>
                <Link href="/contact" className="text-[15.5px] font-medium text-navy/80">
                  <span className="link-underline">Ask about your address</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
