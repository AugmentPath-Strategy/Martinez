"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "./ThemeProvider";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

function coverRadius(x, y) {
  const width = window.visualViewport?.width ?? window.innerWidth;
  const height = window.visualViewport?.height ?? window.innerHeight;
  return Math.hypot(Math.max(x, width - x), Math.max(y, height - y));
}

function buttonOrigin(button) {
  const rect = button.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

function useCircleVeil() {
  return window.matchMedia("(max-width: 900px), (pointer: coarse)").matches;
}

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const reduced = usePrefersReducedMotion();
  const buttonRef = useRef(null);
  const busyRef = useRef(false);

  const toggle = async () => {
    const next = theme === "dark" ? "light" : "dark";
    const button = buttonRef.current;

    if (!button || reduced) {
      setTheme(next);
      return;
    }

    const { x, y } = buttonOrigin(button);
    const radius = coverRadius(x, y);
    const root = document.documentElement;
    root.style.setProperty("--theme-x", `${x}px`);
    root.style.setProperty("--theme-y", `${y}px`);
    root.style.setProperty("--theme-r", `${radius}px`);

    const playVeil = async () => {
      if (busyRef.current) {
        setTheme(next);
        return;
      }

      busyRef.current = true;
      document.querySelectorAll(".theme-veil").forEach((node) => node.remove());
      setTheme(next);

      const { default: gsap } = await import("gsap");
      const veil = document.createElement("div");
      veil.className = "theme-veil";
      veil.setAttribute("aria-hidden", "true");
      veil.style.pointerEvents = "none";
      document.body.appendChild(veil);

      gsap.fromTo(
        veil,
        { clipPath: `circle(8px at ${x}px ${y}px)` },
        {
          clipPath: `circle(${radius}px at ${x}px ${y}px)`,
          duration: 1.7,
          ease: "power2.out",
          onComplete: () => {
            veil.remove();
            busyRef.current = false;
          },
        },
      );
    };

    if (!useCircleVeil() && typeof document.startViewTransition === "function") {
      try {
        const transition = document.startViewTransition(() => {
          setTheme(next);
        });
        await transition.finished;
      } catch {
        await playVeil();
      }
      return;
    }

    await playVeil();
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      className="theme-toggle"
      aria-label="Toggle dark mode"
      aria-pressed={theme === "dark"}
      title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      onClick={toggle}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={reduced ? false : { rotate: -40, opacity: 0, scale: 0.7 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={reduced ? { opacity: 1 } : { rotate: 40, opacity: 0, scale: 0.7 }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          className="theme-toggle-icon"
        >
          {theme === "dark" ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 3v2M12 19v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M3 12h2M19 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M16.5 13.2A6.5 6.5 0 0 1 10.8 7.5 5.6 5.6 0 1 0 16.5 13.2Z" />
            </svg>
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
