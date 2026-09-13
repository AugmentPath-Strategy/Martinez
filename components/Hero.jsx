"use client";

import { useEffect, useRef } from "react";
import Cta from "./Cta";
import HeroTitle from "./HeroTitle";
import InsuredBadge from "./InsuredBadge";
import { useQuote } from "./QuoteContext";
import { HERO_LEAD } from "@/lib/siteContent";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export default function Hero() {
  const { openQuote } = useQuote();
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef(null);
  const imageRef = useRef(null);
  const copyRef = useRef(null);
  const swatchRef = useRef(null);
  const kickerRef = useRef(null);
  const leadRef = useRef(null);

  useEffect(() => {
    let ctx;
    let cancelled = false;

    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled || !rootRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const root = rootRef.current;

      ctx = gsap.context(() => {
        if (!reduced) {
          gsap.fromTo(
            [kickerRef.current, leadRef.current],
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", delay: 0.15 },
          );

          gsap.to(imageRef.current, {
            yPercent: 18,
            scale: 1.06,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: 0.65,
            },
          });

          if (swatchRef.current) {
            gsap.to(swatchRef.current, {
              y: 56,
              x: -12,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top top",
                end: "bottom top",
                scrub: 0.85,
              },
            });
          }

        }
      }, root);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="hero"
      className="hero relative grid min-h-[100svh] overflow-hidden bg-[color:var(--bg)] text-[color:var(--fg)] lg:grid-cols-[0.9fr_1.1fr]"
    >
      <div ref={copyRef} className="hero-copy relative flex flex-col justify-between px-5 pb-10 pt-28 md:px-12 lg:px-14">
        <div>
          <p ref={kickerRef} className="kicker">The painter service in Austin, TX</p>
          <HeroTitle />
          <p ref={leadRef} className="hero-lead mt-6 max-w-[40ch] text-[17px] text-[color:var(--muted)]">{HERO_LEAD}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Cta variant="primary" type="button" onClick={openQuote}>Get a Free Quote</Cta>
            <Cta variant="secondary" type="button" onClick={openQuote}>Call Us</Cta>
          </div>
        </div>
        <div className="hero-meta mt-16 flex justify-between gap-6 border-t border-[color:var(--rule)] pt-6 text-[12px] tracking-[0.12em] uppercase text-[color:var(--muted)]">
          <span>Interior · Exterior · Commercial</span>
          <span>Austin & nearby communities</span>
        </div>
      </div>

      <div className="hero-media relative min-h-[52vh] lg:min-h-[100svh]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            ref={imageRef}
            data-depth="-0.08"
            className="h-[128%] w-full origin-center object-cover will-change-transform"
            src="https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1800&q=80"
            alt="Warm limestone kitchen after a Martinez Painting interior finish in Austin, TX"
          />
        </div>
        <div ref={swatchRef} className="absolute top-[28%] left-0 hidden shadow-2xl md:grid" data-depth="0.28">
          <i className="block h-[72px] w-14 bg-clay" />
          <i className="block h-[72px] w-14 bg-caliche" />
          <i className="block h-[72px] w-14 bg-live-oak" />
          <i className="block h-[72px] w-14 bg-ink" />
        </div>
      </div>
      <InsuredBadge />
    </section>
  );
}
