"use client";

import { useState } from "react";
import Cta from "./Cta";
import { useQuote } from "./QuoteContext";
import { scrollToId } from "@/lib/scrollToId";

export default function Header({ onFilter } = {}) {
  const { openQuote } = useQuote();
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (event, id, filter) => {
    event.preventDefault();
    onFilter?.(filter);
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <header className="site-header">
      <div className="site-header-bar">
        <a className="site-logo" href="#home" onClick={(event) => go(event, "home")}>
          Martinez
          <small>Painting · Austin</small>
        </a>

        <nav className="site-nav" aria-label="Primary">
          <a href="#home" onClick={(event) => go(event, "home")}>Home</a>
          <div className="site-nav-item">
            <a href="#services" onClick={(event) => go(event, "services")}>Services</a>
            <div className="site-nav-menu">
              <a href="#interior" onClick={(event) => go(event, "interior")}>Interior Painting</a>
              <a href="#exterior" onClick={(event) => go(event, "exterior")}>Exterior Painting</a>
              <a href="#commercial" onClick={(event) => go(event, "commercial")}>Commercial Painting</a>
            </div>
          </div>
          <div className="site-nav-item">
            <a href="#galleries" onClick={(event) => go(event, "galleries")}>Galleries</a>
            <div className="site-nav-menu">
              <a href="#galleries" onClick={(event) => go(event, "galleries", "commercial")}>Commercial Spaces</a>
              <a href="#galleries" onClick={(event) => go(event, "galleries", "exterior")}>Exterior Makeovers</a>
              <a href="#galleries" onClick={(event) => go(event, "galleries", "interior")}>Interior Transformations</a>
              <a href="#galleries" onClick={(event) => go(event, "galleries", "residential")}>Residential Projects</a>
              <a href="#galleries" onClick={(event) => go(event, "galleries", "specialty")}>Specialty Finishes</a>
              <a href="#galleries" onClick={(event) => go(event, "galleries", "all")}>All Photos</a>
            </div>
          </div>
          <a href="#reviews" onClick={(event) => go(event, "reviews")}>Reviews</a>
          <a href="#faq" onClick={(event) => go(event, "faq")}>FAQs</a>
        </nav>

        <div className="site-header-cta">
          <Cta variant="tertiary" type="button" onClick={openQuote}>Send us a Text</Cta>
          <Cta variant="primary" type="button" onClick={openQuote}>Get a Free Quote</Cta>
        </div>

        <button
          className="site-menu-btn"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="site-mobile">
          <a href="#home" onClick={(event) => go(event, "home")}>Home</a>
          <a href="#about" onClick={(event) => go(event, "about")}>About</a>
          <a href="#services" onClick={(event) => go(event, "services")}>Services</a>
          <a href="#galleries" onClick={(event) => go(event, "galleries")}>Galleries</a>
          <a href="#interior" onClick={(event) => go(event, "interior")}>Interior Painting</a>
          <a href="#exterior" onClick={(event) => go(event, "exterior")}>Exterior Painting</a>
          <a href="#commercial" onClick={(event) => go(event, "commercial")}>Commercial Painting</a>
          <a href="#reviews" onClick={(event) => go(event, "reviews")}>Reviews</a>
          <a href="#faq" onClick={(event) => go(event, "faq")}>Frequently asked questions</a>
          <Cta variant="tertiary" type="button" onClick={() => { openQuote(); setMenuOpen(false); }}>Send us a Text</Cta>
          <Cta variant="primary" type="button" onClick={() => { openQuote(); setMenuOpen(false); }}>Get a Free Quote</Cta>
        </div>
      )}
    </header>
  );
}
