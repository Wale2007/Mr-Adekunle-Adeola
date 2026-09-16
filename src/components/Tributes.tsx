"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Heart, Send, MessageCircle, ChevronLeft, ChevronRight, ArrowLeft, Printer } from "lucide-react";

interface Tribute {
  id: string;
  name: string;
  message: string;
  relationship?: string;
  createdAt: string;
}

interface TributesProps {
  initialTributes?: Tribute[];
  showSeeAll?: boolean;
  isDedicatedPage?: boolean;
}

export default function Tributes({
  initialTributes = [],
  showSeeAll = true,
  isDedicatedPage = false,
}: TributesProps) {
  const [tributes, setTributes] = useState<Tribute[]>(initialTributes);
  const [totalCount, setTotalCount] = useState(initialTributes.length);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 5;
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
      const res = await fetch("/api/tributes?t=" + Date.now(), {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.tributes) {
          setTributes(data.tributes);
          setTotalCount(data.total);
        }
      }
    } catch {
      // fail silently on fetch
    }
  }, []);

  useEffect(() => {
    fetchTributes();
    // Live polling: automatically checks for newly submitted tributes every 8 seconds
    const interval = setInterval(fetchTributes, 8000);
    return () => clearInterval(interval);
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
        setCurrentPage(1);
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
        {/* Back link on dedicated page */}
        {isDedicatedPage && (
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: "var(--color-ivory)",
                color: "var(--color-gold-dark)",
                border: "1px solid var(--color-champagne)",
                boxShadow: "0 2px 8px rgba(184, 134, 11, 0.05)",
              }}
            >
              <ArrowLeft size={16} />
              Back to Memorial Home
            </Link>
          </div>
        )}

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
              {isDedicatedPage ? "All Tributes & Memories" : "Share a Memory"}
            </h2>

            {/* Total tributes badge & PDF button */}
            <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-auto">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  backgroundColor: "var(--color-champagne)",
                  color: "var(--color-gold-dark)",
                }}
              >
                <MessageCircle size={16} />
                Total Tributes: {totalCount}
              </div>

              <Link
                href="/tributes/pdf"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: "rgba(212, 175, 55, 0.12)",
                  color: "var(--color-gold-dark)",
                  border: "1px solid var(--color-gold)",
                }}
                title="View and download all tributes in a printer-ready PDF book"
              >
                <Printer size={15} />
                Save / Print as PDF
              </Link>
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
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h3
                className="font-[family-name:var(--font-heading)] text-xl font-bold"
                style={{ color: "var(--color-text-primary)" }}
              >
                Messages & Memories
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: "var(--color-champagne)",
                    color: "var(--color-gold-dark)",
                  }}
                >
                  {tributes.length} {tributes.length === 1 ? "Tribute" : "Tributes"}
                </span>
                {showSeeAll && (
                  <Link
                    href="/tributes"
                    className="inline-flex items-center gap-1 text-xs font-semibold px-3.5 py-1 rounded-full transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: "rgba(212, 175, 55, 0.12)",
                      color: "var(--color-gold-dark)",
                      border: "1px solid var(--color-champagne)",
                    }}
                  >
                    See All Tributes &rarr;
                  </Link>
                )}
              </div>
            </div>

            {/* Tribute cards container */}
            <div className="space-y-4 max-h-[640px] overflow-y-auto pr-1">
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
                tributes
                  .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                  .map((tribute) => (
                    <div
                      key={tribute.id}
                      className="tribute-card rounded-2xl p-6"
                      style={{
                        backgroundColor: "var(--color-ivory)",
                        border: "1px solid var(--color-champagne)",
                      }}
                    >
                      {/* Author & Relationship & Time Header */}
                      <div
                        className="flex items-start sm:items-center justify-between gap-2.5 flex-wrap mb-3"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "8px 12px",
                          flexWrap: "wrap",
                        }}
                      >
                        <div
                          className="flex items-center gap-2.5 flex-wrap min-w-0"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px 10px",
                            flexWrap: "wrap",
                            minWidth: 0,
                          }}
                        >
                          <span
                            className="font-bold text-base sm:text-lg break-words"
                            style={{
                              fontFamily: "var(--font-heading)",
                              color: "var(--color-text-primary)",
                              wordBreak: "break-word",
                              overflowWrap: "break-word",
                              lineHeight: "1.3",
                            }}
                          >
                            {tribute.name}
                          </span>
                          {tribute.relationship && (
                            <span
                              className="text-xs font-medium rounded-full shrink-0"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                padding: "2px 10px",
                                backgroundColor: "var(--color-champagne)",
                                color: "var(--color-gold-dark)",
                                flexShrink: 0,
                                whiteSpace: "nowrap",
                                fontSize: "11px",
                                fontWeight: 600,
                                lineHeight: "1.4",
                              }}
                            >
                              {tribute.relationship}
                            </span>
                          )}
                        </div>
                        <span
                          className="text-xs shrink-0"
                          style={{
                            color: "var(--color-text-muted)",
                            flexShrink: 0,
                            whiteSpace: "nowrap",
                            fontSize: "12px",
                          }}
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
                        className="text-sm sm:text-[15px] leading-relaxed whitespace-pre-line break-words"
                        style={{
                          color: "var(--color-text-secondary)",
                          whiteSpace: "pre-line",
                          wordBreak: "break-word",
                          overflowWrap: "break-word",
                          lineHeight: "1.65",
                        }}
                      >
                        &ldquo;{tribute.message}&rdquo;
                      </p>
                    </div>
                  ))
              )}
            </div>

            {/* Pagination controls in groups of 5 */}
            {Math.ceil(tributes.length / PAGE_SIZE) > 1 && (
              <div
                className="mt-5 pt-4 flex items-center justify-between flex-wrap gap-3 border-t"
                style={{ borderColor: "var(--color-champagne)" }}
              >
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Showing {(currentPage - 1) * PAGE_SIZE + 1}–
                  {Math.min(currentPage * PAGE_SIZE, tributes.length)} of{" "}
                  {tributes.length}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: "var(--color-ivory)",
                      color: "var(--color-text-primary)",
                      border: "1px solid var(--color-champagne)",
                    }}
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={14} />
                    Prev
                  </button>

                  {Array.from(
                    { length: Math.ceil(tributes.length / PAGE_SIZE) },
                    (_, i) => i + 1
                  ).map((pageNum) => {
                    const totalPages = Math.ceil(tributes.length / PAGE_SIZE);
                    if (
                      totalPages > 6 &&
                      pageNum !== 1 &&
                      pageNum !== totalPages &&
                      Math.abs(pageNum - currentPage) > 1
                    ) {
                      if (pageNum === 2 || pageNum === totalPages - 1) {
                        return (
                          <span
                            key={pageNum}
                            className="text-xs px-1"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    }

                    const isCurrent = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-all duration-200"
                        style={{
                          backgroundColor: isCurrent
                            ? "var(--color-gold-dark)"
                            : "var(--color-ivory)",
                          color: isCurrent ? "#ffffff" : "var(--color-text-primary)",
                          border: `1px solid ${
                            isCurrent
                              ? "var(--color-gold-dark)"
                              : "var(--color-champagne)"
                          }`,
                        }}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    disabled={
                      currentPage === Math.ceil(tributes.length / PAGE_SIZE)
                    }
                    onClick={() =>
                      setCurrentPage((p) =>
                        Math.min(p + 1, Math.ceil(tributes.length / PAGE_SIZE))
                      )
                    }
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: "var(--color-ivory)",
                      color: "var(--color-text-primary)",
                      border: "1px solid var(--color-champagne)",
                    }}
                    aria-label="Next page"
                  >
                    Next
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
