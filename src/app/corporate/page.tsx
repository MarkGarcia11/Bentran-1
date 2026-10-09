import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, FileText, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { Badge, Eyebrow } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/ContactForm";
import { CorporateBand } from "@/components/sections/CtaBand";
import { CORPORATE, FAQS } from "@/lib/content";
import { IMAGES } from "@/lib/images";
import { CONTACT, OWNER } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Corporate Accounts — Simple Team Booking & Monthly Invoicing",
  description:
    "A corporate account with BNTRAN means one booking form for your whole team, one dedicated driver who learns your office, consistent service, and a single monthly invoice.",
  alternates: { canonical: "/corporate" },
};

const CORPORATE_FAQS = FAQS.filter((f) => f.category === "Corporate" || f.category === "Pricing");

export default function CorporatePage() {
  return (
    <>
      <PageHero
        eyebrow="Corporate accounts"
        title={CORPORATE.headline}
        highlight={["effortless"]}
        intro={CORPORATE.intro}
        image="corporate"
        breadcrumb={[
          { name: "Home", url: "/" },
          { name: "Corporate", url: "/corporate" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="#team-setup"
            className="btn-primary btn-sheen inline-flex h-14 items-center gap-2 rounded-full px-8 text-[16px] font-semibold"
          >
            Request a team setup
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
          </a>
          <a
            href={`tel:${CONTACT.phoneDial}`}
            className="glass-dark inline-flex h-14 items-center gap-2 rounded-full px-7 text-[15.5px] font-medium text-cream transition-all duration-400 ease-luxe hover:border-gold"
          >
            <Phone className="h-4 w-4 text-gold-soft" strokeWidth={1.8} aria-hidden />
            Call {OWNER.firstName}
          </a>
        </div>
      </PageHero>

      {/* benefits */}
      <Section tone="ivory" size="lg">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="What a team account gives you"
              title="Less chasing. More planning."
              highlight={["Less chasing"]}
              intro="An office manager shouldn't spend Monday morning on hold with a dispatch center. Here's what changes when one driver handles the team."
            />
            <ul className="mt-10 space-y-7">
              {CORPORATE.benefits.map((benefit, i) => (
                <Reveal as="li" key={benefit.title} delay={i * 0.08} y={20}>
                  <div className="flex gap-5">
                    <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/8 font-serif text-[16px] text-gold-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-serif text-[24px] leading-snug text-navy">{benefit.title}</h3>
                      <p className="mt-2 text-[17px] leading-relaxed text-body/80">{benefit.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal x={32}>
            <div className="grid gap-5 sm:grid-cols-2">
              <SmartImage
                source={IMAGES.working}
                alt={IMAGES.working.alt}
                ratio="3 / 4"
                className="rounded-hero shadow-lift"
                kenBurns
                parallax={22}
              />
              <div className="flex flex-col gap-5 sm:pt-12">
                <SmartImage
                  source={IMAGES.suv}
                  alt={IMAGES.suv.alt}
                  ratio="4 / 3"
                  className="rounded-hero shadow-soft"
                  kenBurns
                />
                <div className="glass rounded-hero p-6 shadow-soft">
                  <Badge tone="sage">Monthly invoicing</Badge>
                  <p className="mt-4 text-[16px] leading-relaxed text-body/80">
                    One itemized invoice by traveler and date, sent by email, payable net-30.
                    Purchase orders and W-9s welcome.
                  </p>
                  <p className="mt-3 text-[13px] text-body/62">
                    Invoicing is a placeholder in this demo.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* how setup works */}
      <Section tone="pearl" size="md">
        <SectionHeading
          eyebrow="Setting up"
          title="It takes one conversation."
          highlight={["one conversation"]}
          intro="No contracts to negotiate for months, no software to roll out, no per-seat licensing."
          align="center"
        />
        <ol className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-3">
          {CORPORATE.steps.map((step, i) => (
            <Reveal as="li" key={step} delay={i * 0.09} y={22}>
              <div className="card-lift h-full rounded-panel border border-navy/8 bg-ivory p-7">
                <span className="font-serif text-[13px] tracking-[0.24em] text-gold-ink">
                  STEP {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 text-[17px] leading-relaxed text-body/85">{step}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={0.2}>
          <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-3 text-[15.5px] text-body/72">
            {["No minimum contract", "Cancel a standing ride any time", "Same-day requests welcome", "Guests and VIPs handled discreetly"].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-sage" strokeWidth={1.9} aria-hidden />
                  {item}
                </li>
              ),
            )}
          </ul>
        </Reveal>
      </Section>

      {/* form */}
      <Section tone="quiet" size="lg" id="team-setup">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Reveal y={14}>
              <Eyebrow>Request a team setup</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 font-serif text-[34px] leading-[1.1] text-navy sm:text-[42px]">
                Tell me about your team.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[17.5px] leading-relaxed text-body/80">
                Four quick questions and a sentence about how your people travel. I'll come back with
                a plain-English proposal — vehicles, rates, billing, and how your team requests a
                ride.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-8 space-y-4">
                <a
                  href={`tel:${CONTACT.phoneDial}`}
                  className="flex items-center gap-4 rounded-card border border-navy/8 bg-pearl p-5 transition-all duration-400 ease-luxe hover:-translate-y-0.5 hover:border-gold"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 text-gold-ink">
                    <Phone className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                  </span>
                  <span>
                    <span className="block text-[16px] font-semibold text-navy">
                      Prefer to talk it through?
                    </span>
                    <span className="block text-[15px] text-body/72">
                      Call {OWNER.firstName} · {CONTACT.phoneDisplay}
                    </span>
                  </span>
                </a>
                <div className="flex items-start gap-4 rounded-card border border-navy/8 bg-pearl p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold-ink">
                    <FileText className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                  </span>
                  <p className="text-[15.5px] leading-relaxed text-body/76">
                    Need documents for procurement? Certificate of insurance, W-9 and a service
                    agreement are available on request.{" "}
                    <span className="text-body/65">(Placeholders in this demo.)</span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal x={28}>
            <ContactForm kind="team" />
          </Reveal>
        </div>
      </Section>

      {/* faqs */}
      <Section tone="pearl" size="md">
        <SectionHeading
          eyebrow="Corporate questions"
          title="What finance and facilities usually ask."
          highlight={["usually ask"]}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {CORPORATE_FAQS.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 0.06} y={18}>
              <div className="card-lift h-full rounded-panel border border-navy/8 bg-ivory p-6">
                <Badge tone="gold">{faq.category}</Badge>
                <h3 className="mt-4 font-serif text-[21px] leading-snug text-navy">{faq.q}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-body/80">{faq.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CorporateBand />
    </>
  );
}
