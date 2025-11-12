// src/components/Reveal.tsx
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number | number[];
  stagger?: boolean;
};

export default function Reveal({
  children,
  className = "",
  rootMargin = "0px 0px -12% 0px",
  threshold = 0.12,
  stagger = false,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Ensure the element starts hidden (idempotent)
    el.classList.add("reveal");
    if (stagger) el.classList.add("reveal-stagger");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (stagger) {
              const kids = Array.from(el.children);
              kids.forEach((child, i) => {
                (child as HTMLElement).style.setProperty("--i", String(i));
              });
            }
            el.classList.add("reveal-revealed");
            el.classList.remove("reveal");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, stagger]);

  return (
    <section ref={ref as any} className={className} aria-hidden={false}>
      {children}
    </section>
  );
}
