"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Lenis from "lenis";
import { 
  ArrowLeft, CheckCircle2, Phone, 
  BadgeCheck, Plus, ChevronDown, Menu, X, Clock,
  Mail, Instagram
} from "lucide-react";

// --- DATA TYPES ---
type ServiceType = {
  title: string;
  tagline: string;
  description: string;
  image: string;
  benefits: { title: string; desc: string }[];
  process: string[];
  pricing: { name: string; price: string; features: string[]; recommended?: boolean }[];
  addons?: { title: string; price: string }[];
};

// --- DATA DROPDOWN LAYANAN ---
const servicesList = [
  { title: "Digital Architecture", slug: "software-web" },
  { title: "Visual Production", slug: "visual-documentation" },
  { title: "Event Activation", slug: "event-organizer" },
  { title: "Professional Streaming", slug: "professional-live-streaming" },
  { title: "Identity Branding", slug: "creative-branding" },
  { title: "Talent Management", slug: "undangan-digital" },
];

export default function ServiceDetail({ data }: { data: ServiceType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!data) return null;

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 selection:bg-orange-200 selection:text-orange-900">
        
        {/* --- NAVBAR --- */}
        <nav 
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            scrolled 
              ? "bg-white/90 backdrop-blur-md shadow-sm py-3 border-b border-slate-100" 
              : "bg-transparent py-6"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Link 
                    href="/" 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border ${
                        scrolled 
                        ? "bg-slate-100 text-slate-600 border-slate-200 hover:bg-orange-50 hover:text-orange-600" 
                        : "bg-white/50 text-slate-800 border-white/50 hover:bg-white hover:text-orange-600"
                    }`}
                    title="Kembali ke Beranda"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>

                <Link href="/" className="flex items-center gap-2 group">
                  <img 
                    src="/images/logo.png" 
                    alt="Logo Jerukmanis" 
                    className="w-10 h-10 object-contain group-hover:scale-105 transition-transform" 
                  />
                  <span className={`text-xl font-bold tracking-tight transition-colors ${scrolled ? "text-slate-900" : "text-slate-900"}`}>
                    jeruk<span className="text-orange-600 font-serif italic">manis</span>.
                  </span>
                </Link>
            </div>

            <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600 items-center">
              {["Tentang", "Layanan", "Portofolio", "Cara Kerja"].map((item) => {
                const id = item.toLowerCase().replace(" ", "-");
                if (item === "Layanan") {
                  return (
                    <div key={item} className="relative group h-full">
                      <button className="flex items-center gap-1 hover:text-orange-600 transition-colors py-2 cursor-pointer focus:outline-none">
                        {item} <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300"/>
                      </button>
                      <div className="absolute top-full -left-12 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-64">
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 overflow-hidden flex flex-col gap-1">
                          {servicesList.map((service, idx) => (
                            <Link 
                              key={idx}
                              href={`/layanan/${service.slug}`}
                              className="block px-4 py-3 text-sm text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all font-medium text-left"
                            >
                              {service.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <Link 
                    key={item} 
                    href={`/#${id}`} 
                    className="hover:text-orange-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-orange-500 hover:after:w-full after:transition-all cursor-pointer"
                  >
                    {item}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <Link 
                href="https://wa.me/6281328945828" 
                className="hidden md:inline-flex px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-orange-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Hubungi Kami
              </Link>
              <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-700">
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
             <div className="p-6 flex flex-col gap-4">
               {["Tentang", "Layanan", "Portofolio", "Cara Kerja"].map((item) => {
                 const id = item.toLowerCase().replace(" ", "-");
                 return (
                  <Link 
                    key={item} 
                    href={item === "Layanan" ? "#" : `/#${id}`}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-slate-800 hover:text-orange-600 cursor-pointer"
                  >
                    {item}
                  </Link>
                 );
               })}
             </div>
          </div>
        </nav>

        {/* --- HERO SECTION --- */}
        <header className="relative pt-32 pb-16 px-6 overflow-hidden">
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-4">
                    <div className="w-full md:w-3/5 relative z-10 order-2 md:order-1">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/50 text-orange-700 text-sm font-bold mb-6 border border-orange-200/50">
                            <BadgeCheck className="w-4 h-4 fill-orange-500 text-white" />
                            Verified Service
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-[1.1]">
                            {data.title}
                        </h1>
                        <p className="text-xl text-slate-500 mb-8 leading-relaxed">
                            {data.tagline}
                        </p>
                    </div>
                    <div className="w-full md:w-2/5 relative order-1 md:order-2 flex justify-center md:justify-start md:pl-8">
                        <div className="w-full max-w-[380px] aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500 border-4 border-white">
                            <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </header>

        {/* --- MAIN CONTENT --- */}
        <section className="py-10 -mt-6 relative z-10">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Deskripsi */}
                    <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
                        <div className="flex items-center gap-3 mb-6">
                            <BadgeCheck className="w-8 h-8 text-orange-500" />
                            <h2 className="text-2xl font-bold text-slate-900">Deskripsi Layanan</h2>
                        </div>
                        <p className="text-slate-600 text-lg leading-relaxed mb-10 border-l-4 border-orange-100 pl-6">
                            {data.description}
                        </p>
                        <h3 className="text-lg font-bold text-slate-900 mb-6">Kenapa memilih layanan ini?</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            {data.benefits.map((item, idx) => (
                                <div key={idx} className="bg-slate-50 p-6 rounded-2xl hover:bg-orange-50 transition-colors group">
                                    <h4 className="text-orange-600 font-bold text-xs uppercase tracking-wider mb-2 group-hover:text-orange-700">{item.title}</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Alur Kerja */}
                    <div className="lg:col-span-1 bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white sticky top-28 shadow-2xl shadow-slate-900/20">
                         <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                            <Clock className="w-6 h-6 text-orange-500" /> Alur Kerja
                         </h3>
                         <div className="space-y-0 relative">
                             <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-slate-800"></div>
                             {data.process.map((step, idx) => (
                                <div key={idx} className="relative flex items-start gap-6 pb-8 last:pb-0">
                                   <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-sm font-bold z-10 shadow-lg shadow-orange-600/30 flex-shrink-0">
                                      {idx + 1}
                                   </div>
                                   <div className="pt-1">
                                      <p className="font-medium text-slate-300 leading-snug hover:text-white transition-colors cursor-default">
                                        {step}
                                      </p>
                                   </div>
                                </div>
                             ))}
                         </div>
                    </div>
                </div>
            </div>
        </section>

        {/* --- PRICING SECTION --- */}
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-6 max-w-6xl mb-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Pilihan Paket</h2>
                    <p className="text-slate-500">Transparan, fleksibel, dan sesuai kebutuhan Anda.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {data.pricing.map((pkg, idx) => (
                        <div 
                            key={idx} 
                            className="relative p-8 rounded-[2.5rem] bg-white border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
                        >
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
                            <p className="text-4xl font-extrabold text-orange-600 mb-8">{pkg.price}</p>
                            
                            <ul className="space-y-4 mb-8 flex-grow">
                                {pkg.features.map((feat, fIdx) => (
                                    <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-600 group-hover:text-slate-700">
                                        <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" />
                                        {feat}
                                    </li>
                                ))}
                            </ul>

                            <Link 
                                href={`https://wa.me/6281328945828?text=Halo%20Jerukmanis,%20saya%20mau%20ambil%20paket%20${pkg.name}%20untuk%20layanan%20${data.title}`}
                                target="_blank"
                                className="flex items-center justify-center w-full py-4 rounded-xl font-bold transition-all bg-white border border-slate-200 text-slate-900 hover:border-orange-500 hover:text-orange-600 hover:shadow-md"
                            >
                                Pilih Paket
                            </Link>
                        </div>
                    ))}
                </div>

                {/* ADD-ONS SECTION */}
                {data.addons && (
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Tambahan (Add-ons)</h2>
                        <p className="text-center text-slate-400 text-sm mb-10">Lengkapi paket pilihanmu dengan item tambahan ini.</p>
                        
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                            <div className="grid md:grid-cols-2 gap-4">
                                {data.addons.map((addon, idx) => (
                                    <div 
                                        key={idx} 
                                        className="group flex justify-between items-center p-5 bg-white border-2 border-slate-50 rounded-3xl transition-all duration-300 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10 cursor-default"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white flex-shrink-0">
                                                <Plus className="w-5 h-5" />
                                            </div>
                                            <span className="font-bold text-slate-900 text-base text-left">{addon.title}</span>
                                        </div>
                                        <span className="font-bold text-orange-600 text-base whitespace-nowrap">{addon.price}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>

        {/* --- CTA SECTION (NEW: Card Dark Mode Style) --- */}
        <section className="py-24">
             <div className="max-w-5xl mx-auto px-6">
                <div className="bg-slate-900 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden group shadow-2xl">
                   {/* Background Glow Effect */}
                   <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500 rounded-full blur-[100px] opacity-30 translate-x-1/2 -translate-y-1/2 group-hover:opacity-40 transition-opacity"></div>
                   <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full blur-[80px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>
                   
                   {/* Content */}
                   <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10 leading-tight">
                     Pengen punya momen<br/> <span className="text-orange-500 font-serif italic">yang lebih Manis?</span>
                   </h2>
                   <p className="text-slate-400 mb-10 text-lg max-w-xl mx-auto relative z-10">
                     Jika paket di atas belum sesuai, kami siap membuatkan penawaran custom. sesuai budget dan keinginan Anda.
                   </p>
                   <Link 
                    href="https://wa.me/6281328945828"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-orange-600 text-white rounded-full font-bold text-lg hover:bg-orange-500 hover:scale-105 transition-all shadow-lg shadow-orange-500/25 relative z-10"
                   >
                      <Phone className="w-5 h-5" />
                      Hubungi via WhatsApp
                   </Link>
                </div>
             </div>
        </section>

        {/* --- FOOTER SECTION (NEW) --- */}
        <footer className="bg-slate-950 text-white py-16 border-t-4 border-orange-500">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold">jeruk<span className="text-orange-500 font-serif italic">manis</span>.</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                  Partner kreatif terpercaya di <strong>DI Yogyakarta</strong>. 
                  Spesialis Event Organizer, Dokumentasi Visual, dan Pengembangan Web untuk Bisnis & Momen Personal Anda.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-6 text-orange-100">Hubungi Kami</h4>
                <ul className="space-y-4 text-slate-300 text-sm">
                  <li>
                    <Link href="https://wa.me/6281328945828" target="_blank" className="flex items-center gap-3 hover:text-orange-400 transition-colors cursor-pointer group">
                      <span className="p-2 bg-slate-900 rounded-full group-hover:bg-orange-900 transition-colors"><Phone className="w-4 h-4 text-orange-500"/></span> 
                      +62 8813-2894-5828
                    </Link>
                  </li>
                  
                  <li>
                    <Link href="mailto:hello@jerukmanis.web.id" className="flex items-center gap-3 hover:text-orange-400 transition-colors cursor-pointer group">
                      <span className="p-2 bg-slate-900 rounded-full group-hover:bg-orange-900 transition-colors"><Mail className="w-4 h-4 text-orange-500"/></span> 
                      hello@jerukmanis.web.id
                    </Link>
                  </li>
                  
                  <li>
                    <Link href="https://instagram.com/jerukmanis.creative" target="_blank" className="flex items-center gap-3 hover:text-orange-400 transition-colors cursor-pointer group">
                      <span className="p-2 bg-slate-900 rounded-full group-hover:bg-orange-900 transition-colors"><Instagram className="w-4 h-4 text-orange-500"/></span> 
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
    </div>
  );
}