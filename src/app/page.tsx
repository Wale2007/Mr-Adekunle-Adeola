import Hero from "@/components/Hero";
import LifeStory from "@/components/LifeStory";
import PhotoGallery from "@/components/PhotoGallery";
import ServiceDetails from "@/components/ServiceDetails";
import Tributes from "@/components/Tributes";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

export default async function Home() {
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
      <main className="flex-1">
        <Hero />
        <LifeStory />
        <PhotoGallery />
        <ServiceDetails />
        <Tributes initialTributes={initialTributes} />
      </main>
      <Footer />
    </>
  );
}
