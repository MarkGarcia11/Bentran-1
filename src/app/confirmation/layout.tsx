import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Booking Confirmed — Your Ride Reference",
  description:
    "Your BNTRAN ride request is in. Reference number, pickup details, calendar download and Ben's direct line — all in one calm place.",
  robots: { index: false, follow: true },
};

export default function ConfirmationLayout({ children }: { children: ReactNode }) {
  return children;
}
