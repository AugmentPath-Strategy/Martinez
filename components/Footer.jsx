"use client";

import Link from "next/link";
import Cta from "./Cta";
import { useQuote } from "./QuoteContext";
import { scrollToId } from "@/lib/scrollToId";

export default function Footer() {
  const { openQuote } = useQuote();
  const jump = (event, id) => {
    event.preventDefault();
    scrollToId(id);
  };

  return (
    <footer className="border-t border-[color:var(--rule)] bg-[color:var(--bg-raised)]">
      <div className="mx-auto grid w-[min(1320px,calc(100%-48px))] gap-12 py-20 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <a className="font-display text-[22px] leading-none" href="#home" onClick={(event) => jump(event, "home")}>
            Martinez
            <small className="mt-1 block font-sans text-[10px] tracking-[0.22em] uppercase opacity-65">The Painter Service in Austin, TX</small>
          </a>
          <p className="mt-5 max-w-[28ch] text-[color:var(--muted)]">Hours, service areas, and a free estimate are one conversation away.</p>
          <div className="mt-6">
            <Cta variant="primary" onClick={openQuote}>Get a Free Quote</Cta>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-[12px] tracking-[0.18em] uppercase text-[color:var(--muted)]">Hours</h4>
          <ul className="space-y-1 text-[15px]">
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
          <h4 className="mb-4 text-[12px] tracking-[0.18em] uppercase text-[color:var(--muted)]">Service areas</h4>
          <ul className="space-y-1 text-[15px]">
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
          <h4 className="mb-4 text-[12px] tracking-[0.18em] uppercase text-[color:var(--muted)]">Company</h4>
          <ul className="space-y-1 text-[15px]">
            <li><a href="#home" onClick={(event) => jump(event, "home")}>Home</a></li>
            <li><a href="#galleries" onClick={(event) => jump(event, "galleries")}>Galleries</a></li>
            <li><a href="#reviews" onClick={(event) => jump(event, "reviews")}>Reviews</a></li>
            <li><a href="#faq" onClick={(event) => jump(event, "faq")}>Frequently asked questions</a></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
          </ul>
          <h4 className="mt-8 mb-4 text-[12px] tracking-[0.18em] uppercase text-[color:var(--muted)]">Services</h4>
          <ul className="space-y-1 text-[15px]">
            <li><a href="#interior" onClick={(event) => jump(event, "interior")}>Interior Painting</a></li>
            <li><a href="#exterior" onClick={(event) => jump(event, "exterior")}>Exterior Painting</a></li>
            <li><a href="#commercial" onClick={(event) => jump(event, "commercial")}>Commercial Painting</a></li>
          </ul>
          <div className="mt-6">
            <Cta variant="tertiary" onClick={openQuote}>Send us a Text</Cta>
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-[min(1320px,calc(100%-48px))] flex-col justify-between gap-3 border-t border-[color:var(--rule)] py-6 text-sm text-[color:var(--muted)] md:flex-row">
        <span>ⓒ All Rights Reserved | <Link href="/privacy">Privacy Policy</Link> | <Link href="/terms">Terms & Conditions</Link></span>
        <span>Proudly serving Austin, TX and surrounding areas</span>
      </div>
    </footer>
  );
}
