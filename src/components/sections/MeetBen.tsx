"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { BEN_STORY } from "@/lib/content";
import { CONTACT, OWNER } from "@/lib/brand";
import { IMAGES } from "@/lib/images";
import { EASE_LUXE } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";
import { PullQuote, Reveal, SlideLines } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/card";

export function MeetBen() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="meet-ben" className="relative overflow-hidden bg-ivory py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(242,166,90,0.28) 0%, rgba(201,162,75,0.12) 45%, rgba(251,247,240,0) 72%)",
        }}
      />
      <div className="relative mx-auto grid w-full max-w-[1240px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12">
        {/* portrait */}
        <Reveal x={reduce ? 0 : -32}>
          <div className="relative">
            <SmartImage
              source={IMAGES.ben}
              alt={IMAGES.ben.alt}
              ratio="4 / 5"
              className="rounded-hero shadow-lift"
              parallax={reduce ? 0 : 26}
              sizes="(max-width: 1024px) 100vw, 44vw"
            />
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: reduce ? 0.5 : 0.9, ease: EASE_LUXE, delay: 0.2 }}
              className="glass absolute -bottom-8 -right-4 max-w-[260px] rounded-panel p-5 shadow-lift sm:-right-8"
            >
              <p className="font-script text-[30px] leading-none text-gold-ink">{OWNER.firstName}</p>
              <p className="mt-2 text-[14px] leading-snug text-body/76">
                {OWNER.years}+ years driving DC, Virginia and Maryland
              </p>
            </motion.div>
            <div
              aria-hidden
              className="absolute -left-4 -top-4 hidden h-24 w-24 rounded-tl-hero border-l border-t border-gold/40 lg:block"
            />
          </div>
        </Reveal>

        {/* story */}
        <div>
          <Reveal y={14}>
            <Eyebrow>{BEN_STORY.eyebrow}</Eyebrow>
          </Reveal>
          <h2
            id="meet-ben"
            className="mt-5 font-serif text-[34px] leading-[1.1] text-navy sm:text-[44px] md:text-[52px]"
          >
            <Reveal y={18}>“{BEN_STORY.headline}”</Reveal>
          </h2>

          <div className="mt-8">
            <SlideLines lines={BEN_STORY.paragraphs.slice(0, 1)} />
          </div>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[18px] leading-[1.7] text-body/85">{BEN_STORY.paragraphs[1]}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-[18px] leading-[1.7] text-body/85">{BEN_STORY.paragraphs[2]}</p>
          </Reveal>

          <PullQuote
            className="mt-12 border-l border-gold/40 pl-7"
            lines={[BEN_STORY.pullQuotes[0]]}
          />

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="font-script text-[42px] leading-none text-navy">
                  {BEN_STORY.signature}
                </p>
                <p className="mt-3 text-[15px] italic text-body/70">{BEN_STORY.signatureLine}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/about"
                  className="group inline-flex h-12 items-center gap-2 rounded-full border border-navy/15 px-6 text-[15px] font-medium text-navy transition-all duration-400 ease-luxe hover:-translate-y-0.5 hover:border-gold hover:bg-gold/8"
                >
                  Read the full story
                  <ArrowRight
                    className="h-4 w-4 text-gold-ink transition-transform duration-400 ease-luxe group-hover:translate-x-1"
                    strokeWidth={1.9}
                    aria-hidden
                  />
                </Link>
                <a
                  href={`tel:${CONTACT.phoneDial}`}
                  className="group inline-flex h-12 items-center gap-2 rounded-full px-5 text-[15px] font-medium text-body/80 transition-colors duration-300 hover:text-navy"
                >
                  <Phone className="h-4 w-4 text-gold-ink" strokeWidth={1.8} aria-hidden />
                  Call {OWNER.firstName}
                  <span className="link-underline">{CONTACT.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
