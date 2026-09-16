import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    let tributes: any[] = [];
    try {
      tributes = await prisma.tribute.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch {
      // Fallback for local development if database is unreachable
      tributes = [
        {
          createdAt: new Date(),
          name: "Ola-salawu Olawale",
          relationship: "Friend",
          message:
            "A great man, a dear friend, and a true inspiration to all who had the privilege of knowing him. Your kindness, warmth, and legacy will live in our hearts forever. Rest in perfect peace, Baba White.",
        },
      ];
    }

    const escapeCsv = (val: string | null | undefined) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const formatDate = (date: Date) => {
      return date.toLocaleString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const headers = ["Date", "Name", "Relationship", "Message"].join(",");
    const rows = tributes.map((t: any) =>
      [
        escapeCsv(formatDate(new Date(t.createdAt))),
        escapeCsv(t.name),
        escapeCsv(t.relationship || "Not specified"),
        escapeCsv(t.message),
      ].join(",")
    );

    // UTF-8 BOM (\uFEFF) forces Microsoft Excel to open in clean columns with correct character encoding
    const csvContent = "\uFEFF" + [headers, ...rows].join("\r\n");

    return new Response(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="baba-white-tributes.csv"',
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Failed to export tributes" },
      { status: 500 }
    );
  }
}
