import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing tributes
  await prisma.tribute.deleteMany({});

  // Seed with one tribute from Ola-salawu Olawale
  await prisma.tribute.create({
    data: {
      name: "Ola-salawu Olawale",
      message:
        "A great man, a dear friend, and a true inspiration to all who had the privilege of knowing him. Your kindness, warmth, and legacy will live in our hearts forever. Rest in perfect peace, Baba White.",
      relationship: "Friend",
    },
  });

  console.log("✅ Seeded tribute from Ola-salawu Olawale.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
