import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { Badge } from "@/components/ui/card";
import { FleetPreview } from "@/components/sections/FleetPreview";
import { FinalCta } from "@/components/sections/CtaBand";
import { FLEET } from "@/lib/content";
import { IMAGES } from "@/lib/images";
import { LICENSE } from "@/lib/brand";

export const metadata: Metadata = {
  title: "The Fleet — Executive Sedans, Luxury SUVs & Sprinters",
  description:
    "A small, well-kept fleet: executive sedan, luxury SUV, premium S-Class and an 11-passenger executive Sprinter. Passenger and luggage capacity, features and placeholder rates.",
  alternates: { canonical: "/fleet" },
};

const CARE = [
  {
    icon: Wrench,
    title: "Serviced on schedule",
    body: "Every car follows the manufacturer's service interval, plus my own weekly walk-around. Nothing goes out with a warning light I've decided to ignore.",
  },
  {
    icon: ShieldCheck,
    title: "Inspected & insured",
    body: "Commercial liability coverage on every vehicle, DOT-ready documentation, and a certificate of insurance available for your procurement file.",
  },
  {
    icon: Sparkles,
    title: "Detailed between rides",
    body: "Interior wiped, glass cleaned, floor mats shaken out, water restocked. A car should feel like it's waiting for you, not the passenger before you.",
  },
];

export default function FleetPage() {
  return (
    <>
      <PageHero
        eyebrow="The fleet"
        title="Four vehicles. All of them spotless."
        highlight={["spotless"]}
        intro="I keep the fleet small on purpose — fewer cars means each one gets the attention it needs. Choose by passengers and luggage, and I'll bring the right one."
        image="suv"
        breadcrumb={[
          { name: "Home", url: "/" },
          { name: "Fleet", url: "/fleet" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          {FLEET.map((vehicle) => (
            <span
              key={vehicle.id}
              className="rounded-full border border-cream/25 px-5 py-2.5 text-[14.5px] text-cream/90"
            >
              {vehicle.name} · {vehicle.passengers} seats · {vehicle.luggage} bags
            </span>
          ))}
        </div>
      </PageHero>

      <FleetPreview showAll title="Choose your car" intro="Rates shown are editable placeholders for this demo — your quote is confirmed before you ride." />

      <Section tone="quiet" size="lg">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <Reveal x={-30}>
            <div className="relative">
              <SmartImage
                source={IMAGES.interior}
                alt={IMAGES.interior.alt}
                ratio="4 / 3"
                className="rounded-hero shadow-lift"
                kenBurns
                parallax={26}
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
              <div className="glass absolute -bottom-7 left-6 right-6 rounded-card p-5 shadow-lift sm:left-10">
                <Badge tone="sage">Inside every car</Badge>
                <p className="mt-3 text-[16px] leading-relaxed text-body/80">
                  Cold water, phone chargers (USB-C, Lightning and Micro), tissues, an umbrella, and
                  a quiet playlist you're welcome to overrule.
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="How the cars are kept"
              title="Small fleet, high standards."
              highlight={["high standards"]}
              intro="A big fleet means somebody else's car shows up. Mine means the same vehicle, cleaned and checked, every single time."
            />
            <ul className="mt-10 space-y-7">
              {CARE.map((item, i) => (
                <Reveal as="li" key={item.title} delay={i * 0.08} y={18}>
                  <div className="flex gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/8 text-gold-ink">
                      <item.icon className="h-5 w-5" strokeWidth={1.7} aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-serif text-[23px] leading-snug text-navy">{item.title}</h3>
                      <p className="mt-2 text-[16.5px] leading-relaxed text-body/80">{item.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.2}>
              <p className="mt-9 rounded-card border border-navy/8 bg-pearl p-5 text-[15px] leading-relaxed text-body/76">
                {LICENSE.line} <span className="text-body/65">(Placeholder details — edit in src/lib/brand.ts.)</span>
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="pearl" size="md">
        <div className="grid gap-10 md:grid-cols-3">
          {[IMAGES.citySedan, IMAGES.nightRoad, IMAGES.details].map((photo, i) => (
            <Reveal key={photo.src} delay={i * 0.09} y={22}>
              <SmartImage
                source={photo}
                alt={photo.alt}
                ratio="3 / 4"
                className="rounded-hero shadow-soft"
                kenBurns
              />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-center gap-5 text-center">
            <h2 className="font-serif text-[30px] text-navy md:text-[38px]">
              Not sure which car you need?
            </h2>
            <p className="max-w-xl text-[17.5px] leading-relaxed text-body/78">
              Tell me how many people and how much luggage. I'll bring the right vehicle and you
              won't have to think about it again.
            </p>
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
          </div>
        </Reveal>
      </Section>

      <FinalCta />
    </>
  );
}
