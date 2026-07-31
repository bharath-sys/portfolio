import React, { useEffect, useRef } from "react";
import { isFinePointer } from "../lib/hooks";

const HOT_SELECTOR =
  'a,button,[role="button"],input,textarea,select,[data-cursor="hot"]';

/**
 * Custom cursor — one passive mousemove listener, two transform writes.
 *
 * There is no requestAnimationFrame loop and no React state: the dot snaps
 * to the pointer instantly and the ring trails it via a short CSS transition,
 * so the easing runs on the compositor rather than the main thread. That makes
 * the cursor feel immediate no matter how busy the page is.
 */
const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!isFinePointer()) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    document.body.classList.add("bk-cursor-on");

    let shown = false;
    let lastHot = null;

    const onMove = (e) => {
      const t = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      dot.style.transform = t;
      ring.style.transform = t;

      if (!shown) {
        shown = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }

      // only touch the DOM when the hover state actually flips
      const hot = e.target instanceof Element && !!e.target.closest(HOT_SELECTOR);
      if (hot !== lastHot) {
        lastHot = hot;
        ring.dataset.hot = String(hot);
      }
    };

    const hide = () => {
      shown = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", hide);

    return () => {
      document.body.classList.remove("bk-cursor-on");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", hide);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="bk-cursor-ring" style={{ opacity: 0 }} aria-hidden />
      <div ref={dotRef} className="bk-cursor-dot" style={{ opacity: 0 }} aria-hidden />
    </>
  );
};

export default React.memo(Cursor);
