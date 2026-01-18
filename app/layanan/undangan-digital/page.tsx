import type { Metadata } from "next";
import ServiceDetail from "@/components/ServiceDetail";

const data = {
  title: "Undangan Digital Website",
  tagline: "Sebar Undangan Lebih Praktis, Hemat & Elegan",
  description: "Undangan pernikahan berbasis website yang responsif, estetik, dan kaya fitur. Tamu bisa konfirmasi kehadiran (RSVP), titip ucapan, hingga memberikan amplop digital. Tampil memukau di semua layar HP.",
  image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800",
  benefits: [
      { title: "Unlimited Tamu", desc: "Satu link untuk ribuan tamu, tanpa biaya tambahan per nama." },
      { title: "Fitur Lengkap", desc: "RSVP, Countdown, Galeri Foto, Amplop Digital, Google Maps." },
      { title: "Fast Process", desc: "Pengerjaan kilat 1-2 hari kerja jadi." },
      { title: "Custom Music", desc: "Pilih lagu latar favoritmu (Auto-play)." }
    ],
    process: ["Pilih Tema", "Input Data Mempelai", "Revisi Konten", "Publish Link"],
    pricing: [
        { name: "Basic", price: "150rb", features: ["Tema Template Basic", "Masa Aktif 3 Bulan", "RSVP & Ucapan", "Musik Latar"] },
        { name: "Premium", price: "300rb", features: ["Tema Premium (Banyak Pilihan)", "Masa Aktif 1 Tahun", "Galeri Foto Unlimited", "Fitur Kirim Kado/Amplop"], recommended: true },
        { name: "Exclusive", price: "750rb", features: ["Custom Domain (.com)", "Desain Custom (Request)", "Masa Aktif Selamanya", "Priority Support"] }
    ],
    addons: [
        { title: "Custom Domain (.com)", price: "150rb" },
        { title: "Filter Instagram Wedding", price: "250rb" },
        { title: "Video Undangan (MP4)", price: "100rb" }
    ]
};

export const metadata: Metadata = {
  title: "Jasa Pembuatan Undangan Digital Website Murah | Jerukmanis",
  description: "Undangan pernikahan online berbasis website. Fitur lengkap: RSVP, galeri foto, amplop digital, dan musik.",
  keywords: ["undangan digital jogja", "wedding website", "undangan online"],
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