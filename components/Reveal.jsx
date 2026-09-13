"use client";

export default function Reveal({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export const staggerParent = () => ({});

export const staggerItem = () => ({
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
});
