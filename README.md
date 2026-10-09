# BNTRAN Inc. — Transportation

A complete, production-quality marketing website with a demo booking system for a premium
corporate chauffeur company. Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4 +
Framer Motion + Drizzle ORM (PostgreSQL)**.

> **Promise:** *30 years of trusted service, now one tap away.*

---

## 1. Quick start

```bash
npm install
cp .env.example .env.local   # optional — the site runs without a database
npm run dev                  # http://localhost:3000
```

The database is **optional**. Without `DATABASE_URL` the marketing site renders normally and the
booking demo falls back to browser local state. With a database, requests are stored in Postgres and
appear in the admin demo. Tables are created automatically on first API call
(`ensureSchema()` in `src/db/index.ts`), so no migration step is required.

To create the tables explicitly:

```bash
npx drizzle-kit push
```

## 2. Deploy to Vercel (from GitHub)

1. Push this repository to GitHub.
2. In Vercel: **Add New → Project → Import** the repository. Framework preset: **Next.js** (auto-detected).
3. Add environment variables (both optional):
   | Variable | Example | Purpose |
   | --- | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | `https://bntran.com` | Canonical URL for SEO, sitemap, robots, Open Graph |
   | `DATABASE_URL` | `postgres://user:pass@host:5432/db` | Stores demo bookings, messages, dashboard status |
4. Deploy. That's it — no build hooks, no image config, no font downloads at build time.

**Notes for a smooth deploy**

- Fonts are loaded from Google Fonts with `<link>` tags (not `next/font`), so builds never depend on
  a font cache and work in air-gapped CI.
- Photography is hot-linked from Pexels (free licence) using plain `<img loading="lazy">`, so no
  `images.remotePatterns` configuration is needed. Swap the URLs in `src/lib/images.ts` for your own.
- Every API route degrades gracefully: if the database is unreachable it returns `ok: true` with
  `stored: false`, and the UI keeps working from local state.
- `/admin-demo` and `/confirmation` are `noindex` and blocked in `robots.txt`.

## 3. Editing content without touching code

| File | What lives there |
| --- | --- |
| `src/lib/brand.ts` | Business name, tagline, promise, owner, phone, email, address, hours, stats, licence text, nav links, service areas, social links. Everything marked `PLACEHOLDER` is invented for the demo. |
| `src/lib/content.ts` | All page copy: hero, services, fleet, values, timeline, testimonials, FAQs, corporate, autocomplete places, time slots. |
| `src/lib/images.ts` | Every photograph plus its alt text. |
| `src/app/globals.css` | Design tokens — colours, fonts, radii, easing, glass and sunrise surfaces. |

To change the phone number everywhere on the site, edit `CONTACT.phoneDisplay` / `phoneDial` in
`src/lib/brand.ts`. Nothing else needs to change.

## 4. Routes

| Route | Purpose |
| --- | --- |
| `/` | Home — hero, trust bar, meet Ben, how it works, services, why companies, fleet, stories, corporate band, final CTA |
| `/services` | Five services with anchored sections and rates |
| `/fleet` | Vehicle cards with passenger & luggage capacity |
| `/about` | Ben's story, 30-year timeline, values, licensing badges |
| `/corporate` | Team accounts + "Request a team setup" form |
| `/book` | Three-step booking wizard (demo) |
| `/confirmation` | Animated confirmation, reference number, `.ics` download, share |
| `/testimonials` | Rotating featured quote + story cards |
| `/service-areas` | DC / VA / MD / airports with a stylised map |
| `/faq` | Searchable, categorised accordion |
| `/contact` | Call, text, email, hours, message form |
| `/privacy`, `/terms` | Plain-language templates |
| `/admin-demo` | Friendly dashboard mockup: request list, status chips, availability toggle, current location |
| `not-found` | Branded 404 |

## 5. Demo booking system

Three steps (Trip details → Passengers & vehicle → Review & confirm) with:

- inline, plain-language validation ("Please add a phone number so Ben can reach you.")
- floating labels, gold focus rings, animated validity checkmarks, progress bar
- mock place autocomplete with full keyboard support (↑ ↓ Enter Esc)
- past-date blocking, friendly time-slot chips, conditional return time
- passenger stepper, vehicle cards, optional company / flight / notes
- "Share my location" via the browser Geolocation API with a graceful fallback message
- reference numbers in the form `BN-2026-0001`, `.ics` calendar download, share sheet / clipboard
- "Where is my driver?" stylised tracking preview, clearly labelled as an upcoming feature

### Plugging in a real backend later

| Seam | Where |
| --- | --- |
| Booking submit | `POST /api/bookings` (`src/app/api/bookings/route.ts`) — swap the Drizzle insert for your dispatch/email provider |
| Status updates | `PATCH /api/bookings/[id]` |
| Contact + corporate forms | `POST /api/contact` |
| Dashboard availability/location | `GET`/`PUT /api/status` |
| Schema | `src/db/schema.ts` (Drizzle) |

No component needs redesigning — the client already treats the API as best-effort.

## 6. Design system

**Colours** — Midnight Navy `#0F1B2D`, Deep Ink `#16263D`, Champagne Gold `#C9A24B`,
Sunrise Apricot `#F2A65A`, Soft Ivory `#FBF7F0`, Pearl `#FFFFFF`, Sage Teal `#2F6F6B`,
Text `#1B2433` on light / `#F4EFE6` on dark. Small gold text uses `gold-ink #8A6A20` to keep
WCAG AA contrast.

**Type** — Fraunces (display serif) for headlines, Inter for everything else, Caveat for Ben's
signature. Body is 18px desktop / 17px mobile with 1.6–1.7 line height.

**Signature surfaces** — `.sunrise` (navy → ink with an apricot/gold radial glow bottom-right) and
`.glass` / `.glass-dark` (Sky Glass frosted panels).

**Motion** — word-by-word masked hero headline with self-drawing gold underlines, sliding lines,
flying tagline letters, animated counters, line-by-line pull-quotes, scroll-linked gold road line
with a travelling car, Ken Burns imagery (≤4%), magnetic primary CTAs, sheen sweep on buttons,
bokeh particles in the hero, and a logo-drawn screen loader. Everything honours
`prefers-reduced-motion` and animates only `transform` / `opacity`.

## 7. Scripts

```bash
npm run dev       # local development
npm run build     # production build
npm run start     # serve the production build
npm run lint      # eslint
npm run typecheck # tsc --noEmit
```
