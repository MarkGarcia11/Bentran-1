"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, LocateFixed, MapPin } from "lucide-react";
import { PLACE_SUGGESTIONS } from "@/lib/content";
import { cn, EASE_LUXE } from "@/lib/utils";

function matches(query: string, option: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const o = option.toLowerCase();
  if (o.includes(q)) return true;
  return q
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => o.includes(token));
}

export function PlaceAutocomplete({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  icon = "pin",
  geolocate,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (next: string) => void;
  error?: string;
  hint?: string;
  icon?: "pin" | "target";
  geolocate?: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(-1);
  const [valid, setValid] = React.useState(false);
  const wrapRef = React.useRef<HTMLDivElement>(null);

  const options = React.useMemo(() => {
    const list = PLACE_SUGGESTIONS.filter((s) => matches(value, s));
    return (value.trim() ? list : list).slice(0, 6);
  }, [value]);

  React.useEffect(() => {
    setValid(value.trim().length >= 6 && !error);
  }, [value, error]);

  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const listId = `${id}-listbox`;

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      setActive(0);
      e.preventDefault();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a <= 0 ? options.length - 1 : a - 1));
    } else if (e.key === "Enter" && open && active >= 0) {
      e.preventDefault();
      onChange(options[active]);
      setOpen(false);
      setActive(-1);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  };

  const Icon = icon === "target" ? LocateFixed : MapPin;

  return (
    <div className="relative" ref={wrapRef}>
      <div className="relative">
        <Icon
          className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gold-ink"
          strokeWidth={1.8}
          aria-hidden
        />
        <input
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${id}-option-${active}` : undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={error || hint ? `${id}-msg` : undefined}
          autoComplete="off"
          value={value}
          placeholder={label}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onKeyDown={onKeyDown}
          className={cn(
            "peer h-[62px] w-full rounded-card border bg-pearl/90 pl-11 pr-12 pt-5 text-[16.5px] text-body outline-none transition-all duration-300 ease-luxe focus:border-gold focus:bg-pearl focus:ring-4 focus:ring-gold/18",
            error ? "border-apricot/70" : "border-navy/12",
          )}
        />
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-11 top-2 text-[11.5px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-luxe",
            error ? "text-apricot" : "text-navy/70",
          )}
        >
          {label}
        </label>

        {valid ? (
          <motion.span
            aria-hidden
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE_LUXE }}
            className="pointer-events-none absolute right-4 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-sage/12 text-sage"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.6">
              <path d="M5 12.5l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
        ) : geolocate ? (
          <button
            type="button"
            onClick={geolocate}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-navy/12 px-3 py-2 text-[12.5px] font-medium text-navy/75 transition-all duration-300 ease-luxe hover:border-gold hover:bg-gold/10 hover:text-navy"
          >
            Use my location
          </button>
        ) : null}
      </div>

      <AnimatePresence>
        {open && options.length > 0 ? (
          <motion.ul
            id={listId}
            role="listbox"
            aria-label={`${label} suggestions`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: EASE_LUXE }}
            className="absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-card border border-navy/10 bg-pearl p-1.5 shadow-lift"
          >
            <li className="px-3 py-2 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-body/62">
              Popular places
            </li>
            {options.map((option, i) => (
              <li key={option} role="presentation">
                <button
                  type="button"
                  role="option"
                  id={`${id}-option-${i}`}
                  aria-selected={i === active}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                    setActive(-1);
                  }}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-[14px] px-3 py-2.5 text-left text-[15.5px] leading-snug transition-colors duration-200",
                    i === active ? "bg-gold/12 text-navy" : "text-body/85 hover:bg-ivory",
                  )}
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-ink" strokeWidth={1.7} aria-hidden />
                  <span className="flex-1">{option}</span>
                  {i === active ? (
                    <CornerDownLeft className="mt-0.5 h-3.5 w-3.5 shrink-0 text-navy/40" strokeWidth={1.8} aria-hidden />
                  ) : null}
                </button>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {(error || hint) && (
          <motion.p
            key={error ? "error" : "hint"}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: EASE_LUXE }}
            id={`${id}-msg`}
            className={cn("mt-2 pl-1 text-[14.5px] leading-snug", error ? "text-[#a4541a]" : "text-body/66")}
          >
            {error ?? hint}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
