import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** The signature easing used across the site. */
export const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

export const DURATIONS = {
  fast: 0.4,
  base: 0.75,
  slow: 1.1,
  drift: 1.6,
};

/* ---------------------------------------------------------- dates */

export function todayISO(): string {
  const d = new Date();
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60_000).toISOString().slice(0, 10);
}

export function formatLongDate(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShortDate(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatTime12(t?: string): string {
  if (!t) return "—";
  const [hRaw, m] = t.split(":");
  const h = Number(hRaw);
  if (Number.isNaN(h)) return t;
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${m ?? "00"} ${suffix}`;
}

export function toIcsDate(iso: string, time: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const [hh, mm] = (time || "09:00").split(":").map(Number);
  const date = new Date(y, (m ?? 1) - 1, d ?? 1, hh ?? 9, mm ?? 0);
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

/* ---------------------------------------------------------- phones */

export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11).replace(/^1/, "");
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

export function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= 10;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value.trim());
}

/* ---------------------------------------------------------- booking */

export function generateReference(seq?: number | null): string {
  const year = new Date().getFullYear();
  const n =
    typeof seq === "number" && seq > 0
      ? seq
      : Math.floor(Math.random() * 8000) + 1000;
  return `BN-${year}-${String(n).padStart(4, "0")}`;
}

export type IcsInput = {
  title: string;
  description: string;
  location: string;
  startISO: string;
  startTime: string;
  endISO?: string;
  endTime?: string;
};

/** Builds a downloadable .ics calendar file (client side). */
export function buildIcs(input: IcsInput): string {
  const start = toIcsDate(input.startISO, input.startTime);
  const end = toIcsDate(input.endISO ?? input.startISO, input.endTime ?? input.startTime);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BNTRAN Inc.//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${start}-bntran@bntran.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${input.title.replace(/,/g, "\\,")}`,
    `DESCRIPTION:${input.description.replace(/,/g, "\\,")}`,
    `LOCATION:${input.location.replace(/,/g, "\\,")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function downloadIcs(filename: string, contents: string) {
  if (typeof window === "undefined") return;
  const blob = new Blob([contents], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/* ---------------------------------------------------------- misc */

export function compactNumber(n: number): string {
  return n >= 1000 ? `${Math.round(n / 1000)},000` : String(n);
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function truncate(value: string, max = 140): string {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}
