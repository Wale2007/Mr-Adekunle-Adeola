import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_FALLBACK_TRIBUTES = [
  {
    id: "seed-1",
    name: "Ola-salawu Olawale",
    relationship: "Friend",
    message:
      "A great man, a dear friend, and a true inspiration to all who had the privilege of knowing him. Your kindness, warmth, and legacy will live in our hearts forever. Rest in perfect peace, Baba White.",
    createdAt: new Date().toISOString(),
  },
];

// GET /api/tributes — Fetch all tributes, newest first
export async function GET() {
  try {
    let tributes = await prisma.tribute.findMany({
      orderBy: { createdAt: "desc" },
    });

    let total = await prisma.tribute.count();

    if (total === 0) {
      try {
        const seeded = await prisma.tribute.create({
          data: {
            name: "Ola-salawu Olawale",
            relationship: "Friend",
            message:
              "A great man, a dear friend, and a true inspiration to all who had the privilege of knowing him. Your kindness, warmth, and legacy will live in our hearts forever. Rest in perfect peace, Baba White.",
          },
        });
        tributes = [seeded];
        total = 1;
      } catch (seedErr) {
        console.warn("Auto-seed skipped:", seedErr);
        tributes = DEFAULT_FALLBACK_TRIBUTES;
        total = DEFAULT_FALLBACK_TRIBUTES.length;
      }
    }

    return NextResponse.json({
      tributes,
      total,
    });
  } catch (error) {
    console.error("Error fetching tributes from DB:", error);
    return NextResponse.json({
      tributes: DEFAULT_FALLBACK_TRIBUTES,
      total: DEFAULT_FALLBACK_TRIBUTES.length,
    });
  }
}

// POST /api/tributes — Create a new tribute
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, message, relationship, website } = body;

    // Honeypot spam check — bots fill this hidden field
    if (website) {
      // Silently accept to not tip off bots, but don't save
      return NextResponse.json({ success: true });
    }

    // Validate required fields
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    // Length limits
    if (name.trim().length > 100) {
      return NextResponse.json(
        { error: "Name is too long (max 100 characters)." },
        { status: 400 }
      );
    }

    if (message.trim().length > 2000) {
      return NextResponse.json(
        { error: "Message is too long (max 2000 characters)." },
        { status: 400 }
      );
    }

    // Simple sanitization — strip HTML tags
    const sanitize = (str: string) =>
      str.replace(/<[^>]*>/g, "").trim();

    const tribute = await prisma.tribute.create({
      data: {
        name: sanitize(name),
        message: sanitize(message),
        relationship:
          relationship && typeof relationship === "string"
            ? sanitize(relationship).slice(0, 80)
            : null,
      },
    });

    return NextResponse.json({ tribute, success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating tribute:", error);
    return NextResponse.json(
      { error: "Failed to submit tribute. Please try again." },
      { status: 500 }
    );
  }
}
