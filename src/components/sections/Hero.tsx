"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { CONTACT, OWNER, DEMO_NOTE } from "@/lib/brand";
import { HERO } from "@/lib/content";
import { IMAGES } from "@/lib/images";
import { cn, EASE_LUXE, todayISO } from "@/lib/utils";
import { draftToParams, type BookingDraft } from "@/lib/booking";
import { useBooking } from "@/lib/booking-context";
import { SmartImage } from "@/components/ui/SmartImage";
import { Bokeh, Magnetic } from "@/components/motion/Motion";
import { WordLine } from "@/components/motion/Reveal";
import { useLoaderDone } from "@/lib/loader-context";
import { Badge } from "@/components/ui/card";

/* ------------------------------------------------------------------ */

export function Hero() {
  const reduce = useReducedMotion();
  /** Hold the hero animation until the screen loader lifts. */
  const ready = useLoaderDone();

  return (
    <section className="relative -mt-[88px] min-h-[100svh] overflow-hidden pt-[88px]">
      {/* full-bleed image */}
      <div className="absolute inset-0">
        <SmartImage
          source={IMAGES.hero}
          className="h-full w-full rounded-none"
          kenBurns
          parallax={reduce ? 0 : 44}
          priority
          sizes="100vw"
          imgClassName="object-[center_62%]"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(15,27,45,0.86) 0%, rgba(22,38,61,0.62) 46%, rgba(15,27,45,0.34) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-56"
          style={{
            background:
              "radial-gradient(80% 120% at 85% 120%, rgba(242,166,90,0.42) 0%, rgba(201,162,75,0.16) 40%, rgba(15,27,45,0) 72%)",
          }}
        />
      </div>

      <Bokeh />

      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col justify-center px-5 pb-16 pt-14 sm:px-8 lg:min-h-[calc(100svh-88px)] lg:px-12 lg:pb-24">
        <motion.div
          initial={false}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : 18 }}
          transition={{ duration: reduce ? 0.5 : 0.9, ease: EASE_LUXE, delay: reduce || !ready ? 0 : 0.05 }}
          className="max-w-3xl"
        >
          <Badge tone="outline" className="mb-7 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
            {HERO.eyebrow}
          </Badge>

          <h1 className="font-serif text-[40px] leading-[1.04] text-cream sm:text-[54px] lg:text-[72px] xl:text-[80px]">
            <WordLine
              text={HERO.headline[0]}
              highlight={HERO.highlightWords}
              className="block text-cream"
              delay={0.12}
              start={ready}
            />
            <WordLine
              text={HERO.headline[1]}
              highlight={HERO.highlightWords}
              className="block text-cream"
              delay={0.5}
              start={ready}
            />
          </h1>

          <motion.p
            initial={false}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : 16 }}
            transition={{ duration: reduce ? 0.5 : 0.9, ease: EASE_LUXE, delay: reduce || !ready ? 0 : 0.85 }}
            className="mt-8 max-w-xl text-[18.5px] leading-relaxed text-cream/85 md:text-[21px]"
          >
            {HERO.subline}
          </motion.p>

          <motion.div
            initial={false}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : 16 }}
            transition={{ duration: reduce ? 0.5 : 0.9, ease: EASE_LUXE, delay: reduce || !ready ? 0 : 1 }}
            className="mt-10 flex flex-wrap items-center gap-3.5"
          >
            <Magnetic>
              <Link
                href="/book"
                className="btn-primary btn-sheen inline-flex h-14 items-center gap-2.5 rounded-full px-8 text-[16.5px] font-semibold md:h-16 md:px-10 md:text-[18px]"
              >
                {HERO.primaryCta}
                <ArrowRight className="h-4.5 w-4.5 transition-transform duration-400 ease-luxe group-hover:translate-x-1" strokeWidth={2} aria-hidden />
              </Link>
            </Magnetic>
            <a
              href={`tel:${CONTACT.phoneDial}`}
              className="glass-dark inline-flex h-14 items-center gap-2.5 rounded-full px-7 text-[16px] font-medium text-cream transition-all duration-400 ease-luxe hover:-translate-y-0.5 hover:border-gold/70 md:h-16 md:px-9"
            >
              <Phone className="h-4.5 w-4.5 text-gold-soft" strokeWidth={1.8} aria-hidden />
              {HERO.secondaryCta}
              <span className="hidden text-cream/66 sm:inline">· {CONTACT.phoneDisplay}</span>
            </a>
          </motion.div>

          <motion.p
            initial={false}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.9, delay: reduce || !ready ? 0 : 1.15 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14.5px] text-cream/70"
          >
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-gold-soft" strokeWidth={1.8} aria-hidden />
              Licensed & insured
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-gold-soft" strokeWidth={1.8} aria-hidden />
              Free cancellation up to 12 hours
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold-soft" strokeWidth={1.8} aria-hidden />
              DC · Northern Virginia · Maryland
            </span>
          </motion.p>
        </motion.div>

        {/* Sky-glass quick request strip */}
        <motion.div
          initial={false}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : 28 }}
          transition={{ duration: reduce ? 0.5 : 1, ease: EASE_LUXE, delay: reduce || !ready ? 0 : 1.25 }}
          className="mt-14 lg:mt-16"
        >
          <QuickBooking />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------- quick booking strip */

function QuickBooking() {
  const router = useRouter();
  const { draft, setDraft } = useBooking();
  const [pickup, setPickup] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [date, setDate] = React.useState(todayISO());
  const [time, setTime] = React.useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: BookingDraft = { ...draft, pickup, destination, date, time };
    setDraft(next);
    router.push(`/book?${draftToParams(next)}`);
  };

  const fieldClass =
    "h-12 w-full rounded-card border border-navy/12 bg-pearl/85 px-3.5 text-[15.5px] text-body outline-none transition-all duration-300 ease-luxe placeholder:text-body/62 focus:border-gold focus:bg-pearl focus:ring-4 focus:ring-gold/18";

  return (
    <form
      onSubmit={submit}
      aria-label="Quick ride request"
      className="glass rounded-panel p-4 shadow-lift md:p-5"
    >
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-navy/70">
          {HERO.quickLabel}
        </p>
        <p className="text-[12.5px] text-body/65">
          Four fields, then I'll take care of the rest — or call {OWNER.firstName} directly.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1.3fr_1.3fr_0.9fr_0.7fr_auto]">
        <div>
          <label htmlFor="qb-pickup" className="sr-only">
            Pickup location
          </label>
          <div className="relative">
            <MapPin
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-ink"
              strokeWidth={1.8}
              aria-hidden
            />
            <input
              id="qb-pickup"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Pickup — address or airport"
              autoComplete="off"
              className={cn(fieldClass, "pl-10")}
            />
          </div>
        </div>
        <div>
          <label htmlFor="qb-destination" className="sr-only">
            Destination
          </label>
          <div className="relative">
            <ArrowRight
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-ink"
              strokeWidth={1.8}
              aria-hidden
            />
            <input
              id="qb-destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Destination"
              autoComplete="off"
              className={cn(fieldClass, "pl-10")}
            />
          </div>
        </div>
        <div>
          <label htmlFor="qb-date" className="sr-only">
            Date
          </label>
          <input
            id="qb-date"
            type="date"
            value={date}
            min={todayISO()}
            onChange={(e) => setDate(e.target.value)}
            className={cn(fieldClass, "text-body/85")}
          />
        </div>
        <div>
          <label htmlFor="qb-time" className="sr-only">
            Time
          </label>
          <input
            id="qb-time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={cn(fieldClass, "text-body/85")}
          />
        </div>
        <button
          type="submit"
          className="btn-primary btn-sheen inline-flex h-12 items-center justify-center gap-2 rounded-card px-6 text-[15.5px] font-semibold transition-transform duration-400 ease-luxe hover:-translate-y-0.5"
        >
          Continue
          <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
        </button>
      </div>

      <p className="mt-3 text-[12.5px] text-body/62">{DEMO_NOTE}</p>
    </form>
  );
}
