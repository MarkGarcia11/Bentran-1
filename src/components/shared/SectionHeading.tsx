import * as React from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/card";
import { Reveal, WordLine } from "@/components/motion/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  highlight = [],
  intro,
  align = "left",
  tone = "dark",
  className,
  titleClassName,
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  highlight?: string[];
  intro?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2";
}) {
  const isCenter = align === "center";
  return (
    <div
      className={cn(
        "max-w-3xl",
        isCenter && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal y={12}>
          <Eyebrow
            tone={tone === "light" ? "cream" : "gold"}
            className={cn(isCenter && "justify-center")}
          >
            {eyebrow}
          </Eyebrow>
        </Reveal>
      ) : null}
      <WordLine
        as={as}
        text={title}
        highlight={highlight}
        className={cn(
          "mt-5 text-[34px] leading-[1.08] sm:text-[44px] md:text-[54px]",
          tone === "light" ? "text-cream" : "text-navy",
          titleClassName,
        )}
      />
      {intro ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-6 text-[18px] leading-[1.7] md:text-[19.5px]",
              tone === "light" ? "text-cream/82" : "text-body/80",
              isCenter && "mx-auto max-w-2xl",
            )}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
  size = "lg",
  tone = "ivory",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "ivory" | "pearl" | "quiet" | "navy";
}) {
  const sizes = {
    sm: "py-16 md:py-20",
    md: "py-20 md:py-28",
    lg: "py-24 md:py-36",
    xl: "py-28 md:py-44",
  };
  const tones = {
    ivory: "bg-ivory",
    pearl: "bg-pearl",
    quiet: "sunrise-quiet",
    navy: "sunrise text-cream",
  };
  return (
    <section id={id} className={cn("relative w-full", sizes[size], tones[tone], className)}>
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">{children}</div>
    </section>
  );
}
