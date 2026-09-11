"use client";

import { useEffect, useState } from "react";

const CITIES = [
  "Austin, TX",
  "Round Rock",
  "Cedar Park",
  "Georgetown",
  "San Marcos",
  "Leander",
  "Pflugerville",
  "University of Texas",
  "Kyle",
  "Hutto",
];

export default function Ticker() {
  const [items, setItems] = useState(CITIES);

  useEffect(() => {
    const fill = () => {
      const needed = Math.max(8, Math.ceil((window.innerWidth + 200) / 140));
      const next = [];
      while (next.length < needed) next.push(...CITIES);
      setItems(next);
    };
    fill();
    window.addEventListener("resize", fill);
    return () => window.removeEventListener("resize", fill);
  }, []);

  const groups = [items, items, items, items];

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {groups.map((group, index) => (
          <div className="ticker-group" key={index}>
            {group.map((city, cityIndex) => (
              <span key={`${index}-${cityIndex}`}>{city}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
