import type { Metadata } from "next";
import { Suspense } from "react";
import { MessageSquare, Phone, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { WhereIsMyDriver } from "@/components/booking/WhereIsMyDriver";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/card";
import { CONTACT, OWNER } from "@/lib/brand";
import { CANCELLATION_LINE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book a Ride — Reserve Your Chauffeur in Under a Minute",
  description:
    "Request a corporate chauffeur, airport transfer or hourly driver in Washington DC, Northern Virginia and Maryland. Three short steps, instant reference number, free cancellation up to 12 hours.",
  alternates: { canonical: "/book" },
  robots: { index: true, follow: true },
};

const NEXT_STEPS = [
  {
    title: "You get a reference number",
    body: "Something like BN-2026-0001. Keep it — that's how we find your ride in a hurry.",
  },
  {
    title: `${OWNER.firstName} confirms personally`,
    body: "Usually within the hour during business hours, always before your pickup. If something looks tight, he'll say so early.",
  },
  {
    title: "He arrives fifteen minutes early",
    body: "Car cool and clean, water cold, and a text when he's close. You just walk out.",
  },
];

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Booking"
        title="Where can I take you?"
        highlight={["take you"]}
        intro="Three short steps, and the request lands directly with Ben. No account needed, no payment now, no waiting on hold."
        image="hero"
        compact
        breadcrumb={[
          { name: "Home", url: "/" },
          { name: "Book a Ride", url: "/book" },
        ]}
      />

      <section className="relative bg-ivory py-14 md:py-20">
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-5 sm:px-8 lg:grid-cols-[1.55fr_1fr] lg:gap-12 lg:px-12">
          <Suspense fallback={<div className="glass h-[560px] rounded-panel" />}>
            <BookingWizard />
          </Suspense>

          <div className="space-y-6">
            {/* prefer to talk */}
            <Reveal y={20}>
              <div className="rounded-panel sunrise p-7 text-cream shadow-lift">
                <Badge tone="outline">Prefer to talk?</Badge>
                <h2 className="mt-5 font-serif text-[28px] leading-tight text-cream md:text-[32px]">
                  Call {OWNER.firstName} directly.
                </h2>
                <p className="mt-3 text-[16px] leading-relaxed text-cream/78">
                  Some days a conversation is faster than a form. He answers between rides — and if
                  he can't, he calls back the same day.
                </p>
                <div className="mt-7 flex flex-col gap-3">
                  <a
                    href={`tel:${CONTACT.phoneDial}`}
                    className="btn-primary btn-sheen flex h-14 items-center justify-center gap-2.5 rounded-full px-6 text-[16.5px] font-semibold"
                  >
                    <Phone className="h-4.5 w-4.5" strokeWidth={1.9} aria-hidden />
                    {CONTACT.phoneDisplay}
                  </a>
                  <a
                    href={`sms:${CONTACT.smsDial}?body=Hi%20Ben%2C%20I%27d%20like%20to%20book%20a%20ride.`}
                    className="glass-dark flex h-14 items-center justify-center gap-2.5 rounded-full px-6 text-[16px] font-medium text-cream transition-all duration-400 ease-luxe hover:-translate-y-0.5 hover:border-gold"
                  >
                    <MessageSquare className="h-4.5 w-4.5 text-gold-soft" strokeWidth={1.8} aria-hidden />
                    Text {OWNER.firstName}
                  </a>
                </div>
                <p className="mt-6 flex items-start gap-2.5 text-[14px] leading-snug text-cream/66">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" strokeWidth={1.8} aria-hidden />
                  {CANCELLATION_LINE}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <WhereIsMyDriver />
            </Reveal>

            <Reveal delay={0.14}>
              <div className="glass rounded-panel p-7 shadow-soft">
                <h2 className="font-serif text-[24px] text-navy">What happens next</h2>
                <ol className="mt-6 space-y-6">
                  {NEXT_STEPS.map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/8 font-serif text-[14px] text-gold-ink">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-[16.5px] font-semibold text-navy">{step.title}</p>
                        <p className="mt-1 text-[15.5px] leading-relaxed text-body/76">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
