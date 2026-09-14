"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/* =============================================
   GALLERY PHOTOS — Add or remove photos here.
   Place image files in /public/images/
   ============================================= */
const GALLERY_PHOTOS = [
  {
    src: "/images/baba-white-regal-navy.jpg",
    alt: "Baba White in his distinguished navy agbada with fila cap",
    caption: "A man of elegance",
  },
  {
    src: "/images/baba-white-pulpit.jpg",
    alt: "Baba White speaking at church in blue native attire",
    caption: "A man of faith and ministry",
  },
  {
    src: "/images/baba-white-50th-birthday.jpg",
    alt: "Baba White celebrating his 50th birthday with his wife",
    caption: "50th birthday celebration with family",
  },
  {
    src: "/images/baba-white-smile-glasses.jpg",
    alt: "Baba White smiling in dark agbada with sunglasses",
    caption: "That warm, memorable smile",
  },
  {
    src: "/images/baba-white-red-cap.jpg",
    alt: "Baba White in blue adire with red cap",
    caption: "Adorned in tradition",
  },
  {
    src: "/images/baba-white-plaid-tie.jpg",
    alt: "Baba White in plaid shirt and tie",
    caption: "A gentleman in every way",
  },
  {
    src: "/images/baba-white-bass-guitar.jpg",
    alt: "Baba White playing bass guitar during praise and worship",
    caption: "Praising God with the bass guitar",
  },
];

export default function PhotoGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev + 1) % GALLERY_PHOTOS.length);
      if (e.key === "ArrowLeft") setCurrentIndex((prev) => (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="section-hidden py-16 md:py-24"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-10">
          <p
            className="text-xs uppercase tracking-[0.3em] font-medium mb-3"
            style={{ color: "var(--color-gold-dark)" }}
          >
            Photo Gallery
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2
                className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-bold"
                style={{ color: "var(--color-text-primary)" }}
              >
                Moments of a Beautiful Life
              </h2>
              <p
                className="text-base mt-2"
                style={{ color: "var(--color-text-muted)" }}
              >
                A collection of cherished memories
              </p>
            </div>
          </div>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {/* Featured large photo */}
          <div
            className="gallery-image col-span-2 row-span-2 relative aspect-[3/4] cursor-pointer"
            onClick={() => openLightbox(0)}
          >
            <Image
              src={GALLERY_PHOTOS[0].src}
              alt={GALLERY_PHOTOS[0].alt}
              fill
              className="object-cover rounded-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300">
              <p className="absolute bottom-4 left-4 text-white text-sm font-medium">
                {GALLERY_PHOTOS[0].caption}
              </p>
            </div>
          </div>

          {/* Remaining photos */}
          {GALLERY_PHOTOS.slice(1).map((photo, idx) => (
            <div
              key={idx}
              className="gallery-image relative aspect-square cursor-pointer"
              onClick={() => openLightbox(idx + 1)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300">
                <p className="absolute bottom-3 left-3 text-white text-xs font-medium">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>

            {/* Image */}
            <div className="relative w-full h-[75vh]">
              <Image
                src={GALLERY_PHOTOS[currentIndex].src}
                alt={GALLERY_PHOTOS[currentIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Caption */}
            <p className="text-center text-white/90 text-sm mt-4 font-medium">
              {GALLERY_PHOTOS[currentIndex].caption}
            </p>
            <p className="text-center text-white/50 text-xs mt-1">
              {currentIndex + 1} / {GALLERY_PHOTOS.length}
            </p>

            {/* Navigation */}
            <button
              onClick={() =>
                setCurrentIndex(
                  (currentIndex - 1 + GALLERY_PHOTOS.length) %
                    GALLERY_PHOTOS.length
                )
              }
              className="absolute top-1/2 -translate-y-1/2 left-2 md:-left-12 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() =>
                setCurrentIndex(
                  (currentIndex + 1) % GALLERY_PHOTOS.length
                )
              }
              className="absolute top-1/2 -translate-y-1/2 right-2 md:-right-12 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
