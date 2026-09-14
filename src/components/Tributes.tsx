"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Heart, Send, MessageCircle } from "lucide-react";

interface Tribute {
  id: string;
  name: string;
  message: string;
  relationship?: string;
  createdAt: string;
}

interface TributesProps {
  initialTributes?: Tribute[];
}

export default function Tributes({ initialTributes = [] }: TributesProps) {
  const [tributes, setTributes] = useState<Tribute[]>(initialTributes);
  const [totalCount, setTotalCount] = useState(initialTributes.length);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [relationship, setRelationship] = useState("");
  const [honeypot, setHoneypot] = useState(""); // spam trap
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  const fetchTributes = useCallback(async () => {
    try {
      const res = await fetch("/api/tributes");
      if (res.ok) {
        const data = await res.json();
        setTributes(data.tributes);
        setTotalCount(data.total);
      }
    } catch {
      // fail silently on fetch
    }
  }, []);

  useEffect(() => {
    fetchTributes();
  }, [fetchTributes]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Honeypot check
    if (honeypot) return;

    if (!name.trim() || !message.trim()) {
      setError("Please fill in your name and message.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/tributes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
          relationship: relationship.trim() || undefined,
          website: honeypot, // honeypot field
        }),
      });

      if (res.ok) {
        setName("");
        setMessage("");
        setRelationship("");
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        fetchTributes();
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const timeAgo = (dateStr: string) => {
    const seconds = Math.floor(
      (Date.now() - new Date(dateStr).getTime()) / 1000
    );
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section
      id="tributes"
      ref={sectionRef}
      className="section-hidden py-16 md:py-24"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12">
          <p
            className="text-xs uppercase tracking-[0.3em] font-medium mb-3"
            style={{ color: "var(--color-gold-dark)" }}
          >
            Tributes & Guestbook
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              Share a Memory
            </h2>

            {/* Total tributes badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold self-start sm:self-auto"
              style={{
                backgroundColor: "var(--color-champagne)",
                color: "var(--color-gold-dark)",
              }}
            >
              <MessageCircle size={16} />
              Total Tributes: {totalCount}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Tribute form */}
          <div>
            <p
              className="text-base mb-6 leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Leave a message, share a memory, or simply say how much he meant
              to you. Your words will be cherished by his family and friends.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Your Name <span style={{ color: "var(--color-gold-dark)" }}>*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  placeholder="Enter your name"
                  maxLength={100}
                  className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 outline-none"
                  style={{
                    backgroundColor: "var(--color-ivory)",
                    border: "1px solid var(--color-champagne)",
                    color: "var(--color-text-primary)",
                  }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Relationship{" "}
                  <span
                    className="text-xs font-normal"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    (optional)
                  </span>
                </label>
                <input
                  type="text"
                  value={relationship}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRelationship(e.target.value)}
                  placeholder="e.g. Friend, Colleague, Family"
                  maxLength={80}
                  className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 outline-none"
                  style={{
                    backgroundColor: "var(--color-ivory)",
                    border: "1px solid var(--color-champagne)",
                    color: "var(--color-text-primary)",
                  }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Your Message <span style={{ color: "var(--color-gold-dark)" }}>*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                  placeholder="Share your tribute..."
                  rows={5}
                  maxLength={2000}
                  className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 outline-none resize-none"
                  style={{
                    backgroundColor: "var(--color-ivory)",
                    border: "1px solid var(--color-champagne)",
                    color: "var(--color-text-primary)",
                  }}
                />
              </div>

              {/* Honeypot — hidden from real users */}
              <div className="hidden" aria-hidden={true}>
                <label>
                  Leave this field empty
                  <input
                    type="text"
                    value={honeypot}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              {error && (
                <p className="text-sm text-red-600 font-medium">{error}</p>
              )}

              {submitted && (
                <div
                  className="flex items-center gap-2 text-sm font-medium animate-fade-in px-4 py-3 rounded-xl"
                  style={{
                    backgroundColor: "rgba(212, 175, 55, 0.1)",
                    color: "var(--color-gold-dark)",
                  }}
                >
                  <Heart size={16} fill="currentColor" />
                  Thank you for your beautiful tribute.
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundColor: "var(--color-gold-dark)" }}
              >
                <Send size={16} />
                {submitting ? "Submitting..." : "Submit Tribute"}
              </button>
            </form>
          </div>

          {/* Tribute feed */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3
                className="font-[family-name:var(--font-heading)] text-xl font-bold"
                style={{ color: "var(--color-text-primary)" }}
              >
                Messages & Memories
              </h3>
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  backgroundColor: "var(--color-champagne)",
                  color: "var(--color-gold-dark)",
                }}
              >
                {tributes.length} {tributes.length === 1 ? "Tribute" : "Tributes"}
              </span>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {tributes.length === 0 ? (
                <div
                  className="text-center py-16 px-6 rounded-2xl"
                  style={{
                    backgroundColor: "var(--color-ivory)",
                    border: "1px solid var(--color-champagne)",
                  }}
                >
                  <Heart
                    size={36}
                    className="mx-auto mb-3 opacity-60"
                    style={{ color: "var(--color-gold)" }}
                  />
                  <p
                    className="font-[family-name:var(--font-heading)] text-lg font-medium"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    No tributes yet
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Be the first to share a cherished memory of Baba White.
                  </p>
                </div>
              ) : (
                tributes.map((tribute) => (
                  <div
                    key={tribute.id}
                    className="tribute-card rounded-2xl p-6"
                    style={{
                      backgroundColor: "var(--color-ivory)",
                      border: "1px solid var(--color-champagne)",
                    }}
                  >
                    {/* Author & Relationship & Time Header */}
                    <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span
                          className="font-[family-name:var(--font-heading)] font-bold text-base sm:text-lg"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          {tribute.name}
                        </span>
                        {tribute.relationship && (
                          <span
                            className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                            style={{
                              backgroundColor: "var(--color-champagne)",
                              color: "var(--color-gold-dark)",
                            }}
                          >
                            {tribute.relationship}
                          </span>
                        )}
                      </div>
                      <span
                        className="text-xs"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {timeAgo(tribute.createdAt)}
                      </span>
                    </div>

                    {/* Subtle hairline divider */}
                    <div
                      className="w-full h-[1px] mb-3"
                      style={{ backgroundColor: "var(--color-champagne)", opacity: 0.6 }}
                    />

                    {/* Message content */}
                    <p
                      className="text-sm sm:text-[15px] leading-relaxed"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      &ldquo;{tribute.message}&rdquo;
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
