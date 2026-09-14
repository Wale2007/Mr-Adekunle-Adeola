"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Life Story", href: "#life-story" },
  { label: "Gallery", href: "#gallery" },
  { label: "Service Details", href: "#services" },
  { label: "Tributes", href: "#tributes" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isScrolled
          ? "rgba(253, 251, 247, 0.98)"
          : "rgba(253, 251, 247, 0.94)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--color-champagne)",
        boxShadow: isScrolled
          ? "0 4px 20px rgba(184, 134, 11, 0.08)"
          : "0 1px 4px rgba(184, 134, 11, 0.03)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center relative h-16 md:h-20">
          {/* Desktop nav — centered */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide transition-colors duration-200"
                style={{ color: "var(--color-text-secondary)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-gold-dark)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-secondary)")
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden absolute right-0 p-2 rounded-lg transition-colors"
            style={{ color: "var(--color-gold-dark)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden animate-slide-down border-t text-center"
          style={{
            backgroundColor: "var(--color-ivory)",
            borderColor: "var(--color-champagne)",
          }}
        >
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-2 text-sm font-medium transition-colors"
                style={{ color: "var(--color-text-secondary)" }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
