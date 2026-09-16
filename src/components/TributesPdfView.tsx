"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Printer, ArrowLeft, Heart, BookOpen, RefreshCw } from "lucide-react";

interface Tribute {
  id: string;
  name: string;
  message: string;
  relationship?: string | null;
  createdAt: string;
}

interface Props {
  tributes: Tribute[];
}

export default function TributesPdfView({ tributes }: Props) {
  const [tributesList, setTributesList] = useState<Tribute[]>(tributes);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLiveTributes = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/tributes?t=" + Date.now(), {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.tributes && Array.isArray(data.tributes)) {
          setTributesList(data.tributes);
        }
      }
    } catch {
      // keep existing tributes
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveTributes();
  }, [fetchLiveTributes]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#FAF6EE",
        color: "#2D1F0E",
        fontFamily: 'var(--font-body, "Plus Jakarta Sans", sans-serif)',
      }}
    >
      {/* =======================================================
          PRINT-ONLY CSS (Hides buttons, ensures perfect A4 margins)
          ======================================================= */}
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background-color: #ffffff !important;
            color: #1a1a1a !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .pdf-container {
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            background: transparent !important;
          }
          .tribute-entry {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
            border: 1px solid #e2c992 !important;
            background-color: #fdfbf7 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            margin-bottom: 18px !important;
          }
          .cover-section {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
            margin-bottom: 24px !important;
            padding-bottom: 20px !important;
          }
          @page {
            size: A4 portrait;
            margin: 15mm 15mm 15mm 15mm;
          }
        }
      `}</style>

      {/* =======================================================
          SCREEN-ONLY TOP ACTION BAR
          ======================================================= */}
      <header
        className="no-print sticky top-0 z-50 border-b shadow-sm"
        style={{
          backgroundColor: "#FDFBF7",
          borderColor: "#E8DCC8",
        }}
      >
        <div
          className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap"
        >
          <div className="flex items-center gap-3">
            <Link
              href="/tributes"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors duration-200"
              style={{
                backgroundColor: "#FAF6EE",
                color: "#6B5B3E",
                border: "1px solid #E8DCC8",
              }}
            >
              <ArrowLeft size={14} />
              Back to Memorial
            </Link>
            <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#9B8E7B" }}>
              <BookOpen size={14} style={{ color: "#B8860B" }} />
              <span>{tributesList.length} Tributes Recorded</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchLiveTributes}
              disabled={refreshing}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50"
              style={{
                backgroundColor: "#FAF6EE",
                color: "#6B5B3E",
                border: "1px solid #E8DCC8",
              }}
              title="Refresh with latest tributes"
            >
              <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
              {refreshing ? "Updating..." : "Refresh"}
            </button>

            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all duration-200 hover:scale-105 cursor-pointer"
              style={{
                backgroundColor: "#B8860B",
                color: "#ffffff",
                border: "1px solid #8C6212",
              }}
            >
              <Printer size={16} />
              Save as PDF / Print
            </button>
          </div>
        </div>

        {/* Informative Tip */}
        <div
          className="py-1.5 px-4 text-center text-xs border-t"
          style={{
            backgroundColor: "rgba(212, 175, 55, 0.08)",
            color: "#6B5B3E",
            borderColor: "rgba(232, 220, 200, 0.6)",
          }}
        >
          💡 <strong>How to save as PDF:</strong> Click <strong>&ldquo;Save as PDF / Print&rdquo;</strong>, select Destination: <em>&ldquo;Save as PDF&rdquo;</em>, and check <em>&ldquo;Background graphics&rdquo;</em>.
        </div>
      </header>

      {/* =======================================================
          PRINTABLE MEMORIAL BOOK CONTENT
          ======================================================= */}
      <main className="pdf-container max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Cover Header */}
        <section
          className="cover-section text-center mb-10 pb-8 border-b"
          style={{ borderColor: "#E8DCC8" }}
        >
          {/* Portrait in Gold Frame */}
          <div
            className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-5 rounded-full overflow-hidden shadow-lg"
            style={{
              border: "4px solid #D4AF37",
              boxShadow: "0 8px 24px rgba(184, 134, 11, 0.2)",
            }}
          >
            <Image
              src="/images/baba-white-regal-navy.jpg"
              alt="Adekunle Stephen Adeola (Baba White)"
              width={160}
              height={160}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          <span
            className="inline-block text-xs uppercase tracking-[0.25em] font-bold mb-2"
            style={{ color: "#B8860B" }}
          >
            In Loving Memory & Celebration of
          </span>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 tracking-tight"
            style={{
              fontFamily: 'var(--font-heading, "Playfair Display", Georgia, serif)',
              color: "#2D1F0E",
            }}
          >
            Adekunle Stephen Adeola
          </h1>

          <p
            className="text-lg sm:text-xl font-medium mb-3 italic"
            style={{
              fontFamily: 'var(--font-heading, "Playfair Display", Georgia, serif)',
              color: "#B8860B",
            }}
          >
            &ldquo;Baba White&rdquo;
          </p>

          <p
            className="text-sm sm:text-base font-semibold mb-4 tracking-wide"
            style={{ color: "#6B5B3E" }}
          >
            August 24, 1970 &mdash; September 9, 2026
          </p>

          {/* Scripture */}
          <div
            className="max-w-xl mx-auto px-5 py-3 rounded-xl mb-4"
            style={{
              backgroundColor: "#FDFBF7",
              border: "1px solid #E8DCC8",
            }}
          >
            <p
              className="italic text-xs sm:text-sm leading-relaxed"
              style={{
                fontFamily: 'var(--font-heading, "Playfair Display", Georgia, serif)',
                color: "#6B5B3E",
              }}
            >
              &ldquo;Precious in the sight of the Lord is the death of his faithful servants.&rdquo;
            </p>
            <p
              className="text-[11px] font-bold mt-1 uppercase tracking-wider"
              style={{ color: "#B8860B" }}
            >
              &mdash; Psalm 116:15
            </p>
          </div>

          <p
            className="text-xs sm:text-sm font-medium"
            style={{ color: "#9B8E7B" }}
          >
            A Complete Collection of Cherished Tributes & Condolences ({tributesList.length} Messages)
          </p>
        </section>

        {/* Tributes List */}
        <section className="space-y-5">
          {tributesList.map((tribute, idx) => (
            <article
              key={tribute.id || idx}
              className="tribute-entry rounded-2xl p-5 sm:p-7 shadow-sm transition-all"
              style={{
                backgroundColor: "#FDFBF7",
                border: "1px solid #E8DCC8",
              }}
            >
              {/* Header: Author + Relationship + Date */}
              <div
                className="flex items-start sm:items-center justify-between gap-2.5 flex-wrap mb-3.5"
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
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: "rgba(184, 134, 11, 0.12)",
                      color: "#B8860B",
                      fontSize: "11px",
                    }}
                  >
                    #{idx + 1}
                  </span>

                  <h2
                    className="font-bold text-base sm:text-lg break-words"
                    style={{
                      fontFamily: 'var(--font-heading, "Playfair Display", Georgia, serif)',
                      color: "#2D1F0E",
                      wordBreak: "break-word",
                      lineHeight: "1.3",
                    }}
                  >
                    {tribute.name}
                  </h2>

                  {tribute.relationship && (
                    <span
                      className="text-xs font-medium rounded-full shrink-0"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "2px 10px",
                        backgroundColor: "#E8DCC8",
                        color: "#B8860B",
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
                    color: "#9B8E7B",
                    fontSize: "11px",
                    whiteSpace: "nowrap",
                    marginLeft: "auto",
                  }}
                >
                  {formatDate(tribute.createdAt)}
                </span>
              </div>

              {/* Gold Hairline Divider */}
              <div
                className="w-full h-[1px] mb-3.5"
                style={{ backgroundColor: "#E8DCC8", opacity: 0.7 }}
              />

              {/* Message Content with full paragraph formatting */}
              <p
                className="text-sm sm:text-base leading-relaxed break-words"
                style={{
                  color: "#3D2B1F",
                  whiteSpace: "pre-line",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  lineHeight: "1.7",
                }}
              >
                &ldquo;{tribute.message}&rdquo;
              </p>
            </article>
          ))}
        </section>

        {/* Document End / Memorial Closing */}
        <footer
          className="text-center mt-12 pt-8 border-t"
          style={{ borderColor: "#E8DCC8" }}
        >
          <Heart
            size={22}
            className="mx-auto mb-2 opacity-70"
            style={{ color: "#D4AF37" }}
          />
          <p
            className="font-bold text-sm sm:text-base"
            style={{
              fontFamily: 'var(--font-heading, "Playfair Display", Georgia, serif)',
              color: "#2D1F0E",
            }}
          >
            Adekunle Stephen Adeola (Baba White)
          </p>
          <p className="text-xs mt-1" style={{ color: "#9B8E7B" }}>
            August 24, 1970 &mdash; September 9, 2026 &bull; Forever In Our Hearts
          </p>
          <p className="text-[11px] mt-1 opacity-60" style={{ color: "#9B8E7B" }}>
            Online Memorial & Guestbook: https://mradeola.vercel.app
          </p>
        </footer>
      </main>
    </div>
  );
}
