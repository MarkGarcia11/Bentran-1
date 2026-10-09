"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, Phone, Send } from "lucide-react";
import { CONTACT, OWNER } from "@/lib/brand";
import { cn, EASE_LUXE, formatPhone, isValidEmail } from "@/lib/utils";
import { FloatingInput, FloatingSelect, FloatingTextarea } from "@/components/ui/fields";

type Kind = "message" | "team";

type State = "idle" | "sending" | "sent" | "error";

const TOPICS = [
  "Book a ride",
  "Corporate account",
  "Airport transfer",
  "Special occasion",
  "Rates & quotes",
  "Something else",
];

const TEAM_SIZES = ["Just me", "2 – 5 people", "6 – 15 people", "16+ people"];
const RIDE_VOLUMES = ["A few a month", "5 – 15 a month", "15 – 40 a month", "40+ a month"];

export function ContactForm({
  kind = "message",
  className,
}: {
  kind?: Kind;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [state, setState] = React.useState<State>("idle");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    topic: TOPICS[0],
    teamSize: TEAM_SIZES[1],
    monthlyRides: RIDE_VOLUMES[1],
    body: "",
  });

  const set = (key: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: "" } : e));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Please add your name so I know who I'm replying to.";
    if (!isValidEmail(form.email)) next.email = "Please add an email so Ben can reply.";
    if (form.phone && form.phone.replace(/\D/g, "").length < 10)
      next.phone = "That phone number looks short — mind checking it?";
    if (kind === "team" && form.company.trim().length < 2)
      next.company = "Please add your company name.";
    if (form.body.trim().length < 10)
      next.body =
        kind === "team"
          ? "A sentence or two about your team's travel helps me prepare a proper answer."
          : "Tell me a little more — a sentence is plenty.";

    setErrors(next);
    if (Object.keys(next).length) return;

    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ...form }),
      });
      if (!res.ok) throw new Error("bad response");
      setState("sent");
    } catch {
      // No database? The demo still confirms politely.
      setState("sent");
    }
  };

  if (state === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_LUXE }}
        className={cn("glass rounded-panel p-8 text-center shadow-soft md:p-12", className)}
      >
        <motion.span
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE_LUXE, delay: 0.1 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage/12 text-sage"
        >
          <CheckCircle2 className="h-8 w-8" strokeWidth={1.6} />
        </motion.span>
        <h3 className="mt-6 font-serif text-[30px] text-navy">Thank you — it's on its way.</h3>
        <p className="mx-auto mt-4 max-w-md text-[17px] leading-relaxed text-body/78">
          {OWNER.firstName} reads every message himself and usually replies within the hour during
          business hours. If it's urgent, a call is fastest.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`tel:${CONTACT.phoneDial}`}
            className="btn-primary btn-sheen inline-flex h-13 items-center gap-2 rounded-full px-7 py-3.5 text-[16px] font-semibold"
          >
            <Phone className="h-4 w-4" strokeWidth={1.9} aria-hidden />
            {CONTACT.phoneDisplay}
          </a>
          <button
            type="button"
            onClick={() => {
              setState("idle");
              setForm({
                name: "",
                email: "",
                phone: "",
                company: "",
                topic: TOPICS[0],
                teamSize: TEAM_SIZES[1],
                monthlyRides: RIDE_VOLUMES[1],
                body: "",
              });
            }}
            className="inline-flex h-13 items-center gap-2 rounded-full border border-navy/15 px-6 py-3.5 text-[15.5px] font-medium text-navy transition-all duration-400 ease-luxe hover:border-gold hover:bg-gold/8"
          >
            Send another
          </button>
        </div>
        <p className="mt-6 text-[13px] text-body/62">
          Demo mode — messages are stored for preview only, not emailed anywhere.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className={cn("glass rounded-panel p-6 shadow-soft sm:p-8", className)}
      aria-label={kind === "team" ? "Request a team setup" : "Send a message"}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <FloatingInput
          id="cf-name"
          label="Your name"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          error={errors.name}
          autoComplete="name"
        />
        <FloatingInput
          id="cf-email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          error={errors.email}
          autoComplete="email"
        />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <FloatingInput
          id="cf-phone"
          label="Phone"
          optional
          inputMode="tel"
          value={form.phone}
          onChange={(e) => set("phone", formatPhone(e.target.value))}
          error={errors.phone}
          hint="Optional — helpful for same-day requests."
          autoComplete="tel"
        />
        <FloatingInput
          id="cf-company"
          label="Company"
          optional={kind !== "team"}
          value={form.company}
          onChange={(e) => set("company", e.target.value)}
          error={errors.company}
          autoComplete="organization"
        />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {kind === "team" ? (
          <>
            <FloatingSelect
              id="cf-team-size"
              label="How many people will book?"
              value={form.teamSize}
              onChange={(e) => set("teamSize", e.target.value)}
            >
              {TEAM_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </FloatingSelect>
            <FloatingSelect
              id="cf-rides"
              label="Roughly how many rides a month?"
              value={form.monthlyRides}
              onChange={(e) => set("monthlyRides", e.target.value)}
            >
              {RIDE_VOLUMES.map((volume) => (
                <option key={volume} value={volume}>
                  {volume}
                </option>
              ))}
            </FloatingSelect>
          </>
        ) : (
          <FloatingSelect
            id="cf-topic"
            label="What is this about?"
            value={form.topic}
            onChange={(e) => set("topic", e.target.value)}
          >
            {TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </FloatingSelect>
        )}
      </div>

      <div className="mt-5">
        <FloatingTextarea
          id="cf-body"
          label={kind === "team" ? "Tell me about your team's travel" : "Your message"}
          rows={5}
          value={form.body}
          onChange={(e) => set("body", e.target.value)}
          error={errors.body}
          hint={
            kind === "team"
              ? "Airports, daily commutes, guest pickups, standing preferences — anything useful."
              : "Dates, addresses, questions about rates — whatever is on your mind."
          }
        />
      </div>

      <AnimatePresence>
        {state === "error" ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-[15px] text-[#a4541a]"
          >
            Something went sideways. Please call {CONTACT.phoneDisplay} instead.
          </motion.p>
        ) : null}
      </AnimatePresence>

      <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={state === "sending"}
          className="btn-primary btn-sheen group inline-flex h-14 items-center gap-2.5 rounded-full px-8 text-[16px] font-semibold disabled:opacity-70"
        >
          {state === "sending" ? (
            <>
              <Loader2 className="h-4.5 w-4.5 animate-spin" strokeWidth={2} aria-hidden />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" strokeWidth={1.9} aria-hidden />
              {kind === "team" ? "Request a team setup" : "Send message"}
            </>
          )}
        </button>

        <a
          href={`mailto:${CONTACT.email}`}
          className="inline-flex items-center gap-2 text-[15.5px] font-medium text-navy/80 transition-colors hover:text-navy"
        >
          <Mail className="h-4 w-4 text-gold-ink" strokeWidth={1.8} aria-hidden />
          <span className="link-underline">{CONTACT.email}</span>
        </a>
      </div>

      <p className="mt-5 text-[13px] text-body/62">
        Demo mode — nothing is emailed. Swap the <code>/api/contact</code> handler for your email
        provider when you go live.
      </p>
    </form>
  );
}
