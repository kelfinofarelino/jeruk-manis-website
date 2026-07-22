"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, ArrowUpRight, X, Instagram, User, ChevronLeft, ChevronRight, Phone, Mail, QrCode } from "lucide-react";

// --- KOMPONEN FOOTER ---
const Footer = () => (
  <footer className="bg-slate-950 text-white py-16 border-t-4 border-jeruk-500 mt-auto">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
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
          <li>
            <Link href="https://wa.me/6281328945828" target="_blank" className="flex items-center gap-3 hover:text-jeruk-400 transition-colors cursor-pointer group">
              <span className="p-2 bg-slate-900 rounded-full group-hover:bg-jeruk-900 transition-colors"><Phone className="w-4 h-4 text-jeruk-500"/></span> 
              +62 81-328-945-828
            </Link>
          </li>
          <li>
            <Link href="mailto:hello@jerukmanis.web.id" className="flex items-center gap-3 hover:text-jeruk-400 transition-colors cursor-pointer group">
              <span className="p-2 bg-slate-900 rounded-full group-hover:bg-jeruk-900 transition-colors"><Mail className="w-4 h-4 text-jeruk-500"/></span> 
              hello@jerukmanis.web.id
            </Link>
          </li>
          <li>
            <Link href="https://instagram.com/jerukmanis.creative" target="_blank" className="flex items-center gap-3 hover:text-jeruk-400 transition-colors cursor-pointer group">
              <span className="p-2 bg-slate-900 rounded-full group-hover:bg-jeruk-900 transition-colors"><Instagram className="w-4 h-4 text-jeruk-500"/></span> 
              @jerukmanis.creative
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-lg mb-6 text-jeruk-100">Tools</h4>
        <ul className="space-y-4 text-slate-300 text-sm">
          <li>
            <Link href="/tools/qr-generator" className="flex items-center gap-3 hover:text-jeruk-400 transition-colors cursor-pointer group">
              <span className="p-2 bg-slate-900 rounded-full group-hover:bg-jeruk-900 transition-colors">
                <QrCode className="w-4 h-4 text-jeruk-500"/>
              </span> 
              QR Code Generator
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

export default function AllPortofolio() {
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPortfolios(data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Gagal memuat data:", err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!selectedItem || !selectedItem.mediaUrls || selectedItem.mediaUrls.length <= 1) return;

    const interval = setInterval(() => {
      setActiveMediaIndex((prevIndex) => 
        prevIndex === selectedItem.mediaUrls.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); 

    return () => clearInterval(interval);
  }, [selectedItem, activeMediaIndex]);

  const handleOpenModal = (item: any) => {
    setSelectedItem(item);
    setActiveMediaIndex(0);
    setTimeout(() => {
      setShowModal(true);
    }, 10); 
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setSelectedItem(null);
    }, 300); 
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-orange-200 selection:text-orange-900 font-sans">
      
      <main className="flex-grow pb-40 lg:pb-52">
        <nav className="bg-white/90 backdrop-blur-md shadow-sm py-4 px-6 sticky top-0 z-50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                  <Link href="/#portofolio" className="w-10 h-10 bg-slate-100 hover:bg-orange-50 rounded-full flex items-center justify-center text-slate-600 hover:text-orange-600 transition-all">
                      <ArrowLeft className="w-5 h-5" />
                  </Link>
                  <span className="font-bold text-lg text-slate-900">Semua <span className="font-serif italic text-orange-600">Panen</span></span>
              </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 mt-12">
          <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Eksplorasi Karya</h1>
              <p className="text-slate-500 text-lg">Kumpulan seluruh portofolio manis yang pernah kami kerjakan. Klik salah satu untuk melihat detail lengkapnya.</p>
          </div>

          {isLoading ? (
              <div className="flex justify-center items-center h-64">
                  <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
              </div>
          ) : portfolios.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
                  <p className="text-slate-500">Belum ada portofolio yang diunggah.</p>
              </div>
          ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {portfolios.map((item) => (
                      <div 
                        key={item.id} 
                        onClick={() => handleOpenModal(item)}
                        className="group relative overflow-hidden rounded-3xl aspect-[4/3] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 bg-slate-200"
                      >
                          <img src={item.mediaUrls?.[0]} alt={item.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"/>

                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                              <div>
                                  <span className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-2 block">{item.type}</span>
                                  <h3 className="text-white text-2xl font-bold">{item.title}</h3>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          )}
        </div>
      </main>

      <Footer />

      {/* --- MODAL POP-UP (MENGGUNAKAN GRID/FLEX CENTER FULLSCREEN AGAR 100% DI TENGAH) --- */}
      {selectedItem && (
        <div 
          onClick={handleCloseModal} 
          className={`fixed inset-0 z-50 bg-black/85 backdrop-blur-md grid place-items-center p-4 cursor-pointer transition-opacity duration-300 ease-out ${showModal ? 'opacity-100' : 'opacity-0'}`}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className={`bg-white w-full max-w-2xl max-h-[85vh] rounded-[2.5rem] shadow-2xl relative transition-all duration-300 ease-out transform cursor-default flex flex-col overflow-hidden ${showModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
          >
            
            <button 
              onClick={handleCloseModal}
              className="absolute top-3 right-3 z-30 w-9 h-9 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center transition-all shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="overflow-y-auto max-h-[85vh] flex flex-col">

              {/* 1. SLIDESHOW / VIEWER UTAMA */}
              <div className="relative bg-slate-950 h-72 md:h-80 w-full flex items-center justify-center overflow-hidden flex-shrink-0">
                {selectedItem.mediaUrls?.map((url: string, index: number) => {
                  const isVideo = url.endsWith('.mp4') || url.endsWith('.webm');
                  return (
                    <div 
                      key={index}
                      className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${index === activeMediaIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                    >
                      {isVideo ? (
                        <video controls src={url} className="w-full h-full object-contain bg-slate-950" />
                      ) : (
                        <img src={url} alt={`Preview ${index}`} className="w-full h-full object-contain bg-slate-950" />
                      )}
                    </div>
                  );
                })}

                {selectedItem.mediaUrls?.length > 1 && (
                  <>
                    <button 
                      onClick={() => setActiveMediaIndex(prev => (prev === 0 ? selectedItem.mediaUrls.length - 1 : prev - 1))}
                      className="absolute left-3 z-20 p-2 bg-black/50 hover:bg-black text-white rounded-full transition-all shadow-md"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setActiveMediaIndex(prev => (prev === selectedItem.mediaUrls.length - 1 ? 0 : prev + 1))}
                      className="absolute right-3 z-20 p-2 bg-black/50 hover:bg-black text-white rounded-full transition-all shadow-md"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 bg-black/60 backdrop-blur-md text-white text-[10px] px-2.5 py-0.5 rounded-full font-medium">
                  {activeMediaIndex + 1} / {selectedItem.mediaUrls?.length}
                </div>
              </div>

              {/* 2. THUMBNAIL LIST */}
              {selectedItem.mediaUrls?.length > 1 && (
                <div className="bg-slate-900 py-2.5 px-3 flex justify-center gap-2 overflow-x-auto flex-shrink-0 border-b border-slate-800">
                  {selectedItem.mediaUrls.map((url: string, idx: number) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveMediaIndex(idx)}
                      className={`relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${activeMediaIndex === idx ? "border-orange-500 scale-105 shadow-md shadow-orange-500/30" : "border-transparent opacity-50 hover:opacity-100"}`}
                    >
                      <img src={url} alt="Thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* 3. BAGIAN DESKRIPSI */}
              <div className="p-5 md:p-6 bg-white flex flex-col justify-between">
                <div className="flex justify-between items-start gap-3 mb-2">
                  <div className="flex flex-col items-start">
                    <span className="text-orange-600 font-extrabold text-[10px] uppercase tracking-wider bg-orange-50 px-3 py-1.5 rounded-full mb-1.5">{selectedItem.type}</span>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 pl-3">{selectedItem.title}</h2>
                  </div>
                  {selectedItem.instagramLink && (
                    <a 
                      href={selectedItem.instagramLink} 
                      target="_blank" 
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all shadow-md flex-shrink-0"
                    >
                      <Instagram className="w-3.5 h-3.5" /> Lihat di Instagram <ArrowUpRight className="w-3.5 h-3.5"/>
                    </a>
                  )}
                </div>

                {selectedItem.review && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 mt-1">
                    <p className="text-slate-700 italic text-xs md:text-sm leading-relaxed">"{selectedItem.review}"</p>
                    {selectedItem.customerName && (
                      <p className="text-[11px] font-bold text-slate-900 mt-1 flex items-center gap-1">
                        <User className="w-3 h-3 text-orange-500"/> — {selectedItem.customerName}
                      </p>
                    )}
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}