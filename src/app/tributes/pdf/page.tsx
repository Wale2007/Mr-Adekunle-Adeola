import type { Metadata } from "next";
import TributesPdfView from "@/components/TributesPdfView";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Memorial Tributes Book (PDF) — Adekunle Stephen Adeola (Baba White)",
  description:
    "A complete printable memorial collection of tributes and memories honoring Adekunle Stephen Adeola (Baba White).",
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

export default async function TributesPdfPage() {
  let tributes = DEFAULT_TRIBUTES;

  try {
    const raw = await prisma.tribute.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (raw && raw.length > 0) {
      tributes = raw.map((t: any) => ({
        id: t.id,
        name: t.name,
        message: t.message,
        relationship: t.relationship,
        createdAt: t.createdAt.toISOString(),
      }));
    }
  } catch {
    // Fallback to default if DB is offline locally
  }

  return <TributesPdfView tributes={tributes} />;
}
