"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Database,
  MapPin,
  Phone,
  RefreshCw,
  Save,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";
import { CONTACT, DEMO_NOTE, OWNER } from "@/lib/brand";
import { STATUSES, type BookingStatus, type StoredBooking } from "@/lib/booking";
import { useBooking } from "@/lib/booking-context";
import { cn, EASE_LUXE, formatLongDate, formatTime12, generateReference } from "@/lib/utils";
import { LogoMark } from "@/components/Logo";
import { Badge } from "@/components/ui/card";
import { vehicleById } from "@/lib/booking";

type SiteState = {
  availableToday: boolean;
  currentLocation: string;
  updatedAt: string;
};

const SAMPLE: Omit<StoredBooking, "id" | "reference" | "createdAt">[] = [
  {
    fullName: "Karen Whitfield",
    phone: "(202) 555-0193",
    email: "karen@example.com",
    date: new Date(Date.now() + 864e5).toISOString().slice(0, 10),
    time: "06:45",
    returnTime: "",
    pickup: "1900 N Lynn St, Arlington, VA",
    destination: "Ronald Reagan Washington National Airport (DCA)",
    tripType: "one-way",
    passengers: 1,
    vehicleId: "executive-sedan",
    company: "Hartline & Associates",
    flightNumber: "AA 1188",
    notes: "Quiet ride please — she takes a call at 7.",
    status: "New",
  },
  {
    fullName: "Priya Raman",
    phone: "(703) 555-0117",
    email: "priya@example.com",
    date: new Date(Date.now() + 2 * 864e5).toISOString().slice(0, 10),
    time: "08:15",
    returnTime: "17:30",
    pickup: "600 Maryland Ave SW, Washington, DC",
    destination: "National Institutes of Health, Bethesda, MD",
    tripType: "round-trip",
    passengers: 3,
    vehicleId: "luxury-suv",
    company: "Federal Affairs Group",
    flightNumber: "",
    notes: "Three guests, one carries a large binder case.",
    status: "Confirmed",
  },
  {
    fullName: "Daniel Hoffman",
    phone: "(301) 555-0142",
    email: "",
    date: new Date(Date.now() - 3 * 864e5).toISOString().slice(0, 10),
    time: "13:00",
    returnTime: "",
    pickup: "7101 Wisconsin Ave, Bethesda, MD",
    destination: "Walter Reed National Military Medical Center",
    tripType: "driver-waits",
    passengers: 2,
    vehicleId: "executive-sedan",
    company: "",
    flightNumber: "",
    notes: "Waiting about two hours. Mother needs help to the door.",
    status: "Completed",
  },
];

export default function AdminDemoPage() {
  const { bookings, updateStatus, clearAll, storageMode, ready, submitBooking } = useBooking();
  const reduce = useReducedMotion();
  const [site, setSite] = React.useState<SiteState>({
    availableToday: true,
    currentLocation: "Arlington, VA — between two morning runs",
    updatedAt: "",
  });
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [locationDraft, setLocationDraft] = React.useState(site.currentLocation);
  const [filter, setFilter] = React.useState<"All" | BookingStatus>("All");

  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/status", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { ok: boolean; status?: SiteState };
        if (data.ok && data.status) {
          setSite(data.status);
          setLocationDraft(data.status.currentLocation);
        }
      } catch {
        /* local demo continues */
      }
    })();
  }, []);

  const saveStatus = async (patch: Partial<SiteState>) => {
    const next = { ...site, ...patch, updatedAt: new Date().toISOString() };
    setSite(next);
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          availableToday: next.availableToday,
          currentLocation: next.currentLocation,
        }),
      });
    } catch {
      /* ignore */
    }
    setSaving(false);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2400);
  };

  const seed = async () => {
    for (const sample of SAMPLE) {
      // eslint-disable-next-line no-await-in-loop
      await submitBooking(sample);
    }
  };

  const visible = bookings.filter((b) => filter === "All" || b.status === filter);

  const counts = {
    total: bookings.length,
    New: bookings.filter((b) => b.status === "New").length,
    Confirmed: bookings.filter((b) => b.status === "Confirmed").length,
    Completed: bookings.filter((b) => b.status === "Completed").length,
    today: bookings.filter((b) => b.date === new Date().toISOString().slice(0, 10)).length,
    passengers: bookings.reduce((sum, b) => sum + (b.passengers || 0), 0),
  };

  return (
    <section className="relative min-h-[80svh] bg-ivory py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">
        {/* header */}
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-[14.5px] font-medium text-body/70 transition-colors hover:text-navy"
            >
              <ArrowLeft
                className="h-4 w-4 text-gold-ink transition-transform duration-400 ease-luxe group-hover:-translate-x-1"
                strokeWidth={1.9}
                aria-hidden
              />
              Back to the site
            </Link>
            <div className="mt-5 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/35 bg-gold/8">
                <LogoMark className="h-9 w-9" />
              </span>
              <div>
                <h1 className="font-serif text-[32px] leading-tight text-navy md:text-[40px]">
                  {OWNER.firstName}&rsquo;s dashboard
                </h1>
                <p className="mt-1.5 text-[16px] text-body/72">
                  A friendly preview of how simple managing requests will feel.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Badge tone={storageMode === "synced" ? "sage" : "gold"}>
              {storageMode === "synced" ? (
                <>
                  <Database className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
                  Connected to the database
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
                  Local demo storage
                </>
              )}
            </Badge>
            <Badge tone="navy">{DEMO_NOTE}</Badge>
          </div>
        </header>

        {/* availability + location */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0.4 : 0.7, ease: EASE_LUXE }}
          className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]"
        >
          <div className="rounded-panel sunrise p-7 text-cream shadow-lift">
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-gold-soft">
              Today
            </p>
            <h2 className="mt-3 font-serif text-[26px] leading-snug text-cream">
              {site.availableToday ? "Available for requests" : "Not available today"}
            </h2>
            <p className="mt-2.5 text-[15.5px] leading-relaxed text-cream/74">
              When you switch this off, the booking page can show a friendly note instead of
              accepting requests.
            </p>

            <button
              type="button"
              role="switch"
              aria-checked={site.availableToday}
              aria-label="Available today"
              onClick={() => saveStatus({ availableToday: !site.availableToday })}
              className={cn(
                "mt-6 inline-flex h-12 items-center gap-3 rounded-full border px-3 text-[15px] font-medium transition-all duration-500 ease-luxe",
                site.availableToday
                  ? "border-sage/50 bg-sage/20 text-cream"
                  : "border-cream/25 bg-navy/30 text-cream/78",
              )}
            >
              <span
                className={cn(
                  "relative flex h-7 w-12 items-center rounded-full transition-colors duration-500",
                  site.availableToday ? "bg-sage" : "bg-cream/25",
                )}
              >
                <motion.span
                  className="absolute h-6 w-6 rounded-full bg-pearl shadow"
                  animate={{ left: site.availableToday ? 22 : 2 }}
                  transition={{ duration: reduce ? 0.05 : 0.45, ease: EASE_LUXE }}
                />
              </span>
              {site.availableToday ? "Available" : "Not available"}
            </button>

            <p className="mt-5 text-[13.5px] text-cream/62">
              {saving ? "Saving…" : saved ? "Saved ✓" : "Changes save to the demo database."}
            </p>
          </div>

          <div className="glass rounded-panel p-7 shadow-soft">
            <label
              htmlFor="current-location"
              className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-navy/70"
            >
              Current location
            </label>
            <div className="relative mt-4">
              <MapPin
                className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gold-ink"
                strokeWidth={1.8}
                aria-hidden
              />
              <input
                id="current-location"
                value={locationDraft}
                onChange={(e) => setLocationDraft(e.target.value)}
                placeholder="e.g. Crystal City — waiting on a 2 PM pickup"
                className="h-[62px] w-full rounded-card border border-navy/12 bg-pearl/90 pl-11 pr-4 text-[16.5px] outline-none transition-all duration-300 ease-luxe focus:border-gold focus:bg-pearl focus:ring-4 focus:ring-gold/18"
              />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => saveStatus({ currentLocation: locationDraft })}
                className="btn-primary btn-sheen inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15.5px] font-semibold"
              >
                <Save className="h-4 w-4" strokeWidth={1.9} aria-hidden />
                Save location
              </button>
              <a
                href={`tel:${CONTACT.phoneDial}`}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-navy/15 px-6 text-[15px] font-medium text-navy transition-all duration-400 ease-luxe hover:border-gold hover:bg-gold/8"
              >
                <Phone className="h-4 w-4 text-gold-ink" strokeWidth={1.8} aria-hidden />
                Call the office line
              </a>
            </div>
            <p className="mt-5 text-[14px] leading-relaxed text-body/66">
              This is the field that will later power &ldquo;Where is my driver?&rdquo; for clients.
              For now it&rsquo;s a friendly text note.
            </p>
          </div>
        </motion.div>

        {/* stats */}
        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarDays, label: "Requests", value: counts.total, tone: "gold" },
            { icon: Sparkles, label: "New", value: counts.New, tone: "apricot" },
            { icon: CheckCircle2, label: "Confirmed", value: counts.Confirmed, tone: "sage" },
            { icon: Users, label: "Passengers today", value: counts.today ? counts.passengers : counts.passengers, tone: "navy" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0.4 : 0.6, ease: EASE_LUXE, delay: i * 0.06 }}
              className="rounded-panel border border-navy/8 bg-pearl p-6 shadow-soft"
            >
              <dt className="flex items-center gap-2.5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-body/66">
                <stat.icon className="h-4 w-4 text-gold-ink" strokeWidth={1.8} aria-hidden />
                {stat.label}
              </dt>
              <dd className="mt-3 font-serif text-[40px] leading-none text-navy">{stat.value}</dd>
            </motion.div>
          ))}
        </dl>

        {/* list */}
        <div className="mt-10 rounded-panel border border-navy/8 bg-pearl shadow-soft">
          <div className="flex flex-col gap-4 border-b border-navy/8 p-6 md:flex-row md:items-center md:justify-between md:p-7">
            <div>
              <h2 className="font-serif text-[26px] text-navy">Booking requests</h2>
              <p className="mt-1.5 text-[15px] text-body/70">
                {ready
                  ? `${visible.length} shown · updated live as requests come in`
                  : "Loading requests…"}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {(["All", ...STATUSES] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFilter(status)}
                  aria-pressed={filter === status}
                  className={cn(
                    "rounded-full border px-4 py-2 text-[14px] font-medium transition-all duration-300 ease-luxe",
                    filter === status
                      ? "border-gold bg-gold/12 text-navy"
                      : "border-navy/12 text-body/76 hover:-translate-y-0.5 hover:border-gold/60",
                  )}
                >
                  {status}
                  <span className="ml-1.5 text-body/62">
                    {status === "All" ? counts.total : counts[status as BookingStatus]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {visible.length === 0 ? (
            <div className="p-10 text-center md:p-16">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold-ink">
                <CalendarDays className="h-6 w-6" strokeWidth={1.6} aria-hidden />
              </span>
              <h3 className="mt-6 font-serif text-[26px] text-navy">No requests here yet.</h3>
              <p className="mx-auto mt-3 max-w-md text-[16px] leading-relaxed text-body/72">
                Book a ride from the public site and it will appear here instantly — or load three
                sample requests to see how the dashboard feels.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={seed}
                  className="btn-primary btn-sheen inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15.5px] font-semibold"
                >
                  <Sparkles className="h-4 w-4" strokeWidth={1.9} aria-hidden />
                  Load sample requests
                </button>
                <Link
                  href="/book"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-navy/15 px-6 text-[15px] font-medium text-navy transition-all duration-400 ease-luxe hover:border-gold hover:bg-gold/8"
                >
                  Open the booking form
                </Link>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-navy/8">
              {visible.map((booking, i) => {
                const vehicle = vehicleById(booking.vehicleId);
                return (
                  <motion.li
                    key={booking.reference}
                    initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduce ? 0.3 : 0.5, ease: EASE_LUXE, delay: Math.min(i, 6) * 0.04 }}
                    className="p-6 transition-colors duration-300 hover:bg-ivory/70 md:p-7"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-serif text-[23px] leading-snug text-navy">
                            {booking.fullName}
                          </h3>
                          <StatusChip status={booking.status} />
                          <span className="rounded-full border border-navy/12 px-3 py-1 font-mono text-[12.5px] text-body/70">
                            {booking.reference}
                          </span>
                        </div>

                        <div className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                          <Detail icon={<CalendarDays className="h-4 w-4" strokeWidth={1.8} />} label={formatLongDate(booking.date)} value={`${formatTime12(booking.time)}${booking.returnTime ? ` → back ${formatTime12(booking.returnTime)}` : ""}`} />
                          <Detail icon={<Users className="h-4 w-4" strokeWidth={1.8} />} label={`${booking.passengers} passenger${booking.passengers > 1 ? "s" : ""}`} value={vehicle.name} />
                          <Detail icon={<MapPin className="h-4 w-4" strokeWidth={1.8} />} label="Pickup" value={booking.pickup} />
                          <Detail icon={<MapPin className="h-4 w-4" strokeWidth={1.8} />} label="Destination" value={booking.destination} />
                          <Detail icon={<Phone className="h-4 w-4" strokeWidth={1.8} />} label="Contact" value={`${booking.phone}${booking.email ? ` · ${booking.email}` : ""}`} />
                          {booking.company ? (
                            <Detail icon={<Users className="h-4 w-4" strokeWidth={1.8} />} label="Company" value={booking.company} />
                          ) : null}
                          {booking.flightNumber ? (
                            <Detail icon={<Clock3 className="h-4 w-4" strokeWidth={1.8} />} label="Flight" value={booking.flightNumber} />
                          ) : null}
                        </div>

                        {booking.notes ? (
                          <p className="mt-4 rounded-card border border-gold/25 bg-gold/6 px-4 py-3 text-[15px] leading-relaxed text-body/80">
                            <span className="font-semibold text-navy">Notes: </span>
                            {booking.notes}
                          </p>
                        ) : null}
                      </div>

                      <div className="flex shrink-0 flex-wrap items-center gap-2 lg:flex-col lg:items-stretch">
                        {STATUSES.filter((s) => s !== booking.status).map((status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => updateStatus(booking.reference, status)}
                            className={cn(
                              "inline-flex h-10 items-center justify-center gap-2 rounded-full border px-4 text-[14px] font-medium transition-all duration-300 ease-luxe hover:-translate-y-0.5",
                              status === "Confirmed" && "border-sage/40 bg-sage/8 text-sage hover:bg-sage/14",
                              status === "Completed" && "border-navy/15 text-navy hover:border-gold hover:bg-gold/8",
                              status === "New" && "border-apricot/40 bg-apricot/10 text-[#8a4f14] hover:bg-apricot/16",
                            )}
                          >
                            <Check className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
                            Mark {status}
                          </button>
                        ))}
                        <a
                          href={`tel:${booking.phone.replace(/\D/g, "")}`}
                          className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-navy/15 px-4 text-[14px] font-medium text-navy transition-all duration-300 ease-luxe hover:-translate-y-0.5 hover:border-gold hover:bg-gold/8"
                        >
                          <Phone className="h-3.5 w-3.5 text-gold-ink" strokeWidth={1.9} aria-hidden />
                          Call
                        </a>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-navy/8 p-6 md:p-7">
            <p className="text-[14px] text-body/66">
              Reference numbers use the format{" "}
              <span className="font-mono text-navy/75">{generateReference(1)}</span>.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={seed}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-navy/15 px-5 text-[14.5px] font-medium text-navy transition-all duration-400 ease-luxe hover:border-gold hover:bg-gold/8"
              >
                <RefreshCw className="h-4 w-4 text-gold-ink" strokeWidth={1.8} aria-hidden />
                Add samples
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-navy/15 px-5 text-[14.5px] font-medium text-body/76 transition-all duration-400 ease-luxe hover:border-apricot hover:bg-apricot/10 hover:text-[#8a4f14]"
              >
                <Trash2 className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                Clear list
              </button>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-[13.5px] text-body/62">
          {DEMO_NOTE} Connect a database by setting <code>DATABASE_URL</code> — the same interface
          works with real requests.
        </p>
      </div>
    </section>
  );
}

function StatusChip({ status }: { status: BookingStatus }) {
  const styles: Record<BookingStatus, string> = {
    New: "border-apricot/45 bg-apricot/14 text-[#8a4f14]",
    Confirmed: "border-sage/40 bg-sage/12 text-sage",
    Completed: "border-navy/18 bg-navy/8 text-navy/80",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12.5px] font-semibold",
        styles[status],
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {status}
    </span>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 text-gold-ink">{icon}</span>
      <div className="min-w-0">
        <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-body/62">
          {label}
        </p>
        <p className="mt-0.5 text-[15.5px] leading-snug text-navy">{value}</p>
      </div>
    </div>
  );
}
