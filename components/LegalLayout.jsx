import Link from "next/link";

export default function LegalLayout({ kicker, title, children }) {
  return (
    <>
      <header className="site-header solid">
        <div className="wrap nav">
          <Link className="brand" href="/">Martinez<small>Painting · Austin</small></Link>
          <nav className="legal-nav">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/">Back to home</Link>
          </nav>
        </div>
      </header>
      <main className="block legal-page">
        <div className="wrap legal-copy">
          <p className="kicker">{kicker}</p>
          <h2>{title}</h2>
          <p className="legal-updated">Last updated: September 11, 2026</p>
          {children}
        </div>
      </main>
      <footer className="site-footer" style={{ marginTop: 0 }}>
        <div className="wrap legal">
          <span>ⓒ All Rights Reserved | <Link href="/privacy">Privacy Policy</Link> | <Link href="/terms">Terms & Conditions</Link></span>
          <span>Martinez Painting · Austin, TX</span>
        </div>
      </footer>
    </>
  );
}
