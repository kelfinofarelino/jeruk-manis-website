import type { Metadata } from "next";
import ServiceDetail from "@/components/ServiceDetail";

const data = {
  title: "Software & Web Development",
  tagline: "Transformasi Digital untuk Bisnis yang Lebih Maju",
  description: "Jasa pembuatan website company profile, landing page UMKM, hingga aplikasi web custom. Kami membangun website yang cepat (fast-loading), SEO-friendly, dan mudah dikelola (CMS).",
  image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800",
  benefits: [
      { title: "SEO Optimized", desc: "Struktur koding ramah Google agar mudah ranking di pencarian." },
      { title: "Mobile Responsive", desc: "Tampilan website menyesuaikan layar HP, Tablet, dan Desktop." },
      { title: "High Security", desc: "Dilengkapi SSL dan proteksi keamanan dasar." },
      { title: "Easy Maintain", desc: "Dashboard admin yang mudah digunakan orang awam sekalipun." }
  ],
  process: ["Requirement Analysis", "UI/UX Design", "Development", "Testing & Launch"],
  pricing: [
      { name: "Landing Page", price: "Start 1.5jt", features: ["One Page Scroll", "SEO Basic", "Free Domain .com", "Hosting 1 Tahun"] },
      { name: "Company Profile", price: "Start 3.5jt", features: ["5 Halaman Utama", "Fitur Blog/Berita", "SEO Premium", "Email Bisnis"], recommended: true },
      { name: "Custom Web App", price: "Start 10jt", features: ["Sistem Kasir/Inventory", "Database Complex", "API Integration", "Priority Maintenance"] }
  ],
  addons: [
      { title: "SEO Monthly Maintenance", price: "1jt/bln" },
      { title: "Google Ads Setup", price: "500rb" },
      { title: "Content Writer", price: "100rb/artikel" }
  ]
};

export const metadata: Metadata = {
  title: "Jasa Pembuatan Website & Aplikasi Jogja Terpercaya | Jerukmanis",
  description: "Jasa bikin website company profile, landing page UMKM, dan aplikasi kasir. Website cepat, aman, dan SEO friendly.",
  keywords: ["jasa pembuatan website jogja", "web developer jogja", "aplikasi kasir custom"],
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