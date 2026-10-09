import Link from "next/link";
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import {
  BRAND_NAME,
  CONTACT,
  LICENSE,
  OWNER,
  SERVICE_AREAS,
  SITE_URL,
  SOCIAL,
  addressOneLine,
} from "@/lib/brand";
import { FOOTER_STORY, MINI_CTA, SERVICES } from "@/lib/content";
import { LogoStacked } from "@/components/Logo";
import { ButtonLink } from "@/components/ui/button";

const COMPANY_LINKS = [
  { label: `Meet ${OWNER.firstName}`, href: "/about" },
  { label: "Corporate Accounts", href: "/corporate" },
  { label: "Client Stories", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Book a Ride", href: "/book" },
  { label: "Admin Demo", href: "/admin-demo" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

function SocialIcon({ icon }: { icon: string }) {
  const common = {
    className: "h-4 w-4",
    fill: "currentColor",
    "aria-hidden": true,
  } as const;
  if (icon === "linkedin")
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.4 8.65 22 11.1 22 14.2V21h-4v-6.03c0-1.44-.03-3.3-2-3.3-2 0-2.3 1.57-2.3 3.2V21h-4z" />
      </svg>
    );
  if (icon === "instagram")
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 3.05a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5zm0 11.13a4.38 4.38 0 1 1 0-8.76 4.38 4.38 0 0 1 0 8.76zm6.99-11.4a1.58 1.58 0 1 1-3.15 0 1.58 1.58 0 0 1 3.15 0z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" {...common}>
      <path d="M13.5 21.3h-3A8.3 8.3 0 0 1 2.2 13V5.9c0-.8.7-1.5 1.5-1.5h2.1c.8 0 1.4.6 1.5 1.4l.4 3c.1.6-.2 1.2-.7 1.5l-1.3.8a10.6 10.6 0 0 0 5 5l.8-1.3c.3-.5.9-.8 1.5-.7l3 .4c.8.1 1.4.8 1.4 1.5v2.1c0 .8-.6 1.5-1.4 1.5z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="sunrise relative overflow-hidden text-cream">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px hairline opacity-70" />

      {/* mini CTA */}
      <div className="mx-auto w-full max-w-[1240px] px-5 pt-20 sm:px-8 lg:px-12">
        <div className="glass-dark flex flex-col items-start justify-between gap-8 rounded-panel p-8 md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="font-serif text-[30px] leading-tight text-cream md:text-[40px]">
              {MINI_CTA.headline}
            </h2>
            <p className="mt-3 max-w-xl text-[17px] text-cream/78">{MINI_CTA.body}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/book" size="lg">
              {MINI_CTA.button}
            </ButtonLink>
            <a
              href={`tel:${CONTACT.phoneDial}`}
              className="inline-flex h-14 items-center gap-2 rounded-full border border-cream/25 px-7 text-[16px] font-medium text-cream transition-all duration-400 ease-luxe hover:border-gold hover:bg-gold/10"
            >
              <Phone className="h-4 w-4 text-gold-soft" strokeWidth={1.8} aria-hidden />
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* columns */}
      <div className="mx-auto grid w-full max-w-[1240px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-4">
          <LogoStacked tone="light" />
          <p className="mt-6 max-w-sm text-[16.5px] leading-relaxed text-cream/74">
            {FOOTER_STORY}
          </p>
          <div className="mt-7 flex items-center gap-3">
            {SOCIAL.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${BRAND_NAME} on ${social.label}`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream/78 transition-all duration-400 ease-luxe hover:-translate-y-0.5 hover:border-gold hover:text-gold-soft"
              >
                <SocialIcon icon={social.icon} />
              </a>
            ))}
          </div>
          <p className="mt-7 max-w-sm text-[14px] leading-relaxed text-cream/62">
            {LICENSE.line}
          </p>
        </div>

        <nav aria-label="Services" className="lg:col-span-2">
          <h3 className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-gold-soft">
            Services
          </h3>
          <ul className="mt-5 space-y-3">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services#${service.slug}`}
                  className="text-[15.5px] text-cream/78 transition-colors duration-300 link-underline hover:text-cream"
                >
                  {service.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/fleet"
                className="text-[15.5px] text-cream/78 transition-colors duration-300 link-underline hover:text-cream"
              >
                The Fleet
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Company" className="lg:col-span-2">
          <h3 className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-gold-soft">
            Company
          </h3>
          <ul className="mt-5 space-y-3">
            {COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[15.5px] text-cream/78 transition-colors duration-300 link-underline hover:text-cream"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <h3 className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-gold-soft">
            Service Areas
          </h3>
          <ul className="mt-5 space-y-3">
            {SERVICE_AREAS.map((area) => (
              <li key={area.name}>
                <Link
                  href="/service-areas"
                  className="text-[15.5px] text-cream/78 transition-colors duration-300 link-underline hover:text-cream"
                >
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-gold-soft">
            Contact
          </h3>
          <ul className="mt-5 space-y-4 text-[15.5px] text-cream/78">
            <li>
              <a
                href={`tel:${CONTACT.phoneDial}`}
                className="flex items-start gap-2.5 transition-colors duration-300 hover:text-gold-soft"
              >
                <Phone className="mt-1 h-4 w-4 shrink-0 text-gold-soft" strokeWidth={1.8} aria-hidden />
                <span>
                  Call {OWNER.firstName}
                  <span className="block text-[14px] text-cream/65">{CONTACT.phoneDisplay}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={`sms:${CONTACT.smsDial}`}
                className="flex items-start gap-2.5 transition-colors duration-300 hover:text-gold-soft"
              >
                <MessageSquare className="mt-1 h-4 w-4 shrink-0 text-gold-soft" strokeWidth={1.8} aria-hidden />
                <span>
                  Text {OWNER.firstName}
                  <span className="block text-[14px] text-cream/65">Replies between rides</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-start gap-2.5 transition-colors duration-300 hover:text-gold-soft"
              >
                <Mail className="mt-1 h-4 w-4 shrink-0 text-gold-soft" strokeWidth={1.8} aria-hidden />
                <span className="break-all">{CONTACT.email}</span>
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold-soft" strokeWidth={1.8} aria-hidden />
              <span>{addressOneLine}</span>
            </li>
          </ul>

          <h3 className="mt-8 text-[11.5px] font-semibold uppercase tracking-[0.2em] text-gold-soft">
            Hours
          </h3>
          <ul className="mt-4 space-y-2 text-[14.5px] text-cream/70">
            {CONTACT.hours.map((hour) => (
              <li key={hour.days} className="flex justify-between gap-4">
                <span>{hour.days}</span>
                <span className="text-right text-cream/85">{hour.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1240px] px-5 pb-12 sm:px-8 lg:px-12">
        <div className="hairline h-px w-full opacity-40" />
        <div className="flex flex-col gap-5 pt-7 text-[13.5px] text-cream/62 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {BRAND_NAME} · {addressOneLine} · All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors duration-300 link-underline hover:text-cream/85"
              >
                {link.label}
              </Link>
            ))}
            <span className="hidden md:inline">Licensed & insured · {SITE_URL.replace(/^https?:\/\//, "")}</span>
          </div>
        </div>
        <p className="mt-6 text-[12.5px] leading-relaxed text-cream/55">
          Placeholder photography, testimonials, rates and licence details are used throughout this
          demo and are marked as editable in <code className="text-cream/66">src/lib/brand.ts</code>,{" "}
          <code className="text-cream/66">src/lib/content.ts</code> and{" "}
          <code className="text-cream/66">src/lib/images.ts</code>.
        </p>
      </div>
    </footer>
  );
}
