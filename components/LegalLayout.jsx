import Link from "next/link";

export default function LegalLayout({ kicker, title, children }) {
  return (
    <>
      <header className="border-b border-[color:var(--rule)] bg-[color:var(--bg-raised)]">
        <div className="mx-auto flex w-[min(1320px,calc(100%-48px))] flex-wrap items-center justify-between gap-4 py-6">
          <Link className="font-display text-[22px] leading-none" href="/">
            Martinez
            <small className="mt-1 block font-sans text-[10px] tracking-[0.22em] uppercase opacity-65">Painting · Austin</small>
          </Link>
          <nav className="flex flex-wrap gap-5 text-[12px] tracking-[0.12em] uppercase text-[color:var(--muted)]">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/">Back to home</Link>
          </nav>
        </div>
      </header>
      <main className="bg-[color:var(--bg)] py-24">
        <div className="legal-copy mx-auto w-[min(760px,calc(100%-48px))]">
          <p className="kicker">{kicker}</p>
          <h2 className="mt-4 text-[clamp(48px,8vw,80px)]">{title}</h2>
          <p className="legal-updated mb-10 mt-4 text-[color:var(--muted)]">Last updated: September 11, 2026</p>
          {children}
        </div>
      </main>
      <footer className="border-t border-[color:var(--rule)] bg-[color:var(--bg-raised)]">
        <div className="mx-auto flex w-[min(1320px,calc(100%-48px))] flex-col justify-between gap-3 py-6 text-sm text-[color:var(--muted)] md:flex-row">
          <span>ⓒ All Rights Reserved | <Link href="/privacy">Privacy Policy</Link> | <Link href="/terms">Terms & Conditions</Link></span>
          <span>Martinez Painting · Austin, TX</span>
        </div>
      </footer>
    </>
  );
}
