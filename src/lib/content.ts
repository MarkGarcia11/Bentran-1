import { BRAND_NAME, BRAND_PROMISE, OWNER } from "./brand";
import type { ImageKey } from "./images";

/**
 * ============================================================
 *  SITE COPY — one file, easy to edit
 * ------------------------------------------------------------
 *  Warm, plain, first person from Ben where it helps.
 *  Anything marked PLACEHOLDER is invented for the demo.
 * ============================================================
 */

export const HERO = {
  eyebrow: `${BRAND_NAME} · Washington DC · Virginia · Maryland`,
  headline: ["Thirty years of trusted rides.", "Now one tap away."],
  /** Words that get a hand-drawn gold underline. */
  highlightWords: ["trusted", "tap"],
  subline:
    "Reliable, discreet corporate transportation — personally delivered by Ben.",
  promise: BRAND_PROMISE,
  primaryCta: "Book a Ride",
  secondaryCta: "Call Ben",
  quickLabel: "Quick request",
};

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Request",
    body: "Tell me where and when. A minute on the form, or one phone call. Either way, I read every request myself.",
    icon: "pen",
  },
  {
    step: "02",
    title: "Confirm",
    body: "You get a reference number and a calm yes. If anything looks tight, I'll say so early — never at the last minute.",
    icon: "check",
  },
  {
    step: "03",
    title: "Relax",
    body: "I arrive fifteen minutes early, the car is cool and clean, and the rest of the morning belongs to you.",
    icon: "seat",
  },
];

export type ServiceItem = {
  slug: string;
  name: string;
  short: string;
  body: string;
  bullets: string[];
  image: ImageKey;
  icon: string;
  from: string; // PLACEHOLDER pricing
};

export const SERVICES: ServiceItem[] = [
  {
    slug: "corporate-chauffeur",
    name: "Corporate Chauffeur",
    short: "The daily drive, handled quietly.",
    body: "Door-to-door service for managers, executives and visiting guests. I know the lobby pickups, the loading zones and the shortcuts that save twelve minutes at 8 AM. Your calendar stays yours — the road becomes mine.",
    bullets: [
      "Recurring morning and evening runs",
      "Meet-and-greet at the lobby or the curb",
      "Quiet cabin, phone calls welcome",
      "One driver who learns your preferences",
    ],
    image: "working",
    icon: "briefcase",
    from: "from $95 / hour", // PLACEHOLDER
  },
  {
    slug: "airport-transfers",
    name: "Airport Transfers",
    short: "DCA, IAD and BWI — tracked and timed.",
    body: "I follow your flight, so a delay never becomes your problem. You land, your bag comes, and I'm standing where I said I'd be — with your name, not a phone number to call.",
    bullets: [
      "Free flight tracking and 60-minute grace",
      "Meet inside baggage claim on request",
      "Help with luggage, always",
      "Early departures from 4:00 AM",
    ],
    image: "airport",
    icon: "plane",
    from: "from $78 one way", // PLACEHOLDER
  },
  {
    slug: "executive-roundtrips",
    name: "Executive Roundtrips",
    short: "Out and back, without the wait anxiety.",
    body: "For dinners, site visits and hearings that run long. Book the return when you book the outbound and I'll hold the car. Change of plans? A text is enough.",
    bullets: [
      "Fixed return window, flexible in practice",
      "Waiting driver available on request",
      "Same car, same driver, both directions",
      "Curbside or garage pickup — your call",
    ],
    image: "citySedan",
    icon: "route",
    from: "from $150 round trip", // PLACEHOLDER
  },
  {
    slug: "special-occasions",
    name: "Special Occasions",
    short: "Anniversaries, galas, quiet good news.",
    body: "Not every ride is a meeting. Weddings, memorials, a nice dinner where nobody should have to drive. I keep the music low and the evening unhurried.",
    bullets: [
      "Champagne service on request", // PLACEHOLDER
      "Red-carpet door service",
      "Multi-stop evening itineraries",
      "Family and guest coordination",
    ],
    image: "doorServiceAlt",
    icon: "sparkle",
    from: "from $120 / evening", // PLACEHOLDER
  },
  {
    slug: "hourly-as-directed",
    name: "Hourly / As-Directed",
    short: "Keep me with you for the whole day.",
    body: "Site tours, investor days, three meetings across two states. Book me by the hour and the car stays yours. I'll wait, I'll carry, I'll keep it quiet.",
    bullets: [
      "Four-hour minimum, then by the hour", // PLACEHOLDER
      "Multiple stops at no re-quote",
      "Luggage stays secured in the car",
      "Road-day rates for longer routes",
    ],
    image: "nightRoad",
    icon: "clock",
    from: "from $95 / hour, 4-hour min", // PLACEHOLDER
  },
];

export type Vehicle = {
  id: string;
  name: string;
  category: string;
  passengers: number;
  luggage: number;
  description: string;
  features: string[];
  image: ImageKey;
  rate: string; // PLACEHOLDER
  popular?: boolean;
};

export const FLEET: Vehicle[] = [
  {
    id: "executive-sedan",
    name: "Executive Sedan",
    category: "Lincoln Continental / Cadillac XTS class", // PLACEHOLDER
    passengers: 3,
    luggage: 3,
    description:
      "The everyday workhorse. Leather seats, cold water, phone chargers for every kind of cable, and a trunk that swallows three carry-ons.",
    features: ["Leather interior", "Bottled water", "USB-C & Lightning", "Tinted rear glass", "Wi-Fi hotspot"],
    image: "sedan",
    rate: "$95 / hour · $78 airport",
    popular: true,
  },
  {
    id: "luxury-suv",
    name: "Luxury SUV",
    category: "Cadillac Escalade / Lincoln Navigator class", // PLACEHOLDER
    passengers: 5,
    luggage: 5,
    description:
      "Room to stretch, room for the team, room for the samples. The right choice when four people and a projector are going to the same place.",
    features: ["Captain's chairs", "Climate zones", "Extra legroom", "Large cargo area", "Privacy glass"],
    image: "suv",
    rate: "$135 / hour · $110 airport",
  },
  {
    id: "premium-sedan",
    name: "Premium Sedan",
    category: "Mercedes-Benz S-Class", // PLACEHOLDER
    passengers: 3,
    luggage: 2,
    description:
      "For the board visit, the gala, the day the answer has to feel certain. Quietest cabin I have, and the smoothest ride on the Beltway.",
    features: ["Rear-seat climate", "Heated seats", "Ambient lighting", "Shade curtains", "Still water & sparkling"],
    image: "citySedan",
    rate: "$165 / hour · $140 airport",
  },
  {
    id: "executive-van",
    name: "Executive Sprinter",
    category: "Mercedes Sprinter, 11 passengers", // PLACEHOLDER
    passengers: 11,
    luggage: 11,
    description:
      "Off-sites, conference shuttles, a whole department heading to Dulles together. Standing height, real seats, real luggage room.",
    features: ["Standing height", "11 reclining seats", "On-board luggage bay", "Reading lights", "Group pickup planning"],
    image: "corporate",
    rate: "$195 / hour · by quote",
  },
];

export const WHY_COMPANIES = [
  {
    title: "Punctual by habit",
    body: "I plan for traffic, weather and construction so your team doesn't have to. Fifteen minutes early is the standard, not the exception.",
    icon: "clock",
  },
  {
    title: "Discreet by default",
    body: "What's said in the car stays in the car. No small talk unless you want it, no names repeated, no details shared.",
    icon: "shield",
  },
  {
    title: "One dedicated driver",
    body: "Ten managers, one number, one driver who knows how each of you likes the morning to go. That familiarity is the product.",
    icon: "user",
  },
  {
    title: "Simple team booking",
    body: "A shared request form, one monthly invoice, one contact thread. Your office manager stops chasing cars and starts planning days.",
    icon: "briefcase",
  },
];

export const VALUES = [
  {
    title: "Early is on time",
    body: "Thirty years taught me that everything stressful about a ride happens in the last four minutes. So I remove those minutes.",
  },
  {
    title: "Say it plainly",
    body: "If a pickup is too tight, I'll tell you before you commit. An honest no now is kinder than a late yes later.",
  },
  {
    title: "Quiet hands",
    body: "Smooth braking, gentle corners, low music. Passengers should arrive less tired than when they left.",
  },
  {
    title: "Take care of people",
    body: "Luggage carried, doors held, umbrellas kept in the trunk. The details are the whole job.",
  },
];

export const TIMELINE = [
  {
    year: "1995",
    title: "First keys",
    body: "I started driving for a small sedan company in Arlington. One car, one dispatcher, a paper logbook on the passenger seat.", // PLACEHOLDER
  },
  {
    year: "2002",
    title: "The airport years",
    body: "Dulles at 5 AM became my office. I learned every terminal door, every grace period, every way to be exactly where a tired traveler needs me.", // PLACEHOLDER
  },
  {
    year: "2009",
    title: "Corporate regulars",
    body: "A law firm asked me to cover their partners full time. Then a consultancy. Then an association. Word of mouth did the rest.", // PLACEHOLDER
  },
  {
    year: "2016",
    title: "My own cars",
    body: `${BRAND_NAME} became my own company. I bought the first sedan, then the SUV, and kept the same standards I'd learned from the best dispatchers I'd worked for.`, // PLACEHOLDER
  },
  {
    year: "2024",
    title: "Ten managers, one number",
    body: "An anchor client asked for something simple: a shared way for their whole team to request me. That request shaped this site.", // PLACEHOLDER
  },
  {
    year: "Today",
    title: "One tap away",
    body: `${OWNER.years}+ years on these roads, and now a booking form that takes less than a minute. The service hasn't changed. The tap has.`,
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location: string;
  featured?: boolean;
};

/** PLACEHOLDER testimonials — swap in real, permissioned client quotes. */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Ben has driven our managing partners for six years. He is never late, never flustered, and he remembers that Margaret needs the coffee stop and David does not. That's the whole review.",
    name: "Karen W.",
    role: "Office Manager, law firm",
    location: "Arlington, VA",
    featured: true,
  },
  {
    quote:
      "Our flight diverted and landed at 1 AM. Ben was standing at the door when we got our bags. He didn't complain once. I've never forgotten that.",
    name: "Michael R.",
    role: "VP of Operations",
    location: "Reston, VA",
  },
  {
    quote:
      "I book rides for nine executives and a rotating list of guests. It used to be a spreadsheet. Now it's one form and one text thread. My Mondays are calmer.",
    name: "Priya S.",
    role: "Executive Assistant",
    location: "Washington, DC",
    featured: true,
  },
  {
    quote:
      "He drove my mother to three appointments a week for a month. He got out, walked her to the door, waited. I will always be grateful.",
    name: "Daniel H.",
    role: "Private client",
    location: "Bethesda, MD",
  },
  {
    quote:
      "Quiet, spotless car, and he knows exactly how long the Beltway will take on a Tuesday. Our board members ask for him by name.",
    name: "Alicia T.",
    role: "Chief of Staff, trade association",
    location: "Capitol Hill, DC",
  },
  {
    quote:
      "I spilled coffee in his back seat before a pitch. He handed me a wipe, opened the window, and said 'we have time.' We made it with ten minutes to spare.",
    name: "Jonah B.",
    role: "Founder",
    location: "Tysons, VA",
  },
];

export const TESTIMONIALS_NOTE =
  "These are illustrative placeholders written for the demo. Real, permissioned client quotes will replace them before launch.";

export type Faq = { q: string; a: string; category: string };

export const FAQS: Faq[] = [
  {
    q: "How do you price a ride?",
    a: "Airport transfers are flat rates by airport and vehicle. Everything else is hourly with a four-hour minimum, plus tolls and parking. You'll always know the number before you confirm — no surge, no surprises at the end of the day. (Rates on this demo site are placeholders.)",
    category: "Pricing",
  },
  {
    q: "What is your cancellation policy?",
    a: "Cancel or move a ride free of charge up to 12 hours before pickup. Inside 12 hours, half the quoted rate applies; inside 2 hours, the full rate. If someone in your party is simply running behind, text me — I don't charge for patience.",
    category: "Pricing",
  },
  {
    q: "Do you track my flight?",
    a: "Yes. Give me the flight number and I watch it from the moment it leaves the gate. Airport pickups include a 60-minute grace period after wheels down at no extra cost. If it's cancelled, the ride is cancelled and nothing is charged.",
    category: "Airports",
  },
  {
    q: "How long will you wait for me?",
    a: "Fifteen minutes of free waiting on local pickups, sixty minutes at airports after landing. For dinners and meetings, hourly or as-directed service keeps the car with you for as long as you need. If you're going to be longer, just tell me — I'd rather wait than have you rush.",
    category: "Airports",
  },
  {
    q: "Can you provide a child seat?",
    a: "Yes, with 24 hours' notice. I keep an infant seat and a convertible seat, both inspected and installed properly. There's no charge for the seat itself — I'd rather your family ride safely.",
    category: "Service",
  },
  {
    q: "How does corporate billing work?",
    a: "We set up one account for your company. Your team books through the same form, every ride is tagged with the traveler's name, and you receive a single itemized invoice each month. Purchase orders and W-9s are fine. Net-30 terms are standard for approved accounts. (Invoicing is a placeholder in this demo.)",
    category: "Corporate",
  },
  {
    q: "Who is actually driving?",
    a: "Me — Ben. I don't subcontract. If I'm ever genuinely double-booked or unwell, I call you personally, explain, and only then suggest a vetted colleague I've worked with for years. That has happened a handful of times in thirty years.",
    category: "Corporate",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. Commercial for-hire licensing in D.C. and Virginia, full commercial liability coverage, and background-checked, DOT-compliant vehicles. Certificates of insurance are available for your procurement file on request. (Numbers on this demo site are placeholders.)",
    category: "Trust",
  },
  {
    q: "How far in advance should I book?",
    a: "As early as you can — 24 hours is comfortable, and same-day often works. Early flights are the exception: those I like to know about the night before so I can plan the parking and the route.",
    category: "Booking",
  },
  {
    q: "Can I add stops along the way?",
    a: "Always. A coffee stop, a second office, dropping a colleague at Union Station first — tell me when you book or text me en route. On hourly service, stops are simply part of the time.",
    category: "Booking",
  },
  {
    q: "What about luggage for a group?",
    a: "The Executive Sedan takes three full-size bags, the Luxury SUV five, and the Sprinter eleven. If your group has more than usual — trade show materials, a cello, a stroller — mention it and I'll bring the right vehicle.",
    category: "Service",
  },
  {
    q: "Do you serve locations outside the DMV?",
    a: "Regularly: Richmond, Charlottesville, Baltimore, Philadelphia, New York City and Wilmington. Longer road days are quoted in advance with the return leg included. Ask me — I'll tell you honestly if the drive is worth it.",
    category: "Service",
  },
];

export const CORPORATE = {
  headline: "Booking rides for your team? Let's make it effortless.",
  intro:
    "About ten managers at one company book most of my week. They don't call a dispatch center. They fill in a short form, they get a reference number, and they know the same driver will be there. Here's how a team account works.",
  benefits: [
    {
      title: "One form for the whole team",
      body: "Anyone at your company can request a ride for themselves, an executive, or a visiting guest. No logins to manage, no apps to install.",
      icon: "briefcase",
    },
    {
      title: "A dedicated driver who learns the house",
      body: "Preferences, regular addresses, the guest who needs the SUV, the partner who never wants conversation. I keep it in my head, not in a ticket queue.",
      icon: "user",
    },
    {
      title: "Consistent service, every single ride",
      body: "Same car standards, same arrival window, same quiet. Your guests experience your company the same way every time.",
      icon: "check",
    },
    {
      title: "One monthly invoice",
      body: "Itemized by traveler and date, delivered by email, payable net-30. Your accounting team stops reconciling ten receipts a week. (Invoicing is a placeholder in this demo.)",
      icon: "invoice",
    },
  ],
  steps: [
    "Tell me your company name and roughly how many rides a month you need.",
    "We agree on vehicles, standing preferences and billing.",
    "I send you the booking link. Your team starts the same day.",
  ],
};

export const BEN_STORY = {
  eyebrow: `Meet ${OWNER.firstName}`,
  headline: "I've been driving this city for 30 years.",
  paragraphs: [
    "My name is Ben. I started driving a sedan out of Arlington in 1995, when dispatch meant a radio and a paper logbook. Thirty years later the tools have changed and the job hasn't: get there early, keep it calm, take care of the person in the back seat.",
    "Most of my week belongs to corporate travelers — managers booking for themselves, for executives, for guests flying in who've never been to this city. About ten people at one company handle most of the requests. They don't want a call center. They want somebody they know.",
    "I don't subcontract, and I don't overpromise. If a pickup is too tight I'll say so before you commit. If your flight is late, I'll be standing where I said I'd be. If you need quiet, you'll get quiet.",
  ],
  signature: "Ben",
  signatureLine: "Thank you for trusting me with your morning.",
  pullQuotes: [
    "Early is on time. Everything else is just an apology waiting to happen.",
    "The best part of this job is the face of somebody who lands at midnight and sees their name on a sign.",
  ],
};

export const SERVICE_AREAS_COPY = {
  headline: "Where I drive",
  intro:
    "The District, Northern Virginia and Maryland are home. Everything below is a place I know well enough to be early without using a map. Further out? Ask me — I'll tell you honestly.",
};

export const FOOTER_STORY =
  "A one-driver company with thirty years on these roads. Corporate chauffeur service, airport transfers and quiet, reliable transportation across Washington DC, Northern Virginia and Maryland.";

export const MINI_CTA = {
  headline: "Where can I take you?",
  body: "Tell me the address and the time. I'll take care of the rest.",
  button: "Book a Ride",
};

/** Mock autocomplete suggestions for the booking form. */
export const PLACE_SUGGESTIONS = [
  "Ronald Reagan Washington National Airport (DCA), Arlington, VA",
  "Washington Dulles International Airport (IAD), Dulles, VA",
  "Baltimore/Washington International Airport (BWI), MD",
  "Union Station, 50 Massachusetts Ave NE, Washington, DC",
  "The White House, 1600 Pennsylvania Ave NW, Washington, DC",
  "U.S. Capitol, First St SE, Washington, DC",
  "Washington Convention Center, 801 Mt Vernon Pl NW, Washington, DC",
  "The Watergate Hotel, 2650 Virginia Ave NW, Washington, DC",
  "The Hay-Adams, 800 16th St NW, Washington, DC",
  "Four Seasons Washington, 2800 Pennsylvania Ave NW, Washington, DC",
  "Arlington National Cemetery, Arlington, VA",
  "Tysons Corner Center, 1961 Chain Bridge Rd, McLean, VA",
  "George Washington University, 2121 I St NW, Washington, DC",
  "Georgetown University, 3700 O St NW, Washington, DC",
  "National Institutes of Health, 9000 Rockville Pike, Bethesda, MD",
  "Walter Reed National Military Medical Center, Bethesda, MD",
  "Pentagon City, Arlington, VA",
  "Crystal City, Arlington, VA",
  "Reston Town Center, Reston, VA",
  "Silver Spring Metro Station, Silver Spring, MD",
  "Bethesda Row, Bethesda, MD",
  "Old Town Alexandria, Alexandria, VA",
  "National Harbor, Oxon Hill, MD",
  "Amazon HQ2, Arlington, VA",
  "World Bank Headquarters, 1818 H St NW, Washington, DC",
  "International Monetary Fund, 700 19th St NW, Washington, DC",
];

export const TIME_SLOTS = [
  "4:30 AM", "5:30 AM", "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM",
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM",
];

export const TRIP_TYPES = [
  { id: "one-way", label: "One way", hint: "A single ride from pickup to destination." },
  { id: "round-trip", label: "Round trip", hint: "Out and back — I'll hold the return time." },
  { id: "driver-waits", label: "Driver waits", hint: "I stay with you and drive you onward." },
] as const;

export type TripTypeId = (typeof TRIP_TYPES)[number]["id"];

export const CANCELLATION_LINE =
  "Free changes up to 12 hours before pickup. See the FAQ for the full policy.";
