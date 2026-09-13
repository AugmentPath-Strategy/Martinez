"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

function Word({ text, className = "" }) {
  return (
    <span className={`hero-word ${className}`}>
      {text.split("").map((char, index) => (
        <span className="hero-letter" aria-hidden="true" key={`${text}-${char}-${index}`}>
          {char}
        </span>
      ))}
    </span>
  );
}

export default function HeroTitle() {
  const rootRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    let cancelled = false;
    const tweens = [];

    (async () => {
      const { default: gsap } = await import("gsap");
      if (cancelled || !rootRef.current) return;

      const letters = [...rootRef.current.querySelectorAll(".hero-letter")];
      const caret = rootRef.current.querySelector(".hero-caret");
      const stroke = rootRef.current.querySelector(".hero-stroke");

      gsap.set(letters, {
        opacity: 0,
        y: 48,
        rotate: (i) => (i % 2 === 0 ? -16 : 14),
        scale: 0.45,
        transformOrigin: "50% 100%",
      });
      if (caret) gsap.set(caret, { opacity: 0, scaleY: 0.25 });
      if (stroke) gsap.set(stroke, { scaleX: 0, transformOrigin: "left center" });

      const intro = gsap.timeline();
      tweens.push(intro);

      if (caret) {
        intro.to(caret, { opacity: 1, scaleY: 1, duration: 0.18, ease: "power2.out" });
      }

      letters.forEach((letter, index) => {
        intro.to(
          letter,
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            scale: 1,
            duration: 0.42,
            ease: "back.out(2.8)",
          },
          0.12 + index * 0.075,
        );
      });

      if (stroke) {
        intro.to(stroke, { scaleX: 1, duration: 0.7, ease: "power3.inOut" }, ">-0.2");
      }
      if (caret) {
        intro.to(caret, { opacity: 0, duration: 0.25, ease: "power2.out" });
      }
    })();

    return () => {
      cancelled = true;
      tweens.forEach((tween) => tween.kill());
    };
  }, [reduced]);

  return (
    <h1 ref={rootRef} className="hero-title mt-5 max-w-[9ch] text-[clamp(46px,12vw,128px)]" aria-label="Martinez Painting">
      <span className="block">
        <Word text="Martinez" />
      </span>
      <span className="relative mt-[0.06em] block italic text-clay">
        <Word text="Painting" />
        <span className="hero-caret" aria-hidden="true" />
        <i className="hero-stroke" aria-hidden="true" />
      </span>
    </h1>
  );
}
