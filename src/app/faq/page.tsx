"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, HelpCircle, Phone, Search } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FinalCta } from "@/components/sections/CtaBand";
import { FaqSchema } from "@/components/JsonLd";
import { FAQS } from "@/lib/content";
import { CONTACT, OWNER } from "@/lib/brand";
import { cn, EASE_LUXE } from "@/lib/utils";

const CATEGORIES = ["All", ...Array.from(new Set(FAQS.map((f) => f.category)))];

export default function FaqPage() {
  const [category, setCategory] = React.useState("All");
  const [query, setQuery] = React.useState("");
  const reduce = useReducedMotion();

  const filtered = FAQS.filter((faq) => {
    const matchesCategory = category === "All" || faq.category === category;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q || faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  const grouped = CATEGORIES.filter((c) => c !== "All").map((c) => ({
    category: c,
    items: filtered.filter((f) => f.category === c),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Straight answers, before you ask."
        highlight={["Straight answers"]}
        intro="Rates, cancellations, flight tracking, waiting time, child seats and corporate billing. If your question isn't here, call — I'd rather answer it than have you guess."
        image="interiorNight"
        compact
        breadcrumb={[
          { name: "Home", url: "/" },
          { name: "FAQ", url: "/faq" },
        ]}
      />

      <Section tone="ivory" size="lg">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* filter rail */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="Browse"
              title="Find your answer."
              className="max-w-none"
            />
            <div className="mt-7">
              <label htmlFor="faq-search" className="sr-only">
                Search the FAQ
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gold-ink"
                  strokeWidth={1.8}
                  aria-hidden
                />
                <input
                  id="faq-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search — cancellations, child seat, invoice…"
                  className="h-[58px] w-full rounded-card border border-navy/12 bg-pearl pl-11 pr-4 text-[16px] outline-none transition-all duration-300 ease-luxe focus:border-gold focus:ring-4 focus:ring-gold/18"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5" role="tablist" aria-label="FAQ categories">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={category === c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "rounded-full border px-4 py-2.5 text-[14.5px] font-medium transition-all duration-300 ease-luxe",
                    category === c
                      ? "border-gold bg-gold/12 text-navy"
                      : "border-navy/12 bg-pearl text-body/76 hover:-translate-y-0.5 hover:border-gold/60 hover:text-navy",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-panel border border-navy/8 bg-pearl p-6 shadow-soft">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 text-gold-ink">
                <HelpCircle className="h-5 w-5" strokeWidth={1.8} aria-hidden />
              </span>
              <h3 className="mt-4 font-serif text-[22px] leading-snug text-navy">
                Still unsure about something?
              </h3>
              <p className="mt-2.5 text-[15.5px] leading-relaxed text-body/76">
                Ask {OWNER.firstName} directly. No scripts, no call center — just a driver who knows
                the answer.
              </p>
              <a
                href={`tel:${CONTACT.phoneDial}`}
                className="mt-5 inline-flex h-12 items-center gap-2 rounded-full border border-navy/15 px-5 text-[15px] font-medium text-navy transition-all duration-400 ease-luxe hover:-translate-y-0.5 hover:border-gold hover:bg-gold/8"
              >
                <Phone className="h-4 w-4 text-gold-ink" strokeWidth={1.8} aria-hidden />
                {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>

          {/* accordion */}
          <div className="space-y-12">
            {grouped.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_LUXE }}
                className="rounded-panel border border-navy/8 bg-pearl p-10 text-center shadow-soft"
              >
                <p className="font-serif text-[26px] text-navy">Nothing matched that.</p>
                <p className="mt-3 text-[16.5px] text-body/76">
                  Try a different word, or call {OWNER.firstName} — he'll answer it.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setCategory("All");
                  }}
                  className="mt-6 inline-flex h-12 items-center rounded-full border border-navy/15 px-6 text-[15px] font-medium text-navy transition-all duration-400 ease-luxe hover:border-gold hover:bg-gold/8"
                >
                  Clear the search
                </button>
              </motion.div>
            ) : (
              grouped.map((group) => (
                <div key={group.category}>
                  <Reveal y={14}>
                    <div className="mb-4 flex items-center gap-3">
                      <Badge tone="gold">{group.category}</Badge>
                      <span className="text-[13.5px] text-body/65">
                        {group.items.length} {group.items.length === 1 ? "question" : "questions"}
                      </span>
                    </div>
                  </Reveal>
                  <Reveal delay={0.05}>
                    <div className="rounded-panel border border-navy/8 bg-pearl px-6 shadow-soft md:px-8">
                      <Accordion type="single" collapsible className="w-full">
                        {group.items.map((faq) => (
                          <AccordionItem key={faq.q} value={faq.q}>
                            <AccordionTrigger>{faq.q}</AccordionTrigger>
                            <AccordionContent>{faq.a}</AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </Reveal>
                </div>
              ))
            )}

            <Reveal delay={0.1}>
              <div className="rounded-panel sunrise p-8 text-cream shadow-lift md:p-10">
                <h3 className="font-serif text-[28px] leading-tight text-cream md:text-[34px]">
                  Ready when you are.
                </h3>
                <p className="mt-3 max-w-xl text-[16.5px] leading-relaxed text-cream/78">
                  Booking takes about a minute. You'll get a reference number immediately, and a
                  personal confirmation from {OWNER.firstName} shortly after.
                </p>
                <Link
                  href="/book"
                  className="btn-primary btn-sheen group mt-7 inline-flex h-14 items-center gap-2.5 rounded-full px-8 text-[16px] font-semibold"
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
          </div>
        </div>
      </Section>

      <FinalCta />
      <FaqSchema items={FAQS} />
    </>
  );
}
