"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Lenis from "lenis";
import { 
  ArrowRight, Play, Camera, Monitor, 
  CheckCircle2, Instagram, Mail, Phone, Menu, X,
  Palette, PartyPopper, Code2, Users, Trophy, Target, 
  Star, Quote, Zap, Layers, Image as ImageIcon, Film, Heart, Smartphone 
} from "lucide-react";

// --- DATA TESTIMONI (UPDATED: NO WEDDING) ---
const testimonialsData = [
  {
    name: "Clarissa Putri",
    role: "Sweet 17 Queen",
    text: "Pesta ulang tahun ke-17 ku bener-bener pecah! Temanya sesuai moodboard, dekorasinya aesthetic, dan MC-nya bikin suasana hidup banget. Thank you Jerukmanis!",
    initial: "CP"
  },
  {
    name: "PT Maju Bersama",
    role: "Corporate Client",
    text: "Event gathering kantor kami berjalan super lancar berkat tim Jerukmanis. Konsep acaranya seru, rundown rapi, dan dokumentasinya juara!",
    initial: "MB"
  },
  {
    name: "Budi Santoso",
    role: "Owner Kopi Senja",
    text: "Hasil videonya cinematic banget, penjualan kopi kami naik setelah posting reels. Branding visual yang dibuat bener-bener nangkep vibes kedai kami.",
    initial: "BS"
  },
  {
    name: "Dina Aprilia",
    role: "CEO StartUp Lokal",
    text: "Website yang dibuat sangat cepat dan responsif. Timnya juga enak diajak diskusi teknis. Kualitas code-nya rapi dan sesuai ekspektasi bisnis.",
    initial: "DA"
  },
  {
    name: "Fani Adhitya",
    role: "Festival Director",
    text: "Kerja sama untuk dokumentasi konser musik sangat memuaskan. Tim gercep menangkap momen-momen emas di panggung.",
    initial: "FA"
  }
];

// --- KOMPONEN NAVBAR ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3 border-b border-slate-100" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <img 
            src="/images/logo.png" 
            alt="Logo Jerukmanis" 
            className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" 
          />
          <span className={`text-xl font-bold tracking-tight transition-colors ${scrolled ? "text-slate-900" : "text-slate-900"}`}>
            jeruk<span className="text-jeruk-600 font-serif italic">manis</span>.
          </span>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          {["Tentang", "Layanan", "Portofolio", "Cara Kerja"].map((item) => {
            const id = item.toLowerCase().replace(" ", "-");
            return (
              <a 
                key={item} 
                href={`#${id}`}
                onClick={(e) => handleScrollTo(e, id)}
                className="hover:text-jeruk-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-jeruk-500 hover:after:w-full after:transition-all cursor-pointer"
              >
                {item}
              </a>
            );
          })}
        </div>

        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link 
            href="https://wa.me/6281234567890" 
            className="hidden md:inline-flex px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-jeruk-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Hubungi Kami
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-700">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
         <div className="p-6 flex flex-col gap-4">
           {["Tentang", "Layanan", "Portofolio", "Cara Kerja"].map((item) => {
             const id = item.toLowerCase().replace(" ", "-");
             return (
              <a 
                key={item} 
                href={`#${id}`} 
                onClick={(e) => handleScrollTo(e, id)}
                className="text-lg font-medium text-slate-800 hover:text-jeruk-600 cursor-pointer"
              >
                {item}
              </a>
             );
           })}
         </div>
      </div>
    </nav>
  );
};

// --- KOMPONEN FOOTER ---
const Footer = () => (
  <footer className="bg-slate-950 text-white py-16 border-t-4 border-jeruk-500">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
      <div className="space-y-4">
        <h3 className="text-3xl font-bold">jeruk<span className="text-jeruk-500 font-serif italic">manis</span>.</h3>
        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
          Partner kreatif terpercaya di <strong>DI Yogyakarta</strong>. 
          Spesialis Event Organizer, Dokumentasi Visual, dan Pengembangan Web untuk Bisnis & Momen Personal Anda.
        </p>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-6 text-jeruk-100">Hubungi Kami</h4>
        <ul className="space-y-4 text-slate-300 text-sm">
          {/* Phone Link */}
          <li>
            <Link href="https://wa.me/6281234567890" target="_blank" className="flex items-center gap-3 hover:text-jeruk-400 transition-colors cursor-pointer group">
              <span className="p-2 bg-slate-900 rounded-full group-hover:bg-jeruk-900 transition-colors"><Phone className="w-4 h-4 text-jeruk-500"/></span> 
              +62 812-xxxx-xxxx
            </Link>
          </li>
          
          {/* Email Link (UPDATED) */}
          <li>
            <Link href="mailto:hello@jerukmanis.web.id" className="flex items-center gap-3 hover:text-jeruk-400 transition-colors cursor-pointer group">
              <span className="p-2 bg-slate-900 rounded-full group-hover:bg-jeruk-900 transition-colors"><Mail className="w-4 h-4 text-jeruk-500"/></span> 
              hello@jerukmanis.web.id
            </Link>
          </li>
          
          {/* Instagram Link */}
          <li>
            <Link href="https://instagram.com/jerukmanis.creative" target="_blank" className="flex items-center gap-3 hover:text-jeruk-400 transition-colors cursor-pointer group">
              <span className="p-2 bg-slate-900 rounded-full group-hover:bg-jeruk-900 transition-colors"><Instagram className="w-4 h-4 text-jeruk-500"/></span> 
              @jerukmanis.creative
            </Link>
          </li>
        </ul>
      </div>
      <div className="md:text-right flex flex-col justify-end">
        <p className="text-slate-500 text-xs">
          © {new Date().getFullYear()} Jerukmanis Creative.<br/>All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default function Home() {
  
  // --- LENIS SMOOTH SCROLL ---
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <main className="min-h-screen bg-white selection:bg-jeruk-200 selection:text-jeruk-900 font-sans">
      <Navbar />
      
      {/* GLOBAL CSS */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } 
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .pause-on-hover:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-jeruk-100 rounded-full blur-[100px] opacity-60 translate-x-1/3 -translate-y-1/4 animate-pulse" />
        <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-yellow-100 rounded-full blur-[80px] opacity-50 -translate-x-1/3 translate-y-1/4" />
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Solusi <span className="text-transparent bg-clip-text bg-gradient-to-r from-jeruk-500 to-yellow-500">Kreatif</span>,<br />
              & <span className="text-transparent bg-clip-text bg-gradient-to-r from-jeruk-500 to-yellow-500">Event</span> <span className="font-serif italic font-light text-slate-800 relative z-10 before:absolute before:bottom-2 before:left-0 before:w-full before:h-3 before:bg-jeruk-200/50 before:-z-10">Manis.</span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
              Partner kreatif untuk <strong>skala Bisnis</strong> maupun <strong>Sweet 17 Party</strong>. Mulai dari manajemen Event profesional, dokumentasi visual yang estetik, hingga pembuatan website di Yogyakarta.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="https://wa.me/6281234567890" className="flex items-center justify-center gap-2 px-8 py-4 bg-jeruk-600 text-white rounded-full font-bold text-lg hover:bg-jeruk-700 hover:scale-105 transition-all shadow-xl shadow-jeruk-500/30">
                Konsultasi Gratis
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="flex items-center justify-center gap-3 px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-full font-bold text-lg hover:border-jeruk-300 hover:bg-jeruk-50 transition-all">
                <Play className="w-5 h-5 fill-slate-700" />
                Lihat Showreel
              </button>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
             <div className="relative z-10 grid grid-cols-2 gap-5">
                <div className="space-y-5 translate-y-12">
                   <div className="bg-slate-900 p-6 rounded-[2rem] text-white shadow-xl hover:-translate-y-2 transition-transform duration-500">
                      <Camera className="w-10 h-10 text-jeruk-400 mb-4" />
                      <h3 className="font-bold text-xl">Visual</h3>
                      <p className="text-slate-400 text-sm">Dokumentasi & Event</p>
                   </div>
                   <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000" className="rounded-[2rem] h-52 w-full object-cover shadow-lg" alt="Party" />
                </div>
                <div className="space-y-5">
                   <img src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=600" className="rounded-[2rem] h-52 w-full object-cover shadow-lg" alt="Event" />
                   <div className="bg-jeruk-500 p-6 rounded-[2rem] text-white shadow-xl hover:-translate-y-2 transition-transform duration-500">
                      <PartyPopper className="w-10 h-10 text-white mb-4" />
                      <h3 className="font-bold text-xl">Event</h3>
                      <p className="text-white/80 text-sm">Organizer & Concept</p>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TENTANG KAMI SECTION */}
      <section id="tentang" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-jeruk-50 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Foto Tim */}
            <div className="relative">
              <div className="absolute inset-0 bg-jeruk-200 rounded-[2.5rem] rotate-3 transform translate-x-2 translate-y-2 -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
                alt="Tim Jerukmanis" 
                className="rounded-[2.5rem] w-full object-cover shadow-xl grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-[2rem] shadow-xl border border-jeruk-100 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-jeruk-500 rounded-full flex items-center justify-center text-white">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-slate-900">3+</p>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Tahun Pengalaman</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Teks Cerita */}
            <div>
              <span className="text-jeruk-600 font-bold tracking-wider text-sm uppercase mb-2 block">Tentang Kami</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Meracik Pengalaman <br/>
                <span className="font-serif italic text-jeruk-600">Yang Berkesan.</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Kami percaya momen terbaik tidak terjadi begitu saja, tapi diciptakan. Jerukmanis hadir sebagai partner fleksibel: andal merancang <strong>Event Perusahaan</strong> dan <strong>Sweet 17 Party</strong>, serta menyediakan solusi digital dan visual berkualitas tinggi.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Kami adalah kolektif Event Planner, Fotografer, dan Developer di Yogyakarta. Apapun tujuannya—merayakan ulang tahun ke-17 atau launching produk perusahaan—kami punya resep yang pas.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                <div className="flex items-start gap-3">
                   <div className="mt-1 bg-jeruk-50 p-2 rounded-lg text-jeruk-600"><Target className="w-5 h-5" /></div>
                   <div>
                      <h4 className="font-bold text-2xl text-slate-900">50+</h4>
                      <p className="text-sm text-slate-500">Event & Projek</p>
                   </div>
                </div>
                <div className="flex items-start gap-3">
                   <div className="mt-1 bg-jeruk-50 p-2 rounded-lg text-jeruk-600"><Heart className="w-5 h-5" /></div>
                   <div>
                      <h4 className="font-bold text-2xl text-slate-900">20+</h4>
                      <p className="text-sm text-slate-500">Klien Senang</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LAYANAN SECTION (FLEX LAYOUT - CENTER ALIGNMENT) */}
      <section id="layanan" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Menu <span className="font-serif italic text-jeruk-600">Layanan</span></h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Solusi lengkap untuk kebutuhan Acara, Visual, dan Digital Anda.</p>
          </div>

          {/* Menggunakan Flexbox & Justify Center untuk align tengah */}
          <div className="flex flex-wrap justify-center gap-8">
             
             {/* Card 1: Event Organizer (SWEET 17 FOCUS) */}
             <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)]">
                <ServiceCard 
                  icon={<PartyPopper className="w-8 h-8"/>}
                  title="Sweet 17 Specialist"
                  slug="event-organizer"
                  items={["Intimate Birthday Dinner", "Grand Sweet 17 Party", "Thematic Decoration (Y2K/Fairy)", "Guest Star & DJ Management"]}
                />
             </div>

             {/* Card 2: Visual Documentation (MERGED) */}
             <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)]">
                <ServiceCard 
                  icon={<Camera className="w-8 h-8"/>}
                  title="Visual Documentation"
                  slug="visual-documentation"
                  items={["Event Documentation", "Company Profile Video", "Product Commercial & Catalogue", "Social Media Content Creation"]}
                />
             </div>
             
             {/* Card 3: Creative Branding */}
             <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)]">
                <ServiceCard 
                  icon={<Palette className="w-8 h-8"/>}
                  title="Creative Branding"
                  slug="creative-branding"
                  items={["Brand Identity (Logo)", "Social Media Design", "Content Creation", "Visual Strategy"]}
                />
             </div>

             {/* Card 4: Undangan Digital Website (NO WEDDING) */}
             <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)]">
                <ServiceCard 
                  icon={<Smartphone className="w-8 h-8"/>}
                  title="Undangan Digital Website"
                  slug="undangan-digital"
                  items={["Website Invitation (Birthday)", "Video Invitation", "Digital RSVP System"]}
                />
             </div>

             {/* Card 5: Software Web */}
             <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)]">
                <ServiceCard 
                  icon={<Code2 className="w-8 h-8"/>}
                  title="Software & Web"
                  slug="software-web"
                  items={["Website UMKM/Bisnis", "Landing Page Penjualan", "Website Portfolio", "Sistem Kasir"]}
                />
             </div>

             {/* Card 6: Professional Live Streaming */}
            <div className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)]">
                <ServiceCard 
                  icon={<Monitor className="w-8 h-8"/>} 
                  title="Professional Live Streaming"
                  slug="professional-live-streaming"
                  items={["Multi-Camera Broadcasting", "Hybrid Event (Zoom/Meet)", "YouTube & IG Live", "Clear Audio Direct"]}
                />
            </div>

          </div>
        </div>
      </section>

      {/* 4. PORTOFOLIO SECTION */}
      <section id="portofolio" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Hasil <span className="font-serif italic text-jeruk-600">Panen</span></h2>
                <p className="text-slate-500">Jejak karya manis dari berbagai event dan projek kami.</p>
              </div>
              <button className="hidden md:flex items-center gap-2 text-jeruk-600 font-semibold hover:gap-4 transition-all group">
                Lihat Semua <ArrowRight className="w-4 h-4 group-hover:text-jeruk-500"/>
              </button>
           </div>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Portfolio Item 1 */}
              <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300">
                  <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800" alt="Event Project" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <span className="text-jeruk-400 text-xs font-bold uppercase tracking-wider mb-2">Event Organizer</span>
                    <h3 className="text-white text-xl font-bold">Annual Corporate Gathering</h3>
                  </div>
              </div>
              
              {/* Portfolio Item 2 (UPDATED to Sweet 17) */}
              <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300">
                  <img src="https://plus.unsplash.com/premium_photo-1742444926373-db6c4e4a18fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmVvbiUyMG5pZ2h0JTIwcGFydHl8ZW58MHx8MHx8fDA%3D" alt="Party Project" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <span className="text-jeruk-400 text-xs font-bold uppercase tracking-wider mb-2">Sweet 17 Specialist</span>
                    <h3 className="text-white text-xl font-bold">Euphoria Neon Night Party</h3>
                  </div>
              </div>
              
               {/* Portfolio Item 3 */}
               <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300">
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" alt="Web Project" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <span className="text-jeruk-400 text-xs font-bold uppercase tracking-wider mb-2">Web Development</span>
                    <h3 className="text-white text-xl font-bold">Company Profile & Katalog</h3>
                  </div>
              </div>
           </div>
        </div>
      </section>

      {/* 5. MENGAPA PILIH JERUKMANIS? */}
      <section id="cara-kerja" className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Kenapa Harus <span className="font-serif italic text-jeruk-600">Kami?</span></h2>
              <div className="space-y-8">
                <FeatureItem 
                    title="All-in-One Solution" 
                    desc="Gak perlu pusing cari vendor sana-sini. Kami bisa handle konsep event, dokumentasi, hingga publikasi website-nya sekaligus." 
                />
                <FeatureItem 
                    title="Konsep Matang & Eksekusi Rapih" 
                    desc="Kami meracik rundown dan strategi visual yang detail, serta mengeksekusinya di lapangan dengan tim yang profesional." 
                />
                <FeatureItem 
                    title="Fleksibel & Personal" 
                    desc="Baik itu event kantor formal atau pesta yang intim, kami menyesuaikan gaya kerja dengan kebutuhan unik Anda." 
                />
              </div>
            </div>
            
            <div className="relative">
               <div className="aspect-square bg-gradient-to-tr from-jeruk-400 to-orange-300 rounded-full blur-3xl opacity-20 absolute inset-0 animate-pulse"></div>
               <div className="relative bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-jeruk-100/50">
                  <h3 className="font-bold text-xl mb-8 border-b pb-4 border-slate-100">Alur Kerja Kami</h3>
                  <div className="space-y-10 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                    <Step number="1" title="Konsultasi (Peeling)" desc="Ceritakan rencana event atau kebutuhan digital Anda pada kami." />
                    <Step number="2" title="Peracikan (Squeezing)" desc="Kami siapkan konsep, moodboard, dan penawaran terbaik." />
                    <Step number="3" title="Penyajian (Serving)" desc="Eksekusi hari-H atau pengerjaan project hingga tuntas dan manis." />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONI PENIKMAT (MARQUEE) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Testimoni <span className="font-serif italic text-jeruk-600">Penikmat</span></h2>
            <p className="text-slate-500 mt-4">Kata mereka yang sudah mencicipi layanan kami.</p>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10 hidden md:block" />
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10 hidden md:block" />

          <div className="flex w-max animate-marquee pause-on-hover">
            {/* Set Pertama */}
            <div className="flex gap-6 px-3">
              {testimonialsData.map((item, index) => (
                 <TestimonialCard key={`orig-${index}`} {...item} />
              ))}
            </div>
            {/* Set Kedua (Clone) */}
            <div className="flex gap-6 px-3">
              {testimonialsData.map((item, index) => (
                 <TestimonialCard key={`clone-${index}`} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section className="py-24">
         <div className="max-w-5xl mx-auto px-6">
            <div className="bg-slate-900 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-80 h-80 bg-jeruk-500 rounded-full blur-[100px] opacity-30 translate-x-1/2 -translate-y-1/2 group-hover:opacity-40 transition-opacity"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full blur-[80px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>
               
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10 leading-tight">
                 Pengen punya momen<br/> <span className="text-jeruk-500 font-serif italic">yang lebih Manis?</span>
               </h2>
               <p className="text-slate-400 mb-10 text-lg max-w-xl mx-auto relative z-10">
                 Yuk, diskusikan idemu ke kita sekarang!
               </p>
               <Link 
                href="https://wa.me/6281234567890"
                className="inline-flex items-center gap-3 px-8 py-4 bg-jeruk-600 text-white rounded-full font-bold text-lg hover:bg-jeruk-500 hover:scale-105 transition-all shadow-lg shadow-jeruk-500/25 relative z-10"
               >
                  <Phone className="w-5 h-5" />
                  Hubungi via WhatsApp
               </Link>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}

// --- SUB-KOMPONEN KECIL ---

const ServiceCard = ({ icon, title, items, slug }: { icon: any, title: string, items: string[], slug: string }) => (
  <div className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full flex flex-col h-full">
    <div className="w-14 h-14 bg-jeruk-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-jeruk-500 transition-colors duration-300 flex-shrink-0">
      <div className="text-jeruk-600 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
    </div>
    
    <h3 className="font-bold text-xl mb-4 text-slate-900">{title}</h3>
    
    <ul className="space-y-3 flex-grow">
      {items.map((item, index) => (
        <li key={index} className="text-slate-600 text-sm flex items-start gap-3 leading-snug">
          <span className="h-1.5 w-1.5 rounded-full bg-jeruk-500 mt-1.5 flex-shrink-0"></span>
          {item}
        </li>
      ))}
    </ul>

    <div className="mt-8 pt-4 border-t border-slate-100">
        <Link href={`/layanan/${slug}`} className="text-jeruk-600 font-bold text-sm flex items-center gap-2 group/btn hover:gap-4 transition-all">
            Lihat Detail <ArrowRight className="w-4 h-4"/>
        </Link>
    </div>
  </div>
);

const FeatureItem = ({ title, desc }: { title: string, desc: string }) => (
  <div className="flex gap-4">
    <div className="mt-1 flex-shrink-0">
      <CheckCircle2 className="w-6 h-6 text-jeruk-500" />
    </div>
    <div>
      <h4 className="font-bold text-lg text-slate-900">{title}</h4>
      <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

const Step = ({ number, title, desc }: { number: string, title: string, desc: string }) => (
  <div className="flex gap-5 relative bg-white">
    <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold flex-shrink-0 z-10 border-[6px] border-white shadow-sm">
      {number}
    </div>
    <div className="pt-1">
      <h4 className="font-bold text-lg text-slate-900 mb-1">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

const TestimonialCard = ({ name, role, text, initial }: { name: string, role: string, text: string, initial: string }) => (
    <div className="shrink-0 w-[85vw] md:w-[400px] bg-white p-8 rounded-3xl shadow-sm border border-jeruk-100 text-left relative group hover:shadow-lg transition-all">
        <Quote className="absolute top-6 right-6 text-jeruk-100 w-10 h-10 rotate-180 group-hover:text-jeruk-200 transition-colors"/>
        <div className="flex gap-1 mb-4">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400"/>)}
        </div>
        <p className="text-slate-600 italic mb-6 leading-relaxed text-sm md:text-base">
            "{text}"
        </p>
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 group-hover:bg-jeruk-100 group-hover:text-jeruk-700 transition-colors">
                {initial}
            </div>
            <div>
                <h5 className="font-bold text-slate-900 text-sm">{name}</h5>
                <p className="text-xs text-slate-500">{role}</p>
            </div>
        </div>
    </div>
);