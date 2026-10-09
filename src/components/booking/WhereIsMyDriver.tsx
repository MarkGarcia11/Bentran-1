"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Navigation, Sparkles } from "lucide-react";
import { OWNER } from "@/lib/brand";
import { cn, EASE_LUXE } from "@/lib/utils";

/**
 * "Where is my driver?" — a stylised preview of live tracking.
 * Clearly labelled as an upcoming feature. No real GPS is used.
 */
export function WhereIsMyDriver({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [eta, setEta] = React.useState(9);

  React.useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setEta((v) => (v <= 2 ? 9 : v - 1));
    }, 2600);
    return () => window.clearInterval(id);
  }, [reduce]);

  const progress = ((9 - eta) / 7) * 100;

  return (
    <div className={cn("glass rounded-panel p-6 shadow-soft", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-[24px] text-navy">Where is my driver?</h3>
          <p className="mt-1.5 text-[15px] text-body/72">
            A preview of live tracking — coming soon. For now, {OWNER.firstName} texts you when he
            leaves.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-sage/35 bg-sage/10 px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-sage">
          <Sparkles className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
          Preview
        </span>
      </div>

      {/* stylised map */}
      <div className="relative mt-6 overflow-hidden rounded-card border border-navy/10 bg-ivory">
        <svg viewBox="0 0 400 210" className="h-[210px] w-full" role="img" aria-label="Stylised map showing the car approaching your pickup">
          <defs>
            <linearGradient id="routeGrad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#F2A65A" />
              <stop offset="100%" stopColor="#C9A24B" />
            </linearGradient>
          </defs>

          <rect width="400" height="210" fill="#F6EFE4" />

          {/* blocks */}
          {[
            [18, 18, 74, 46], [104, 18, 60, 46], [176, 18, 92, 46], [280, 18, 100, 46],
            [18, 76, 74, 52], [104, 76, 60, 52], [176, 76, 92, 52], [280, 76, 100, 52],
            [18, 140, 74, 52], [104, 140, 60, 52], [176, 140, 92, 52], [280, 140, 100, 52],
          ].map(([x, y, w, h], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} rx="6" fill="#EFE5D5" stroke="#E3D6C0" strokeWidth="1" />
          ))}

          {/* river */}
          <path d="M-10 186 C 70 168, 120 205, 190 190 S 330 150, 420 168" fill="none" stroke="#D9E4E2" strokeWidth="14" strokeLinecap="round" opacity="0.9" />

          {/* route */}
          <path
            d="M34 176 L34 132 L112 132 L112 70 L214 70 L214 34 L330 34"
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="7 7"
            opacity="0.9"
          />

          {/* pickup */}
          <g>
            <circle cx="330" cy="34" r="12" fill="#C9A24B" opacity="0.18" />
            <circle cx="330" cy="34" r="5.5" fill="#C9A24B" />
            <text x="330" y="18" textAnchor="middle" fontSize="11" fill="#1B2433" fontFamily="Inter, sans-serif" fontWeight="600">
              You
            </text>
          </g>

          {/* car */}
          {!reduce ? (
            <motion.g
              animate={{ x: [0, 30, 62, 100, 150, 205, 258, 296], y: [0, -44, -44, -106, -106, -142, -142, -142] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", times: [0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.85, 1] }}
            >
              <circle cx="34" cy="176" r="15" fill="#F2A65A" opacity="0.22" />
              <circle cx="34" cy="176" r="9" fill="#0F1B2D" />
              <path d="M28 179h12M29.6 179l1.4-4a1.8 1.8 0 0 1 1.7-1.2h2.6a1.8 1.8 0 0 1 1.7 1.2l1.4 4" fill="none" stroke="#F2A65A" strokeWidth="1.3" strokeLinecap="round" />
            </motion.g>
          ) : (
            <circle cx="200" cy="70" r="9" fill="#0F1B2D" />
          )}
        </svg>

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-pearl via-pearl/90 to-transparent px-4 pb-3 pt-8">
          <p className="flex items-center gap-2 text-[14.5px] font-medium text-navy">
            <Navigation className="h-4 w-4 text-gold-ink" strokeWidth={1.9} aria-hidden />
            {OWNER.firstName} is <span className="text-sage">{eta} min away</span>
          </p>
          <p className="text-[13px] text-body/66">Executive Sedan · Arlington, VA</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-[12.5px] uppercase tracking-[0.14em] text-body/65">
          <span>En route</span>
          <span>Arriving</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-navy/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-gold to-apricot"
            initial={false}
            animate={{ width: `${Math.max(8, progress)}%` }}
            transition={{ duration: reduce ? 0.2 : 1.1, ease: EASE_LUXE }}
          />
        </div>
      </div>
    </div>
  );
}
