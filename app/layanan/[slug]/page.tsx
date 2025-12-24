"use client";

import React, { use, useEffect } from "react"; 
import Link from "next/link";
import Lenis from "lenis"; 
import { 
  ArrowLeft, CheckCircle2, Phone, Mail, 
  BadgeCheck, Clock, Plus
} from "lucide-react";

// --- TYPE DEFINITION ---
type ServiceType = {
  title: string;
  tagline: string;
  description: string;
  image: string;
  benefits: { title: string; desc: string }[];
  process: string[];
  pricing: { name: string; price: string; features: string[]; recommended?: boolean }[];
  addons?: { title: string; price: string }[]; // New Type untuk Add-ons
};

// --- DATABASE KONTEN LAYANAN ---
const servicesData: Record<string, ServiceType> = {
  
  // 1. EVENT ORGANIZER (KHUSUS SWEET 17)
  "event-organizer": {
    title: "Specialist 17th Birthday",
    tagline: "Rayakan Sweet Seventeen Paling Hype & Aesthetic!",
    description: "Kami adalah spesialis Event Organizer yang fokus mewujudkan pesta Sweet Seventeen impianmu. Mulai dari tema kekinian (Y2K, Fairy, Coquette), dekorasi instagramable, hingga rundown acara yang seru abis dan anti-garing. Bikin momen sekali seumur hidupmu tak terlupakan bareng bestie dan keluarga.",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1170&auto=format&fit=crop",
    benefits: [
      { title: "Tema Kekinian", desc: "Konsultasi tema hits seperti Euphoria, Neon, atau Garden Party sesuai kepribadianmu." },
      { title: "MC & DJ Seru", desc: "Pemandu acara dan hiburan yang nyambung sama selera anak muda." },
      { title: "Konten Ready", desc: "Dekorasi dan lighting dijamin aesthetic buat stok Instastory dan TikTok." }
    ],
    process: ["Dream Consultation", "Moodboard & Budgeting", "Persiapan Vendor", "Party Time (Hari-H)", "Kenangan Manis"],
    pricing: [
      {
        name: "Intimate Dinner",
        price: "Mulai Rp 15 Jt",
        features: ["Max 50 Pax", "Simple Decor Aesthetic", "MC Casual", "Mini Sound System", "Dokumentasi Foto & Video", "Venue: Rumah, Villa, Cafe/Resto"]
      },
      {
        name: "Sweet Celebration",
        price: "Mulai Rp 25 Jt",
        features: ["Max 60 Pax", "Advance decor Aesthetic", "MC & DJ/Band", "Birthday Cake Custom", "Dokumentasi Foto & Video", "Venue: Balroom Kecil, Outdoor Garden, Cafe/Resto"],
        recommended: true
      },
      {
        name: "Luxury Ballroom",
        price: "Hubungi Kami",
        features: ["100+ Pax", "Grand Entrance Concept", "Lighting Show & Rigging", "Artis/Influencer Guest", "Full Organizer Team", "Venue: Hotel Ballroom, Outdoor Premium"]
      }
    ],
    addons: [
      { title: "Photobooth", price: "Rp 2.500.000" },
      { title: "MUA & Hairdo", price: "Rp 1.500.000" },
      { title: "360 Video Booth", price: "Rp 2.000.000" },
      { title: "Live Music Akustik", price: "Rp 3 - 7 Juta" }
    ]
  },

  // 2. VISUAL DOCUMENTATION
  "visual-documentation": {
    title: "Visual Documentation",
    tagline: "Foto & Video Profesional untuk Bisnis",
    description: "Solusi satu pintu untuk kebutuhan visual Anda. Kami menggabungkan fotografi tajam dan videografi sinematik untuk mendokumentasikan event, membuat profil perusahaan, atau iklan produk komersial.",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1170&auto=format&fit=crop",
    benefits: [
      { title: "Hybrid Team", desc: "Satu tim solid menangani foto dan video sekaligus agar hasil senada." },
      { title: "Commercial Standard", desc: "Menggunakan peralatan standar industri (4K Video, High-Res Photo)." },
      { title: "Asset Siap Pakai", desc: "Hasil edit disesuaikan untuk berbagai platform (Instagram, YouTube, Website)." }
    ],
    process: ["Konsep & Moodboard", "Produksi (Shooting Day)", "Editing & Coloring", "Revisi", "Final Delivery"],
    pricing: [
      {
        name: "Event Documentation",
        price: "Rp 3.500.000",
        features: ["1 Fotografer + 1 Videografer", "Durasi 4-6 Jam", "Video Highlight (1-3 Menit)", "100+ Foto Edited", "Google Drive Delivery"]
      },
      {
        name: "Product & F&B Commercial",
        price: "Rp 5.000.000",
        features: ["1 Hari Sesi Studio/On-Loc", "Video Reels/TikTok (3 Video)", "15 Foto Produk High-Res", "Model & Stylist (Optional)", "Lisensi Komersial"],
        recommended: true
      },
      {
        name: "Company Profile Video",
        price: "Mulai Rp 8.500.000",
        features: ["Konsep Naskah & Storyboard", "Shooting 1-2 Hari", "Interview Direksi/Staff", "Drone Aerial Shot", "Voice Over & Grafis"]
      }
    ],
    addons: [
      { title: "Drone / Aerial Shot", price: "Rp 1.500.000" },
      { title: "Raw Files (All Footage)", price: "Rp 1.000.000" },
      { title: "Extra Photographer", price: "Rp 1.500.000" }
    ]
  },

  // 3. CREATIVE BRANDING
  "creative-branding": {
    title: "Creative Branding",
    tagline: "Identitas Visual yang Beda & Berkarakter",
    description: "Bantu brand Anda tampil menonjol. Kami mengerjakan desain logo, panduan visual (Brand Guidelines), hingga manajemen konten media sosial.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1600",
    benefits: [
      { title: "Originalitas", desc: "Desain murni hasil riset, bukan template pasaran." },
      { title: "Konsistensi", desc: "Kami memastikan brand Anda terlihat senada di semua platform." },
      { title: "File Lengkap", desc: "Dapat file master (AI/EPS), PDF, PNG transparan, dll." }
    ],
    process: ["Riset Brand", "Sketsa & Eksplorasi", "Presentasi Konsep", "Finalisasi Aset"],
    pricing: [
      {
        name: "Logo Starter",
        price: "Rp 1.500.000",
        features: ["2 Alternatif Desain", "Filosofi Logo", "Color Palette", "File Master (AI, PNG, PDF)", "2x Revisi Minor"]
      },
      {
        name: "Brand Identity",
        price: "Rp 4.000.000",
        features: ["3 Alternatif Logo", "Brand Guidelines Book (PDF)", "Kartu Nama & Kop Surat", "Template Instagram Feed", "Mockup Penggunaan"],
        recommended: true
      },
      {
        name: "Socmed Management",
        price: "Rp 3.000.000 /bln",
        features: ["12 Konten Feed/Reels", "Caption & Hashtag", "Admin Posting", "Monthly Report", "Free Desain Story"]
      }
    ]
  },

  // 4. UNDANGAN DIGITAL
  "undangan-digital": {
    title: "Undangan Digital Website",
    tagline: "Undangan Event Modern & Paperless",
    description: "Solusi undangan digital berbasis website untuk Grand Opening, Seminar, Gala Dinner, atau Ulang Tahun Perusahaan. Tampil profesional, hemat biaya, dan mudah disebarkan via WhatsApp.",
    image: "https://plus.unsplash.com/premium_photo-1682310479841-a3def42359c6?q=80&w=1212&auto=format&fit=crop",
    benefits: [
      { title: "Database Tamu", desc: "Fitur RSVP memudahkan pendataan jumlah tamu yang akan hadir." },
      { title: "Profesional", desc: "Desain elegan menyesuaikan corporate identity perusahaan." },
      { title: "Navigasi Peta", desc: "Terintegrasi langsung dengan Google Maps lokasi acara." }
    ],
    process: ["Pilih Layout/Tema", "Input Data Acara", "Preview", "Revisi", "Publish Link"],
    pricing: [
      {
        name: "Simple Link",
        price: "Mulai Rp 350.000",
        features: ["1 Halaman Website Responsif (desain template pilihan)", "Form RSVP & Guestbook Sederhana", "Countdown Timer ke hari acara", "Peta Lokasi (Google Maps embed)", "Galeri Foto (maks. 5 foto)", "Cocok untuk: Acara santai, tunangan sederhana, atau syukuran kecil."]
      },
      {
        name: "The Digital Card",
        price: "Mulai Rp 750.000",
        features: ["Multi-page Website (Cover, Couple Story, Event Info, Gallery, RSVP)", "Desain Custom sesuai tema/warna acara (mood board)", "RSVP & Guestbook Management + notifikasi WhatsApp/Email ke Anda", "Countdown Timer & Music Player (1 lagu pilihan)", "Galeri Foto (maks. 15 foto) & Video Highlight Embed (YouTube link)", "Hosting & Domain Subdomain premium", "Cocok untuk: Pernikahan, Sweet 17, dan acara formal."],
        recommended: true
      },
      {
        name: "The Experience",
        price: "Mulai Rp 1.800.000",
        features: ["Semua fitur Paket Standard +", "Desain Full Custom & Animasi Elegan (sesuai konsep acara Anda)", "RSVP Advanced dengan konfirmasi makanan, kursi, dan shuttle", "Live Guestbook Wall (tampilan pesan tamu langsung di website)", "Custom Domain (contoh: www.nikah-anda.com, gratis 1 tahun)", "Video Invitation Teaser (1-2 menit, untuk undangan via sosial media)", "Cocok untuk: Acara besar, pernikahan premium, atau corporate event yang membutuhkan manajemen tamu profesional."]
      }
    ]
  },

  // 5. SOFTWARE & WEB
  "software-web": {
    title: "Software & Web",
    tagline: "Digitalisasi Bisnis dengan Teknologi Modern",
    description: "Jasa pembuatan website profesional dan aplikasi bisnis. Menggunakan teknologi modern (Next.js, React) agar website cepat, aman, dan mudah ditemukan di Google (SEO Friendly).",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600",
    benefits: [
      { title: "Super Cepat", desc: "Loading website dioptimalkan agar pengunjung tidak kabur." },
      { title: "Mobile Friendly", desc: "Tampilan rapi di HP, Tablet, maupun Laptop." },
      { title: "Mudah Diedit", desc: "Disediakan dashboard admin untuk update konten sendiri." }
    ],
    process: ["Analisa Kebutuhan", "UI/UX Design", "Development", "Testing", "Launch & Training"],
    pricing: [
      {
        name: "Landing Page",
        price: "Rp 1.800.000",
        features: ["One Page Website", "Desain Modern", "Tombol WhatsApp", "Hosting & Domain 1 Thn", "SEO Basic"]
      },
      {
        name: "Company Profile",
        price: "Rp 4.500.000",
        features: ["Hingga 5 Halaman", "CMS (Bisa Edit Sendiri)", "Email Perusahaan", "Google Analytics", "Free Maintenance 3 Bln"],
        recommended: true
      },
      {
        name: "Toko Online / Custom",
        price: "Mulai Rp 8 Jt",
        features: ["Fitur Keranjang Belanja", "Hitung Ongkir Otomatis", "Payment Gateway", "Laporan Penjualan", "Sistem Member"]
      }
    ]
  },

  // 6. LIVE STREAMING
  "professional-live-streaming": {
    title: "Professional Live Streaming",
    tagline: "Jangkau Audiens Lebih Luas Secara Real-Time",
    description: "Layanan siaran langsung (broadcasting) profesional untuk menjembatani event offline Anda dengan audiens online. Kami menggunakan standar broadcast televisi dengan mixing visual yang dinamis, audio jernih, dan koneksi stabil untuk Webinar, Talkshow, Wisuda, hingga Konser Musik.",
    image: "https://images.unsplash.com/photo-1594394489098-74ac04c0fc2e?q=80&w=1170&auto=format&fit=crop",
    benefits: [
      { title: "Multi-Platform", desc: "Bisa live stream ke YouTube, Zoom, Instagram, dan Facebook secara bersamaan." },
      { title: "Broadcast Quality", desc: "Tampilan profesional dengan fitur Lower Third (Nama), Logo, dan Transisi mulus." },
      { title: "Hybrid Ready", desc: "Mengintegrasikan peserta di lokasi dan peserta online (Zoom) agar saling berinteraksi." }
    ],
    process: ["Site Survey & Tes Internet", "Setup Equipment H-1", "Rehearsal / GR", "Live Production", "Recording Delivery"],
    pricing: [
      {
        name: "Basic Webinar",
        price: "Rp 2.500.000",
        features: ["2 Kamera Statis", "Direct Laptop Presentation", "Streaming Operator", "Zoom / YouTube", "Durasi Max 3 Jam"]
      },
      {
        name: "Pro Multi-Cam",
        price: "Rp 7.500.000",
        features: ["3 Kamera (Wide, Medium, Close)", "Video Switcher System", "Audio Direct Mixing", "Operator Tim Lengkap", "Full HD Recording"],
        recommended: true
      },
      {
        name: "Grand Production",
        price: "Hubungi Kami",
        features: ["Wireless Video System", "Jimmy Jib / Crane", "Bonded Internet (Anti Putus)", "Custom Motion Graphic", "Show Director"]
      }
    ]
  },
};

// --- KOMPONEN UTAMA ---
export default function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  
  // Unwrap params
  const { slug } = use(params);

  // Setup Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const data = servicesData[slug];

  // 404 Handling
  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Layanan Tidak Ditemukan</h1>
        <p className="text-slate-500 mb-8">Maaf, layanan yang Anda cari belum tersedia.</p>
        <Link href="/" className="px-6 py-3 bg-jeruk-600 text-white rounded-full font-bold hover:bg-jeruk-700 transition-all">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen selection:bg-jeruk-200 selection:text-jeruk-900 font-sans pb-24">
      
      {/* 1. HERO SECTION */}
      <div className="relative h-[60vh] w-full bg-slate-900 overflow-hidden">
        <img 
          src={data.image} 
          alt={data.title} 
          className="w-full h-full object-cover opacity-50 fixed-bg" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/60" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-16">
          <div className="max-w-7xl mx-auto">
            <Link 
              href="/#layanan" 
              className="inline-flex items-center text-slate-800 bg-white/80 backdrop-blur px-4 py-2 rounded-full hover:bg-white mb-6 transition-all text-sm font-bold shadow-lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> 
              Kembali
            </Link>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-2 tracking-tight">
              {data.title}
            </h1>
            <p className="text-xl md:text-2xl text-jeruk-600 font-serif italic max-w-2xl font-medium">
              {data.tagline}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        
        {/* 2. DESCRIPTION & BENEFITS */}
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
            {/* Kiri: Deskripsi */}
            <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                   <BadgeCheck className="text-jeruk-500 w-8 h-8"/> Deskripsi Layanan
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg mb-8 text-justify">
                    {data.description}
                </p>

                <h3 className="font-bold text-lg text-slate-900 mb-4">Kenapa memilih layanan ini?</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    {data.benefits.map((item, idx) => (
                        <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-jeruk-200 transition-colors">
                            <h4 className="font-bold text-jeruk-600 mb-2 text-sm uppercase tracking-wider">{item.title}</h4>
                            <p className="text-slate-500 text-sm leading-snug">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Kanan: Alur Kerja */}
            <div className="bg-slate-900 text-white p-8 md:p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-jeruk-500 blur-[80px] opacity-30 rounded-full"></div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 relative z-10">
                   <Clock className="text-jeruk-400 w-6 h-6"/> Alur Kerja
                </h2>
                <div className="space-y-6 relative z-10">
                    {data.process.map((step, idx) => (
                        <div key={idx} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-jeruk-600 flex items-center justify-center font-bold text-sm shadow-lg shadow-jeruk-500/50">
                                    {idx + 1}
                                </div>
                                {idx !== data.process.length - 1 && <div className="w-0.5 h-full bg-slate-700 my-1"></div>}
                            </div>
                            <p className="text-slate-300 font-medium py-1">{step}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* 3. PRICING SECTION */}
        <div className="mb-20">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Pilihan Paket</h2>
                <p className="text-slate-500">Transparan, fleksibel, dan sesuai kebutuhan Anda.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-start mb-16">
                {data.pricing.map((pkg, idx) => (
                    <div 
                        key={idx} 
                        className={`relative p-8 rounded-[2.5rem] border transition-all duration-300 flex flex-col h-full ${
                            pkg.recommended 
                            ? "bg-white border-jeruk-500 shadow-2xl shadow-jeruk-500/10 scale-105 z-10" 
                            : "bg-slate-50 border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1"
                        }`}
                    >
                        {pkg.recommended && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-jeruk-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider shadow-lg">
                                PALING LARIS
                            </div>
                        )}
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
                        <p className="text-3xl font-extrabold text-jeruk-600 mb-8">{pkg.price}</p>
                        
                        <ul className="space-y-4 mb-8 flex-grow">
                            {pkg.features.map((feat, fIdx) => (
                                <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-600">
                                    <CheckCircle2 className="w-5 h-5 text-jeruk-500 flex-shrink-0" />
                                    {feat}
                                </li>
                            ))}
                        </ul>

                        <Link 
                            href={`https://wa.me/6281234567890?text=Halo%20Jerukmanis,%20saya%20mau%20ambil%20paket%20${pkg.name}%20untuk%20layanan%20${data.title}`}
                            target="_blank"
                            className={`flex items-center justify-center w-full py-3 rounded-xl font-bold transition-all ${
                                pkg.recommended 
                                ? "bg-jeruk-600 text-white hover:bg-jeruk-700 shadow-lg shadow-jeruk-500/30" 
                                : "bg-white border-2 border-slate-200 text-slate-700 hover:border-jeruk-500 hover:text-jeruk-600"
                            }`}
                        >
                            Pilih Paket
                        </Link>
                    </div>
                ))}
            </div>

            {/* --- ADD ONS SECTION --- */}
            {data.addons && (
              <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-lg">
                  <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Tambahan (Add-ons)</h3>
                    <p className="text-slate-500">Lengkapi paket pilihanmu dengan item tambahan ini.</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                      {data.addons.map((addon, idx) => (
                          <div key={idx} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-md hover:border-jeruk-200 border border-transparent transition-all duration-300 group">
                              <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-full bg-jeruk-100 flex items-center justify-center text-jeruk-600 group-hover:bg-jeruk-600 group-hover:text-white transition-colors">
                                      <Plus className="w-5 h-5" />
                                  </div>
                                  <span className="font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                                    {addon.title}
                                  </span>
                              </div>
                              <div className="text-right">
                                  <span className="block font-bold text-jeruk-600">{addon.price}</span>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
            )}
        </div>

        {/* 4. CTA BANNER */}
        <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-jeruk-500 blur-[120px] opacity-20 rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Punya kebutuhan khusus?
                </h2>
                <p className="text-slate-400 mb-10 text-lg max-w-2xl mx-auto">
                    Jika paket di atas belum sesuai, kami siap membuatkan penawaran custom (Custom Quotation) sesuai budget dan keinginan Anda.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link 
                        href="https://wa.me/6281234567890"
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-jeruk-600 text-white rounded-full font-bold text-lg hover:bg-jeruk-500 hover:scale-105 transition-all shadow-xl shadow-jeruk-500/20"
                    >
                        <Phone className="w-5 h-5" /> Konsultasi Custom
                    </Link>
                    <Link 
                         href="mailto:hello@jerukmanis.web.id"
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-slate-700 text-white rounded-full font-bold text-lg hover:bg-white hover:text-slate-900 transition-all"
                    >
                        <Mail className="w-5 h-5" /> Kirim Email
                    </Link>
                </div>
            </div>
        </div>

      </div>
    </main>
  );
}