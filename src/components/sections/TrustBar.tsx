"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Clock, Phone, ShieldCheck } from "lucide-react";
import { BRAND_PROMISE, STATS, TRUST_POINTS } from "@/lib/brand";
import { EASE_LUXE } from "@/lib/utils";
import { Counter, FlyingText, Reveal } from "@/components/motion/Reveal";

const ICONS: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  clock: Clock,
  shield: ShieldCheck,
  check: CheckCircle2,
  phone: Phone,
};

export function TrustBar() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="trust-heading" className="relative bg-pearl">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-16 sm:px-8 md:py-20 lg:px-12">
        <h2 id="trust-heading" className="sr-only">
          Why riders stay with us
        </h2>

        {/* the promise, drifting in letter by letter */}
        <p className="mb-16 text-center font-serif text-[26px] italic leading-snug text-navy md:text-[36px]">
          <FlyingText text={BRAND_PROMISE} delay={0.1} />
        </p>

        {/* counters */}
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} y={18}>
              <div className="relative pl-5">
                <span aria-hidden className="absolute left-0 top-1.5 h-10 w-px bg-gold/45" />
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-serif text-[42px] leading-none text-navy md:text-[52px]">
                    <Counter
                      to={stat.value}
                      suffix={stat.suffix}
                      compact={Boolean(stat.compact)}
                      duration={reduce ? 0 : 2}
                    />
                  </span>
                  <span className="mt-3 block text-[14px] uppercase tracking-[0.16em] text-body/66">
                    {stat.label}
                  </span>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <div className="hairline my-14 h-px w-full" />

        {/* trust points */}
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {TRUST_POINTS.map((point, i) => {
            const Icon = ICONS[point.icon] ?? CheckCircle2;
            return (
              <Reveal as="li" key={point.title} delay={i * 0.1} y={20}>
                <motion.div
                  whileHover={reduce ? undefined : { y: -4 }}
                  transition={{ duration: 0.5, ease: EASE_LUXE }}
                  className="group flex gap-4"
                >
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-gold/8 text-gold-ink transition-all duration-500 ease-luxe group-hover:border-gold group-hover:bg-gold/16">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-full border border-gold/40"
                      initial={{ scale: 1, opacity: 0.6 }}
                      whileInView={{ scale: 1.35, opacity: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: reduce ? 0 : 2.6, repeat: Infinity, ease: "easeOut", delay: i * 0.4 }}
                    />
                  </span>
                  <div>
                    <h3 className="font-serif text-[21px] leading-snug text-navy">{point.title}</h3>
                    <p className="mt-1.5 text-[15.5px] leading-relaxed text-body/76">{point.body}</p>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
