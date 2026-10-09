"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  Clock3,
  Loader2,
  LocateFixed,
  MapPin,
  Phone,
  Plane,
  StickyNote,
  Users,
} from "lucide-react";
import { CONTACT, DEMO_NOTE, OWNER } from "@/lib/brand";
import { FLEET, TIME_SLOTS, TRIP_TYPES } from "@/lib/content";
import { cn, EASE_LUXE, formatLongDate, formatPhone, formatTime12, todayISO } from "@/lib/utils";
import {
  draftFromParams,
  EMPTY_DRAFT,
  validateStep,
  vehicleById,
  type FieldErrors,
} from "@/lib/booking";
import { useBooking } from "@/lib/booking-context";
import { ChipGroup, ProgressBar, Stepper } from "@/components/ui/fields";
import { VehicleCard } from "@/components/sections/FleetPreview";
import { PlaceAutocomplete } from "./PlaceAutocomplete";

const STEPS = [
  { id: 0, label: "Trip details", hint: "Where and when" },
  { id: 1, label: "Passengers & vehicle", hint: "Who is riding" },
  { id: 2, label: "Review & confirm", hint: "One last look" },
];

function slotTo24(slot: string): string {
  const [time, meridiem] = slot.split(" ");
  let [h, m] = time.split(":").map(Number);
  if (meridiem === "PM" && h !== 12) h += 12;
  if (meridiem === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function BookingWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reduce = useReducedMotion();
  const { draft, setDraft, submitBooking } = useBooking();

  const [step, setStep] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [geoMessage, setGeoMessage] = React.useState<string | null>(null);
  const [hydrated, setHydrated] = React.useState(false);

  /* prefill from the hero quick-request strip (or a shared link) */
  React.useEffect(() => {
    const search = searchParams?.toString() ?? "";
    if (!search) {
      setHydrated(true);
      return;
    }
    const pre = draftFromParams(search);
    if (Object.keys(pre).length) {
      setDraft((d) => ({ ...d, ...pre }));
    }
    setHydrated(true);
  }, [searchParams, setDraft]);

  const update = <K extends keyof typeof draft>(key: K, value: (typeof draft)[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const geolocate = () => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setGeoMessage("This browser can't share a location — just type your pickup address.");
      return;
    }
    setGeoMessage("Finding you…");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        update(
          "pickup",
          `Shared location — ${latitude.toFixed(4)}, ${longitude.toFixed(4)} (demo)`,
        );
        setGeoMessage(
          "Location shared. I'll meet you at the nearest safe curb — add a building name if you like.",
        );
      },
      () => {
        setGeoMessage(
          "No problem — location sharing was blocked or unavailable. Please type the pickup address instead.",
        );
      },
      { timeout: 9000, maximumAge: 60_000, enableHighAccuracy: true },
    );
  };

  const goNext = () => {
    const stepErrors = validateStep(step, draft);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) {
      const first = Object.keys(stepErrors)[0];
      const el = document.getElementById(first) ?? document.getElementById(`field-${first}`);
      el?.focus();
      el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
      return;
    }
    setDirection(1);
    setStep((s) => Math.min(2, s + 1));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      goNext();
      return;
    }
    setSubmitting(true);
    try {
      const record = await submitBooking({ ...EMPTY_DRAFT, ...draft });
      router.push(`/confirmation?ref=${encodeURIComponent(record.reference)}`);
    } catch {
      setSubmitting(false);
    }
  };

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir * 54 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir * -54 }),
  };

  const vehicle = vehicleById(draft.vehicleId);

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="glass relative overflow-hidden rounded-panel p-5 shadow-lift sm:p-8 lg:p-10"
      aria-labelledby="booking-form-title"
    >
      <div className="flex flex-col gap-5 border-b border-navy/8 pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="booking-form-title" className="font-serif text-[30px] leading-tight text-navy md:text-[36px]">
            Book a ride
          </h2>
          <p className="mt-2 text-[16px] text-body/72">
            Three short steps. {OWNER.firstName} reads every request himself.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-navy/12 bg-pearl/70 px-4 py-2 text-[13px] font-medium text-body/72">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-60" aria-hidden />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" aria-hidden />
          </span>
          {DEMO_NOTE}
        </span>
      </div>

      {/* progress */}
      <div className="mt-7">
        <div className="mb-3 flex items-center justify-between text-[12.5px] font-semibold uppercase tracking-[0.14em] text-navy/68">
          <span>Step {step + 1} of 3</span>
          <span>{STEPS[step].hint}</span>
        </div>
        <ProgressBar value={(step + 1) / 3} />
        <ol className="mt-5 grid gap-3 sm:grid-cols-3">
          {STEPS.map((s) => {
            const state = s.id === step ? "current" : s.id < step ? "done" : "todo";
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => {
                    if (s.id < step) {
                      setDirection(-1);
                      setStep(s.id);
                    }
                  }}
                  disabled={s.id > step}
                  aria-current={state === "current" ? "step" : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-card border px-4 py-3 text-left transition-all duration-400 ease-luxe",
                    state === "current" && "border-gold bg-gold/8",
                    state === "done" && "cursor-pointer border-sage/35 bg-sage/6 hover:border-sage",
                    state === "todo" && "cursor-default border-navy/10 bg-pearl/50 opacity-70",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[13px] font-semibold transition-colors duration-400",
                      state === "current" && "border-gold bg-gold text-navy",
                      state === "done" && "border-sage bg-sage text-pearl",
                      state === "todo" && "border-navy/20 text-navy/62",
                    )}
                  >
                    {state === "done" ? <Check className="h-4 w-4" strokeWidth={2.6} aria-hidden /> : s.id + 1}
                  </span>
                  <span
                    className={cn(
                      "text-[14.5px] font-medium",
                      state === "todo" ? "text-body/66" : "text-navy",
                    )}
                  >
                    {s.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="relative mt-8 min-h-[440px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduce ? 0.25 : 0.55, ease: EASE_LUXE }}
          >
            {/* ------------------------------------------------ STEP 1 */}
            {step === 0 ? (
              <div className="space-y-6" key="step-trip">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FloatingField
                    id="fullName"
                    label="Full name"
                    value={draft.fullName}
                    onChange={(v) => update("fullName", v)}
                    error={errors.fullName}
                    autoComplete="name"
                    icon={<Users className="h-4.5 w-4.5" strokeWidth={1.7} aria-hidden />}
                  />
                  <FloatingField
                    id="phone"
                    label="Phone number"
                    value={draft.phone}
                    onChange={(v) => update("phone", formatPhone(v))}
                    error={errors.phone}
                    hint="Format: (202) 555-0148 — so Ben can reach you."
                    autoComplete="tel"
                    inputMode="tel"
                    icon={<Phone className="h-4.5 w-4.5" strokeWidth={1.7} aria-hidden />}
                  />
                </div>

                <FloatingField
                  id="email"
                  label="Email address"
                  value={draft.email}
                  onChange={(v) => update("email", v)}
                  error={errors.email}
                  optional
                  hint="Optional but recommended — your confirmation goes here."
                  autoComplete="email"
                  type="email"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <FloatingField
                      id="date"
                      label="Pickup date"
                      type="date"
                      value={draft.date}
                      min={todayISO()}
                      onChange={(v) => update("date", v)}
                      error={errors.date}
                      icon={<CalendarDays className="h-4.5 w-4.5" strokeWidth={1.7} aria-hidden />}
                    />
                    <p className="mt-2 pl-1 text-[13.5px] text-body/65">Past dates are closed.</p>
                  </div>
                  <div>
                    <FloatingField
                      id="time"
                      label="Pickup time"
                      type="time"
                      value={draft.time}
                      onChange={(v) => update("time", v)}
                      error={errors.time}
                      icon={<Clock3 className="h-4.5 w-4.5" strokeWidth={1.7} aria-hidden />}
                    />
                    <p className="mt-2 pl-1 text-[13.5px] text-body/65">Or pick a friendly slot below.</p>
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-navy/68">
                    Common pickup times
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {TIME_SLOTS.slice(0, 12).map((slot) => {
                      const value = slotTo24(slot);
                      const active = draft.time === value;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => update("time", value)}
                          aria-pressed={active}
                          className={cn(
                            "rounded-full border px-4 py-2.5 text-[14.5px] font-medium transition-all duration-300 ease-luxe",
                            active
                              ? "border-gold bg-gold/12 text-navy"
                              : "border-navy/12 bg-pearl/70 text-body/76 hover:-translate-y-0.5 hover:border-gold/60 hover:text-navy",
                          )}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <ChipGroup
                  label="Trip type"
                  columns={3}
                  options={TRIP_TYPES.map((t) => ({ id: t.id, label: t.label, hint: t.hint }))}
                  value={draft.tripType}
                  onChange={(v) => update("tripType", v)}
                />

                <div className="space-y-5 rounded-card border border-navy/8 bg-pearl/60 p-5">
                  <PlaceAutocomplete
                    id="pickup"
                    label="Pickup location"
                    value={draft.pickup}
                    onChange={(v) => update("pickup", v)}
                    error={errors.pickup}
                    hint="Start typing — suggestions appear. Airports, hotels, offices."
                    geolocate={geolocate}
                  />
                  <PlaceAutocomplete
                    id="destination"
                    label="Destination"
                    value={draft.destination}
                    onChange={(v) => update("destination", v)}
                    error={errors.destination}
                    icon="target"
                    hint="Where are we headed?"
                  />

                  <AnimatePresence>
                    {geoMessage ? (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.35, ease: EASE_LUXE }}
                        className="flex items-start gap-2 rounded-card border border-gold/30 bg-gold/8 px-4 py-3 text-[14.5px] leading-snug text-navy/85"
                      >
                        <LocateFixed className="mt-0.5 h-4 w-4 shrink-0 text-gold-ink" strokeWidth={1.8} aria-hidden />
                        {geoMessage}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </div>

                <AnimatePresence initial={false}>
                  {draft.tripType === "round-trip" ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: reduce ? 0.2 : 0.5, ease: EASE_LUXE }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-5 sm:grid-cols-2">
                        <FloatingField
                          id="returnTime"
                          label="Return time"
                          type="time"
                          value={draft.returnTime}
                          onChange={(v) => update("returnTime", v)}
                          error={errors.returnTime}
                          hint="Same day, back to where we started."
                          icon={<Clock3 className="h-4.5 w-4.5" strokeWidth={1.7} aria-hidden />}
                        />
                        <div className="rounded-card border border-navy/8 bg-ivory p-5 text-[15px] leading-relaxed text-body/76">
                          Round trips hold the car for you. If the meeting runs long, text{" "}
                          {OWNER.firstName} — a short delay is never a problem.
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {draft.tripType === "driver-waits" ? (
                  <p className="rounded-card border border-sage/30 bg-sage/6 px-5 py-4 text-[15px] leading-relaxed text-body/80">
                    Driver waits: {OWNER.firstName} stays with you and drives you onward. Add the
                    details in the notes at the end — how long, and how many stops.
                  </p>
                ) : null}
              </div>
            ) : null}

            {/* ------------------------------------------------ STEP 2 */}
            {step === 1 ? (
              <div className="space-y-7" key="step-vehicle">
                <Stepper
                  id="passengers"
                  label="Passengers"
                  value={draft.passengers}
                  min={1}
                  max={12}
                  onChange={(v) => update("passengers", v)}
                />

                <div>
                  <p className="mb-4 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-navy/68">
                    Choose a vehicle
                  </p>
                  <div className="grid gap-5 md:grid-cols-2">
                    {FLEET.map((v, i) => (
                      <VehicleCard
                        key={v.id}
                        vehicle={v}
                        index={i}
                        selected={draft.vehicleId === v.id}
                        onSelect={(id) => {
                          update("vehicleId", id);
                          const chosen = vehicleById(id);
                          if (draft.passengers > chosen.passengers) {
                            update("passengers", chosen.passengers);
                          }
                        }}
                      />
                    ))}
                  </div>
                  {errors.vehicleId ? (
                    <p className="mt-3 text-[14.5px] text-[#a4541a]">{errors.vehicleId}</p>
                  ) : (
                    <p className="mt-3 text-[14.5px] text-body/66">
                      Selected: <span className="font-medium text-navy">{vehicle.name}</span> — seats{" "}
                      {vehicle.passengers}, holds {vehicle.luggage} bags. {vehicle.rate}.
                    </p>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <FloatingField
                    id="company"
                    label="Company name"
                    value={draft.company}
                    onChange={(v) => update("company", v)}
                    optional
                    hint="For team accounts and monthly invoicing."
                    autoComplete="organization"
                    icon={<Building2 className="h-4.5 w-4.5" strokeWidth={1.7} aria-hidden />}
                  />
                  <FloatingField
                    id="flightNumber"
                    label="Flight number"
                    value={draft.flightNumber}
                    onChange={(v) => update("flightNumber", v.toUpperCase())}
                    optional
                    hint="Airport pickup? Ben tracks it for free."
                    icon={<Plane className="h-4.5 w-4.5" strokeWidth={1.7} aria-hidden />}
                  />
                </div>

                <FloatingField
                  id="notes"
                  label="Notes for Ben"
                  value={draft.notes}
                  onChange={(v) => update("notes", v)}
                  optional
                  multiline
                  hint="Child seat, luggage, a stop on the way, quiet ride, gate code — anything helps."
                  icon={<StickyNote className="h-4.5 w-4.5" strokeWidth={1.7} aria-hidden />}
                />
              </div>
            ) : null}

            {/* ------------------------------------------------ STEP 3 */}
            {step === 2 ? (
              <ReviewStep
                draft={draft}
                onEdit={(target) => {
                  setDirection(-1);
                  setStep(target);
                }}
              />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* navigation */}
      <div className="mt-9 flex flex-col gap-4 border-t border-navy/8 pt-7 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0 || submitting}
          className="group inline-flex h-13 items-center justify-center gap-2 self-start rounded-full border border-navy/15 px-6 py-3.5 text-[15.5px] font-medium text-navy transition-all duration-400 ease-luxe hover:border-gold hover:bg-gold/8 disabled:pointer-events-none disabled:opacity-35"
        >
          <ArrowLeft
            className="h-4 w-4 text-gold-ink transition-transform duration-400 ease-luxe group-hover:-translate-x-1"
            strokeWidth={1.9}
            aria-hidden
          />
          Back
        </button>

        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          {step < 2 ? (
            <button
              type="submit"
              className="btn-primary btn-sheen group inline-flex h-14 items-center justify-center gap-2.5 rounded-full px-8 text-[16px] font-semibold"
            >
              Continue
              <ArrowRight
                className="h-4 w-4 transition-transform duration-400 ease-luxe group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary btn-sheen group inline-flex h-14 items-center justify-center gap-2.5 rounded-full px-9 text-[16.5px] font-semibold disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4.5 w-4.5 animate-spin" strokeWidth={2} aria-hidden />
                  Sending to Ben…
                </>
              ) : (
                <>
                  Confirm request
                  <Check className="h-4.5 w-4.5" strokeWidth={2.2} aria-hidden />
                </>
              )}
            </button>
          )}
          <a
            href={`tel:${CONTACT.phoneDial}`}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-navy/15 px-6 text-[15.5px] font-medium text-navy transition-all duration-400 ease-luxe hover:-translate-y-0.5 hover:border-gold hover:bg-gold/8"
          >
            <Phone className="h-4 w-4 text-gold-ink" strokeWidth={1.8} aria-hidden />
            Call instead
          </a>
        </div>
      </div>

      <p className="mt-5 text-center text-[13px] text-body/62 sm:text-left">
        {hydrated ? "Your details stay in this browser — nothing is sent to a dispatch center." : "…"}
      </p>
    </form>
  );
}

/* ------------------------------------------------------ small pieces */

function FloatingField({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  optional,
  type = "text",
  min,
  autoComplete,
  inputMode,
  multiline,
  icon,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (next: string) => void;
  error?: string;
  hint?: string;
  optional?: boolean;
  type?: string;
  min?: string;
  autoComplete?: string;
  inputMode?: "tel" | "email" | "text";
  multiline?: boolean;
  icon?: React.ReactNode;
}) {
  const valid = !error && value.trim().length > (type === "email" ? 5 : 2);
  const base = cn(
    "peer w-full rounded-card border bg-pearl/90 outline-none transition-all duration-300 ease-luxe focus:border-gold focus:bg-pearl focus:ring-4 focus:ring-gold/18",
    icon ? "pl-11 pr-11" : "px-4 pr-11",
    error ? "border-apricot/70" : "border-navy/12",
    multiline ? "pb-3 pt-6 text-[16.5px] leading-relaxed" : "h-[62px] pt-5 text-[16.5px]",
  );

  return (
    <div className="relative">
      {icon ? (
        <span className="pointer-events-none absolute left-4 top-[22px] text-gold-ink">{icon}</span>
      ) : null}

      {multiline ? (
        <textarea
          id={id}
          rows={4}
          value={value}
          placeholder={label}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error || hint ? `${id}-msg` : undefined}
          className={base}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          min={min}
          placeholder={label}
          autoComplete={autoComplete}
          inputMode={inputMode}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error || hint ? `${id}-msg` : undefined}
          className={base}
        />
      )}

      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute top-2 text-[11.5px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-luxe",
          icon ? "left-11" : "left-4",
          error ? "text-apricot" : "text-navy/70",
        )}
      >
        {label}
        {optional ? <span className="ml-1.5 normal-case tracking-normal opacity-60">(optional)</span> : null}
      </label>

      {valid ? (
        <motion.span
          aria-hidden
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE_LUXE }}
          className="pointer-events-none absolute right-4 top-[21px] flex h-6 w-6 items-center justify-center rounded-full bg-sage/12 text-sage"
        >
          <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
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

/* ------------------------------------------------------ review step */

function ReviewStep({
  draft,
  onEdit,
}: {
  draft: typeof EMPTY_DRAFT;
  onEdit: (step: number) => void;
}) {
  const vehicle = vehicleById(draft.vehicleId);
  const tripLabel = TRIP_TYPES.find((t) => t.id === draft.tripType)?.label ?? draft.tripType;

  const rows: { label: string; value: string; step: number }[] = [
    { label: "Passenger", value: draft.fullName, step: 0 },
    { label: "Phone", value: draft.phone, step: 0 },
    { label: "Email", value: draft.email || "Not provided", step: 0 },
    { label: "Date", value: formatLongDate(draft.date), step: 0 },
    { label: "Pickup time", value: formatTime12(draft.time), step: 0 },
    ...(draft.tripType === "round-trip"
      ? [{ label: "Return time", value: formatTime12(draft.returnTime), step: 0 }]
      : []),
    { label: "Trip type", value: tripLabel, step: 0 },
    { label: "Pickup", value: draft.pickup, step: 0 },
    { label: "Destination", value: draft.destination, step: 0 },
    { label: "Passengers", value: `${draft.passengers}`, step: 1 },
    { label: "Vehicle", value: `${vehicle.name} — ${vehicle.rate}`, step: 1 },
    ...(draft.company ? [{ label: "Company", value: draft.company, step: 1 }] : []),
    ...(draft.flightNumber ? [{ label: "Flight", value: draft.flightNumber, step: 1 }] : []),
    ...(draft.notes ? [{ label: "Notes", value: draft.notes, step: 1 }] : []),
  ];

  return (
    <div>
      <div className="rounded-panel border border-gold/30 bg-pearl/85 p-6 shadow-soft md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-gold-ink">
              Booking summary
            </p>
            <h3 className="mt-2 font-serif text-[28px] leading-tight text-navy md:text-[32px]">
              Everything look right?
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onEdit(0)}
              className="rounded-full border border-navy/15 px-4 py-2 text-[14px] font-medium text-navy transition-all duration-300 ease-luxe hover:border-gold hover:bg-gold/8"
            >
              Edit trip
            </button>
            <button
              type="button"
              onClick={() => onEdit(1)}
              className="rounded-full border border-navy/15 px-4 py-2 text-[14px] font-medium text-navy transition-all duration-300 ease-luxe hover:border-gold hover:bg-gold/8"
            >
              Edit vehicle
            </button>
          </div>
        </div>

        <dl className="mt-7 divide-y divide-navy/8 border-y border-navy/8">
          {rows.map((row) => (
            <div key={row.label} className="grid gap-1 py-3.5 sm:grid-cols-[170px_1fr] sm:gap-4">
              <dt className="text-[13px] font-semibold uppercase tracking-[0.12em] text-body/65">
                {row.label}
              </dt>
              <dd className="text-[16.5px] leading-snug text-navy">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-col gap-3 rounded-card border border-navy/8 bg-ivory p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2.5 text-[15px] leading-snug text-body/78">
            <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-ink" strokeWidth={1.8} aria-hidden />
            {OWNER.firstName} arrives fifteen minutes early and texts when he's close.
          </p>
          <a
            href={`tel:${CONTACT.phoneDial}`}
            className="shrink-0 text-[15px] font-medium text-navy link-underline"
          >
            Change something? Call {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
