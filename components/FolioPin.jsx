"use client";

export default function FolioPin({ index, label, children }) {
  return (
    <div className="relative">
      <p className="pointer-events-none absolute top-10 left-[max(24px,calc((100vw-1320px)/2+24px))] z-10 hidden text-[11px] tracking-[0.22em] uppercase text-[color:var(--muted)] lg:block">
        {index} / {label}
      </p>
      {children}
    </div>
  );
}
