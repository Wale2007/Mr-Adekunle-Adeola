"use client";

import { useEffect, useRef } from "react";

export default function LifeStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("section-hidden");
            entry.target.classList.add("section-visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="life-story"
      ref={sectionRef}
      className="section-hidden py-16 md:py-24"
      style={{ backgroundColor: "var(--color-ivory)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p
            className="text-xs uppercase tracking-[0.3em] font-medium mb-3"
            style={{ color: "var(--color-gold-dark)" }}
          >
            His Life &amp; Legacy &mdash;
          </p>
          <h2
            className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            A Man of Purpose, Love and Impact
          </h2>
          <div className="gold-divider w-24 mx-auto mb-6" />
          <p
            className="font-[family-name:var(--font-accent)] text-xl sm:text-2xl italic leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            &ldquo;Precious memories and an enduring legacy of grace, faith, and unconditional love.&rdquo;
          </p>
        </div>

        {/* 3 Pillars: Purpose, Love, Impact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Purpose */}
          <div
            className="rounded-2xl p-8 text-center flex flex-col items-center space-y-3"
            style={{
              backgroundColor: "var(--color-cream)",
              border: "1px solid var(--color-champagne)",
              boxShadow: "0 4px 16px rgba(184, 134, 11, 0.04)",
            }}
          >
            <h3
              className="font-[family-name:var(--font-heading)] text-2xl font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              Purpose
            </h3>
            <div className="gold-divider w-12 mx-auto my-1" />
            <p
              className="text-sm sm:text-[15px] leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Walking faithfully in devotion to God, living each day with deep conviction, integrity, wisdom, and an unwavering commitment to his calling.
            </p>
          </div>

          {/* Love */}
          <div
            className="rounded-2xl p-8 text-center flex flex-col items-center space-y-3"
            style={{
              backgroundColor: "var(--color-cream)",
              border: "1px solid var(--color-champagne)",
              boxShadow: "0 4px 16px rgba(184, 134, 11, 0.04)",
            }}
          >
            <h3
              className="font-[family-name:var(--font-heading)] text-2xl font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              Love
            </h3>
            <div className="gold-divider w-12 mx-auto my-1" />
            <p
              className="text-sm sm:text-[15px] leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              A cherished family man, loyal brother, and steadfast friend whose radiant smile, warmth, and generous heart embraced and uplifted all around him.
            </p>
          </div>

          {/* Impact */}
          <div
            className="rounded-2xl p-8 text-center flex flex-col items-center space-y-3"
            style={{
              backgroundColor: "var(--color-cream)",
              border: "1px solid var(--color-champagne)",
              boxShadow: "0 4px 16px rgba(184, 134, 11, 0.04)",
            }}
          >
            <h3
              className="font-[family-name:var(--font-heading)] text-2xl font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              Impact
            </h3>
            <div className="gold-divider w-12 mx-auto my-1" />
            <p
              className="text-sm sm:text-[15px] leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Touching countless lives through selfless service in church and community, wise counsel, inspiring music, and an enduring testimony of grace.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
