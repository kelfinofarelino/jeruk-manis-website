import type { Metadata } from "next";
import ServiceDetail from "@/components/ServiceDetail";

const data = {
  title: "Professional Live Streaming",
  tagline: "Siarkan Acara Secara Live ke Seluruh Dunia",
  description: "Layanan jasa live streaming multi-kamera untuk Webinar, Talkshow, Pernikahan (Akad/Resepsi), Wisuda, hingga Turnamen E-Sport. Kualitas gambar tajam (Full HD) dan audio jernih.",
  image: "https://images.unsplash.com/photo-1601055903647-87e11f429118?q=80&w=800",
  benefits: [
      { title: "Multi-Camera", desc: "Hingga 4 angle kamera untuk tampilan yang dinamis seperti siaran TV." },
      { title: "Pro Audio", desc: "Direct audio dari mixer sound system, suara dijamin jernih tanpa noise." },
      { title: "Custom Overlay", desc: "Tampilan grafis (Nama pembicara, Logo, Running Text) sesuai branding acara." },
      { title: "Multi-Platform", desc: "Bisa live ke YouTube, Zoom, Facebook, Instagram, atau TikTok sekaligus." }
  ],
  process: ["Survey Lokasi & Internet", "Setup Alat (H-1/H-4jam)", "Rehearsal/Cek Sound", "Live Broadcast"],
  pricing: [
      { name: "Basic Stream", price: "2.5jt", features: ["1 Kamera Sony", "1 Operator", "Streaming Youtube/Zoom", "Durasi Max 3 Jam"] },
      { name: "Pro Stream", price: "4.5jt", features: ["2 Kamera Sony", "2 Operator (Cam + Obs)", "Audio Direct Mixer", "Custom Overlay Grafis"], recommended: true },
      { name: "Broadcaster", price: "7.5jt", features: ["3-4 Kamera", "Full Crew (Director, Cam, Audio)", "Video Bumper & VT", "Live Relay LED Screen"] }
  ],
  addons: [
      { title: "Kamera Tambahan", price: "1jt/cam" },
      { title: "Akun Zoom Pro 500", price: "250rb" },
      { title: "Dokumentasi Video Offline", price: "1.5jt" }
  ]
};

export const metadata: Metadata = {
  title: "Jasa Live Streaming & Operator Zoom Jogja Multi-Cam | Jerukmanis",
  description: "Vendor live streaming profesional untuk wedding, webinar, dan wisuda. Kualitas video Full HD dan audio jernih.",
  keywords: ["jasa live streaming jogja", "sewa operator zoom", "live wedding youtube"],
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