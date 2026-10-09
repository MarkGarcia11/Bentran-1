import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { Badge, Eyebrow } from "@/components/ui/card";
import { FinalCta } from "@/components/sections/CtaBand";
import { ServiceSchema, FaqSchema } from "@/components/JsonLd";
import { SERVICES, FAQS } from "@/lib/content";
import { IMAGES } from "@/lib/images";
import { CONTACT, OWNER } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Services — Corporate Chauffeur, Airport Transfers & Hourly Service",
  description:
    "Corporate chauffeur service, DCA/IAD/BWI airport transfers, executive roundtrips, special occasions and hourly as-directed driving across Washington DC, Northern Virginia and Maryland.",
  alternates: { canonical: "/services" },
};

const INCLUDED = [
  "Fifteen minutes early, every time",
  "Flight tracking with a 60-minute grace period",
  "Bottled water, chargers and an umbrella in the trunk",
  "Luggage carried, doors opened, curb-side meets",
  "A quiet cabin unless you'd like conversation",
  "Flat, quoted rates — no surge, no surprises",
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Five ways to use me. One standard underneath all of them."
        highlight={["One standard"]}
        intro="Corporate chauffeur work, airport transfers, executive roundtrips, special occasions and hourly as-directed service — across DC, Northern Virginia and Maryland."
        image="doorService"
        breadcrumb={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          {SERVICES.map((service) => (
            <a
              key={service.slug}
              href={`#${service.slug}`}
              className="rounded-full border border-cream/25 px-5 py-2.5 text-[14.5px] font-medium text-cream/90 transition-all duration-400 ease-luxe hover:-translate-y-0.5 hover:border-gold hover:bg-gold/12 hover:text-gold-soft"
            >
              {service.name}
            </a>
          ))}
        </div>
      </PageHero>

      {SERVICES.map((service, i) => {
        const photo = IMAGES[service.image];
        const flip = i % 2 === 1;
        return (
          <Section
            key={service.slug}
            id={service.slug}
            tone={i % 2 === 0 ? "ivory" : "pearl"}
            size="md"
            className="scroll-mt-28"
          >
            <div
              className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                flip ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal x={flip ? 32 : -32}>
                <div className="relative">
                  <SmartImage
                    source={photo}
                    alt={photo.alt}
                    ratio="4 / 3"
                    className="rounded-hero shadow-lift"
                    kenBurns
                    parallax={24}
                    sizes="(max-width: 1024px) 100vw, 46vw"
                  />
                  <div className="glass absolute -bottom-6 left-6 right-6 rounded-card p-5 shadow-lift sm:left-10 sm:right-10">
                    <p className="text-[15px] font-medium text-navy">{service.short}</p>
                    <p className="mt-1 text-[13.5px] text-body/70">
                      {service.from} · rates are placeholders for this demo
                    </p>
                  </div>
                </div>
              </Reveal>

              <div>
                <Reveal y={14}>
                  <Eyebrow>
                    {String(i + 1).padStart(2, "0")} · {service.name}
                  </Eyebrow>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="mt-5 font-serif text-[32px] leading-[1.1] text-navy sm:text-[42px] md:text-[48px]">
                    {service.short}
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-6 text-[18px] leading-[1.72] text-body/82">{service.body}</p>
                </Reveal>
                <ul className="mt-8 space-y-3">
                  {service.bullets.map((bullet, bi) => (
                    <Reveal as="li" key={bullet} delay={0.12 + bi * 0.06} y={14}>
                      <span className="flex items-start gap-3 text-[16.5px] leading-relaxed text-body/85">
                        <CheckCircle2
                          className="mt-0.5 h-4.5 w-4.5 shrink-0 text-sage"
                          strokeWidth={1.8}
                          aria-hidden
                        />
                        {bullet}
                      </span>
                    </Reveal>
                  ))}
                </ul>
                <Reveal delay={0.2}>
                  <div className="mt-9 flex flex-wrap items-center gap-3.5">
                    <Link
                      href={`/book?service=${service.slug}`}
                      className="btn-primary btn-sheen group inline-flex h-14 items-center gap-2.5 rounded-full px-8 text-[16px] font-semibold"
                    >
                      Book {service.name.toLowerCase()}
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-400 ease-luxe group-hover:translate-x-1"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </Link>
                    <a
                      href={`tel:${CONTACT.phoneDial}`}
                      className="inline-flex h-14 items-center gap-2 rounded-full border border-navy/15 px-6 text-[15.5px] font-medium text-navy transition-all duration-400 ease-luxe hover:-translate-y-0.5 hover:border-gold hover:bg-gold/8"
                    >
                      <Phone className="h-4 w-4 text-gold-ink" strokeWidth={1.8} aria-hidden />
                      Ask {OWNER.firstName} a question
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          </Section>
        );
      })}

      <Section tone="quiet" size="lg">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Included with every ride"
              title="The things you shouldn't have to ask for."
              highlight={["shouldn't have to ask"]}
            />
            <ul className="mt-9 space-y-3.5">
              {INCLUDED.map((item, i) => (
                <Reveal as="li" key={item} delay={i * 0.06} y={14}>
                  <span className="flex items-start gap-3 text-[17px] leading-relaxed text-body/85">
                    <CheckCircle2
                      className="mt-1 h-4.5 w-4.5 shrink-0 text-gold-ink"
                      strokeWidth={1.8}
                      aria-hidden
                    />
                    {item}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal x={32}>
            <div className="grid gap-5 sm:grid-cols-2">
              <SmartImage
                source={IMAGES.details}
                alt={IMAGES.details.alt}
                ratio="3 / 4"
                className="rounded-hero shadow-soft"
                kenBurns
              />
              <div className="flex flex-col gap-5">
                <SmartImage
                  source={IMAGES.interior}
                  alt={IMAGES.interior.alt}
                  ratio="4 / 3"
                  className="rounded-hero shadow-soft"
                  kenBurns
                />
                <div className="glass rounded-hero p-6 shadow-soft">
                  <Badge tone="sage">Quiet luxury</Badge>
                  <p className="mt-4 font-serif text-[22px] italic leading-snug text-navy">
                    “The details are the whole job.”
                  </p>
                  <p className="mt-3 text-[15px] text-body/72">
                    Cold water, the right charger, a folded newspaper if you'd like one, and a car
                    that smells clean.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="pearl" size="md">
        <SectionHeading
          eyebrow="Good to know"
          title="Questions people ask before their first ride."
          highlight={["Questions"]}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {FAQS.slice(0, 6).map((faq, i) => (
            <Reveal key={faq.q} delay={i * 0.06} y={20}>
              <div className="card-lift h-full rounded-panel border border-navy/8 bg-ivory p-6">
                <Badge tone="gold">{faq.category}</Badge>
                <h3 className="mt-4 font-serif text-[21px] leading-snug text-navy">{faq.q}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-body/80">{faq.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <div className="mt-10">
            <Link href="/faq" className="group inline-flex items-center gap-2 text-[16px] font-medium text-navy">
              <span className="link-underline">Read the full FAQ</span>
              <ArrowRight
                className="h-4 w-4 text-gold-ink transition-transform duration-400 ease-luxe group-hover:translate-x-1"
                strokeWidth={1.9}
                aria-hidden
              />
            </Link>
          </div>
        </Reveal>
      </Section>

      <FinalCta />
      <ServiceSchema />
      <FaqSchema items={FAQS.slice(0, 6)} />
    </>
  );
}
