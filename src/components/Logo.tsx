import * as React from "react";
import { cn } from "@/lib/utils";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/brand";

/**
 * ============================================================
 *  BNTRAN logo
 * ------------------------------------------------------------
 *  A gold monogram "BN" inside a thin ring, sitting above a
 *  hand-drawn road line with a small apricot marker — the
 *  journey. Drawn entirely as SVG paths so it stays crisp at
 *  16px (favicon) and at 400px (preloader).
 * ============================================================
 */

export function LogoMark({
  className,
  animated = false,
  tone = "dark",
}: {
  className?: string;
  animated?: boolean;
  /** "dark" = gold on light backgrounds, "light" = gold on navy */
  tone?: "dark" | "light";
}) {
  const id = React.useId();
  const gold = tone === "dark" ? "#C9A24B" : "#E3C88A";
  const accent = "#F2A65A";

  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-11 w-11", className)}
      role="img"
      aria-label={`${BRAND_NAME} monogram`}
    >
      <defs>
        <linearGradient id={`${id}-ring`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} />
          <stop offset="45%" stopColor={gold} />
          <stop offset="100%" stopColor="#a9853a" />
        </linearGradient>
      </defs>

      {/* outer ring */}
      <circle
        cx="32"
        cy="32"
        r="29.2"
        fill="none"
        stroke={`url(#${id}-ring)`}
        strokeWidth="1.5"
        className={animated ? "logo-draw-ring" : undefined}
        style={animated ? { strokeDasharray: 184, strokeDashoffset: 184 } : undefined}
      />
      {/* inner hairline */}
      <circle cx="32" cy="32" r="26" fill="none" stroke={gold} strokeOpacity="0.28" strokeWidth="0.6" />

      {/* monogram */}
      <g
        fill="none"
        stroke={gold}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? "logo-draw-b" : undefined}
        style={animated ? { strokeDasharray: 120, strokeDashoffset: 120 } : undefined}
      >
        {/* B */}
        <path d="M20 21V43" />
        <path d="M20 21h7.2a5.5 5.5 0 0 1 0 11H20" />
        <path d="M20 32h8.2a5.5 5.5 0 0 1 0 11H20" />
      </g>
      <g
        fill="none"
        stroke={gold}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? "logo-draw-n" : undefined}
        style={animated ? { strokeDasharray: 90, strokeDashoffset: 90 } : undefined}
      >
        {/* N */}
        <path d="M34.5 43V21l9.5 22V21" />
      </g>

      {/* road line */}
      <path
        d="M19 49.4h26"
        stroke={gold}
        strokeOpacity="0.55"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="3 3.2"
        className={animated ? "logo-draw-road" : undefined}
      />
      {/* the car marker */}
      <circle cx="45" cy="49.4" r="1.7" fill={accent} className={animated ? "logo-car" : undefined} />

    </svg>
  );
}

export function Logo({
  className,
  tone = "dark",
  showTagline = true,
  markClassName,
}: {
  className?: string;
  tone?: "dark" | "light";
  showTagline?: boolean;
  markClassName?: string;
}) {
  const wordColor = tone === "dark" ? "text-navy" : "text-cream";
  const incColor = tone === "dark" ? "text-gold-ink" : "text-gold-soft";
  const tagColor = tone === "dark" ? "text-body/66" : "text-cream/70";

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark tone={tone} className={cn("h-11 w-11 shrink-0", markClassName)} />
      <span className="flex flex-col leading-none">
        <span className={cn("font-serif text-[23px] tracking-[0.01em]", wordColor)}>
          BNTRAN
          <span className={cn("ml-1.5 align-super text-[12px] font-semibold tracking-widest", incColor)}>
            INC.
          </span>
        </span>
        {showTagline ? (
          <span
            className={cn(
              "mt-1.5 text-[10px] font-semibold uppercase tracking-[0.42em]",
              tagColor,
            )}
          >
            {BRAND_TAGLINE}
          </span>
        ) : null}
      </span>
    </span>
  );
}

/** Compact stacked lockup used in the footer and on small screens. */
export function LogoStacked({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const wordColor = tone === "dark" ? "text-navy" : "text-cream";
  const tagColor = tone === "dark" ? "text-body/70" : "text-cream/66";
  return (
    <span className={cn("flex flex-col items-start gap-4", className)}>
      <LogoMark tone={tone} className="h-14 w-14" />
      <span className="flex flex-col leading-none">
        <span className={cn("font-serif text-[30px]", wordColor)}>BNTRAN</span>
        <span
          className={cn(
            "mt-2 text-[10.5px] font-semibold uppercase tracking-[0.42em]",
            tagColor,
          )}
        >
          {BRAND_TAGLINE}
        </span>
      </span>
    </span>
  );
}
