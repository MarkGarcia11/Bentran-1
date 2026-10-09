"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { CORPORATE, MINI_CTA } from "@/lib/content";
import { CONTACT, OWNER } from "@/lib/brand";
import { IMAGES } from "@/lib/images";
import { EASE_LUXE } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";
import { Magnetic } from "@/components/motion/Motion";
import { Reveal, WordLine } from "@/components/motion/Reveal";

/* ------------------------------------------- Corporate CTA band */

export function CorporateBand() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="corporate-band" className="relative overflow-hidden sunrise py-24 md:py-32">
      <div aria-hidden className="absolute inset-0 opacity-25">
        <SmartImage
          source={IMAGES.dcSkyline}
          alt=""
          rounded="rounded-none"
          className="h-full w-full rounded-none"
          parallax={reduce ? 0 : 40}
          sizes="100vw"
          kenBurns
        />
        <div className="absolute inset-0 bg-navy/70" />
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="glass-dark grid gap-10 rounded-panel p-8 md:p-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          <div>
            <Reveal y={14}>
              <span className="text-[11.5px] font-semibold uppercase tracking-[0.24em] text-gold-soft">
                Corporate accounts
              </span>
            </Reveal>
            <h2
              id="corporate-band"
              className="mt-5 font-serif text-[32px] leading-[1.12] text-cream sm:text-[42px] md:text-[50px]"
            >
              <WordLine text={CORPORATE.headline} highlight={["effortless"]} className="text-cream" />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-[17.5px] leading-relaxed text-cream/80">
                One form for the whole team. One driver who learns the house. One invoice at the end
                of the month. Tell me roughly how many rides you need and I'll set it up.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                <Magnetic>
                  <Link
                    href="/corporate"
                    className="btn-primary btn-sheen group inline-flex h-14 items-center gap-2.5 rounded-full px-8 text-[16px] font-semibold"
                  >
                    Request a team setup
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-400 ease-luxe group-hover:translate-x-1"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </Link>
                </Magnetic>
                <a
                  href={`tel:${CONTACT.phoneDial}`}
                  className="inline-flex h-14 items-center gap-2.5 rounded-full border border-cream/25 px-7 text-[15.5px] font-medium text-cream transition-all duration-400 ease-luxe hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"
                >
                  <Phone className="h-4 w-4 text-gold-soft" strokeWidth={1.8} aria-hidden />
                  Talk to {OWNER.firstName}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal x={reduce ? 0 : 30}>
            <ul className="space-y-4">
              {CORPORATE.steps.map((step, i) => (
                <motion.li
                  key={step}
                  initial={{ opacity: 0, x: reduce ? 0 : 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: reduce ? 0.4 : 0.7, ease: EASE_LUXE, delay: i * 0.12 }}
                  className="flex gap-4 rounded-card border border-cream/14 bg-navy/25 p-5"
                >
                  <span className="font-serif text-[15px] text-gold-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[16px] leading-relaxed text-cream/85">{step}</p>
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- Final CTA */

export function FinalCta() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="final-cta" className="relative overflow-hidden bg-ivory py-24 md:py-36">
      <div className="relative mx-auto w-full max-w-[1240px] px-5 text-center sm:px-8 lg:px-12">
        <Reveal y={16}>
          <span className="text-[11.5px] font-semibold uppercase tracking-[0.24em] text-gold-ink">
            One tap, and it's handled
          </span>
        </Reveal>
        <h2
          id="final-cta"
          className="mx-auto mt-6 max-w-3xl font-serif text-[42px] leading-[1.05] text-navy sm:text-[58px] md:text-[76px]"
        >
          <WordLine
            text={MINI_CTA.headline}
            highlight={["take you"]}
            className="justify-center text-navy"
          />
        </h2>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-xl text-[18.5px] leading-relaxed text-body/78">
            {MINI_CTA.body}
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <motion.div
            whileHover={reduce ? undefined : { scale: 1.02 }}
            transition={{ duration: 0.5, ease: EASE_LUXE }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <Magnetic>
              <Link
                href="/book"
                className="btn-primary btn-sheen group inline-flex h-16 items-center gap-3 rounded-full px-11 text-[18px] font-semibold md:h-[68px] md:px-14 md:text-[19px]"
              >
                {MINI_CTA.button}
                <ArrowRight
                  className="h-5 w-5 transition-transform duration-400 ease-luxe group-hover:translate-x-1"
                  strokeWidth={2}
                  aria-hidden
                />
              </Link>
            </Magnetic>
            <a
              href={`tel:${CONTACT.phoneDial}`}
              className="inline-flex h-16 items-center gap-2.5 rounded-full border border-navy/15 px-8 text-[16.5px] font-medium text-navy transition-all duration-400 ease-luxe hover:-translate-y-0.5 hover:border-gold hover:bg-gold/8 md:h-[68px]"
            >
              <Phone className="h-4.5 w-4.5 text-gold-ink" strokeWidth={1.8} aria-hidden />
              {CONTACT.phoneDisplay}
            </a>
          </motion.div>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mt-8 text-[14.5px] text-body/65">
            Free cancellation up to 12 hours before pickup · No account needed ·{" "}
            <Link href="/faq" className="link-underline text-navy/75">
              read the FAQ
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
