"use client";

import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="footer-wave relative pt-16 pb-10"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Gold ornament */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="gold-divider w-16" />
          <Heart
            size={18}
            fill="var(--color-gold)"
            style={{ color: "var(--color-gold)" }}
          />
          <div className="gold-divider w-16" />
        </div>

        <p
          className="text-sm uppercase tracking-[0.2em] font-medium mb-2"
          style={{ color: "var(--color-text-muted)" }}
        >
          In Loving Memory of
        </p>

        <h3
          className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl font-bold mb-2"
          style={{ color: "var(--color-text-primary)" }}
        >
          Adekunle Stephen Adeola{" "}
          <span style={{ color: "var(--color-gold-dark)" }}>(Baba White)</span>
        </h3>

        <p
          className="text-sm font-medium mb-6"
          style={{ color: "var(--color-text-secondary)" }}
        >
          August 24, 1970 &nbsp;&mdash;&nbsp; September 9, 2026
        </p>

        <div className="gold-divider w-32 mx-auto mb-6" />

        <p
          className="font-[family-name:var(--font-accent)] text-base italic"
          style={{ color: "var(--color-text-muted)" }}
        >
          &ldquo;Precious in the sight of the Lord is the death of his faithful
          servants.&rdquo; &mdash; Psalm 116:15
        </p>

        <div className="mt-8 pt-6 border-t border-champagne/60 flex items-center justify-center">
          <a
            href="/print"
            className="text-xs font-medium tracking-wide transition-colors hover:underline inline-flex items-center gap-1.5"
            style={{ color: "var(--color-gold-dark)" }}
          >
            <span>🖨️</span> Print A4 Memorial Tribute Card with QR Code
          </a>
        </div>
      </div>
    </footer>
  );
}
