"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Briefcase, Users } from "lucide-react";
import { FLEET, type Vehicle } from "@/lib/content";
import { IMAGES } from "@/lib/images";
import { EASE_LUXE } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";

export function VehicleCard({
  vehicle,
  selected,
  onSelect,
  index = 0,
}: {
  vehicle: Vehicle;
  selected?: boolean;
  onSelect?: (id: string) => void;
  index?: number;
}) {
  const reduce = useReducedMotion();
  const photo = IMAGES[vehicle.image];
  const interactive = Boolean(onSelect);

  const body = (
    <div
      className={[
        "card-lift relative flex h-full flex-col overflow-hidden rounded-panel border bg-pearl shadow-soft transition-all duration-500 ease-luxe",
        selected ? "border-gold ring-4 ring-gold/18" : "border-navy/8",
        interactive ? "cursor-pointer" : "",
      ].join(" ")}
    >
      <div className="relative h-52 overflow-hidden">
        <SmartImage
          source={photo}
          alt={photo.alt}
          rounded="rounded-none"
          className="h-full w-full rounded-none"
          kenBurns
          sizes="(max-width: 768px) 100vw, 30vw"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-navy/72 via-navy/10 to-transparent"
        />
        {vehicle.popular ? (
          <div className="absolute left-4 top-4">
            <Badge tone="apricot" className="bg-pearl/85 backdrop-blur-sm">
              Most requested
            </Badge>
          </div>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-serif text-[26px] leading-tight text-cream">{vehicle.name}</h3>
          <p className="mt-1 text-[13.5px] uppercase tracking-[0.12em] text-cream/70">
            {vehicle.category}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-[16.5px] leading-relaxed text-body/82">{vehicle.description}</p>

        <dl className="mt-6 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2.5 rounded-card bg-ivory px-4 py-3">
            <Users className="h-4.5 w-4.5 text-gold-ink" strokeWidth={1.7} aria-hidden />
            <div>
              <dt className="text-[11.5px] uppercase tracking-[0.14em] text-body/65">Passengers</dt>
              <dd className="font-serif text-[20px] text-navy">{vehicle.passengers}</dd>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-card bg-ivory px-4 py-3">
            <Briefcase className="h-4.5 w-4.5 text-gold-ink" strokeWidth={1.7} aria-hidden />
            <div>
              <dt className="text-[11.5px] uppercase tracking-[0.14em] text-body/65">Bags</dt>
              <dd className="font-serif text-[20px] text-navy">{vehicle.luggage}</dd>
            </div>
          </div>
        </dl>

        <ul className="mt-5 flex flex-wrap gap-2">
          {vehicle.features.map((feature) => (
            <li
              key={feature}
              className="rounded-full border border-navy/10 bg-pearl px-3 py-1.5 text-[13px] text-body/76"
            >
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-navy/8 pt-5">
          <span className="text-[15px] font-semibold text-navy">{vehicle.rate}</span>
          {interactive ? (
            <span
              className={[
                "flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-400 ease-luxe",
                selected ? "border-gold bg-gold text-navy" : "border-navy/20 text-transparent",
              ].join(" ")}
              aria-hidden
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.6">
                <path d="M5 12.5l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 text-[15px] font-medium text-navy">
              <span className="link-underline">Book this car</span>
              <ArrowRight className="h-4 w-4 text-gold-ink" strokeWidth={1.9} aria-hidden />
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: reduce ? 0.45 : 0.85, ease: EASE_LUXE, delay: reduce ? 0 : index * 0.08 }}
      className="h-full"
    >
      {interactive ? (
        <button
          type="button"
          onClick={() => onSelect?.(vehicle.id)}
          aria-pressed={selected}
          className="block h-full w-full text-left"
        >
          {body}
        </button>
      ) : (
        <Link href="/book" className="block h-full">
          {body}
        </Link>
      )}
    </motion.div>
  );
}

export function FleetPreview({
  title = "The fleet",
  intro = "Clean, quiet, and the right size for the day. Every car is inspected weekly and kept spotless between rides.",
  showAll = false,
}: {
  title?: string;
  intro?: string;
  showAll?: boolean;
}) {
  const list = showAll ? FLEET : FLEET.slice(0, 3);

  return (
    <Section tone="pearl" size="lg" id="fleet">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading eyebrow="Vehicles" title={title} highlight={["fleet"]} intro={intro} />
        {!showAll ? (
          <Reveal delay={0.15}>
            <Link
              href="/fleet"
              className="group inline-flex items-center gap-2 text-[16px] font-medium text-navy"
            >
              <span className="link-underline">See the full fleet</span>
              <ArrowRight
                className="h-4 w-4 text-gold-ink transition-transform duration-400 ease-luxe group-hover:translate-x-1"
                strokeWidth={1.9}
                aria-hidden
              />
            </Link>
          </Reveal>
        ) : null}
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {list.map((vehicle, i) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} />
        ))}
      </div>
    </Section>
  );
}
