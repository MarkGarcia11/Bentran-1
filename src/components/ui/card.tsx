import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-panel border border-navy/8 bg-pearl shadow-soft",
        className,
      )}
      {...props}
    />
  );
}

export function GlassCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("glass rounded-panel", className)} {...props} />;
}

export function GlassDarkCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("glass-dark rounded-panel", className)} {...props} />;
}

export function Eyebrow({
  className,
  children,
  tone = "gold",
}: {
  className?: string;
  children: React.ReactNode;
  tone?: "gold" | "cream";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.22em]",
        tone === "gold" ? "text-gold-ink" : "text-gold-soft",
        className,
      )}
    >
      <span
        aria-hidden
        className="h-px w-8 bg-current opacity-70"
      />
      {children}
    </span>
  );
}

export function Badge({
  className,
  children,
  tone = "gold",
}: {
  className?: string;
  children: React.ReactNode;
  tone?: "gold" | "sage" | "navy" | "apricot" | "outline";
}) {
  const tones: Record<string, string> = {
    gold: "bg-gold/12 text-[#7d6326] border-gold/35",
    sage: "bg-sage/12 text-sage border-sage/35",
    navy: "bg-navy/8 text-navy border-navy/20",
    apricot: "bg-apricot/18 text-[#8a4f14] border-apricot/45",
    outline: "bg-transparent text-cream/85 border-cream/25",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12.5px] font-medium tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Divider({ className }: { className?: string }) {
  return <span aria-hidden className={cn("hairline block h-px w-full", className)} />;
}
