"use client";

import Link from "next/link";
import { useQuote } from "./QuoteContext";

export default function Footer() {
  const { openQuote } = useQuote();
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <a className="brand" href="#home">Martinez<small>The Painter Service in Austin, TX</small></a>
          <p style={{ margin: "18px 0 22px" }}>Connect with our socials on Facebook.</p>
          <button className="btn btn-cream" onClick={openQuote}>Book Now</button>
        </div>
        <div>
          <h4>Hours</h4>
          <ul>
            <li>Sun: 08:00am - 06:00pm</li>
            <li>Mon: 9:00am - 5:00pm</li>
            <li>Tue: 9:00am - 5:00pm</li>
            <li>Wed: 9:00am - 5:00pm</li>
            <li>Thu: 9:00am - 5:00pm</li>
            <li>Fri: 9:00am - 5:00pm</li>
            <li>Sat: 08:00am - 06:00pm</li>
          </ul>
        </div>
        <div>
          <h4>Service areas</h4>
          <ul>
            <li>Austin, TX</li>
            <li>Round Rock, TX</li>
            <li>Cedar Park, TX</li>
            <li>Georgetown, TX</li>
            <li>San Marcos, TX</li>
            <li>Leander, TX</li>
            <li>Pflugerville, TX</li>
            <li>University of Texas, TX</li>
            <li>Kyle, TX</li>
            <li>Hutto, TX</li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#galleries">Galleries</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#faq">Frequently asked questions</a></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
            <li><a href="https://www.facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
          </ul>
          <h4 style={{ marginTop: 28 }}>Services</h4>
          <ul>
            <li><a href="#interior">Interior Painting</a></li>
            <li><a href="#exterior">Exterior Painting</a></li>
            <li><a href="#commercial">Commercial Painting</a></li>
          </ul>
          <button className="btn btn-line" style={{ marginTop: 22 }} onClick={openQuote}>Send us a Text</button>
        </div>
      </div>
      <div className="wrap legal">
        <span>ⓒ All Rights Reserved | <Link href="/privacy">Privacy Policy</Link> | <Link href="/terms">Terms & Conditions</Link></span>
        <span>Proudly serving Austin, TX and surrounding areas</span>
      </div>
    </footer>
  );
}
