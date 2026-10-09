"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { BRAND_NAME, CONTACT, DEMO_NOTE, OWNER } from "@/lib/brand";
import { cn, EASE_LUXE } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { Magnetic } from "@/components/motion/Motion";

function NavLink({
  link,
  pathname,
}: {
  link: { label: string; href: string };
  pathname: string;
}) {
  const active = pathname === link.href;
  return (
    <Link
      href={link.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative rounded-full px-2.5 py-2 text-[14px] font-medium whitespace-nowrap transition-colors duration-300",
        active ? "text-navy" : "text-body/70 hover:text-navy",
      )}
    >
      {link.label}
      <span
        aria-hidden
        className={cn(
            "absolute bottom-1 left-2.5 right-2.5 h-px origin-left bg-gold transition-transform duration-500 ease-luxe",
          active ? "scale-x-100" : "scale-x-0",
        )}
      />
    </Link>
  );
}

const LINKS = [
  { label: "Services", href: "/services" },
  { label: "Fleet", href: "/fleet" },
  { label: "Ben's Story", href: "/about" },
  { label: "Corporate", href: "/corporate" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Stories", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed left-4 top-4 z-[100] rounded-full bg-navy px-5 py-3 text-sm font-semibold text-cream"
      >
        Skip to content
      </a>

      <header
        data-scrolled={scrolled}
        className={cn(
          "glass-nav fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxe",
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-5 transition-all duration-500 ease-luxe sm:px-8 lg:px-12",
            scrolled ? "h-[68px]" : "h-[88px]",
          )}
        >
          <Link
            href="/"
            aria-label={`${BRAND_NAME} — home`}
            className="shrink-0 transition-transform duration-500 ease-luxe hover:-translate-y-0.5"
          >
            <Logo
              showTagline={!scrolled}
              markClassName={cn(
                "transition-all duration-500 ease-luxe",
                scrolled ? "h-9 w-9" : "h-11 w-11",
              )}
              className={cn(scrolled && "gap-2.5")}
            />
          </Link>

          {/* tablet shows a short set, desktop shows the full set */}
          <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex xl:hidden">
            {LINKS.slice(0, 4).map((link) => (
              <NavLink key={link.href} link={link} pathname={pathname} />
            ))}
          </nav>
          <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex">
            {LINKS.map((link) => (
              <NavLink key={link.href} link={link} pathname={pathname} />
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={`tel:${CONTACT.phoneDial}`}
              className="hidden items-center gap-2 rounded-full border border-navy/12 px-4 py-2.5 text-[15px] font-medium text-navy transition-all duration-400 ease-luxe hover:border-gold hover:bg-gold/8 lg:inline-flex"
            >
              <Phone className="h-4 w-4 text-gold-ink" strokeWidth={1.8} aria-hidden />
              Call {OWNER.firstName}
            </a>

            <Magnetic className="hidden sm:inline-flex">
              <Link
                href="/book"
                className="btn-primary btn-sheen inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold"
              >
                Book a Ride
              </Link>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-navy/12 text-navy transition-all duration-400 ease-luxe hover:border-gold hover:bg-gold/8 xl:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.7} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[70] xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.2 : 0.4, ease: EASE_LUXE }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="sunrise absolute inset-0" />
            <div className="absolute inset-0 bg-navy/30" />
            <div className="relative flex h-full flex-col px-6 pb-40 pt-6">
              <div className="flex items-center justify-between">
                <Logo tone="light" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors duration-300 hover:border-gold hover:text-gold-soft"
                >
                  <X className="h-5 w-5" strokeWidth={1.7} aria-hidden />
                </button>
              </div>

              <nav aria-label="Mobile" className="mt-12 flex-1 overflow-y-auto">
                <ul className="space-y-1">
                  {[{ label: "Home", href: "/" }, ...LINKS, { label: "Book a Ride", href: "/book" }].map(
                    (link, i) => {
                      const active = pathname === link.href;
                      return (
                        <motion.li
                          key={link.href}
                          initial={{ opacity: 0, y: reduce ? 0 : 22 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: reduce ? 0.3 : 0.7,
                            ease: EASE_LUXE,
                            delay: reduce ? 0 : 0.08 + i * 0.055,
                          }}
                        >
                          <Link
                            href={link.href}
                            className={cn(
                              "flex items-baseline justify-between border-b border-cream/12 py-4 font-serif text-[30px] transition-colors duration-300",
                              active ? "text-gold-soft" : "text-cream hover:text-gold-soft",
                            )}
                          >
                            {link.label}
                            <span className="font-sans text-[11px] tracking-[0.2em] text-cream/55">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </Link>
                        </motion.li>
                      );
                    },
                  )}
                </ul>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: reduce ? 0 : 0.6, duration: 0.6 }}
                  className="mt-8 space-y-2 text-cream/78"
                >
                  <a href={`tel:${CONTACT.phoneDial}`} className="block text-lg text-gold-soft">
                    {CONTACT.phoneDisplay}
                  </a>
                  <a href={`mailto:${CONTACT.email}`} className="block text-[15px] link-underline">
                    {CONTACT.email}
                  </a>
                  <p className="pt-3 text-[13px] text-cream/62">{DEMO_NOTE}</p>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
