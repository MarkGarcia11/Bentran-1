import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Phone, ShieldCheck, Star } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";
import { Counter, PullQuote, Reveal } from "@/components/motion/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { Eyebrow } from "@/components/ui/card";
import { FinalCta } from "@/components/sections/CtaBand";
import { BEN_STORY, TIMELINE, VALUES } from "@/lib/content";
import { IMAGES } from "@/lib/images";
import { CONTACT, LICENSE, OWNER, STATS } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Meet ${OWNER.firstName} — 30 Years of Trusted Driving in DC, VA & MD`,
  description:
    `${OWNER.firstName} has driven Washington DC, Northern Virginia and Maryland for more than 30 years. His story, his timeline, and the four values behind every ride.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={BEN_STORY.eyebrow}
        title={BEN_STORY.headline}
        highlight={["30 years"]}
        intro="No dispatchers, no subcontractors, no mystery driver. One man, one small fleet, and thirty years of learning how this city moves."
        image="dcMonument"
        breadcrumb={[
          { name: "Home", url: "/" },
          { name: `Ben's Story`, url: "/about" },
        ]}
      />

      {/* portrait + story */}
      <Section tone="ivory" size="lg">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal x={-30}>
            <div className="relative lg:sticky lg:top-32">
              <SmartImage
                source={IMAGES.benAlt}
                alt={IMAGES.benAlt.alt}
                ratio="4 / 5"
                className="rounded-hero shadow-lift"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="glass absolute -bottom-7 -right-3 rounded-panel p-5 shadow-lift sm:-right-8">
                <p className="font-script text-[34px] leading-none text-gold-ink">{OWNER.signOff}</p>
                <p className="mt-2 text-[13.5px] text-body/72">
                  {OWNER.role} · {OWNER.years}+ years
                </p>
              </div>
              <div
                aria-hidden
                className="absolute -left-5 -top-5 hidden h-28 w-28 rounded-tl-hero border-l border-t border-gold/40 lg:block"
              />
            </div>
          </Reveal>

          <div>
            <Reveal y={14}>
              <Eyebrow>The long way round</Eyebrow>
            </Reveal>
            {BEN_STORY.paragraphs.map((paragraph, i) => (
              <Reveal key={paragraph.slice(0, 24)} delay={0.06 + i * 0.08}>
                <p className="mt-6 text-[18.5px] leading-[1.75] text-body/85 first:mt-5">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <PullQuote
              className="mt-14 border-l border-gold/40 pl-8"
              lines={[BEN_STORY.pullQuotes[1]]}
              attribution={`${OWNER.firstName} — Founder & Chauffeur`}
            />

            <div className="mt-14 grid gap-8 sm:grid-cols-2">
              {VALUES.map((value, i) => (
                <Reveal key={value.title} delay={i * 0.07} y={20}>
                  <div className="card-lift h-full rounded-panel border border-navy/8 bg-pearl p-6 shadow-soft">
                    <span className="flex items-center gap-2 text-gold-ink">
                      <Star className="h-4 w-4" fill="currentColor" strokeWidth={0} aria-hidden />
                      <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-body/65">
                        Value {String(i + 1).padStart(2, "0")}
                      </span>
                    </span>
                    <h3 className="mt-3 font-serif text-[24px] leading-snug text-navy">{value.title}</h3>
                    <p className="mt-3 text-[16.5px] leading-relaxed text-body/80">{value.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* timeline */}
      <Section tone="navy" size="xl">
        <SectionHeading
          eyebrow="Thirty years"
          tone="light"
          title="A short timeline of a long road."
          highlight={["long road"]}
          intro="Dates and details here are editable placeholders — swap in the real ones and the story becomes yours."
        />

        <div className="relative mt-16">
          <span
            aria-hidden
            className="absolute left-[15px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-gold via-apricot/60 to-transparent md:block"
          />
          <ol className="space-y-10 md:space-y-14">
            {TIMELINE.map((item, i) => (
              <Reveal as="li" key={item.year} delay={i * 0.07} y={24}>
                <div className="relative flex gap-6 md:gap-12">
                  <span
                    aria-hidden
                    className="relative z-10 mt-1.5 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-navy md:flex"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-apricot" />
                  </span>
                  <div className="max-w-2xl">
                    <p className="font-serif text-[15px] tracking-[0.2em] text-gold-soft">
                      {item.year}
                    </p>
                    <h3 className="mt-2 font-serif text-[28px] leading-tight text-cream md:text-[34px]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[17px] leading-relaxed text-cream/78">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-8 border-t border-cream/12 pt-12 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.07}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-serif text-[40px] leading-none text-cream md:text-[50px]">
                  <Counter to={stat.value} suffix={stat.suffix} compact={Boolean(stat.compact)} />
                </span>
                <span className="mt-3 block text-[13px] uppercase tracking-[0.16em] text-cream/65">
                  {stat.label}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </Section>

      {/* licensing */}
      <Section tone="pearl" size="lg">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Licensed & insured"
              title="The boring paperwork, taken care of."
              highlight={["taken care of"]}
              intro="Corporate travel teams ask, and they should. Everything below is available as documentation on request."
            />
            <ul className="mt-9 grid gap-4 sm:grid-cols-2">
              {LICENSE.badges.map((badge, i) => (
                <Reveal as="li" key={badge} delay={i * 0.06} y={16}>
                  <div className="flex items-center gap-3 rounded-card border border-navy/8 bg-ivory px-5 py-4">
                    <BadgeCheck className="h-5 w-5 shrink-0 text-sage" strokeWidth={1.7} aria-hidden />
                    <span className="text-[16px] font-medium text-navy">{badge}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.2}>
              <p className="mt-7 flex items-start gap-3 rounded-card border border-gold/30 bg-gold/6 px-5 py-4 text-[15px] leading-relaxed text-body/78">
                <ShieldCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-ink" strokeWidth={1.8} aria-hidden />
                <span>
                  {LICENSE.line}{" "}
                  <span className="text-body/65">
                    — placeholder text; replace with your real authority and policy numbers in
                    src/lib/brand.ts.
                  </span>
                </span>
              </p>
            </Reveal>
          </div>

          <Reveal x={30}>
            <div className="grid gap-5 sm:grid-cols-2">
              <SmartImage
                source={IMAGES.doorService}
                alt={IMAGES.doorService.alt}
                ratio="3 / 4"
                className="rounded-hero shadow-lift"
                kenBurns
              />
              <div className="flex flex-col gap-5 sm:pt-10">
                <SmartImage
                  source={IMAGES.details}
                  alt={IMAGES.details.alt}
                  ratio="4 / 3"
                  className="rounded-hero shadow-soft"
                  kenBurns
                />
                <div className="rounded-hero sunrise p-6 text-cream shadow-soft">
                  <p className="font-serif text-[22px] italic leading-snug">
                    “{BEN_STORY.pullQuotes[0]}”
                  </p>
                  <p className="mt-4 text-[13px] uppercase tracking-[0.18em] text-gold-soft">
                    {OWNER.firstName}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-4 rounded-panel border border-navy/8 bg-ivory p-8 text-center">
            <p className="text-[17px] text-body/80">
              Want to meet the driver before you book? Call and ask anything.
            </p>
            <a
              href={`tel:${CONTACT.phoneDial}`}
              className="inline-flex h-13 items-center gap-2 rounded-full border border-navy/15 px-7 py-3.5 text-[15.5px] font-medium text-navy transition-all duration-400 ease-luxe hover:-translate-y-0.5 hover:border-gold hover:bg-gold/8"
            >
              <Phone className="h-4 w-4 text-gold-ink" strokeWidth={1.8} aria-hidden />
              {CONTACT.phoneDisplay}
            </a>
            <Link
              href="/book"
              className="btn-primary btn-sheen group inline-flex h-13 items-center gap-2 rounded-full px-7 py-3.5 text-[15.5px] font-semibold"
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
