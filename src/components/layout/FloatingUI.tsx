"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarCheck, MessageCircle, Phone, X } from "lucide-react";
import { CONTACT, OWNER } from "@/lib/brand";
import { cn, EASE_LUXE } from "@/lib/utils";

/* ------------------------------------------------------- Mobile bar */

const HIDE_ON = ["/book", "/confirmation"];

export function MobileBar() {
  const pathname = usePathname();
  const hidden = HIDE_ON.some((p) => pathname.startsWith(p));
  if (hidden) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 xl:hidden">
      <div className="glass flex items-stretch gap-2.5 rounded-panel p-2.5 shadow-lift">
        <a
          href={`tel:${CONTACT.phoneDial}`}
          className="flex h-14 flex-1 items-center justify-center gap-2 rounded-card border border-navy/12 bg-pearl/80 text-[16px] font-semibold text-navy transition-all duration-300 ease-luxe active:scale-[0.98]"
        >
          <Phone className="h-4.5 w-4.5 text-gold-ink" strokeWidth={1.9} aria-hidden />
          Call
        </a>
        <Link
          href="/book"
          className="btn-primary btn-sheen flex h-14 flex-[1.3] items-center justify-center gap-2 rounded-card text-[16px] font-semibold"
        >
          <CalendarCheck className="h-4.5 w-4.5" strokeWidth={1.9} aria-hidden />
          Book
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- Chat widget */

const CHAT_REPLIES = [
  "Hi — this is a demo chat, so nothing reaches me just yet. The fastest way to reach Ben is a call or a text.",
  "Need a quote? The booking form takes about a minute, and I'll confirm personally.",
];

export function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const reduce = useReducedMotion();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-3 lg:bottom-6 lg:right-6">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 16, scale: reduce ? 1 : 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : 10, scale: reduce ? 1 : 0.97 }}
            transition={{ duration: reduce ? 0.2 : 0.45, ease: EASE_LUXE }}
            className="glass w-[min(92vw,360px)] rounded-panel p-5 shadow-lift"
            role="dialog"
            aria-label={`Chat with ${OWNER.firstName} (demo)`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-serif text-[22px] text-navy">Chat with {OWNER.firstName}</p>
                <p className="mt-1 flex items-center gap-2 text-[13.5px] text-sage">
                  <span className="h-2 w-2 rounded-full bg-sage" aria-hidden />
                  Usually replies within the hour
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-navy/12 text-navy/75 transition-colors hover:border-gold hover:text-gold-ink"
              >
                <X className="h-4 w-4" strokeWidth={1.8} aria-hidden />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-[15px] leading-relaxed">
              <p className="rounded-card rounded-tl-sm bg-navy/6 px-4 py-3 text-body/85">
                Hello — thanks for stopping by. Tell me the day and the address and I'll take it from
                there.
              </p>
              {sent ? (
                <>
                  <p className="ml-8 rounded-card rounded-tr-sm bg-gold/12 px-4 py-3 text-navy">
                    {message}
                  </p>
                  <p className="rounded-card rounded-tl-sm bg-navy/6 px-4 py-3 text-body/85">
                    {CHAT_REPLIES[1]}
                  </p>
                </>
              ) : (
                <p className="rounded-card rounded-tl-sm bg-navy/6 px-4 py-3 text-body/85">
                  {CHAT_REPLIES[0]}
                </p>
              )}
            </div>

            <form
              className="mt-4 flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (!message.trim()) return;
                setSent(true);
              }}
            >
              <label htmlFor="chat-message" className="sr-only">
                Your message
              </label>
              <input
                id="chat-message"
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message…"
                className="h-12 flex-1 rounded-full border border-navy/12 bg-pearl/90 px-4 text-[15.5px] outline-none transition-all duration-300 focus:border-gold focus:ring-4 focus:ring-gold/18"
              />
              <button
                type="submit"
                className="btn-primary btn-sheen h-12 rounded-full px-5 text-[15px] font-semibold"
              >
                Send
              </button>
            </form>

            <p className="mt-3 text-[12.5px] text-body/65">
              Demo placeholder — messages are not delivered. Call or text for a real reply.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : `Chat with ${OWNER.firstName}`}
        whileHover={reduce ? undefined : { y: -3 }}
        whileTap={reduce ? undefined : { scale: 0.96 }}
        className={cn(
          "btn-sheen flex h-14 items-center gap-2.5 rounded-full px-5 text-[15px] font-semibold shadow-lift transition-all duration-400 ease-luxe",
          open ? "bg-navy text-cream" : "btn-primary",
        )}
      >
        <MessageCircle className="h-5 w-5" strokeWidth={1.8} aria-hidden />
        <span className={cn(open && "sr-only sm:not-sr-only")}>
          {open ? "Close" : `Chat with ${OWNER.firstName}`}
        </span>
      </motion.button>
    </div>
  );
}
