import { useEffect, useRef } from 'react';

/**
 * Attach to any element ref — adds `.visible` when the element
 * enters the viewport, triggering the CSS scroll-reveal transition.
 *
 * @param {number} threshold  0–1, how much of the element must be visible
 * @param {string} rootMargin CSS margin to shrink/expand the trigger area
 */
export function useScrollReveal(threshold = 0.12, rootMargin = '0px 0px -40px 0px') {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}