"use client";

import Image from "next/image";
import Link from "next/link";

export default function PrintTributeCard() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print-page-wrapper">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap");

        :root {
          --color-ivory: #fdfbf7;
          --color-cream: #faf6ee;
          --color-champagne: #e8dcc8;
          --color-gold: #d4af37;
          --color-gold-dark: #b8860b;
          --color-text-primary: #2d1f0e;
          --color-text-secondary: #6b5b3e;
          --color-text-muted: #9b8e7b;
        }

        .print-page-wrapper {
          min-height: 100vh;
          background-color: #e5e5e5;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: "Plus Jakarta Sans", sans-serif;
          color: var(--color-text-primary);
        }

        .a4-sheet {
          width: 210mm;
          min-height: 297mm;
          height: 297mm;
          background-color: var(--color-ivory);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          position: relative;
          padding: 16mm 16mm;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }

        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          body, html {
            background: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .print-toolbar {
            display: none !important;
          }
          .print-page-wrapper {
            background: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .a4-sheet {
            box-shadow: none !important;
            width: 210mm !important;
            height: 297mm !important;
            max-height: 297mm !important;
            padding: 14mm 14mm !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      {/* Floating Action Toolbar (Screen only) */}
      <div className="print-toolbar mb-6 flex items-center gap-4 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-champagne sticky top-4 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Website
        </Link>
        <div className="w-[1px] h-5 bg-stone-300" />
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-white text-sm font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
          style={{ backgroundColor: "var(--color-gold-dark)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          Print / Save as PDF
        </button>
        <span className="text-xs text-stone-500 hidden sm:inline">
          (Format: A4 Portrait, Margins: None)
        </span>
      </div>

      {/* A4 Sheet Container */}
      <div className="a4-sheet">
        {/* Ornate Outer Border */}
        <div
          className="absolute inset-[8mm] pointer-events-none"
          style={{
            border: "2px solid var(--color-gold)",
            borderRadius: "8px",
          }}
        >
          {/* Inner Accent Line */}
          <div
            className="absolute inset-[3mm]"
            style={{
              border: "1px solid var(--color-champagne)",
              borderRadius: "4px",
            }}
          />

          {/* Elegant Corner Florets */}
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-amber-600 rotate-45" />
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-amber-600 rotate-45" />
          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-amber-600 rotate-45" />
          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-amber-600 rotate-45" />
        </div>

        {/* TOP HEADER SECTION */}
        <div className="relative text-center pt-3 pb-2 z-10">
          <p
            className="text-[12px] uppercase tracking-[0.35em] font-semibold mb-2"
            style={{ color: "var(--color-gold-dark)" }}
          >
            In Loving Memory of
          </p>

          <h1
            className="text-[34px] font-bold leading-tight mb-1"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "var(--color-text-primary)",
            }}
          >
            Adekunle Stephen Adeola
          </h1>

          <p
            className="text-[26px] italic mb-2"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "var(--color-gold-dark)",
            }}
          >
            &ldquo;Baba White&rdquo;
          </p>

          <p
            className="text-[14px] font-medium tracking-wider"
            style={{ color: "var(--color-text-secondary)" }}
          >
            August 24, 1970 &nbsp;&mdash;&nbsp; September 9, 2026
          </p>

          {/* Ornamental Divider */}
          <div className="flex items-center justify-center gap-3 my-3">
            <div
              className="w-24 h-[1px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--color-gold))",
              }}
            />
            <span
              className="text-[14px]"
              style={{ color: "var(--color-gold-dark)" }}
            >
              ✦
            </span>
            <div
              className="w-24 h-[1px]"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-gold), transparent)",
              }}
            />
          </div>

          <p
            className="text-[17px] italic"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "var(--color-gold-dark)",
            }}
          >
            Celebrating a Life of Grace, Faith &amp; Impact
          </p>
        </div>

        {/* MIDDLE SIDE-BY-SIDE SHOWCASE */}
        <div className="relative grid grid-cols-2 gap-8 items-center px-4 my-auto z-10">
          {/* Portrait Photo */}
          <div className="flex flex-col items-center">
            <div
              className="relative p-2.5 rounded-2xl shadow-xl"
              style={{
                backgroundColor: "var(--color-cream)",
                border: "2px solid var(--color-gold)",
              }}
            >
              {/* Inner frame */}
              <div className="relative w-[68mm] h-[86mm] rounded-xl overflow-hidden shadow-inner">
                <Image
                  src="/images/baba-white-regal-navy.jpg"
                  alt="Adekunle Stephen Adeola (Baba White)"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
            <p
              className="text-[12px] italic mt-2.5 font-medium tracking-wide"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: "var(--color-text-secondary)",
              }}
            >
              Forever Cherished In Our Hearts
            </p>
          </div>

          {/* QR Code & Call to Action */}
          <div className="flex flex-col items-center text-center">
            <div
              className="p-4 rounded-2xl shadow-xl flex flex-col items-center"
              style={{
                backgroundColor: "#ffffff",
                border: "2px solid var(--color-gold)",
              }}
            >
              <div className="relative w-[52mm] h-[52mm] mb-2">
                <Image
                  src="/images/tribute-qr-code.png"
                  alt="Scan to write tribute"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div
                className="px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase text-white shadow-sm"
                style={{ backgroundColor: "var(--color-gold-dark)" }}
              >
                Scan with Phone Camera
              </div>
            </div>

            <h3
              className="text-[17px] font-bold mt-4 mb-1"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "var(--color-text-primary)",
              }}
            >
              Leave a Memorial Tribute
            </h3>

            <p
              className="text-[12px] leading-relaxed max-w-[62mm]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Point your phone camera at the QR code to view his memorial, share
              your cherished memories, prayers, and tributes.
            </p>

            <div
              className="mt-3 px-3.5 py-1 rounded-lg text-[12px] font-semibold tracking-wide"
              style={{
                backgroundColor: "var(--color-cream)",
                border: "1px solid var(--color-champagne)",
                color: "var(--color-gold-dark)",
              }}
            >
              mradeola.vercel.app
            </div>
          </div>
        </div>

        {/* BOTTOM FOOTER SECTION */}
        <div className="relative text-center pb-3 z-10">
          <div className="flex items-center justify-center gap-3 my-2">
            <div
              className="w-32 h-[1px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--color-champagne))",
              }}
            />
            <span
              className="text-[12px]"
              style={{ color: "var(--color-gold)" }}
            >
              ✤
            </span>
            <div
              className="w-32 h-[1px]"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-champagne), transparent)",
              }}
            />
          </div>

          <p
            className="text-[13px] font-medium tracking-wide"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "var(--color-text-secondary)",
            }}
          >
            &ldquo;A life that touches others goes on forever.&rdquo;
          </p>
          <p
            className="text-[10px] uppercase tracking-[0.25em] font-semibold mt-1"
            style={{ color: "var(--color-gold-dark)" }}
          >
            The Adeola Family &bull; Funeral &amp; Memorial Celebrations 2026
          </p>
        </div>
      </div>
    </div>
  );
}
