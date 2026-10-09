import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { Badge } from "@/components/ui/card";
import { TestimonialGrid, TestimonialSlider } from "@/components/sections/Testimonials";
import { CorporateBand } from "@/components/sections/CtaBand";
import { TESTIMONIALS, TESTIMONIALS_NOTE } from "@/lib/content";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Client Stories — What Riders Say About Ben",
  description:
    "Thirty years of corporate travelers, airport runs and quiet mornings. Read what clients say about BNTRAN's chauffeur service in DC, Virginia and Maryland.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Client stories"
        title="Thirty years of people arriving calm."
        highlight={["arriving calm"]}
        intro="The best compliment I get isn't about the car. It's that somebody stopped worrying about the ride."
        image="dcBridge"
        breadcrumb={[
          { name: "Home", url: "/" },
          { name: "Client Stories", url: "/testimonials" },
        ]}
      />

      <TestimonialSlider />

      <Section tone="pearl" size="lg">
        <SectionHeading
          eyebrow="More stories"
          title="From office managers, founders and families."
          highlight={["families"]}
          intro="A cross-section of the people who call. Names are shortened and details changed out of respect — and these demo quotes are placeholders awaiting real, permissioned ones."
        />
        <div className="mt-14">
          <TestimonialGrid />
        </div>
        <Reveal delay={0.1}>
          <p className="mt-10 text-center text-[14px] italic text-body/65">{TESTIMONIALS_NOTE}</p>
        </Reveal>
      </Section>

      <Section tone="quiet" size="lg">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <Reveal x={-30}>
            <SmartImage
              source={IMAGES.doorService}
              alt={IMAGES.doorService.alt}
              ratio="4 / 3"
              className="rounded-hero shadow-lift"
              kenBurns
              parallax={24}
              sizes="(max-width: 1024px) 100vw, 46vw"
            />
          </Reveal>
          <div>
            <Reveal y={14}>
              <Badge tone="sage">{TESTIMONIALS.length} stories · 5.0 average</Badge>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 font-serif text-[32px] leading-[1.12] text-navy sm:text-[40px]">
                Most clients stay for years. A few have stayed for decades.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[17.5px] leading-relaxed text-body/80">
                That's the honest measure I care about. Nobody keeps a driver for twenty years
                because of a nice car. They keep him because he's early, he's careful, and he
                doesn't make them think about transportation.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-9 rounded-panel border border-gold/25 bg-pearl p-7 shadow-soft">
                <Quote className="h-7 w-7 text-gold-ink/50" strokeWidth={1.4} aria-hidden />
                <p className="mt-4 font-serif text-[22px] italic leading-snug text-navy">
                  “I've never had to wonder whether the car would be there. In twenty years, that's
                  the whole review.”
                </p>
                <p className="mt-4 text-[13px] uppercase tracking-[0.18em] text-body/65">
                  Long-time private client · Placeholder quote
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <Link
                href="/book"
                className="btn-primary btn-sheen group mt-9 inline-flex h-14 items-center gap-2.5 rounded-full px-8 text-[16px] font-semibold"
              >
                Book your first ride
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-400 ease-luxe group-hover:translate-x-1"
                  strokeWidth={2}
                  aria-hidden
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </Section>

      <CorporateBand />
    </>
  );
}
