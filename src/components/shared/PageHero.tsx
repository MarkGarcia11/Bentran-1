"use client";

import * as React from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { IMAGES, type ImageKey } from "@/lib/images";
import { SmartImage } from "@/components/ui/SmartImage";
import { Bokeh } from "@/components/motion/Motion";
import { Reveal, WordLine } from "@/components/motion/Reveal";
import { BreadcrumbSchema } from "@/components/JsonLd";

export function PageHero({
  eyebrow,
  title,
  highlight = [],
  intro,
  image,
  breadcrumb,
  children,
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string[];
  intro?: string;
  image: ImageKey;
  breadcrumb: { name: string; url: string }[];
  children?: React.ReactNode;
  compact?: boolean;
}) {
  const reduce = useReducedMotion();
  const photo = IMAGES[image];

  return (
    <section className="relative -mt-[88px] overflow-hidden sunrise pt-[88px]">
      <div aria-hidden className="absolute inset-0 opacity-[0.22]">
        <SmartImage
          source={photo}
          alt=""
          rounded="rounded-none"
          className="h-full w-full rounded-none"
          kenBurns
          parallax={reduce ? 0 : 30}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/65" />
      </div>
      <Bokeh />

      <div
        className={`relative mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12 ${
          compact ? "py-16 md:py-20" : "py-20 md:py-28"
        }`}
      >
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-[13.5px] text-cream/65">
            {breadcrumb.map((crumb, i) => (
              <li key={crumb.url} className="flex items-center gap-2">
                {i > 0 ? <ChevronRight className="h-3.5 w-3.5 text-gold-soft/60" aria-hidden /> : null}
                {i === breadcrumb.length - 1 ? (
                  <span aria-current="page" className="text-cream/85">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.url} className="link-underline transition-colors hover:text-cream">
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {eyebrow ? (
          <Reveal y={10}>
            <span className="text-[11.5px] font-semibold uppercase tracking-[0.24em] text-gold-soft">
              {eyebrow}
            </span>
          </Reveal>
        ) : null}

        <h1 className="mt-5 max-w-4xl font-serif text-[38px] leading-[1.06] text-cream sm:text-[50px] md:text-[64px]">
          <WordLine text={title} highlight={highlight} className="text-cream" />
        </h1>

        {intro ? (
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-2xl text-[18px] leading-relaxed text-cream/80 md:text-[19.5px]">
              {intro}
            </p>
          </Reveal>
        ) : null}

        {children ? <div className="mt-10">{children}</div> : null}
      </div>

      <BreadcrumbSchema trail={breadcrumb} />
    </section>
  );
}
