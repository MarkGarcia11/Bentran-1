"use client";

import * as React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ChatWidget, MobileBar } from "./FloatingUI";
import { PageTransition, Preloader } from "./Preloader";
import { JourneyLine } from "@/components/motion/Motion";
import { LoaderDoneContext } from "@/lib/loader-context";

/**
 * Client shell: header, footer, floating UI, page transitions and the
 * signature scroll journey line. Rendered around server-side page content.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [loaderDone, setLoaderDone] = React.useState(false);

  return (
    <LoaderDoneContext.Provider value={loaderDone}>
      <Preloader onDone={() => setLoaderDone(true)} />
      <Header />
      <JourneyLine />
      <PageTransition>
        <main id="main" className="pt-[88px]">
          {children}
        </main>
        <Footer />
      </PageTransition>
      <MobileBar />
      <ChatWidget />
      {/* breathing room for the mobile call/book bar */}
      <div aria-hidden className="h-24 xl:hidden" />
    </LoaderDoneContext.Provider>
  );
}
