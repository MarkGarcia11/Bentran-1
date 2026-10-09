import type { Metadata } from "next";
import { BRAND_NAME, BRAND_PROMISE } from "@/lib/brand";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { MeetBen } from "@/components/sections/MeetBen";
import { HowItWorks, ServicesGrid } from "@/components/sections/HowItWorks";
import { WhyCompanies } from "@/components/sections/WhyCompanies";
import { FleetPreview } from "@/components/sections/FleetPreview";
import { TestimonialSlider } from "@/components/sections/Testimonials";
import { CorporateBand, FinalCta } from "@/components/sections/CtaBand";
import { ServiceSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: `${BRAND_NAME} — Corporate Chauffeur & Airport Transfers | DC · VA · MD`,
  description: `${BRAND_PROMISE} Discreet corporate transportation across Washington DC, Northern Virginia and Maryland — airport transfers, executive roundtrips and hourly service, personally driven by Ben.`,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <MeetBen />
      <HowItWorks />
      <ServicesGrid limit={5} />
      <WhyCompanies />
      <FleetPreview />
      <TestimonialSlider />
      <CorporateBand />
      <FinalCta />
      <ServiceSchema />
    </>
  );
}
