"use client";

import { useEffect, useState } from "react";
import { useQuote } from "./QuoteContext";

export default function Header({ onFilter } = {}) {
  const { openQuote } = useQuote();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.72);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = (filter) => {
    onFilter?.(filter);
    setMenuOpen(false);
  };

  return (
    <header className={`site-header${solid || menuOpen ? " solid" : ""}`}>
      <div className="wrap nav">
        <a className="brand" href="#home"><img src="/logo.png" alt="Martinez Painting" className="brand-logo" /><span className="brand-copy">Martinez<small>Painting · Austin</small></span></a>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li className="has-sub">
            <a href="#services">Services</a>
            <ul className="sub">
              <li><a href="#interior">Interior Painting</a></li>
              <li><a href="#exterior">Exterior Painting</a></li>
              <li><a href="#commercial">Commercial Painting</a></li>
            </ul>
          </li>
          <li className="has-sub">
            <a href="#galleries">Galleries</a>
            <ul className="sub">
              <li><a href="#galleries" onClick={() => jump("commercial")}>Commercial Spaces</a></li>
              <li><a href="#galleries" onClick={() => jump("exterior")}>Exterior Makeovers</a></li>
              <li><a href="#galleries" onClick={() => jump("interior")}>Interior Transformations</a></li>
              <li><a href="#galleries" onClick={() => jump("residential")}>Residential Projects</a></li>
              <li><a href="#galleries" onClick={() => jump("specialty")}>Specialty Finishes</a></li>
              <li><a href="#galleries" onClick={() => jump("all")}>All Photos</a></li>
            </ul>
          </li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#faq">FAQs</a></li>
        </ul>
        <div className="nav-cta">
          <button type="button" onClick={openQuote}>Send us a Text</button>
          <button className="call" type="button" onClick={openQuote}>Call Now</button>
        </div>
        <button className="menu-btn" type="button" aria-label="Open menu" onClick={() => setMenuOpen((v) => !v)}>☰</button>
      </div>
      {menuOpen && (
        <div className="mobile-panel open">
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#galleries" onClick={() => setMenuOpen(false)}>Galleries</a>
          <a href="#interior" onClick={() => setMenuOpen(false)}>Interior Painting</a>
          <a href="#exterior" onClick={() => setMenuOpen(false)}>Exterior Painting</a>
          <a href="#commercial" onClick={() => setMenuOpen(false)}>Commercial Painting</a>
          <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>Frequently asked questions</a>
          <button type="button" onClick={() => { openQuote(); setMenuOpen(false); }}>Send us a Text</button>
          <button type="button" onClick={() => { openQuote(); setMenuOpen(false); }}>Call Now</button>
        </div>
      )}
    </header>
  );
}
