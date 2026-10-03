"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Optional stagger delay in ms (kept subtle). */
  delay?: number;
};

/**
 * Gentle scroll reveal (fade + 20px slide). The hiding class is only applied
 * after mount, so content is always visible without JS and to crawlers.
 * Fully disabled under prefers-reduced-motion.
 *
 * Performance note: all Reveal instances share one IntersectionObserver instead
 * of creating a separate observer and watchdog timer for every section.
 */
const observedElements = new Set<HTMLElement>();
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver() {
  if (sharedObserver || typeof IntersectionObserver === "undefined") return sharedObserver;

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        element.classList.add("reveal-visible");
        sharedObserver?.unobserve(element);
        observedElements.delete(element);
      }

      if (observedElements.size === 0) {
        sharedObserver?.disconnect();
        sharedObserver = null;
      }
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
  );

  return sharedObserver;
}

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = getSharedObserver();
    if (!observer) return;

    try {
      el.classList.add("reveal");
      observedElements.add(el);
      observer.observe(el);

      return () => {
        observedElements.delete(el);
        observer.unobserve(el);
        if (observedElements.size === 0) {
          observer.disconnect();
          sharedObserver = null;
        }
      };
    } catch {
      el.classList.remove("reveal");
      observedElements.delete(el);
    }
  }, []);

  return (
    <div ref={ref} className={className} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
