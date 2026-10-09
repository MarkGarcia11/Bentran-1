"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { cn, EASE_LUXE } from "@/lib/utils";

/* --------------------------------------------------------- Reveal */

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  x = 0,
  once = true,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "span" | "article" | "header";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y, x: reduce ? 0 : x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: "-70px" }}
      transition={{ duration: reduce ? 0.5 : 0.95, ease: EASE_LUXE, delay: reduce ? 0 : delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Grid / list container that staggers its direct children. */
export function Stagger({
  children,
  className,
  stagger = 0.09,
  delayChildren = 0.05,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  as?: "div" | "ul" | "section" | "ol";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delayChildren,
      },
    },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.45 : 0.85, ease: EASE_LUXE } },
  };

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
          <motion.div variants={item} className="contents">
            {child}
          </motion.div>
        ) : (
          child
        ),
      )}
    </MotionTag>
  );
}

/** Sliding lines that glide in from alternating sides. */
export function SlideLines({
  lines,
  className,
  lineClassName,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={cn("space-y-3", className)}>
      {lines.map((line, i) => {
        const fromLeft = i % 2 === 0;
        return (
          <div key={line} className="overflow-hidden">
            <motion.p
              className={cn("text-[17px] leading-relaxed text-body/85 md:text-[18.5px]", lineClassName)}
              initial={{ opacity: 0, x: reduce ? 0 : fromLeft ? -48 : 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: reduce ? 0.5 : 1, ease: EASE_LUXE, delay: reduce ? 0 : i * 0.12 }}
            >
              {line}
            </motion.p>
          </div>
        );
      })}
    </div>
  );
}

/** Pull-quote that fades in line by line. */
export function PullQuote({
  lines,
  className,
  attribution,
}: {
  lines: string[];
  className?: string;
  attribution?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <figure className={cn("relative", className)}>
      <span aria-hidden className="absolute -left-3 -top-8 font-serif text-7xl text-gold-ink/25 select-none">
        &ldquo;
      </span>
      <blockquote className="font-serif text-[26px] italic leading-[1.35] text-navy md:text-[34px]">
        {lines.map((line, i) => (
          <motion.span
            key={line}
            className="block"
            initial={{ opacity: 0, y: reduce ? 0 : 14, filter: reduce ? "none" : "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: reduce ? 0.5 : 1.05, ease: EASE_LUXE, delay: reduce ? 0 : i * 0.16 }}
          >
            {line}
          </motion.span>
        ))}
      </blockquote>
      {attribution ? (
        <figcaption className="mt-6 text-[15px] uppercase tracking-[0.18em] text-body/66">
          {attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}

/* --------------------------------------------------------- Counters */

export function Counter({
  to,
  suffix = "",
  prefix = "",
  compact = false,
  duration = 1.8,
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  compact?: boolean;
  duration?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const total = duration * 1000;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to, duration]);

  const display = compact
    ? value >= 1000
      ? `${Math.floor(value / 1000).toLocaleString("en-US")},000`
      : value.toLocaleString("en-US")
    : value.toLocaleString("en-US");

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* --------------------------------------------------------- Flying tagline */

/** Letters drift in from slightly below and settle. */
export function FlyingText({
  text,
  className,
  letterClassName,
  delay = 0,
}: {
  text: string;
  className?: string;
  letterClassName?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <span className={cn("inline-block", className)} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          aria-hidden
          className={cn("inline-block will-change-transform", letterClassName)}
          initial={{ opacity: 0, y: reduce ? 0 : 18, filter: reduce ? "none" : "blur(5px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: reduce ? 0.4 : 0.7,
            ease: EASE_LUXE,
            delay: reduce ? 0 : delay + i * 0.022,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* --------------------------------------------------------- Word line hero */

/**
 * Headline that rises word by word from a masked line, blurring to sharp.
 * Words listed in `highlight` get a gold underline drawn like a pen stroke.
 */
export function WordLine({
  text,
  highlight = [],
  className,
  wordClassName,
  delay = 0,
  staggerMs = 70,
  as: Tag = "span",
  start = true,
}: {
  text: string;
  highlight?: string[];
  className?: string;
  wordClassName?: string;
  delay?: number;
  staggerMs?: number;
  as?: "span" | "h1" | "h2" | "p";
  /** Hold the animation until true — used so the hero waits for the loader. */
  start?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const isHighlight = (w: string) =>
    highlight.some((h) => h.toLowerCase() === w.toLowerCase().replace(/[.,!?]/g, ""));

  return (
    <Tag className={cn("block", className)}>
      {words.map((word, i) => {
        const clean = word.replace(/[.,!?]/g, "");
        const punct = word.slice(clean.length);
        return (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.14em] align-bottom">
            <motion.span
              className={cn("relative inline-block will-change-transform", wordClassName)}
              initial={false}
              animate={
                start
                  ? { y: 0, opacity: 1, filter: "blur(0px)" }
                  : {
                      y: reduce ? 0 : "115%",
                      opacity: reduce ? 1 : 0.15,
                      filter: reduce ? "blur(0px)" : "blur(8px)",
                    }
              }
              transition={{
                duration: reduce ? 0.5 : 1.05,
                ease: EASE_LUXE,
                delay: reduce || !start ? 0 : delay + i * (staggerMs / 1000),
              }}
            >
              {clean}
              {punct}
              {isHighlight(clean) ? (
                <motion.span
                  aria-hidden
                  className="absolute -bottom-0.5 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-apricot via-gold to-gold-soft"
                  initial={false}
                  animate={{ scaleX: start ? 1 : 0 }}
                  transition={{
                    duration: reduce ? 0.001 : 0.9,
                    ease: EASE_LUXE,
                    delay: reduce || !start ? 0 : delay + 0.45 + i * (staggerMs / 1000),
                  }}
                />
              ) : null}
            </motion.span>
            {i < words.length - 1 ? <span aria-hidden> </span> : null}
          </span>
        );
      })}
    </Tag>
  );
}
