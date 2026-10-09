"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BRAND_NAME, BRAND_PROMISE, BRAND_TAGLINE } from "@/lib/brand";
import { EASE_LUXE } from "@/lib/utils";
import { LogoMark } from "@/components/Logo";

const SESSION_KEY = "bntran.preloader.shown";

/**
 * Screen loader built from the logo: the ring draws, the BN monogram
 * strokes in, the road line appears and the little apricot marker
 * drives across. Then a gold line sweeps and the curtain lifts.
 * Shown once per session so returning visitors are never delayed.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = React.useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const [sweep, setSweep] = React.useState(false);

  React.useEffect(() => {
    let shown = false;
    try {
      shown = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      shown = false;
    }
    if (shown) {
      onDone();
      return;
    }
    setVisible(true);
    const total = reduce ? 500 : 1900;
    const timer = window.setTimeout(() => {
      setSweep(true);
    }, reduce ? 260 : 1550);
    const done = window.setTimeout(() => {
      setVisible(false);
      setSweep(false);
      onDone();
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
    }, total);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(done);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  React.useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden sunrise"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduce ? 0.25 : 0.75, ease: EASE_LUXE } }}
          role="status"
          aria-live="polite"
          aria-label={`${BRAND_NAME} is loading`}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 right-0 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(242,166,90,0.55) 0%, rgba(201,162,75,0.22) 42%, rgba(15,27,45,0) 70%)",
            }}
            animate={reduce ? undefined : { scale: [1, 1.12, 1], opacity: [0.45, 0.7, 0.45] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            initial={{ opacity: 0, scale: reduce ? 1 : 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduce ? 0.3 : 0.9, ease: EASE_LUXE }}
            className="relative flex flex-col items-center"
          >
            <LogoMark tone="light" animated className="h-24 w-24" />
            <motion.p
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0.1 : 1.1, duration: 0.8, ease: EASE_LUXE }}
              className="mt-7 font-serif text-[34px] tracking-[0.14em] text-cream sm:text-[40px]"
            >
              BNTRAN
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduce ? 0.15 : 1.35, duration: 0.8, ease: EASE_LUXE }}
              className="mt-3 text-[10.5px] font-semibold uppercase tracking-[0.52em] text-gold-soft"
            >
              {BRAND_TAGLINE}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduce ? 0.2 : 1.55, duration: 0.9, ease: EASE_LUXE }}
              className="mt-8 max-w-sm text-center font-serif text-[17px] italic text-cream/70"
            >
              {BRAND_PROMISE}
            </motion.p>
          </motion.div>

          {/* gold line sweep */}
          <motion.span
            aria-hidden
            className="absolute left-0 top-0 h-[2px] w-full origin-left bg-gradient-to-r from-gold via-apricot to-gold-soft"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: sweep ? 1 : 0 }}
            transition={{ duration: reduce ? 0.2 : 0.85, ease: EASE_LUXE }}
          />
          <span className="sr-only">{pathname ? `Loading ${pathname}` : "Loading"}</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/**
 * Soft crossfade + a gold line sweeping across the top on route change.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  return (
    <>
      {/* a gold line sweeps across the top on every route change */}
      <motion.span
        aria-hidden
        key={`sweep-${pathname}`}
        className="pointer-events-none fixed left-0 top-0 z-[65] h-[2px] w-full origin-left bg-gradient-to-r from-gold via-apricot to-gold-soft"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: [0, 1, 0] }}
        transition={{ duration: reduce ? 0.001 : 0.95, ease: EASE_LUXE }}
      />
      {/* soft crossfade of the page itself */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: reduce ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0.25 : 0.55, ease: EASE_LUXE }}
      >
        {children}
      </motion.div>
    </>
  );
}
