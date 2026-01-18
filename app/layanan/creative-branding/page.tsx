import type { Metadata } from "next";
import ServiceDetail from "@/components/ServiceDetail";

const data = {
  title: "Creative Branding",
  tagline: "Bangun Identitas Visual yang Kuat & Menjual",
  description: "Bantu bisnismu tampil beda dan profesional. Kami menyediakan jasa desain logo, identitas visual, hingga manajemen konten media sosial yang strategis dan estetik.",
  image: "https://images.unsplash.com/photo-1626785774573-4b799312afc2?q=80&w=800",
  benefits: [
      { title: "Original Design", desc: "Desain murni dari nol, bukan template pasaran." },
      { title: "Market Oriented", desc: "Desain disesuaikan dengan target pasar dan psikologi warna." },
      { title: "Full Source File", desc: "Dapat file master (AI/EPS/PSD) untuk kebutuhan cetak masa depan." },
      { title: "Revisi Friendly", desc: "Sistem revisi yang jelas dan fleksibel sampai cocok." }
  ],
  process: ["Research & Brainstorm", "Sketching & Concept", "Digitalization", "Finalization"],
  pricing: [
      { name: "Logo Starter", price: "500rb", features: ["2 Opsi Desain Logo", "Filosofi Logo", "Master File (PNG/JPG/PDF)", "2x Revisi Mayor"] },
      { name: "Brand Identity", price: "1.5jt", features: ["3 Opsi Logo", "Brand Guidelines (Book)", "Kartu Nama & Kop Surat", "Mockup Visual"], recommended: true },
      { name: "Socmed Manage", price: "2jt/bln", features: ["12 Feed Design", "Copywriting & Caption", "Hashtag Strategy", "Admin Posting"] }
  ],
  addons: [
      { title: "Desain Kemasan/Packaging", price: "Start 300rb" },
      { title: "Desain Company Profile", price: "500rb" },
      { title: "Reels Content Creator", price: "Start 150rb/video" }
  ]
};

export const metadata: Metadata = {
  title: "Jasa Desain Logo & Social Media Management Jogja | Jerukmanis",
  description: "Bantu bisnismu tampil beda dengan desain logo profesional dan pengelolaan konten sosmed yang strategis.",
  keywords: ["jasa desain logo jogja", "social media management", "branding identity"],
  openGraph: { title: data.title, description: data.description, images: [data.image] }
};

const jsonLd = { "@context": "https://schema.org", "@type": "Service", "name": data.title, "description": data.description, "provider": { "@type": "LocalBusiness", "name": "Jerukmanis Creative" } };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServiceDetail data={data} />
    </>
  );
}