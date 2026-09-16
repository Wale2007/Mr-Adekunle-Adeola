import type { Metadata } from "next";
import Tributes from "@/components/Tributes";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Tributes & Fond Memories — Adekunle Stephen Adeola (Baba White)",
  description:
    "Read and share personal tributes, condolences, and cherished memories honoring the life and enduring legacy of Adekunle Stephen Adeola (Baba White).",
};

const DEFAULT_TRIBUTES = [
  {
    id: "seed-1",
    name: "Ola-salawu Olawale",
    relationship: "Friend",
    message:
      "A great man, a dear friend, and a true inspiration to all who had the privilege of knowing him. Your kindness, warmth, and legacy will live in our hearts forever. Rest in perfect peace, Baba White.",
    createdAt: new Date().toISOString(),
  },
];

export default async function TributesPage() {
  let initialTributes = DEFAULT_TRIBUTES;

  try {
    const rawTributes = await prisma.tribute.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (rawTributes && rawTributes.length > 0) {
      initialTributes = rawTributes.map((t: any) => ({
        id: t.id,
        name: t.name,
        message: t.message,
        relationship: t.relationship,
        createdAt: t.createdAt.toISOString(),
      }));
    }
  } catch {
    // fallback to default tribute
  }

  return (
    <>
      <main
        className="flex-1 min-h-screen pt-8 pb-16"
        style={{ backgroundColor: "var(--color-cream)" }}
      >
        <Tributes
          initialTributes={initialTributes}
          isDedicatedPage={true}
          showSeeAll={false}
        />
      </main>
      <Footer />
    </>
  );
}
