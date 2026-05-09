import type { Metadata } from "next";
import ServiceDetail from "@/components/ServiceDetail";

const data = {
  title: "Visual Production",
  tagline: "Abadikan Momen Spesial dengan Tone Estetik",
  description: "Layanan dokumentasi foto dan video profesional dengan sentuhan artistik. Kami tidak hanya mengambil gambar, tapi bercerita melalui lensa. Cocok untuk Wedding, Prewedding, Wisuda, hingga Event Perusahaan.",
  image: "/images/hero1.jpg",
  benefits: [
      { title: "Tone Estetik", desc: "Color grading signature Jerukmanis yang warm, moody, dan timeless." },
      { title: "Gear Pro", desc: "Sony Alpha Series 4K & Drone DJI Terbaru." },
      { title: "Fast Delivery", desc: "Preview foto H+1, hasil full edited maksimal 7 hari kerja." },
      { title: "Backup Aman", desc: "Penyimpanan ganda (Cloud & Harddisk) agar file aman selamanya." }
  ],
  process: ["Briefing Konsep", "Shooting Day", "Editing & Grading", "Final Delivery"],
  pricing: [
      { name: "Photo Session", price: "800rb", features: ["1 Fotografer", "2 Jam Photoshoot", "50 Edited Photos", "All Raw Files (Google Drive)"] },
      { name: "Social Content", price: "1.2jt", features: ["3 Video TikTok/Reels Review", "Talent", "Editing", "Content Brief Strategy"] },
      { name: "Cinema Package", price: "1.8jt", features: ["1 Fotografer + 1 Videografer", "6 Jam Kerja", "Teaser 1 Menit (Reels)", "Cinematic Video 3-5 Menit"], recommended: true },
      { name: "Commercial Ads", price: "2.5jt", features: ["Production Strategy & Script", "Color Grading Premium", "Commercial Usage Rights", "High-Quality Audio Mix"], recommended: true },
      { name: "Event Highlight", price: "3jt", features: ["2 Fotografer + 1 Videografer", "Full Documentation Archive", "Highlight Video (2-3 Menit)", "Fast Upload Asset"], recommended: true },
      { name: "Full Wedding", price: "3.5jt", features: ["2 Fotografer + 1 Videografer", "Full Day Coverage", "Cetak Album Magazine", "Drone Footage"] }
  ],
  addons: [
      { title: "Drone Footage", price: "750rb" },
      { title: "Cetak Album Magazine", price: "850rb" },
      { title: "Same Day Edit (SDE)", price: "1jt" }
  ]
};

export const metadata: Metadata = {
  title: "Jasa Fotografer & Videografer Jogja Cinematic | Jerukmanis",
  description: "Jasa dokumentasi foto video profesional untuk wedding, wisuda, dan event. Hasil tone estetik, cepat, dan kualitas HD.",
  keywords: ["jasa fotografer jogja", "videografer cinematic", "foto wisuda jogja"],
  openGraph: { title: data.title, description: data.description, images: [data.image] }
};

const jsonLd = { "@context": "https://schema.org", "@type": "ProfessionalService", "name": data.title, "description": data.description, "provider": { "@type": "LocalBusiness", "name": "Jerukmanis Creative" } };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceDetail data={data} />
    </>
  );
}