"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Briefcase, CheckCircle2, Clock, ShieldCheck, UserRound } from "lucide-react";
import { WHY_COMPANIES } from "@/lib/content";
import { IMAGES } from "@/lib/images";
import { EASE_LUXE } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";
import { Counter, PullQuote, Reveal } from "@/components/motion/Reveal";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";

const ICONS: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  clock: Clock,
  shield: ShieldCheck,
  user: UserRound,
  briefcase: Briefcase,
};

export function WhyCompanies() {
  const reduce = useReducedMotion();

  return (
    <Section tone="quiet" size="lg" id="why">
      <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="For companies"
            title="Why ten managers keep one number saved."
            highlight={["one number"]}
            intro="A corporate account isn't a portal. It's a person who learns how your office works — and then doesn't surprise you."
          />

          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {WHY_COMPANIES.map((item, i) => {
              const Icon = ICONS[item.icon] ?? CheckCircle2;
              return (
                <Reveal as="li" key={item.title} delay={i * 0.09} y={22}>
                  <motion.div
                    whileHover={reduce ? undefined : { y: -5 }}
                    transition={{ duration: 0.5, ease: EASE_LUXE }}
                    className="card-lift h-full rounded-panel border border-navy/8 bg-pearl/85 p-6 shadow-soft"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gold/8 text-gold-ink">
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-5 font-serif text-[23px] leading-snug text-navy">{item.title}</h3>
                    <p className="mt-3 text-[16.5px] leading-relaxed text-body/80">{item.body}</p>
                  </motion.div>
                </Reveal>
              );
            })}
          </ul>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/corporate"
                className="btn-primary btn-sheen group inline-flex h-14 items-center gap-2.5 rounded-full px-7 text-[16px] font-semibold"
              >
                Request a team setup
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-400 ease-luxe group-hover:translate-x-1"
                  strokeWidth={2}
                  aria-hidden
                />
              </Link>
              <a
                href="/faq"
                className="text-[15.5px] font-medium text-navy/80 transition-colors hover:text-navy"
              >
                <span className="link-underline">Corporate billing & policies</span>
              </a>
            </div>
          </Reveal>
        </div>

        <div className="relative">
          <Reveal x={reduce ? 0 : 32}>
            <SmartImage
              source={IMAGES.working}
              alt={IMAGES.working.alt}
              ratio="4 / 5"
              className="rounded-hero shadow-lift lg:ratio-[4/4.6]"
              parallax={reduce ? 0 : 34}
              sizes="(max-width: 1024px) 100vw, 44vw"
            />
          </Reveal>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: reduce ? 0.5 : 0.95, ease: EASE_LUXE, delay: 0.15 }}
            className="glass absolute -bottom-10 -left-4 w-[min(92%,360px)] rounded-panel p-7 shadow-lift sm:-left-10"
          >
            <p className="font-serif text-[46px] leading-none text-navy">
              <Counter to={10} suffix="" />
              <span className="text-gold-ink">+</span>
            </p>
            <p className="mt-3 text-[15.5px] leading-snug text-body/76">
              managers at one company book most of my week. Same driver, same standards, one monthly
              invoice.
            </p>
          </motion.div>

          <Reveal delay={0.25} className="mt-24 hidden lg:block">
            <PullQuote
              lines={[
                "He remembers that Margaret needs the coffee stop",
                "and David does not. That's the whole review.",
              ]}
              attribution="Karen W. — Office Manager, Arlington"
            />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
