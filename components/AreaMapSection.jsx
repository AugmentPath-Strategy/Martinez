"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { LOCATIONS } from "./locations";
import { SHOWCASES } from "@/lib/siteContent";
import { useQuote } from "./QuoteContext";
import Reveal from "./Reveal";
import Cta from "./Cta";
import FolioPin from "./FolioPin";

const AustinMap = dynamic(() => import("./AustinMap"), {
  ssr: false,
  loading: () => <div className="grid min-h-[420px] place-items-center bg-[color:var(--bg-deep)] text-[color:var(--muted)]">Loading Austin map…</div>,
});

const SLIDES = SHOWCASES.slice(0, 3);

export default function AreaMapSection() {
  const { openQuote } = useQuote();
  const [selected, setSelected] = useState(LOCATIONS[0]);
  const [slide, setSlide] = useState(0);
  const current = SLIDES[slide];

  return (
    <FolioPin index="07" label="Territory">
      <section className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]" id="areas">
        <Reveal className="bg-[color:var(--bg-raised)] px-6 py-20 md:px-12">
          <p className="folio lg:hidden"><span>07 / Territory</span><span>Service areas</span></p>
          <h2 className="max-w-[14ch] text-[clamp(42px,5vw,72px)]">Proudly serving Austin, TX and surrounding areas</h2>
          <p className="mt-4 text-[color:var(--muted)]">{selected.address}</p>
          <ul className="mt-8 columns-1 gap-x-8 sm:columns-2">
            {LOCATIONS.map((place) => (
              <li key={place.name} className="mb-2 break-inside-avoid">
                <button
                  type="button"
                  className={`text-left ${selected.name === place.name ? "text-clay" : "text-[color:var(--fg)]"}`}
                  onClick={() => setSelected(place)}
                >
                  {place.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <p className="kicker">Explore local project showcases</p>
            <div className="mt-4 overflow-hidden bg-[color:var(--bg)]">
              <img src={current.image} alt={`${current.title} — painting project in ${current.place}`} className="h-48 w-full object-cover" />
              <div className="flex items-end justify-between gap-4 p-4">
                <div>
                  <small className="text-[color:var(--muted)]">{current.place} · {current.date}</small>
                  <strong className="mt-1 block font-display text-[22px] leading-tight">{current.title}</strong>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="h-9 w-9 border border-[color:var(--rule-strong)]" onClick={() => setSlide((slide + SLIDES.length - 1) % SLIDES.length)} aria-label="Previous showcase">‹</button>
                  <button type="button" className="h-9 w-9 border border-[color:var(--rule-strong)]" onClick={() => setSlide((slide + 1) % SLIDES.length)} aria-label="Next showcase">›</button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
        <div className="relative min-h-[520px]">
          <AustinMap selected={selected} />
          <div className="absolute right-5 bottom-20 z-[400] sm:bottom-5">
            <Cta variant="secondary" className="bg-[color:var(--bg)]" onClick={openQuote}>Send me a text</Cta>
          </div>
        </div>
      </section>
    </FolioPin>
  );
}
