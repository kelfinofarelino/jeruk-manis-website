import type { Metadata } from "next";
import ServiceDetail from "@/components/ServiceDetail";

const data = {
  title: "Sweet 17 Specialist",
  tagline: "Rayakan Sweet Seventeen Paling Hype & Aesthetic!",
  description: "Spesialis Event Organizer yang fokus mewujudkan pesta Sweet Seventeen impianmu. Kami menangani segala tema kekinian (Y2K, Fairy, Coquette, Euphoria) dengan eksekusi detail, mulai dari dekorasi instagramable, MC seru, hingga rundown yang anti-garing.",
  image: "https://images.unsplash.com/photo-1530103862676-de3c9da59af7?q=80&w=800",
  benefits: [
     { title: "Tema Kekinian", desc: "Update tren TikTok/Pinterest terbaru. Apapun moodboard kamu, kita wujudkan." },
     { title: "All-in-One Service", desc: "Venue, dekor, MC, Dokumentasi, Hiburan, semua kami yang urus." },
     { title: "Rundown Seru", desc: "Jaminan acara tidak membosankan dengan games dan flow yang asik." },
     { title: "Budget Buddy", desc: "Konsultasi budget transparan tanpa biaya tersembunyi." }
  ],
  process: ["Konsultasi Tema & Budget", "Proposal & Moodboard", "Deal & DP", "Technical Meeting", "Show Time!"],
  pricing: [
      { name: "Intimate Party", price: "Start 3.5jt", features: ["Konsep Acara", "MC Profesional", "Dekorasi Backdrop Utama", "Dokumentasi Foto", "Crew Standby"] },
      { name: "Hype Celebration", price: "Start 7.5jt", features: ["Venue Recommendation", "Full Dekorasi Aesthetic", "MC & Live Music/DJ", "Foto + Video Cinematic", "MUA & Wardrobe"], recommended: true },
      { name: "Luxury Dream", price: "Start 15jt+", features: ["All in Hype Package", "Custom Gown Designer", "360 Video Booth", "Guest Star / Influencer", "Premium Venue Booking"] }
  ],
  addons: [
      { title: "360 Video Booth", price: "1.5jt" },
      { title: "MUA & Hair Do", price: "500rb" },
      { title: "Custom Invitation Web", price: "350rb" }
  ]
};

export const metadata: Metadata = {
  title: "Jasa EO Sweet 17 Jogja Terbaik & Aesthetic | Jerukmanis",
  description: "Wujudkan pesta sweet seventeen impianmu dengan tema kekinian (Y2K, Coquette). Paket dekorasi, MC, dan dokumentasi lengkap.",
  keywords: ["eo sweet 17 jogja", "party planner sleman", "paket ulang tahun 17"],
  openGraph: { title: data.title, description: data.description, images: [data.image] }
};

const jsonLd = { "@context": "https://schema.org", "@type": "EventPlanner", "name": data.title, "description": data.description, "provider": { "@type": "LocalBusiness", "name": "Jerukmanis Creative" } };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceDetail data={data} />
    </>
  );
}