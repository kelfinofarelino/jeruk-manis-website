"use client";

import React, { use, useEffect } from "react"; 
import Link from "next/link";
import Lenis from "lenis"; // Import Lenis
import { 
  ArrowLeft, CheckCircle2, Phone, Mail, 
  BadgeCheck, Clock, ShieldCheck 
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
};

// --- DATABASE KONTEN LAYANAN LENGKAP ---
const servicesData: Record<string, ServiceType> = {
  "event-organizer": {
    title: "Event Organizer",
    tagline: "Wujudkan Acara Impian Tanpa Ribet",
    description: "Kami menangani seluruh aspek acara Anda, mulai dari konsep kreatif, manajemen vendor, hingga eksekusi di lapangan. Tim kami berpengalaman menangani corporate gathering, launching produk, hingga konser musik.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1600",
    benefits: [
      { title: "Bebas Stress", desc: "Kami urus perizinan, vendor, dan rundown. Anda tinggal datang dan menikmati acara." },
      { title: "Budget Efisien", desc: "Kami memiliki relasi vendor luas untuk mendapatkan harga terbaik sesuai budget Anda." },
      { title: "Konsep Kreatif", desc: "Setiap event kami rancang unik, tidak copy-paste, sesuai identitas brand/klien." }
    ],
    process: ["Konsultasi & Briefing", "Penyusunan Konsep & RAB", "Pre-Event & Produksi", "Eksekusi Hari-H", "Laporan Pertanggungjawaban"],
    pricing: [
      {
        name: "Intimate Package",
        price: "Mulai Rp 15 Jt",
        features: ["Max 50 Pax", "Konsep Acara Sederhana", "1 MC & 1 Fotografer", "Dekorasi Minimalis", "Sound System Portable"]
      },
      {
        name: "Corporate Gathering",
        price: "Mulai Rp 45 Jt",
        features: ["Max 200 Pax", "Full Event Concept", "Venue Finding", "Dokumentasi Foto & Video", "Entertainment (Band Akustik)", "Doorprize Management"],
        recommended: true
      },
      {
        name: "Grand Event",
        price: "Hubungi Kami",
        features: ["Unlimited Pax", "Skala Konser / Festival", "Artis Nasional", "Stage & Rigging Besar", "Multi-Camera Live Cam", "Full Security Team"]
      }
    ]
  },
  "professional-photography": {
    title: "Professional Photography",
    tagline: "Tangkap Momen Terbaik, Abadi Selamanya",
    description: "Layanan fotografi profesional menggunakan peralatan high-end (Sony Alpha Series) dan teknik lighting studio maupun natural. Kami fokus menangkap emosi dan detail estetik.",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1600",
    benefits: [
      { title: "High Resolution", desc: "File foto tajam, siap cetak ukuran besar tanpa pecah." },
      { title: "Color Grading", desc: "Setiap foto diedit warna sesuai mood (warm, bright, moody, dll)." },
      { title: "Fast Delivery", desc: "Preview foto H+1, hasil lengkap maksimal 7 hari kerja." }
    ],
    process: ["Diskusi Konsep/Moodboard", "Sesi Pemotretan", "Sortir & Editing", "Penyerahan File Cloud"],
    pricing: [
      {
        name: "Personal / Graduation",
        price: "Rp 750.000",
        features: ["1 Jam Sesi", "1 Lokasi", "30 Edited Photos", "All Files (Google Drive)", "Max 2 Orang"]
      },
      {
        name: "Pre-Wedding",
        price: "Rp 2.500.000",
        features: ["4 Jam Sesi", "2 Lokasi & 2 Outfit", "60 Edited Photos", "1 Cetak 16RP + Frame", "Cinematic Teaser 1 Menit"],
        recommended: true
      },
      {
        name: "Wedding Documentation",
        price: "Rp 4.500.000",
        features: ["Full Day Coverage (Akad-Resepsi)", "2 Fotografer", "Unlimited Shoot", "Wedding Book Album", "Flashdisk Eksklusif"]
      }
    ]
  },
  "cinematic-video": {
    title: "Cinematic Video",
    tagline: "Ceritakan Kisah Lewat Visual Bergerak",
    description: "Produksi video dengan standar sinematik. Mulai dari video profil perusahaan, iklan media sosial, hingga dokumentasi pernikahan yang menyentuh hati.",
    image: "https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?auto=format&fit=crop&q=80&w=1600",
    benefits: [
      { title: "Storytelling Kuat", desc: "Kami tidak sekadar merekam, tapi merangkai cerita yang bermakna." },
      { title: "4K Quality", desc: "Perekaman resolusi tinggi untuk hasil visual yang memanjakan mata." },
      { title: "Audio Jernih", desc: "Menggunakan mic professional untuk kualitas suara terbaik." }
    ],
    process: ["Script & Storyboard", "Shooting Day", "Editing & Coloring", "Revisi", "Final Render"],
    pricing: [
      {
        name: "Social Media Reels",
        price: "Rp 1.500.000",
        features: ["Durasi s.d 60 Detik", "Vertical Format (9:16)", "Shooting 2-3 Jam", "Background Music License", "1x Revisi"]
      },
      {
        name: "Event Highlight",
        price: "Rp 3.000.000",
        features: ["Durasi 3-5 Menit", "Cinematic Look", "Shooting Full Event", "Interview Peserta", "Drone Shot (Aerial)", "2x Revisi"],
        recommended: true
      },
      {
        name: "Company Profile",
        price: "Mulai Rp 7.500.000",
        features: ["Konsep Mendalam & Scripting", "Shooting 1-2 Hari", "Voice Over Professional", "Motion Graphic Intro", "Full Equipment Crew"]
      }
    ]
  },
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
        price: "Rp 1.200.000",
        features: ["2 Alternatif Desain", "Filosofi Logo", "Color Palette", "File Master (AI, PNG, PDF)", "2x Revisi Minor"]
      },
      {
        name: "Brand Identity",
        price: "Rp 3.500.000",
        features: ["3 Alternatif Logo", "Brand Guidelines Book (PDF)", "Kartu Nama & Kop Surat", "Template Instagram Feed", "Mockup Penggunaan"],
        recommended: true
      },
      {
        name: "Socmed Management",
        price: "Rp 2.500.000 /bln",
        features: ["12 Konten Feed/Reels", "Caption & Hashtag", "Admin Posting", "Monthly Report", "Free Desain Story"]
      }
    ]
  },
  "undangan-digital": {
    title: "Undangan Digital",
    tagline: "Sebar Kabar Bahagia Lebih Praktis",
    description: "Undangan berbasis website yang elegan, hemat biaya, dan ramah lingkungan. Dilengkapi fitur RSVP, peta lokasi, dan galeri foto.",
    image: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?auto=format&fit=crop&q=80&w=1600",
    benefits: [
      { title: "Unlimited Tamu", desc: "Satu link bisa disebar ke ribuan tamu tanpa biaya tambahan." },
      { title: "Fitur Canggih", desc: "Navigasi peta, hitung mundur, dan kirim ucapan langsung." },
      { title: "Aktif Selamanya", desc: "Link undangan bisa diakses kapan saja sebagai kenangan." }
    ],
    process: ["Pilih Tema", "Isi Data Mempelai/Acara", "Preview", "Revisi", "Publish"],
    pricing: [
      {
        name: "Video Invitation",
        price: "Rp 150.000",
        features: ["Format MP4 (Story/Feed)", "Durasi 60 Detik", "Musik Latar", "Bisa Pakai Foto", "Revisi 1x"]
      },
      {
        name: "Web Basic",
        price: "Rp 250.000",
        features: ["Tema Template Premium", "Info Acara & Peta", "Galeri 5 Foto", "RSVP Form", "Countdown Timer"],
        recommended: true
      },
      {
        name: "Web Custom",
        price: "Rp 750.000",
        features: ["Desain Custom Sesuai Tema", "Smart Guest Name (Nama Tamu di Cover)", "Fitur Kirim Amplop Digital", "Background Music", "Galeri Unlimited"]
      }
    ]
  },
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
        price: "Rp 1.500.000",
        features: ["One Page Website", "Desain Modern", "Tombol WhatsApp", "Hosting & Domain 1 Thn", "SEO Basic"]
      },
      {
        name: "Company Profile",
        price: "Rp 3.500.000",
        features: ["Hingga 5 Halaman", "CMS (Bisa Edit Sendiri)", "Email Perusahaan", "Google Analytics", "Free Maintenance 3 Bln"],
        recommended: true
      },
      {
        name: "Toko Online / Custom",
        price: "Mulai Rp 7 Jt",
        features: ["Fitur Keranjang Belanja", "Hitung Ongkir Otomatis", "Payment Gateway", "Laporan Penjualan", "Sistem Member"]
      }
    ]
  }
};

// --- KOMPONEN UTAMA ---
export default function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  
  // 1. Unwrap params menggunakan React.use() untuk Next.js 15
  const { slug } = use(params);

  // 2. Setup Lenis Smooth Scroll
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

            <div className="grid md:grid-cols-3 gap-8 items-start">
                {data.pricing.map((pkg, idx) => (
                    <div 
                        key={idx} 
                        className={`relative p-8 rounded-[2.5rem] border transition-all duration-300 ${
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
                        
                        <ul className="space-y-4 mb-8">
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