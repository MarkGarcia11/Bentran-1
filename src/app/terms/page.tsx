import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { BRAND_NAME, CONTACT, OWNER, addressOneLine } from "@/lib/brand";
import { CANCELLATION_LINE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that apply when you book transportation with ${BRAND_NAME}: reservations, cancellations, waiting time, liability and conduct.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

const UPDATED = "January 2026"; // PLACEHOLDER — set your real effective date

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "1. Agreement",
    body: [
      `By requesting transportation from ${BRAND_NAME} ("BNTRAN", "we", "us") you agree to these terms. We provide chauffeured ground transportation in Washington DC, Northern Virginia, Maryland and surrounding areas.`,
      "These terms are a plain-language placeholder template. Before going live, have them reviewed by a lawyer licensed in your jurisdiction.",
    ],
  },
  {
    heading: "2. Reservations & confirmation",
    body: [
      "A booking request is not a confirmed reservation until we confirm it — by phone, text or email — and provide a reference number. We confirm most requests within one hour during business hours.",
      "Requests are accepted subject to vehicle and driver availability. If we cannot serve a request we will tell you as early as possible and, where we can, suggest a vetted alternative.",
    ],
  },
  {
    heading: "3. Rates & payment",
    body: [
      "Rates shown on this website are placeholders for demonstration. Your actual rate will be quoted and agreed before the ride. Airport transfers are flat rates; hourly and as-directed service is quoted with a minimum.",
      "Tolls, parking, airport fees, gratuities (if you choose to add one) and any requested extras are billed in addition to the quoted rate unless stated otherwise.",
      "Corporate accounts may be invoiced monthly on net-30 terms after credit approval. Private rides are settled at the end of the trip. We do not store card details on this website.",
    ],
  },
  {
    heading: "4. Cancellations & changes",
    body: [
      CANCELLATION_LINE,
      "Inside 12 hours of pickup, half the quoted rate applies. Inside 2 hours, the full rate applies. Airport rides cancelled after the driver has been dispatched to the terminal are charged in full.",
      "Changes to date, time or address are free whenever we can accommodate them. Flight-related changes caused by the airline are never charged.",
    ],
  },
  {
    heading: "5. Waiting time",
    body: [
      "Local pickups include 15 minutes of free waiting time from the scheduled pickup. Airport pickups include 60 minutes from wheels-down. After that, waiting time is billed at the hourly rate, pro-rated.",
      "If you know you'll be late, call or text. We would much rather wait than have you rush.",
    ],
  },
  {
    heading: "6. Flight tracking",
    body: [
      "When you provide a flight number we monitor the arrival time and adjust pickup automatically at no charge. We are not responsible for missed connections when no flight number was provided, or when a passenger fails to appear within the grace period.",
    ],
  },
  {
    heading: "7. Passenger conduct",
    body: [
      "Please don't smoke or vape in the vehicle, and let us know in advance about pets, medical equipment or unusual luggage so we can bring the right car.",
      "We may decline or end a ride — without refund — if a passenger is abusive, intoxicated to the point of risk, or asks us to break traffic law. Children must be appropriately restrained; we provide child seats on request with 24 hours' notice.",
    ],
  },
  {
    heading: "8. Luggage & lost property",
    body: [
      "We take reasonable care of luggage while it is in the vehicle. Our liability for lost or damaged items is limited as described below. Lost property is kept for 30 days and returned at the owner's cost, or donated afterwards.",
    ],
  },
  {
    heading: "9. Liability & insurance",
    body: [
      "Vehicles are covered by commercial liability insurance (placeholder: $1,000,000). To the maximum extent permitted by law, our liability for any claim arising from a ride is limited to the fare paid for that ride, except where liability cannot lawfully be limited.",
      "We are not liable for delays caused by traffic, weather, road closures, mechanical failure beyond our control, or acts of a passenger or third party — though we will always do our best to mitigate them.",
    ],
  },
  {
    heading: "10. Website & demo features",
    body: [
      "This site is provided 'as is'. Some features — including the booking wizard, the 'Where is my driver?' preview, the chat button and the admin demo — are demonstration interfaces and do not dispatch a real vehicle or deliver real messages.",
      "You may not misuse the site, attempt to disrupt it, or submit fraudulent booking requests.",
    ],
  },
  {
    heading: "11. Privacy",
    body: [
      `How we handle your personal information is described in our Privacy Policy. In short: we collect what we need to drive you safely, we never sell it, and we delete it when we no longer need it.`,
    ],
  },
  {
    heading: "12. Governing law",
    body: [
      "These terms are governed by the laws of the Commonwealth of Virginia and applicable United States federal law, without regard to conflict-of-law rules. Any dispute will be resolved in the state or federal courts located nearest to Arlington, Virginia.",
    ],
  },
  {
    heading: "13. Contact",
    body: [
      `${BRAND_NAME} · ${OWNER.firstName} · ${addressOneLine}`,
      `Phone: ${CONTACT.phoneDisplay} · Email: ${CONTACT.email}`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        intro={`Last updated ${UPDATED}. Clear expectations on both sides — reservations, rates, cancellations, waiting time and conduct.`}
        image="nightRoadAlt"
        compact
        breadcrumb={[
          { name: "Home", url: "/" },
          { name: "Terms of Service", url: "/terms" },
        ]}
      />

      <Section tone="ivory" size="lg">
        <div className="grid gap-12 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <nav aria-label="Terms sections">
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-gold-ink">
                On this page
              </p>
              <ol className="mt-5 space-y-2.5">
                {SECTIONS.map((section) => (
                  <li key={section.heading}>
                    <a
                      href={`#${section.heading.split(".")[0].trim()}`}
                      className="text-[15px] text-body/76 transition-colors duration-300 link-underline hover:text-navy"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="mt-8 rounded-panel border border-navy/8 bg-pearl p-6 shadow-soft">
              <p className="text-[15.5px] leading-relaxed text-body/76">
                Something in here unclear? Ask and we'll explain it in plain words.
              </p>
              <Link
                href="/contact"
                className="mt-3 inline-block text-[15.5px] font-medium text-navy link-underline"
              >
                Contact {OWNER.firstName}
              </Link>
            </div>
          </aside>

          <div className="space-y-8">
            {SECTIONS.map((section, i) => (
              <Reveal key={section.heading} delay={i * 0.03} y={18}>
                <article
                  id={section.heading.split(".")[0].trim()}
                  className="scroll-mt-32 rounded-panel border border-navy/8 bg-pearl p-7 shadow-soft md:p-9"
                >
                  <h2 className="font-serif text-[26px] leading-snug text-navy md:text-[30px]">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.body.map((paragraph) => (
                      <p key={paragraph.slice(0, 30)} className="text-[17px] leading-[1.72] text-body/82">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
