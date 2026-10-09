"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Clock,
  PenLine,
  Plane,
  Route,
  Sparkles,
} from "lucide-react";
import { HOW_IT_WORKS, SERVICES } from "@/lib/content";
import { IMAGES } from "@/lib/images";
import { EASE_LUXE } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/motion/Reveal";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";

const STEP_ICONS: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  pen: PenLine,
  check: CheckCircle2,
  seat: Briefcase,
};

export const SERVICE_ICONS: Record<
  string,
  React.ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  briefcase: Briefcase,
  plane: Plane,
  route: Route,
  sparkle: Sparkles,
  clock: Clock,
  check: CheckCircle2,
};

/* ------------------------------------------------------- How it works */

export function HowItWorks() {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <Section tone="pearl" size="lg" id="how-it-works">
      <SectionHeading
        eyebrow="How it works"
        title="Three steps. That is genuinely all."
        highlight={["Three steps"]}
        intro="Request, confirm, relax. No apps to learn, no queues, no surge pricing at 6 AM."
      />

      <div ref={ref} className="relative mt-16">
        {/* the gold road line */}
        <div aria-hidden className="absolute left-0 right-0 top-8 hidden h-px bg-navy/10 lg:block">
          <motion.span
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold via-apricot to-gold"
            initial={{ width: 0 }}
            animate={{ width: inView ? "100%" : 0 }}
            transition={{ duration: reduce ? 0.001 : 1.9, ease: EASE_LUXE, delay: reduce ? 0 : 0.25 }}
          />
          <motion.span
            className="absolute -top-[7px] h-[15px] w-[15px] rounded-full border-2 border-pearl bg-apricot shadow-glow"
            initial={{ left: "0%" }}
            animate={{ left: inView ? "97%" : "0%" }}
            transition={{ duration: reduce ? 0.001 : 1.9, ease: EASE_LUXE, delay: reduce ? 0 : 0.25 }}
          />
        </div>

        <ol className="grid gap-10 lg:grid-cols-3 lg:gap-14">
          {HOW_IT_WORKS.map((step, i) => {
            const Icon = STEP_ICONS[step.icon] ?? CheckCircle2;
            return (
              <Reveal as="li" key={step.step} delay={i * 0.14} y={26}>
                <div className="group relative">
                  <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-pearl text-gold-ink shadow-soft transition-all duration-500 ease-luxe group-hover:border-gold group-hover:bg-gold/10">
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <span className="mt-7 block font-serif text-[13px] tracking-[0.3em] text-gold-ink">
                    {step.step}
                  </span>
                  <h3 className="mt-2 font-serif text-[28px] leading-tight text-navy md:text-[32px]">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-[17.5px] leading-relaxed text-body/80">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>

      <Reveal delay={0.2}>
        <div className="mt-14 flex flex-wrap items-center gap-4">
          <Link
            href="/book"
            className="btn-primary btn-sheen group inline-flex h-13 items-center gap-2.5 rounded-full px-7 py-3.5 text-[16px] font-semibold"
          >
            Start a request
            <ArrowRight
              className="h-4 w-4 transition-transform duration-400 ease-luxe group-hover:translate-x-1"
              strokeWidth={2}
              aria-hidden
            />
          </Link>
          <p className="text-[15.5px] text-body/70">
            Takes about a minute. Ben reads every request himself.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------- Services grid */

export function ServicesGrid({
  limit,
  eyebrow = "Services",
  title = "Quiet, capable transportation for the days that matter.",
  intro = "Five ways people usually call me. All of them include the same thing: a driver who arrives early and a car that smells clean.",
}: {
  limit?: number;
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  const reduce = useReducedMotion();
  const items = limit ? SERVICES.slice(0, limit) : SERVICES;

  return (
    <Section tone="ivory" size="lg" id="services">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading eyebrow={eyebrow} title={title} highlight={["Quiet"]} intro={intro} />
        <Reveal delay={0.15} className="shrink-0">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-[16px] font-medium text-navy"
          >
            <span className="link-underline">All services & rates</span>
            <ArrowRight
              className="h-4 w-4 text-gold-ink transition-transform duration-400 ease-luxe group-hover:translate-x-1"
              strokeWidth={1.9}
              aria-hidden
            />
          </Link>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((service, i) => {
          const Icon = SERVICE_ICONS[service.icon] ?? Briefcase;
          const wide = i === 0;
          return (
            <Reveal
              key={service.slug}
              delay={i * 0.08}
              x={reduce ? 0 : i % 2 === 0 ? -22 : 22}
              y={reduce ? 22 : 0}
              className={wide ? "lg:col-span-2" : undefined}
            >
              <Link
                href={`/services#${service.slug}`}
                className="card-lift group relative flex h-full flex-col overflow-hidden rounded-panel border border-navy/8 bg-pearl shadow-soft"
              >
                <div className={wide ? "relative h-64 overflow-hidden lg:h-80" : "relative h-56 overflow-hidden"}>
                  <SmartImage
                    source={service.image}
                    alt={IMAGES_alt(service.image)}
                    rounded="rounded-none"
                    className="h-full w-full rounded-none"
                    kenBurns
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/18 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                    <h3 className="font-serif text-[26px] leading-tight text-cream md:text-[30px]">
                      {service.name}
                    </h3>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/30 bg-navy/25 text-gold-soft backdrop-blur-sm transition-all duration-500 ease-luxe group-hover:border-gold group-hover:bg-gold/20">
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[15px] font-medium uppercase tracking-[0.12em] text-gold-ink">
                    {service.short}
                  </p>
                  <p className="mt-3 text-[16.5px] leading-relaxed text-body/80">{service.body}</p>

                  {/* hover reveal */}
                  <div className="mt-5 grid gap-2 overflow-hidden">
                    {service.bullets.slice(0, 3).map((bullet, bi) => (
                      <motion.p
                        key={bullet}
                        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: EASE_LUXE, delay: bi * 0.06 }}
                        className="flex items-start gap-2.5 text-[15px] text-body/72"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage" strokeWidth={1.8} aria-hidden />
                        {bullet}
                      </motion.p>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                    <span className="text-[14.5px] font-medium text-navy/75">{service.from}</span>
                    <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-navy">
                      <span className="link-underline">Details</span>
                      <ArrowRight
                        className="h-4 w-4 text-gold-ink transition-transform duration-400 ease-luxe group-hover:translate-x-1"
                        strokeWidth={1.9}
                        aria-hidden
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function IMAGES_alt(key: keyof typeof IMAGES) {
  return IMAGES[key].alt;
}
