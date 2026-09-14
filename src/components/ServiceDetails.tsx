"use client";

import { useEffect, useRef } from "react";
import { Music, Cross, MapPin, Calendar, Clock, ExternalLink } from "lucide-react";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/JCCI+House+of+Grace+Baptist+Boys+High+School+Oke+Saje+Abeokuta";

const services = [
  {
    icon: Music,
    iconBg: "var(--color-gold-light)",
    iconColor: "var(--color-gold-dark)",
    title: "Service of Songs",
    date: "September 17, 2026",
    time: "4:00 PM",
    note: null,
  },
  {
    icon: Cross,
    iconBg: "var(--color-gold-light)",
    iconColor: "var(--color-gold-dark)",
    title: "Funeral Service",
    date: "September 18, 2026",
    time: "10:00 AM",
    note: "Followed immediately by Interment Service at his home.",
  },
  {
    icon: MapPin,
    iconBg: "var(--color-gold-light)",
    iconColor: "var(--color-gold-dark)",
    title: "Venue",
    venue: "JCCI House of Grace,",
    address: "Beside Baptist Boys High School, Oke Saje, Abeokuta",
    showDirections: true,
  },
];

export default function ServiceDetails() {
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
      id="services"
      ref={sectionRef}
      className="section-hidden py-16 md:py-24"
      style={{ backgroundColor: "var(--color-ivory)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12">
          <p
            className="text-xs uppercase tracking-[0.3em] font-medium mb-3"
            style={{ color: "var(--color-gold-dark)" }}
          >
            Service Details &mdash;
          </p>
          <h2
            className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-bold"
            style={{ color: "var(--color-text-primary)" }}
          >
            Join Us in Celebrating His Life
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Service cards */}
          {services.map((service, idx) => (
            <div key={idx} className="service-card flex flex-col">
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                style={{ backgroundColor: service.iconBg }}
              >
                <service.icon
                  size={22}
                  style={{ color: service.iconColor }}
                />
              </div>

              <h3
                className="font-[family-name:var(--font-heading)] text-xl font-bold mb-3"
                style={{ color: "var(--color-text-primary)" }}
              >
                {service.title}
              </h3>

              {"date" in service && service.date && (
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <Calendar
                      size={14}
                      style={{ color: "var(--color-gold-dark)" }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {service.date}
                    </span>
                  </div>
                  {"time" in service && service.time && (
                    <div className="flex items-center gap-2">
                      <Clock
                        size={14}
                        style={{ color: "var(--color-gold-dark)" }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {service.time}
                      </span>
                    </div>
                  )}
                  {"note" in service && service.note && (
                    <p
                      className="text-xs mt-3 italic leading-relaxed"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {service.note}
                    </p>
                  )}
                </div>
              )}

              {"venue" in service && (
                <div className="flex-1">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {service.venue}
                  </p>
                  <p
                    className="text-sm mt-1"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {service.address}
                  </p>

                  {"showDirections" in service && service.showDirections && (
                    <a
                      href={GOOGLE_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full text-white text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      style={{ backgroundColor: "var(--color-gold-dark)" }}
                    >
                      <MapPin size={14} />
                      Get Directions
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Inspirational quote card */}
          <div
            className="service-card flex flex-col items-center justify-center text-center relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, var(--color-cream), var(--color-champagne))`,
            }}
          >
            <div className="relative z-10">
              <p
                className="font-[family-name:var(--font-accent)] text-2xl md:text-3xl italic leading-snug"
                style={{ color: "var(--color-gold-dark)" }}
              >
                A life well lived
              </p>
              <p
                className="font-[family-name:var(--font-accent)] text-2xl md:text-3xl italic leading-snug"
                style={{ color: "var(--color-gold-dark)" }}
              >
                is a legacy forever.
              </p>
            </div>
            {/* Subtle decorative gold circle */}
            <div
              className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-10"
              style={{ backgroundColor: "var(--color-gold)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
