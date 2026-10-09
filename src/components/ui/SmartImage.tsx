"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { IMAGES, type ImageKey, type Photo } from "@/lib/images";

type Source = ImageKey | Photo | string;

function resolve(source: Source): Photo {
  if (typeof source === "string") {
    if (source in IMAGES) return IMAGES[source as ImageKey];
    return { src: source, alt: "" };
  }
  return source;
}

/**
 * Image-first presentation layer.
 * Plain <img> (lazy + async decoding) keeps the build portable and
 * lets any host serve the assets. Treatments: warm grade, generous
 * rounding, soft shadow, optional Ken Burns and scroll parallax.
 */
export function SmartImage({
  source,
  alt,
  className,
  imgClassName,
  kenBurns = false,
  parallax = 0,
  priority = false,
  ratio,
  sizes = "(max-width: 768px) 100vw, 50vw",
  rounded = "rounded-hero",
}: {
  source: Source;
  alt?: string;
  className?: string;
  imgClassName?: string;
  kenBurns?: boolean;
  /** 0 = off, e.g. 60 = up to 60px of travel */
  parallax?: number;
  priority?: boolean;
  ratio?: string;
  sizes?: string;
  rounded?: string;
}) {
  const photo = resolve(source);
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [parallax / 2, -parallax / 2]);

  const useParallax = parallax > 0 && !reduce;
  const useKenBurns = kenBurns && !reduce;

  const img = (
    <img
      src={photo.src}
      alt={alt ?? photo.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      sizes={sizes}
      className={cn(
        "h-full w-full object-cover warm-grade",
        useKenBurns && "animate-[kenburns_28s_ease-in-out_infinite_alternate]",
        imgClassName,
      )}
    />
  );

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden bg-ink/10", rounded, className)}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {useParallax ? (
        <motion.div className="absolute inset-0 scale-[1.12]" style={{ y }}>
          {img}
        </motion.div>
      ) : (
        img
      )}
    </div>
  );
}
