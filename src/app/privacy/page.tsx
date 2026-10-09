import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { CONTACT, BRAND_NAME, OWNER, SITE_URL, addressOneLine } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${BRAND_NAME} collects, uses and protects your information. Plain language, no surprises.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const UPDATED = "January 2026"; // PLACEHOLDER — set your real effective date

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "1. Who we are",
    body: [
      `${BRAND_NAME} ("BNTRAN", "we", "us") is a small chauffeur company owned and operated by ${OWNER.firstName}, serving Washington DC, Northern Virginia and Maryland. This policy explains what information we collect when you visit ${SITE_URL.replace(/^https?:\/\//, "")} or book a ride, and what we do with it.`,
      "This policy is written in plain language on purpose. If anything is unclear, call or email and we'll explain it properly.",
    ],
  },
  {
    heading: "2. What we collect",
    body: [
      "When you request a ride we collect: your name, phone number, email address (if you provide it), pickup and destination locations, date and time, passenger count, vehicle choice, company name, flight number and any notes you add.",
      "When you send a message through the contact or corporate forms we collect: your name, email, phone (optional), company and the content of your message.",
      "Our web server also records standard technical information — pages visited, approximate region, browser type — used only to keep the site working and to understand which pages are useful.",
    ],
  },
  {
    heading: "3. How we use it",
    body: [
      "To confirm and complete your ride. To contact you about changes, delays or flight updates. To issue quotes, receipts and monthly invoices for corporate accounts. To remember your preferences so you don't have to repeat them.",
      "We do not sell your information. We do not share it with advertisers, data brokers or marketing platforms. We share the minimum necessary with a payment or accounting provider if you pay by card, and with an insurer or regulator if the law requires it.",
    ],
  },
  {
    heading: "4. Demo mode notice",
    body: [
      "This website is currently a demonstration build. Booking requests may be stored in your own browser (local storage) and, where a database is connected, in that database for preview purposes. No payment details are requested, collected or processed anywhere on this site.",
      "Before going live, the booking pipeline should be pointed at a real email/dispatch provider and this notice removed.",
    ],
  },
  {
    heading: "5. Location sharing",
    body: [
      "The booking form offers an optional 'share my location' button. It uses your browser's geolocation permission and only fills the pickup field with a description of your approximate position. Nothing is transmitted to us unless you submit the form. You can decline at any time and simply type the address instead.",
    ],
  },
  {
    heading: "6. Cookies and storage",
    body: [
      "We use browser local storage to remember an in-progress booking draft and to show the screen loader only once per session. There are no advertising cookies and no third-party tracking pixels on this site.",
    ],
  },
  {
    heading: "7. How long we keep it",
    body: [
      "Booking records are kept for as long as needed for service, accounting and legal purposes — typically seven years for tax records. Marketing preferences are kept until you ask us to remove them.",
    ],
  },
  {
    heading: "8. Your rights",
    body: [
      "You can ask us for a copy of the information we hold about you, ask us to correct it, or ask us to delete it. Depending on where you live (including under the GDPR, UK GDPR and the Virginia Consumer Data Protection Act) you may also have the right to object to certain processing and to lodge a complaint with a regulator.",
      "To exercise any of these rights, email or call us. We'll respond within 30 days, and usually much sooner.",
    ],
  },
  {
    heading: "9. Security",
    body: [
      "Data is transmitted over HTTPS. Access to booking records is limited to the owner-operator of the business. No system is perfectly secure, so we collect as little as we can and keep it for as short a time as we need to.",
    ],
  },
  {
    heading: "10. Children",
    body: [
      "Our services are not directed at children under 16, and we do not knowingly collect their information. Child seats are provided for young passengers when a parent or guardian books the ride.",
    ],
  },
  {
    heading: "11. Changes to this policy",
    body: [
      `If this policy changes, we'll update the date below and post the new version here. Significant changes will also be mentioned when you next book.`,
    ],
  },
  {
    heading: "12. Contact",
    body: [
      `${BRAND_NAME} · ${OWNER.firstName} · ${addressOneLine}`,
      `Phone: ${CONTACT.phoneDisplay} · Email: ${CONTACT.email}`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        intro={`Last updated ${UPDATED}. Written in plain language — no small print tricks. Placeholder template; have it reviewed before launch.`}
        image="dcBridge"
        compact
        breadcrumb={[
          { name: "Home", url: "/" },
          { name: "Privacy Policy", url: "/privacy" },
        ]}
      />

      <Section tone="ivory" size="lg">
        <div className="grid gap-12 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <nav aria-label="Privacy policy sections">
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
                Questions about your data? Ask {OWNER.firstName} directly.
              </p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="mt-3 inline-block text-[15.5px] font-medium text-navy link-underline"
              >
                {CONTACT.email}
              </a>
            </div>
          </aside>

          <div className="space-y-10">
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

            <Reveal>
              <div className="rounded-panel sunrise p-8 text-cream">
                <p className="font-serif text-[24px] leading-snug">
                  Prefer the short version? We collect what we need to drive you safely, we never
                  sell it, and we delete it when we no longer need it.
                </p>
                <Link
                  href="/contact"
                  className="btn-primary btn-sheen mt-7 inline-flex h-13 items-center rounded-full px-7 py-3.5 text-[15.5px] font-semibold"
                >
                  Contact us
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
