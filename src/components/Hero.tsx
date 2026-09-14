"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (el) {
      el.classList.add("animate-fade-in");
    }
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      {/* Background botanical texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B8860B' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Portrait */}
          <div className="flex justify-center lg:justify-start order-1 lg:order-1">
            <div className="relative">
              {/* Decorative gold ring */}
              <div
                className="absolute -inset-3 rounded-2xl opacity-30"
                style={{
                  border: "3px solid var(--color-gold)",
                  borderRadius: "20px",
                }}
              />
              <div
                className="absolute -inset-6 rounded-3xl opacity-15"
                style={{
                  border: "2px solid var(--color-gold-light)",
                  borderRadius: "24px",
                }}
              />
              <div className="relative w-72 h-96 sm:w-80 sm:h-[28rem] md:w-96 md:h-[32rem] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/baba-white-regal-navy.jpg"
                  alt="Adekunle Stephen Adeola - Baba White"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 300px, 400px"
                />
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="text-center lg:text-left order-2 lg:order-2 space-y-6">
            <p
              className="text-xs sm:text-sm uppercase tracking-[0.3em] font-medium animate-fade-in-up"
              style={{
                color: "var(--color-gold-dark)",
                animationDelay: "0.2s",
                animationFillMode: "both",
              }}
            >
              In Loving Memory of
            </p>

            <h1
              className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-tight animate-fade-in-up"
              style={{
                color: "var(--color-text-primary)",
                animationDelay: "0.4s",
                animationFillMode: "both",
              }}
            >
              Adekunle Stephen Adeola
            </h1>

            <p
              className="font-[family-name:var(--font-accent)] text-2xl sm:text-3xl md:text-4xl italic animate-fade-in-up"
              style={{
                color: "var(--color-gold-dark)",
                animationDelay: "0.6s",
                animationFillMode: "both",
              }}
            >
              &ldquo;Baba White&rdquo;
            </p>

            <p
              className="text-base sm:text-lg md:text-xl font-medium tracking-wide animate-fade-in-up"
              style={{
                color: "var(--color-text-secondary)",
                animationDelay: "0.8s",
                animationFillMode: "both",
              }}
            >
              August 24, 1970 &nbsp;&mdash;&nbsp; September 9, 2026
            </p>

            {/* Gold ornamental divider */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "1s", animationFillMode: "both" }}
            >
              <div className="gold-divider-thick w-48 mx-auto lg:mx-0" />
            </div>

            <p
              className="font-[family-name:var(--font-accent)] text-xl sm:text-2xl md:text-3xl italic animate-fade-in-up"
              style={{
                color: "var(--color-gold)",
                animationDelay: "1.2s",
                animationFillMode: "both",
              }}
            >
              Celebrating a Life of Grace
            </p>

            {/* CTA buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 animate-fade-in-up"
              style={{ animationDelay: "1.4s", animationFillMode: "both" }}
            >
              <a
                href="#tributes"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: "var(--color-gold-dark)" }}
              >
                Leave a Tribute
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 border-2"
                style={{
                  borderColor: "var(--color-gold-dark)",
                  color: "var(--color-gold-dark)",
                }}
              >
                Service Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
