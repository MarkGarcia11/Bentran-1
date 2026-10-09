"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  CalendarPlus,
  Check,
  Clock3,
  MapPin,
  MessageSquare,
  Phone,
  Share2,
  Users,
} from "lucide-react";
import { CONTACT, DEMO_NOTE, OWNER, SITE_URL } from "@/lib/brand";
import { TRIP_TYPES } from "@/lib/content";
import {
  buildIcs,
  cn,
  downloadIcs,
  EASE_LUXE,
  formatLongDate,
  formatTime12,
} from "@/lib/utils";
import { vehicleById, type StoredBooking } from "@/lib/booking";
import { useBooking } from "@/lib/booking-context";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/card";

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <section className="flex min-h-[60svh] items-center justify-center sunrise">
          <div className="glass-dark h-64 w-[min(92vw,720px)] animate-pulse rounded-panel" />
        </section>
      }
    >
      <ConfirmationView />
    </Suspense>
  );
}

function ConfirmationView() {
  const params = useSearchParams();
  const ref = params.get("ref");
  const { bookings, lastBooking } = useBooking();
  const reduce = useReducedMotion();
  const [copied, setCopied] = React.useState(false);

  const booking: StoredBooking | null =
    bookings.find((b) => b.reference === ref) ?? lastBooking ?? null;

  const shareUrl = React.useMemo(
    () => `${SITE_URL}/confirmation?ref=${encodeURIComponent(booking?.reference ?? "")}`,
    [booking?.reference],
  );

  const share = async () => {
    const text = booking
      ? `${OWNER.firstName} — ride ${booking.reference}: ${formatLongDate(booking.date)} at ${formatTime12(booking.time)}, ${booking.pickup} → ${booking.destination}.`
      : "My BNTRAN ride details";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "BNTRAN booking", text, url: shareUrl });
        return;
      } catch {
        /* user dismissed — fall through to clipboard */
      }
    }
    try {
      await navigator.clipboard.writeText(`${text} ${shareUrl}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    } catch {
      setCopied(false);
    }
  };

  const addToCalendar = () => {
    if (!booking) return;
    const vehicle = vehicleById(booking.vehicleId);
    downloadIcs(
      `${booking.reference}-bntran.ics`,
      buildIcs({
        title: `Chauffeur — ${booking.pickup} to ${booking.destination}`,
        description: `${OWNER.firstName} (${BRAND_LINE}) · Ref ${booking.reference} · ${
          TRIP_TYPES.find((t) => t.id === booking.tripType)?.label ?? booking.tripType
        } · ${vehicle.name} · ${booking.passengers} passenger(s). Call ${CONTACT.phoneDisplay} for changes.`,
        location: booking.pickup,
        startISO: booking.date,
        startTime: booking.time || "09:00",
        endISO: booking.tripType === "round-trip" ? booking.date : undefined,
        endTime:
          booking.tripType === "round-trip"
            ? booking.returnTime || booking.time
            : addHours(booking.time || "09:00", 1),
      }),
    );
  };

  if (!booking) {
    return (
      <section className="mx-auto flex min-h-[60svh] w-full max-w-[720px] flex-col items-center justify-center px-5 py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/8 text-gold-ink">
          <Clock3 className="h-7 w-7" strokeWidth={1.6} aria-hidden />
        </span>
        <h1 className="mt-8 font-serif text-[34px] leading-tight text-navy md:text-[44px]">
          No booking to show just yet.
        </h1>
        <p className="mt-5 max-w-lg text-[17.5px] leading-relaxed text-body/78">
          This page holds your confirmation after a request is sent. If you came here by a shared
          link, the details live in the browser that made the booking.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/book"
            className="btn-primary btn-sheen inline-flex h-14 items-center gap-2 rounded-full px-8 text-[16px] font-semibold"
          >
            Book a ride
          </Link>
          <a
            href={`tel:${CONTACT.phoneDial}`}
            className="inline-flex h-14 items-center gap-2 rounded-full border border-navy/15 px-7 text-[15.5px] font-medium text-navy transition-all duration-400 ease-luxe hover:border-gold hover:bg-gold/8"
          >
            <Phone className="h-4 w-4 text-gold-ink" strokeWidth={1.8} aria-hidden />
            Call {OWNER.firstName}
          </a>
        </div>
      </section>
    );
  }

  const vehicle = vehicleById(booking.vehicleId);
  const tripLabel = TRIP_TYPES.find((t) => t.id === booking.tripType)?.label ?? booking.tripType;

  return (
    <section className="relative -mt-[88px] overflow-hidden sunrise pb-16 pt-[calc(88px+4rem)] md:pb-24 md:pt-[calc(88px+6rem)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(80% 70% at 85% 110%, rgba(242,166,90,0.4) 0%, rgba(201,162,75,0.14) 42%, rgba(15,27,45,0) 72%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-[980px] px-5 sm:px-8">
        {/* animated gold checkmark */}
        <div className="flex flex-col items-center text-center">
          <motion.svg
            width="96"
            height="96"
            viewBox="0 0 96 96"
            fill="none"
            aria-hidden
            initial={{ opacity: 0, scale: reduce ? 1 : 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduce ? 0.3 : 0.8, ease: EASE_LUXE }}
          >
            <motion.circle
              cx="48"
              cy="48"
              r="44"
              stroke="url(#confGrad)"
              strokeWidth="2"
              strokeDasharray="277"
              initial={{ strokeDashoffset: reduce ? 0 : 277 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: reduce ? 0.001 : 1.15, ease: EASE_LUXE }}
            />
            <motion.path
              d="M30 50.5l12.5 12.5L67 37"
              stroke="#F2A65A"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="62"
              initial={{ strokeDashoffset: reduce ? 0 : 62 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: reduce ? 0.001 : 0.7, ease: EASE_LUXE, delay: reduce ? 0 : 0.75 }}
            />
            <defs>
              <linearGradient id="confGrad" x1="0" y1="0" x2="96" y2="96">
                <stop offset="0%" stopColor="#F2A65A" />
                <stop offset="55%" stopColor="#C9A24B" />
                <stop offset="100%" stopColor="#E3C88A" />
              </linearGradient>
            </defs>
          </motion.svg>

          <motion.h1
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.4 : 0.8, ease: EASE_LUXE, delay: reduce ? 0 : 0.5 }}
            className="mt-8 font-serif text-[34px] leading-tight text-cream sm:text-[46px] md:text-[54px]"
          >
            Your ride is requested.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: reduce ? 0.1 : 0.7 }}
            className="mt-5 max-w-xl text-[17.5px] leading-relaxed text-cream/80"
          >
            Thank you, {booking.fullName.split(" ")[0]}. {OWNER.firstName} has your request and will
            confirm personally — usually within the hour.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: reduce ? 0.15 : 0.85 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <span className="rounded-full border border-gold/40 bg-navy/30 px-6 py-3 font-serif text-[22px] tracking-[0.14em] text-gold-soft">
              {booking.reference}
            </span>
            <Badge tone="outline">Status: {booking.status}</Badge>
          </motion.div>
        </div>

        {/* summary */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0.4 : 0.9, ease: EASE_LUXE, delay: reduce ? 0.2 : 1 }}
          className="glass-dark mt-12 rounded-panel p-6 shadow-lift md:p-9"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-serif text-[26px] text-cream">Booking summary</h2>
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={addToCalendar}
                className="btn-primary btn-sheen inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14.5px] font-semibold"
              >
                <CalendarPlus className="h-4 w-4" strokeWidth={1.9} aria-hidden />
                Add to calendar
              </button>
              <button
                type="button"
                onClick={share}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-cream/25 px-5 text-[14.5px] font-medium text-cream transition-all duration-400 ease-luxe hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-sage" strokeWidth={2.2} aria-hidden />
                    Link copied
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                    Share this booking
                  </>
                )}
              </button>
            </div>
          </div>

          <dl className="mt-7 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            <SummaryRow icon={<CalendarPlus className="h-4 w-4" strokeWidth={1.8} />} label="Date" value={formatLongDate(booking.date)} />
            <SummaryRow icon={<Clock3 className="h-4 w-4" strokeWidth={1.8} />} label="Pickup time" value={formatTime12(booking.time)} />
            {booking.tripType === "round-trip" ? (
              <SummaryRow icon={<Clock3 className="h-4 w-4" strokeWidth={1.8} />} label="Return time" value={formatTime12(booking.returnTime)} />
            ) : null}
            <SummaryRow icon={<MapPin className="h-4 w-4" strokeWidth={1.8} />} label="Pickup" value={booking.pickup} />
            <SummaryRow icon={<MapPin className="h-4 w-4" strokeWidth={1.8} />} label="Destination" value={booking.destination} />
            <SummaryRow icon={<Users className="h-4 w-4" strokeWidth={1.8} />} label="Passengers" value={`${booking.passengers}`} />
            <SummaryRow icon={<Check className="h-4 w-4" strokeWidth={1.8} />} label="Vehicle" value={`${vehicle.name} · ${vehicle.rate}`} />
            <SummaryRow icon={<Check className="h-4 w-4" strokeWidth={1.8} />} label="Trip type" value={tripLabel} />
            <SummaryRow icon={<Phone className="h-4 w-4" strokeWidth={1.8} />} label="Contact" value={`${booking.phone}${booking.email ? ` · ${booking.email}` : ""}`} />
            {booking.company ? <SummaryRow icon={<Check className="h-4 w-4" strokeWidth={1.8} />} label="Company" value={booking.company} /> : null}
            {booking.flightNumber ? <SummaryRow icon={<Check className="h-4 w-4" strokeWidth={1.8} />} label="Flight" value={booking.flightNumber} /> : null}
            {booking.notes ? (
              <div className="sm:col-span-2">
                <dt className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cream/62">
                  Notes for {OWNER.firstName}
                </dt>
                <dd className="mt-1.5 text-[16.5px] leading-relaxed text-cream/90">{booking.notes}</dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-8 grid gap-3 border-t border-cream/12 pt-7 sm:grid-cols-3">
            <a
              href={`tel:${CONTACT.phoneDial}`}
              className="btn-primary btn-sheen flex h-13 items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[15.5px] font-semibold"
            >
              <Phone className="h-4 w-4" strokeWidth={1.9} aria-hidden />
              Call {OWNER.firstName}
            </a>
            <a
              href={`sms:${CONTACT.smsDial}?body=${encodeURIComponent(`Hi Ben, this is about ride ${booking.reference}.`)}`}
              className="flex h-13 items-center justify-center gap-2 rounded-full border border-cream/25 px-5 py-3.5 text-[15.5px] font-medium text-cream transition-all duration-400 ease-luxe hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"
            >
              <MessageSquare className="h-4 w-4 text-gold-soft" strokeWidth={1.8} aria-hidden />
              Text about this ride
            </a>
            <Link
              href="/book"
              className="flex h-13 items-center justify-center gap-2 rounded-full border border-cream/25 px-5 py-3.5 text-[15.5px] font-medium text-cream transition-all duration-400 ease-luxe hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"
            >
              <ArrowLeft className="h-4 w-4 text-gold-soft" strokeWidth={1.8} aria-hidden />
              Book another ride
            </Link>
          </div>
        </motion.div>

        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Confirmation by phone or text",
                body: `${OWNER.firstName} confirms every request himself. If anything looks tight, you'll hear it early — never at the last minute.`,
              },
              {
                title: "Changes are easy",
                body: "Flight moved? Meeting running long? Call or text. Fifteen minutes of free waiting on local pickups, sixty at airports.",
              },
              {
                title: "Nothing to pay now",
                body: "Corporate accounts are invoiced monthly. Private rides are settled after the trip. Rates are quoted before you ride.",
              },
            ].map((card) => (
              <div key={card.title} className="rounded-panel border border-cream/12 bg-navy/25 p-6">
                <h3 className="font-serif text-[20px] leading-snug text-cream">{card.title}</h3>
                <p className="mt-2.5 text-[15.5px] leading-relaxed text-cream/74">{card.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <p className={cn("mt-8 text-center text-[13.5px] text-cream/62")}>
          {DEMO_NOTE} Reference numbers restart at BN-{new Date().getFullYear()}-0001 in this
          preview.
        </p>
      </div>
    </section>
  );
}

const BRAND_LINE = "BNTRAN Inc.";

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3.5">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cream/15 text-gold-soft">
        {icon}
      </span>
      <div>
        <dt className="text-[12px] font-semibold uppercase tracking-[0.16em] text-cream/62">
          {label}
        </dt>
        <dd className="mt-1 text-[16.5px] leading-snug text-cream/90">{value}</dd>
      </div>
    </div>
  );
}

function addHours(time: string, hours: number): string {
  const [h, m] = time.split(":").map(Number);
  if (Number.isNaN(h)) return time;
  const next = (h + hours) % 24;
  return `${String(next).padStart(2, "0")}:${String(m ?? 0).padStart(2, "0")}`;
}
