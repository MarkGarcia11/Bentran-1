"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Minus, Plus } from "lucide-react";
import { cn, EASE_LUXE } from "@/lib/utils";

/* ------------------------------------------------------------- Input */

type FieldShellProps = {
  label: string;
  id: string;
  hint?: string;
  error?: string;
  valid?: boolean;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
  labelFor?: string;
};

export function FieldShell({
  label,
  id,
  hint,
  error,
  valid,
  optional,
  className,
  children,
}: FieldShellProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-4 origin-left transition-all duration-300 ease-luxe",
          "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[17px] peer-placeholder-shown:text-body/62",
          "peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11.5px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.14em] peer-focus:text-gold-ink",
          "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[11.5px] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.14em] peer-[:not(:placeholder-shown)]:text-navy/72",
          error && "peer-focus:text-apricot",
        )}
      >
        {label}
        {optional ? <span className="ml-1.5 normal-case tracking-normal opacity-60">(optional)</span> : null}
      </label>

      {valid && !error ? (
        <motion.span
          aria-hidden
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE_LUXE }}
          className="pointer-events-none absolute right-4 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-sage/12 text-sage"
        >
          <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
        </motion.span>
      ) : null}

      <AnimatePresence initial={false}>
        {(error || hint) && (
          <motion.p
            key={error ? "error" : "hint"}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: EASE_LUXE }}
            className={cn(
              "mt-2 pl-1 text-[14.5px] leading-snug",
              error ? "text-[#a4541a]" : "text-body/66",
            )}
            id={`${id}-msg`}
          >
            {error ?? hint}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const controlBase =
  "peer w-full rounded-card border bg-pearl/90 px-4 pb-2.5 pt-6 text-[17px] text-body outline-none transition-all duration-300 ease-luxe placeholder:text-transparent focus:border-gold focus:bg-pearl focus:ring-4 focus:ring-gold/18 disabled:opacity-60";

export type FloatingInputProps = React.InputHTMLAttributes<HTMLInputElement> &
  Omit<FieldShellProps, "children">;

export function FloatingInput({
  label,
  id,
  hint,
  error,
  valid,
  optional,
  className,
  ...props
}: FloatingInputProps) {
  return (
    <FieldShell label={label} id={id} hint={hint} error={error} valid={valid} optional={optional} className={className}>
      <input
        id={id}
        placeholder={label}
        aria-invalid={Boolean(error)}
        aria-describedby={error || hint ? `${id}-msg` : undefined}
        className={cn(controlBase, error ? "border-apricot/70" : "border-navy/12")}
        {...props}
      />
    </FieldShell>
  );
}

export type FloatingTextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & Omit<FieldShellProps, "children">;

export function FloatingTextarea({
  label,
  id,
  hint,
  error,
  valid,
  optional,
  className,
  rows = 4,
  ...props
}: FloatingTextareaProps) {
  return (
    <FieldShell label={label} id={id} hint={hint} error={error} valid={valid} optional={optional} className={className}>
      <textarea
        id={id}
        rows={rows}
        placeholder={label}
        aria-invalid={Boolean(error)}
        aria-describedby={error || hint ? `${id}-msg` : undefined}
        className={cn(controlBase, "resize-none leading-relaxed", error ? "border-apricot/70" : "border-navy/12")}
        {...props}
      />
    </FieldShell>
  );
}

export type FloatingSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> &
  Omit<FieldShellProps, "children"> & { children: React.ReactNode };

export function FloatingSelect({
  label,
  id,
  hint,
  error,
  optional,
  className,
  children,
  ...props
}: FloatingSelectProps) {
  return (
    <FieldShell label={label} id={id} hint={hint} error={error} optional={optional} className={className}>
      <select
        id={id}
        aria-describedby={hint || error ? `${id}-msg` : undefined}
        className={cn(
          controlBase,
          "appearance-none pr-10",
          error ? "border-apricot/70" : "border-navy/12",
        )}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="pointer-events-none absolute right-4 top-6 h-4 w-4 text-gold-ink"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </FieldShell>
  );
}

/* ------------------------------------------------------------- Stepper */

export function Stepper({
  value,
  onChange,
  min = 1,
  max = 12,
  label,
  id,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  label: string;
  id: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-card border border-navy/12 bg-pearl/80 px-4 py-3">
      <label htmlFor={id} className="text-[15px] font-medium text-navy/85">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 text-navy transition-all duration-300 ease-luxe hover:border-gold hover:bg-gold/10 active:scale-95 disabled:opacity-35"
        >
          <Minus className="h-4 w-4" strokeWidth={2} aria-hidden />
        </button>
        <span
          id={id}
          aria-live="polite"
          className="min-w-8 text-center font-serif text-2xl text-navy"
        >
          {value}
        </span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 text-navy transition-all duration-300 ease-luxe hover:border-gold hover:bg-gold/10 active:scale-95 disabled:opacity-35"
        >
          <Plus className="h-4 w-4" strokeWidth={2} aria-hidden />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- Chips */

export function ChipGroup<T extends string>({
  options,
  value,
  onChange,
  label,
  columns,
}: {
  options: { id: T; label: string; hint?: string }[];
  value: T;
  onChange: (next: T) => void;
  label: string;
  columns?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <fieldset>
      <legend className="mb-3 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-navy/70">
        {label}
      </legend>
      <div
        className={cn("grid gap-3", columns === 3 && "sm:grid-cols-3", columns === 2 && "sm:grid-cols-2")}
        role="radiogroup"
        aria-label={label}
      >
        {options.map((option) => {
          const active = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option.id)}
              className={cn(
                "relative overflow-hidden rounded-card border px-4 py-3.5 text-left transition-all duration-400 ease-luxe",
                active
                  ? "border-gold bg-gold/8 shadow-glow"
                  : "border-navy/12 bg-pearl/70 hover:border-gold/50 hover:bg-pearl",
              )}
            >
              {!reduce && active ? (
                <motion.span
                  layoutId={`chip-${label}`}
                  className="absolute inset-0 -z-10 rounded-card border border-gold/60 bg-gold/8"
                  transition={{ duration: 0.5, ease: EASE_LUXE }}
                />
              ) : null}
              <span className="block text-[16px] font-semibold text-navy">{option.label}</span>
              {option.hint ? (
                <span className="mt-0.5 block text-[13.5px] leading-snug text-body/70">
                  {option.hint}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ------------------------------------------------------------- Progress */

export function ProgressBar({ value }: { value: number }) {
  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full bg-navy/10"
      role="progressbar"
      aria-valuenow={Math.round(value * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Booking progress"
    >
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-gold via-apricot to-gold-soft"
        initial={false}
        animate={{ width: `${Math.max(4, value * 100)}%` }}
        transition={{ duration: 0.7, ease: EASE_LUXE }}
      />
    </div>
  );
}
