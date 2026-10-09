import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "FAQ — Rates, Cancellations, Flight Tracking & Corporate Billing",
  description:
    "Answers to the questions corporate travelers ask most: pricing, cancellation policy, flight tracking, waiting time, child seats, luggage and monthly corporate invoicing.",
  alternates: { canonical: "/faq" },
};

export default function FaqLayout({ children }: { children: ReactNode }) {
  return children;
}
