"use client";

import { useEffect, useRef } from "react";

export default function Reveal({ as = "div", className = "", delay = 0, once = true, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in");
            if (once) io.unobserve(el);
          } else if (!once) {
            el.classList.remove("in");
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const Tag = as;
  const d = delay ? `d${delay}` : "";
  return (
    <Tag ref={ref} className={`reveal ${d} ${className}`}>
      {children}
    </Tag>
  );
}
