"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn, EASE_LUXE } from "@/lib/utils";

/* --------------------------------------------------------- Magnetic */

export function Magnetic({
  children,
  className,
  strength = 0.28,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.4 });
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    setEnabled(fine && wide);
  }, [reduce]);

  if (!enabled) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block will-change-transform", className)}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------------------------------- Bokeh */

const PARTICLES = Array.from({ length: 11 }, (_, i) => ({
  id: i,
  left: (i * 9.3 + 4) % 96,
  top: (i * 17.7 + 8) % 88,
  size: 40 + ((i * 37) % 120),
  delay: (i % 6) * 1.9,
  duration: 18 + ((i * 3) % 12),
  drift: 18 + ((i * 7) % 26),
  opacity: 0.1 + ((i % 4) * 0.045),
}));

export function Bokeh({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            background:
              "radial-gradient(circle at 35% 35%, rgba(255,238,208,0.95), rgba(242,166,90,0.35) 45%, rgba(201,162,75,0) 72%)",
            filter: "blur(6px)",
          }}
          animate={{ y: [0, -p.drift, 0], x: [0, p.drift * 0.5, 0], scale: [1, 1.14, 1] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* --------------------------------------------------------- Journey line */

/**
 * Signature motion: a thin gold road line that draws itself down the
 * page as the visitor scrolls, with a small car travelling along it
 * and pausing near each section marker. Decorative, aria-hidden.
 */
const MARKERS = ["Home", "Services", "Fleet", "Story", "Book"];

export function JourneyLine() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
  });
  const carY = useTransform(progress, [0, 1], ["4%", "88%"]);
  const drawn = useTransform(progress, [0, 1], ["0%", "88%"]);
  const activeIndex = useTransform(progress, (v) =>
    Math.min(MARKERS.length - 1, Math.floor(v * MARKERS.length)),
  );
  const [active, setActive] = React.useState(0);

  React.useEffect(() => activeIndex.on("change", setActive), [activeIndex]);

  if (reduce) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-6 top-0 z-30 hidden h-screen w-14 2xl:block"
    >
      <div className="relative h-full w-full">
        {/* track */}
        <div className="absolute left-1/2 top-[6%] h-[88%] w-px -translate-x-1/2 bg-navy/10" />
        {/* drawn gold line */}
        <motion.div
          className="absolute left-1/2 top-[6%] w-px -translate-x-1/2 bg-gradient-to-b from-gold via-apricot to-gold"
          style={{ height: drawn }}
        />
        {/* markers */}
        {MARKERS.map((label, i) => {
          const top = 6 + (i / (MARKERS.length - 1)) * 88;
          const isActive = i <= active;
          return (
            <div
              key={label}
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top: `${top}%` }}
            >
              <motion.span
                className={cn(
                  "block h-2 w-2 rounded-full transition-colors duration-700",
                  isActive ? "bg-gold" : "bg-navy/20",
                )}
                animate={{ scale: i === active ? 1.35 : 1 }}
                transition={{ duration: 0.6, ease: EASE_LUXE }}
              />
              <span
                className={cn(
                  "absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10.5px] font-semibold uppercase tracking-[0.2em] transition-colors duration-700",
                  i === active ? "text-gold-ink" : "text-navy/25",
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
        {/* travelling car */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: carY }}
          transition={{ duration: 0.2 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" className="-translate-x-[3px]">
            <path
              d="M4 15.5h16M5.6 15.5l1.5-4.4A2.4 2.4 0 0 1 9.4 9.4h5.2a2.4 2.4 0 0 1 2.3 1.7l1.5 4.4M7.4 18.4a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6zm9.2 0a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6z"
              fill="none"
              stroke="#C9A24B"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- Scroll top bar */

export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  return (
    <motion.div
      aria-hidden
      className={cn(
        "fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-gold via-apricot to-gold-soft",
        className,
      )}
      style={{ scaleX }}
    />
  );
}
