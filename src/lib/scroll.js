import { useEffect, useState } from "react";

/** Smoothly scrolls a section into view, accounting for the sticky header. */
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const navH =
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
      10
    ) || 68;

  const top = el.getBoundingClientRect().top + window.scrollY - navH - 8;
  window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
}

/**
 * Scroll spy.
 *
 * Uses one IntersectionObserver across all sections instead of a scroll
 * listener, so the browser reports visibility changes rather than the page
 * recomputing positions on every frame.
 */
export function useActiveSection(ids = []) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;

    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!nodes.length) return undefined;

    const visible = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        });

        if (!visible.size) return;
        // whichever section currently occupies the most of the viewport wins
        const winner = [...visible.entries()].sort((a, b) => b[1] - a[1])[0][0];
        setActive((prev) => (prev === winner ? prev : winner));
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
