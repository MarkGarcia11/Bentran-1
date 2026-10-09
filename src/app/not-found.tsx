import Link from "next/link";
import { ArrowRight, Compass, Phone } from "lucide-react";
import { BRAND_NAME, CONTACT, OWNER } from "@/lib/brand";
import { LogoMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="relative -mt-[88px] flex min-h-[100svh] items-center justify-center overflow-hidden sunrise px-5 pb-24 pt-[calc(88px+6rem)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(70% 60% at 82% 108%, rgba(242,166,90,0.42) 0%, rgba(201,162,75,0.16) 42%, rgba(15,27,45,0) 72%)",
        }}
      />

      <div className="relative w-full max-w-2xl text-center">
        <div className="flex justify-center">
          <span className="logo-draw-ring flex h-24 w-24 items-center justify-center rounded-full border border-gold/25 bg-navy/30">
            <LogoMark tone="light" className="h-16 w-16" />
          </span>
        </div>

        <p className="mt-8 font-serif text-[64px] leading-none tracking-[0.14em] text-gold-soft sm:text-[84px]">
          404
        </p>

        <h1 className="mt-6 font-serif text-[32px] leading-tight text-cream sm:text-[44px]">
          Looks like we took a wrong turn.
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-[17.5px] leading-relaxed text-cream/78">
          This page isn&rsquo;t on the route. No worries — {OWNER.firstName} knows every street in
          this city, and the way home is one tap away.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/"
            className="btn-primary btn-sheen group inline-flex h-14 items-center gap-2.5 rounded-full px-8 text-[16px] font-semibold"
          >
            Take me home
            <ArrowRight
              className="h-4 w-4 transition-transform duration-400 ease-luxe group-hover:translate-x-1"
              strokeWidth={2}
              aria-hidden
            />
          </Link>
          <Link
            href="/book"
            className="glass-dark inline-flex h-14 items-center gap-2.5 rounded-full px-7 text-[15.5px] font-medium text-cream transition-all duration-400 ease-luxe hover:-translate-y-0.5 hover:border-gold"
          >
            <Compass className="h-4 w-4 text-gold-soft" strokeWidth={1.8} aria-hidden />
            Book a ride
          </Link>
          <a
            href={`tel:${CONTACT.phoneDial}`}
            className="inline-flex h-14 items-center gap-2.5 rounded-full border border-cream/25 px-7 text-[15.5px] font-medium text-cream transition-all duration-400 ease-luxe hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"
          >
            <Phone className="h-4 w-4 text-gold-soft" strokeWidth={1.8} aria-hidden />
            {CONTACT.phoneDisplay}
          </a>
        </div>

        <nav aria-label="Popular pages" className="mt-12">
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-cream/58">
            Popular routes
          </p>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[15.5px] text-cream/78">
            {[
              { label: "Services", href: "/services" },
              { label: "Fleet", href: "/fleet" },
              { label: `${OWNER.firstName}'s Story`, href: "/about" },
              { label: "Service Areas", href: "/service-areas" },
              { label: "FAQ", href: "/faq" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-underline transition-colors hover:text-gold-soft">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-12 text-[13px] text-cream/55">
          © {new Date().getFullYear()} {BRAND_NAME} · Washington DC · Virginia · Maryland
        </p>
      </div>
    </section>
  );
}
