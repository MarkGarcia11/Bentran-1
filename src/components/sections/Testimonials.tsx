"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { TESTIMONIALS, TESTIMONIALS_NOTE, type Testimonial } from "@/lib/content";
import { cn, EASE_LUXE } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { Section, SectionHeading } from "@/components/shared/SectionHeading";

export function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="card-lift flex h-full flex-col rounded-panel border border-navy/8 bg-pearl p-7 shadow-soft">
      <Quote className="h-7 w-7 text-gold-ink/45" strokeWidth={1.4} aria-hidden />
      <blockquote className="mt-5 flex-1 font-serif text-[20px] italic leading-[1.55] text-navy">
        {item.quote}
      </blockquote>
      <div className="mt-6 flex items-center gap-1 text-gold-ink" aria-label="Five out of five">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} aria-hidden />
        ))}
      </div>
      <figcaption className="mt-4 border-t border-navy/8 pt-5">
        <p className="text-[16px] font-semibold text-navy">{item.name}</p>
        <p className="mt-0.5 text-[14.5px] text-body/70">
          {item.role} · {item.location}
        </p>
      </figcaption>
    </figure>
  );
}

export function TestimonialSlider() {
  const reduce = useReducedMotion();
  const featured = TESTIMONIALS.filter((t) => t.featured);
  const pool = featured.length >= 2 ? featured : TESTIMONIALS;
  const [[index, direction], setState] = React.useState<[number, number]>([0, 1]);
  const [paused, setPaused] = React.useState(false);

  const paginate = React.useCallback(
    (dir: number) => {
      setState(([current]) => {
        const next = (current + dir + pool.length) % pool.length;
        return [next, dir];
      });
    },
    [pool.length],
  );

  React.useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => paginate(1), 7000);
    return () => window.clearInterval(id);
  }, [reduce, paused, paginate]);

  const active = pool[index];
  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir * 60, filter: reduce ? "none" : "blur(6px)" }),
    center: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir * -60, filter: reduce ? "none" : "blur(6px)" }),
  };

  return (
    <Section tone="quiet" size="lg" id="stories">
      <SectionHeading
        eyebrow="Client stories"
        title="The nicest thing people say is that they stopped worrying."
        highlight={["stopped worrying"]}
        intro="A few of the words clients have sent over the years. Placeholder quotes for the demo — real, permissioned ones will replace them."
      />

      <div
        className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* rotating featured quote */}
        <Reveal>
          <div className="relative min-h-[380px] rounded-panel sunrise p-8 shadow-lift md:min-h-[420px] md:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-panel opacity-70"
              style={{
                background:
                  "radial-gradient(90% 80% at 88% 110%, rgba(242,166,90,0.34) 0%, rgba(201,162,75,0.12) 42%, rgba(15,27,45,0) 70%)",
              }}
            />
            <div className="relative flex h-full flex-col">
              <Quote className="h-9 w-9 text-gold-soft/60" strokeWidth={1.3} aria-hidden />
              <div className="relative mt-6 flex-1">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.blockquote
                    key={active.name}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: reduce ? 0.3 : 0.75, ease: EASE_LUXE }}
                    className="font-serif text-[23px] italic leading-[1.5] text-cream md:text-[29px]"
                    aria-live="polite"
                  >
                    “{active.quote}”
                    <footer className="mt-7 not-italic">
                      <p className="text-[16px] font-semibold text-gold-soft">{active.name}</p>
                      <p className="mt-1 text-[14.5px] text-cream/70">
                        {active.role} · {active.location}
                      </p>
                    </footer>
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {pool.map((item, i) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setState([i, i > index ? 1 : -1])}
                      aria-label={`Show story from ${item.name}`}
                      aria-current={i === index}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-500 ease-luxe",
                        i === index ? "w-9 bg-gold-soft" : "w-4 bg-cream/25 hover:bg-cream/45",
                      )}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => paginate(-1)}
                    aria-label="Previous story"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-all duration-400 ease-luxe hover:-translate-x-0.5 hover:border-gold hover:text-gold-soft"
                  >
                    <ChevronLeft className="h-4.5 w-4.5" strokeWidth={1.8} aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => paginate(1)}
                    aria-label="Next story"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-all duration-400 ease-luxe hover:translate-x-0.5 hover:border-gold hover:text-gold-soft"
                  >
                    <ChevronRight className="h-4.5 w-4.5" strokeWidth={1.8} aria-hidden />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* card column */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {TESTIMONIALS.filter((t) => !t.featured)
            .slice(0, 4)
            .map((item, i) => (
              <Reveal key={item.name} delay={i * 0.08} y={22}>
                <TestimonialCard item={item} />
              </Reveal>
            ))}
        </div>
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 text-center text-[14px] italic text-body/65">{TESTIMONIALS_NOTE}</p>
      </Reveal>
    </Section>
  );
}

export function TestimonialGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {TESTIMONIALS.map((item, i) => (
        <Reveal key={item.name} delay={i * 0.07} y={24}>
          <TestimonialCard item={item} />
        </Reveal>
      ))}
    </div>
  );
}
