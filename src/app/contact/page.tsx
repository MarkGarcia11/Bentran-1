import type { Metadata } from "next";
import type { ComponentType } from "react";
import { Clock3, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { Badge } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/ContactForm";
import { FinalCta } from "@/components/sections/CtaBand";
import { CONTACT, OWNER, addressOneLine } from "@/lib/brand";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: `Contact ${OWNER.firstName} — Call, Text or Send a Message`,
  description: `Reach BNTRAN Inc. directly: call or text ${CONTACT.phoneDisplay}, email ${CONTACT.email}, or send a message. Hours, service area and same-day requests welcome.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const cards = [
    {
      icon: Phone,
      label: "Call",
      primary: CONTACT.phoneDisplay,
      secondary: "Fastest for same-day requests",
      href: `tel:${CONTACT.phoneDial}`,
      accent: true,
    },
    {
      icon: MessageSquare,
      label: "Text",
      primary: CONTACT.phoneDisplay,
      secondary: "Replies between rides",
      href: `sms:${CONTACT.smsDial}?body=Hi%20Ben%2C%20I%27d%20like%20to%20ask%20about%20a%20ride.`,
    },
    {
      icon: Mail,
      label: "Email",
      primary: CONTACT.email,
      secondary: "Quotes, invoices and documents",
      href: `mailto:${CONTACT.email}`,
    },
    {
      icon: MapPin,
      label: "Based in",
      primary: `${CONTACT.address.city}, ${CONTACT.address.region}`,
      secondary: "Serving DC, Northern Virginia & Maryland",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="One driver, one number, one reply."
        highlight={["one reply"]}
        intro="No call center, no ticket queue. Call, text, email or send the form — whichever is easiest for you."
        image="dcMonument"
        compact
        breadcrumb={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
      />

      <Section tone="ivory" size="lg">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <Reveal key={card.label} delay={i * 0.07} y={20}>
              {card.href ? (
                <a
                  href={card.href}
                  className="card-lift flex h-full flex-col rounded-panel border border-navy/8 bg-pearl p-6 shadow-soft"
                >
                  <CardContent {...card} />
                </a>
              ) : (
                <div className="flex h-full flex-col rounded-panel border border-navy/8 bg-pearl p-6 shadow-soft">
                  <CardContent {...card} />
                </div>
              )}
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Send a message"
              title="Tell me what you need."
              highlight={["what you need"]}
              intro="Dates, addresses, questions about rates — a sentence or two is plenty. Ben reads every message himself."
            />
            <Reveal delay={0.1}>
              <div className="mt-9">
                <ContactForm kind="message" />
              </div>
            </Reveal>
          </div>

          <div className="space-y-6">
            <Reveal x={28}>
              <SmartImage
                source={IMAGES.details}
                alt={IMAGES.details.alt}
                ratio="4 / 3"
                className="rounded-hero shadow-lift"
                kenBurns
                parallax={22}
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </Reveal>

            <Reveal delay={0.08}>
              <div className="glass rounded-panel p-7 shadow-soft">
                <Badge tone="gold">
                  <Clock3 className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
                  Hours
                </Badge>
                <ul className="mt-5 space-y-3">
                  {CONTACT.hours.map((hour) => (
                    <li
                      key={hour.days}
                      className="flex items-baseline justify-between gap-4 border-b border-navy/8 pb-3 text-[16px] last:border-b-0 last:pb-0"
                    >
                      <span className="text-body/78">{hour.days}</span>
                      <span className="font-medium text-navy">{hour.time}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[14.5px] leading-relaxed text-body/70">
                  Early flights and late landings are normal here. If your pickup is outside these
                  hours, call anyway — {OWNER.firstName} keeps his phone on.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="rounded-panel sunrise p-7 text-cream shadow-lift">
                <h3 className="font-serif text-[24px] leading-snug text-cream">
                  Need a ride today?
                </h3>
                <p className="mt-3 text-[16px] leading-relaxed text-cream/78">
                  Same-day requests are welcome. The booking form takes about a minute, and a call
                  takes less.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="/book"
                    className="btn-primary btn-sheen inline-flex h-12 items-center rounded-full px-6 text-[15.5px] font-semibold"
                  >
                    Book a ride
                  </a>
                  <a
                    href={`tel:${CONTACT.phoneDial}`}
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-cream/25 px-6 text-[15.5px] font-medium text-cream transition-all duration-400 ease-luxe hover:border-gold hover:bg-gold/10"
                  >
                    <Phone className="h-4 w-4 text-gold-soft" strokeWidth={1.8} aria-hidden />
                    Call now
                  </a>
                </div>
                <p className="mt-5 text-[13.5px] text-cream/62">{addressOneLine}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}

function CardContent({
  icon: Icon,
  label,
  primary,
  secondary,
  accent,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  primary: string;
  secondary: string;
  accent?: boolean;
  href?: string;
}) {
  return (
    <>
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 ${
          accent ? "bg-gold/14 text-gold-ink" : "bg-gold/8 text-gold-ink"
        }`}
      >
        <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden />
      </span>
      <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-body/65">
        {label}
      </p>
      <p className="mt-1.5 font-serif text-[23px] leading-snug text-navy">{primary}</p>
      <p className="mt-2 text-[15px] leading-relaxed text-body/72">{secondary}</p>
    </>
  );
}
