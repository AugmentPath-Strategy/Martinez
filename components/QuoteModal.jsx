"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuote } from "./QuoteContext";

export default function QuoteModal() {
  const { open, closeQuote } = useQuote();
  const [sent, setSent] = useState(false);

  if (!open) return null;

  return (
    <div className="modal open" role="dialog" aria-labelledby="quote-title" onClick={(event) => event.target === event.currentTarget && closeQuote()}>
      <div className="modal-card">
        <div className="modal-swatches" aria-hidden="true">
          <i className="swatch" style={{ background: "#c45c26", width: "100%", height: "auto" }} />
          <i className="swatch" style={{ background: "#d8cbb8", width: "100%", height: "auto" }} />
          <i className="swatch" style={{ background: "#3d4f45", width: "100%", height: "auto" }} />
          <i className="swatch" style={{ background: "#161412", width: "100%", height: "auto" }} />
        </div>
        <div>
          <button className="close-x" type="button" onClick={closeQuote} aria-label="Close">✕</button>
          <p className="kicker">Send us a text</p>
          <h3 id="quote-title">We usually respond via text within a few minutes.</h3>
          <form
            className="form-grid"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
              event.currentTarget.reset();
            }}
          >
            <label><span>Full name *</span><input name="name" required /></label>
            <label><span>Phone number *</span><input name="phone" type="tel" required /></label>
            <label><span>Email</span><input name="email" type="email" /></label>
            <label><span>Address *</span><input name="address" required /></label>
            <label><span>Preferred Date of Service</span><input name="date" type="date" /></label>
            <label>
              <span>Services</span>
              <select name="service">
                <option>Interior Painting</option>
                <option>Exterior Painting</option>
                <option>Commercial Painting</option>
                <option>Other</option>
              </select>
            </label>
            <label><span>How can we help?</span><textarea name="message" /></label>
            <p className="consent">
              By providing your phone number, you consent to receive transactional/informational text messages (SMS) from Martinez Painting, powered by Topline Pro. You can unsubscribe at any time by replying STOP. Message and data rates may apply. Message frequency varies. See our <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms & Conditions</Link> for more details.
            </p>
            <button className="btn btn-fill" type="submit">Agree & Send</button>
            {sent && <p>Thank you. Martinez Painting has received your request and will text you shortly.</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
