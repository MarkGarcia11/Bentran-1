/**
 * ============================================================
 *  BNTRAN Inc. — BRAND CONFIG
 * ------------------------------------------------------------
 *  Everything a non-developer needs to edit lives here.
 *  Change a value, save, and the whole site updates.
 *  Items marked "PLACEHOLDER" are invented for the demo and
 *  should be replaced with real details before launch.
 * ============================================================
 */

export const BRAND_NAME = "BNTRAN Inc.";
export const BRAND_SHORT = "BNTRAN";
export const BRAND_TAGLINE = "Transportation";
export const BRAND_PROMISE = "30 years of trusted service, now one tap away.";
export const BRAND_MONOGRAM = "BN";

export const OWNER = {
  firstName: "Ben",
  fullName: "Ben N. — Founder & Chauffeur", // PLACEHOLDER: full legal name
  role: "Owner, driver, and the voice on the phone",
  years: 30,
  signOff: "Ben",
};

/** Site URL used for SEO, sitemap, robots and Open Graph tags. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://bntran.vercel.app";

export const CONTACT = {
  /** PLACEHOLDER: real business phone number */
  phoneDisplay: "(202) 555-0148",
  phoneDial: "+12025550148",
  /** PLACEHOLDER: real SMS line (often the same number) */
  smsDial: "+12025550148",
  /** PLACEHOLDER: real email address */
  email: "ben@bntran.com",
  /** PLACEHOLDER: physical / mailing address */
  address: {
    street: "1100 Wilson Boulevard, Suite 200",
    city: "Arlington",
    region: "VA",
    postal: "22209",
    country: "US",
  },
  hours: [
    { days: "Monday – Friday", time: "4:30 AM – 11:00 PM" },
    { days: "Saturday", time: "5:00 AM – 11:00 PM" },
    { days: "Sunday", time: "By request" },
    { days: "Airport runs & early flights", time: "24 / 7" },
  ],
};

export const addressOneLine = `${CONTACT.address.street}, ${CONTACT.address.city}, ${CONTACT.address.region} ${CONTACT.address.postal}`;

/** Headline numbers shown in counters. PLACEHOLDER: replace with real figures. */
export const STATS = [
  { value: 30, suffix: "+", label: "Years behind the wheel" },
  { value: 10000, suffix: "+", label: "Rides completed", compact: true },
  { value: 99, suffix: "%", label: "On-time record" },
  { value: 24, suffix: "/7", label: "Availability" },
];

export const TRUST_POINTS = [
  {
    title: "30+ years of driving",
    body: "Same roads, same city, same calm hands since 1995.",
    icon: "clock",
  },
  {
    title: "Licensed & insured",
    body: "Full commercial coverage, background-checked, DOT-ready.", // PLACEHOLDER
    icon: "shield",
  },
  {
    title: "The on-time promise",
    body: "I arrive early. If I'm ever late, you hear it from me first.",
    icon: "check",
  },
  {
    title: "Available 24 / 7",
    body: "Early flights, late landings, last-minute changes. Call anyway.",
    icon: "phone",
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Fleet", href: "/fleet" },
  { label: "Ben's Story", href: "/about" },
  { label: "Corporate", href: "/corporate" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Stories", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

/** Service areas — editable list used across several pages. */
export const SERVICE_AREAS = [
  {
    name: "Washington, D.C.",
    detail: "Downtown, Capitol Hill, Georgetown, Navy Yard, NoMa, Foggy Bottom.",
    note: "Every federal building, embassy and hotel worth knowing.",
  },
  {
    name: "Northern Virginia",
    detail: "Arlington, Alexandria, Crystal City, Tysons, Reston, McLean, Fairfax.",
    note: "Where most of my morning runs begin.",
  },
  {
    name: "Maryland",
    detail: "Bethesda, Silver Spring, Chevy Chase, Rockville, Potomac, Annapolis.",
    note: "Quiet suburbs, long driveways, easy pickups.",
  },
  {
    name: "Reagan National (DCA)",
    detail: "Curbside pickup, baggage claim meets, flight tracking included.",
    note: "Fifteen minutes from most of Arlington.",
  },
  {
    name: "Dulles (IAD)",
    detail: "International arrivals, greeter meet, luggage help.",
    note: "I know which doors are quiet at 6 AM.",
  },
  {
    name: "Baltimore–Washington (BWI)",
    detail: "Meet-and-greet, hourly waits, corporate shuttles.",
    note: "Easy in and out, even on a Friday.",
  },
];

export const LICENSE = {
  /** PLACEHOLDER: replace with real license / authority numbers */
  line: "Licensed & insured · D.C. & Virginia for-hire authorized · $1,000,000 commercial liability",
  badges: [
    "Fully insured",
    "Background checked",
    "Commercially licensed",
    "DOT-ready vehicles",
  ],
};

export const SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" }, // PLACEHOLDER URL
  { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" }, // PLACEHOLDER URL
  { label: "Facebook", href: "https://www.facebook.com/", icon: "facebook" }, // PLACEHOLDER URL
];

/** Demo-mode copy shown near booking surfaces. */
export const DEMO_NOTE =
  "Demo mode — bookings are stored for preview only. No payment, no dispatch.";
