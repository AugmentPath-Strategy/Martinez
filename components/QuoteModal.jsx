"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useQuote } from "./QuoteContext";
import Cta from "./Cta";

export default function QuoteModal() {
  const { open, closeQuote } = useQuote();
  const [sent, setSent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") closeQuote();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeQuote]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="quote-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-title"
      onClick={(event) => event.target === event.currentTarget && closeQuote()}
    >
      <div className="quote-modal-card">
        <div className="quote-modal-swatches" aria-hidden="true">
          <i style={{ background: "#c45c26" }} />
          <i style={{ background: "#d8cbb8" }} />
          <i style={{ background: "#3d4f45" }} />
          <i style={{ background: "#161310" }} />
        </div>
        <div className="quote-modal-body">
          <button className="quote-modal-close" type="button" onClick={closeQuote} aria-label="Close">
            ✕
          </button>
          <p className="kicker">Send us a text</p>
          <h3 id="quote-title">We usually respond via text within a few minutes.</h3>
          <form
            className="quote-form"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
              event.currentTarget.reset();
            }}
          >
            <label>
              <span>Full name *</span>
              <input name="name" required />
            </label>
            <label>
              <span>Phone number *</span>
              <input name="phone" type="tel" required />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" />
            </label>
            <label>
              <span>Address *</span>
              <input name="address" required />
            </label>
            <label>
              <span>Preferred Date of Service</span>
              <input name="date" type="date" />
            </label>
            <label>
              <span>Services</span>
              <select name="service">
                <option>Interior Painting</option>
                <option>Exterior Painting</option>
                <option>Commercial Painting</option>
                <option>Other</option>
              </select>
            </label>
            <label className="wide">
              <span>How can we help?</span>
              <textarea name="message" />
            </label>
            <p className="quote-consent">
              By providing your phone number, you consent to receive transactional/informational text messages (SMS) from Martinez Painting, powered by Topline Pro. You can unsubscribe at any time by replying STOP. Message and data rates may apply. Message frequency varies. See our <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms & Conditions</Link> for more details.
            </p>
            <div className="wide">
              <Cta variant="primary" type="submit">
                Agree & Send
              </Cta>
            </div>
            {sent && <p className="wide">Thank you. Martinez Painting has received your request and will text you shortly.</p>}
          </form>
        </div>
      </div>
    </div>,
    document.body,
  );
}
