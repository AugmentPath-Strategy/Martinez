"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { LOCATIONS } from "./locations";
import { useQuote } from "./QuoteContext";

const AustinMap = dynamic(() => import("./AustinMap"), {
  ssr: false,
  loading: () => <div className="map-fallback">Loading Austin map…</div>,
});

const SHOWCASES = [
  {
    title: "Reviving Reliability",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=700&q=80",
    place: "Austin, TX",
    date: "Jun 2024",
  },
  {
    title: "Rebuilding Roofs, Restoring Trust",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=700&q=80",
    place: "Austin, TX",
    date: "Jun 2024",
  },
  {
    title: "Seamless Durability",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80",
    place: "Austin, TX",
    date: "Jun 2024",
  },
];

export default function AreaMapSection() {
  const { openQuote } = useQuote();
  const [selected, setSelected] = useState(LOCATIONS[0]);
  const [slide, setSlide] = useState(0);
  const current = SHOWCASES[slide];

  return (
    <section className="territory" id="areas">
      <div className="territory-left">
        <p className="folio"><span>07 / Territory</span><span>Service areas</span></p>
        <h2>Proudly serving Austin, TX and surrounding areas</h2>
        <p className="territory-address">{selected.address}</p>
        <ul className="territory-list">
          {LOCATIONS.map((place) => (
            <li key={place.name}>
              <button type="button" className={selected.name === place.name ? "active" : ""} onClick={() => setSelected(place)}>
                {place.name}
              </button>
            </li>
          ))}
        </ul>
        <div className="territory-show">
          <p className="kicker">Explore local project showcases</p>
          <div className="territory-card">
            <img src={current.image} alt={current.title} />
            <div>
              <small>{current.place} · {current.date}</small>
              <strong>{current.title}</strong>
            </div>
            <div className="territory-nav">
              <button type="button" onClick={() => setSlide((slide + SHOWCASES.length - 1) % SHOWCASES.length)} aria-label="Previous showcase">‹</button>
              <button type="button" onClick={() => setSlide((slide + 1) % SHOWCASES.length)} aria-label="Next showcase">›</button>
            </div>
          </div>
        </div>
      </div>
      <div className="territory-map">
        <AustinMap selected={selected} />
        <button className="map-text-btn" type="button" onClick={openQuote}>Send me a text</button>
      </div>
    </section>
  );
}
