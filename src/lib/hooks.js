import { useEffect, useRef, useState } from "react";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

export const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isFinePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* -------------------------------------------------------------------------- */
/* useInView — IntersectionObserver wrapper                                    */
/*                                                                             */
/* One observer per element, disconnected as soon as it fires. No scroll        */
/* listeners, so scrolling costs nothing.                                      */
/* -------------------------------------------------------------------------- */

export function useInView({
  threshold = 0.12,
  rootMargin = "0px 0px -6% 0px",
  once = true,
} = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}

/* -------------------------------------------------------------------------- */
/* useCountUp — one-shot animated number, starts when scrolled into view       */
/* -------------------------------------------------------------------------- */

export function useCountUp(end, { duration = 1400, start = 0 } = {}) {
  const [ref, inView] = useInView({ threshold: 0.35 });
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (!inView) return undefined;
    if (prefersReduced()) {
      setValue(end);
      return undefined;
    }

    let rafId;
    const t0 = performance.now();
    const step = (now) => {
      const p = clamp((now - t0) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(Math.round(start + (end - start) * eased));
      if (p < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [inView, end, duration, start]);

  return [ref, value];
}

/* -------------------------------------------------------------------------- */
/* useMagnetic — element leans toward the cursor                               */
/*                                                                             */
/* The bounding rect is measured once on enter rather than on every move, so    */
/* pointer tracking never forces a synchronous layout.                          */
/* -------------------------------------------------------------------------- */

export function useMagnetic(strength = 0.25) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isFinePointer() || prefersReduced()) return undefined;

    let rect = null;

    const onEnter = () => {
      rect = el.getBoundingClientRect();
    };
    const onMove = (e) => {
      if (!rect) rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
    };
    const onLeave = () => {
      rect = null;
      el.style.transform = "translate3d(0,0,0)";
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return ref;
}

/* -------------------------------------------------------------------------- */
/* useScrollBar — drives a progress bar by writing straight to the DOM         */
/*                                                                             */
/* Returns a ref you attach to the bar element. Scroll updates never touch     */
/* React state, so no component re-renders while the page moves.               */
/* -------------------------------------------------------------------------- */

export function useScrollBar({ targetRef = null, axis = "width" } = {}) {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return undefined;

    let ticking = false;

    const apply = () => {
      ticking = false;
      let p;

      if (targetRef?.current) {
        const r = targetRef.current.getBoundingClientRect();
        const total = r.height - window.innerHeight * 0.5;
        const passed = window.innerHeight * 0.5 - r.top;
        p = clamp(passed / Math.max(total, 1), 0, 1);
      } else {
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        p = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
      }

      bar.style[axis] = `${Math.max(p * 100, axis === "height" ? 3 : 0)}%`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetRef, axis]);

  return barRef;
}

/* -------------------------------------------------------------------------- */
/* useScrolled — boolean flag, only re-renders on the transition               */
/* -------------------------------------------------------------------------- */

export function useScrolled(offset = 12) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const check = () => {
      ticking = false;
      setScrolled((prev) => {
        const next = window.scrollY > offset;
        return next === prev ? prev : next;
      });
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return scrolled;
}

/* -------------------------------------------------------------------------- */
/* useScramble — terminal-style reveal, runs once then stops                   */
/* -------------------------------------------------------------------------- */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*+=<>/\\";

export function useScramble(text = "", { speed = 30 } = {}) {
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (prefersReduced() || !text) {
      setOutput(text);
      return undefined;
    }

    let frame = 0;
    const total = text.length;
    const id = setInterval(() => {
      frame += 1;
      const revealed = Math.floor(frame / 2);
      if (revealed >= total) {
        setOutput(text);
        clearInterval(id);
        return;
      }
      setOutput(
        text
          .split("")
          .map((ch, i) =>
            i < revealed || ch === " "
              ? ch
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          )
          .join("")
      );
    }, speed);

    return () => clearInterval(id);
  }, [text, speed]);

  return output;
}

/* -------------------------------------------------------------------------- */
/* useLocalTime — live clock. Keep this inside a leaf component so the         */
/* per-second tick doesn't re-render anything above it.                        */
/* -------------------------------------------------------------------------- */

export function useLocalTime(timeZone = "Asia/Kolkata") {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone,
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return time;
}
