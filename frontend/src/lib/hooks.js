import { useEffect, useRef, useState } from "react";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Adds `is-visible` once the element scrolls ~18% into view. Runs once. */
export function useReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;

    // If the element is already at/above the fold on mount, reveal immediately.
    const withinView = () => {
      const r = el.getBoundingClientRect();
      return r.top < (window.innerHeight || 0) * 0.9 && r.bottom > 0;
    };
    if (withinView()) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: options.threshold ?? 0.18, rootMargin: options.rootMargin ?? "0px" }
    );
    io.observe(el);

    // Fallback for fast programmatic scrolls where IO can miss an element.
    const onScroll = () => {
      if (withinView()) {
        setVisible(true);
        io.disconnect();
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, visible];
}

/** Counts from 0 -> `end` when `active` becomes true. */
export function useCountUp(end, { active = true, duration = 900, decimals = 0 } = {}) {
  const [value, setValue] = useState(prefersReducedMotion ? end : 0);

  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion) {
      setValue(end);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(end * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setValue(end);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, active, duration]);

  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/** Simple data loader with loading / error state. */
export function useAsync(fn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  useEffect(() => {
    let alive = true;
    setState((s) => ({ ...s, loading: true, error: null }));
    Promise.resolve(fn())
      .then((data) => alive && setState({ data, loading: false, error: null }))
      .catch((error) => alive && setState({ data: null, loading: false, error }));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return state;
}
