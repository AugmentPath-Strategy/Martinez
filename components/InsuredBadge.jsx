"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export default function InsuredBadge() {
  const badgeRef = useRef(null);
  const ringRef = useRef(null);
  const coreRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    let spin;
    let ctx;
    let cancelled = false;

    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled || !badgeRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (ringRef.current) {
          gsap.set(ringRef.current, { force3D: true, transformOrigin: "50% 50%" });
          spin = gsap.to(ringRef.current, {
            rotation: 360,
            duration: 36,
            ease: "none",
            repeat: -1,
          });
        }

        gsap.to(badgeRef.current, {
          y: -72,
          rotate: 8,
          ease: "none",
          scrollTrigger: {
            trigger: badgeRef.current.closest("section"),
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });

        if (coreRef.current) {
          gsap.to(coreRef.current, {
            y: 14,
            ease: "none",
            scrollTrigger: {
              trigger: badgeRef.current.closest("section"),
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }
      }, badgeRef);
    })();

    return () => {
      cancelled = true;
      spin?.kill();
      ctx?.revert();
    };
  }, [reduced]);

  return (
    <div ref={badgeRef} className="insured-badge" aria-label="Our properties insured">
      <div className="insured-badge-float" data-depth="0.42">
      <div ref={ringRef} className="insured-badge-ring">
        <svg viewBox="0 0 200 200" role="presentation">
          <defs>
            <path
              id="insured-ring"
              d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
            />
          </defs>
          <circle cx="100" cy="100" r="99" fill="rgba(22,19,16,0.92)" />
          <circle cx="100" cy="100" r="93" fill="none" stroke="#c45c26" strokeWidth="1.15" />
          <circle cx="100" cy="100" r="64" fill="none" stroke="#d8cbb8" strokeWidth="0.55" opacity="0.5" />
          <text fill="#f3ece3" fontSize="11.2" letterSpacing="3.2" fontFamily="var(--font-outfit), sans-serif">
            <textPath href="#insured-ring">
              OUR PROPERTIES · INSURED · OUR PROPERTIES · INSURED ·
            </textPath>
          </text>
        </svg>
      </div>
      <div ref={coreRef} className="insured-badge-core" data-depth="0.22">
        <span className="insured-badge-mark">MP</span>
        <small>Insured</small>
      </div>
      </div>
    </div>
  );
}
