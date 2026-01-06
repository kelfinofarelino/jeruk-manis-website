"use client";

import React, { useState, useRef } from "react";
import { QRCode } from 'react-qrcode-logo';
import { Download, Link as LinkIcon, QrCode, Sparkles, ChevronLeft, ScanLine } from "lucide-react";
import Link from "next/link";

export default function QrGeneratorPage() {
  const [text, setText] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  const qrColor = "#334155";
  const eyeColor = "#f97316";
  const bgColor = "#ffffff"; 
  
  const logoUrl = "/images/logo.png"; 

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png", 1.0);
      const a = document.createElement("a");
      a.download = "jerukmanis-qr-orange.png";
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF7ED] font-sans text-slate-800 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Blob Orange di pojok kanan atas */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-200/40 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      {/* Blob Kuning di pojok kiri bawah */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-200/40 rounded-full blur-[80px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

      {/* Navigasi Balik */}
      <div className="absolute top-6 left-6 z-20">
        <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-orange-600 transition-colors font-bold text-sm">
            <div className="bg-white p-2 rounded-xl shadow-sm border border-orange-100 group-hover:border-orange-300 transition-all">
                <ChevronLeft className="w-4 h-4" />
            </div>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">Kembali</span>
        </Link>
      </div>

      {/* --- MAIN CARD --- */}
      <div className="w-full max-w-4xl bg-white/60 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(249,115,22,0.1)] border border-white/50 relative z-10 mx-auto flex flex-col md:flex-row overflow-hidden">
        
        {/* KIRI: Input Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-xs font-bold tracking-wider uppercase w-fit mb-6 border border-orange-100">
                <Sparkles className="w-3 h-3" /> QR Generator Tool
            </div>

            <h1 className="font-extrabold text-3xl md:text-4xl text-slate-900 mb-4 leading-tight">
                Buat QR Code <span className="text-[#f97316]">Instan.</span>
            </h1>
            <p className="text-slate-500 mb-8 leading-relaxed">
                Ubah link undanganmu menjadi QR Code profesional dengan branding Jerukmanis.
            </p>

            <div className="space-y-6">
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide ml-1 mb-2 block">
                        Link Tujuan URL
                    </label>
                    <div className="relative group">
                        <input 
                            type="text" 
                            placeholder="https://jerukmanis.web.id/..." 
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full bg-white border-2 border-orange-100 rounded-xl py-4 pl-4 pr-12 text-sm font-bold text-slate-800 focus:outline-none focus:border-[#f97316] focus:ring-4 focus:ring-orange-100 transition-all shadow-sm placeholder:font-normal"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-300 group-focus-within:text-[#f97316] transition-colors">
                            <LinkIcon className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                <button 
                    onClick={downloadQR}
                    disabled={!text}
                    className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] ${
                        text 
                        ? "bg-[#f97316] text-white hover:bg-orange-600 hover:shadow-orange-500/40 cursor-pointer" 
                        : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                    }`}
                >
                    <Download className="w-4 h-4" /> Download PNG
                </button>
            </div>
        </div>

        {/* KANAN: Preview Section (Background Beda) */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-orange-50 to-[#FFF7ED] p-8 md:p-12 flex flex-col items-center justify-center border-l border-white/50 relative">

            <div className="absolute top-6 right-6 opacity-20">
                <QrCode className="w-24 h-24 text-orange-300 rotate-12" />
            </div>

            <div className="relative z-10">
                {text ? (
                    <div className="relative group">
                        <div className="absolute inset-0 bg-orange-400 blur-2xl opacity-20 group-hover:opacity-30 transition-opacity rounded-full"></div>
                        
                        <div ref={qrRef} className="bg-white p-6 rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-white relative transform transition-transform duration-500 group-hover:-translate-y-2">
                            <QRCode
                                value={text}
                                size={250}
                                bgColor={bgColor}
                                fgColor={qrColor}
                                qrStyle="squares"
                                eyeRadius={10}
                                eyeColor={eyeColor}
                                logoImage={logoUrl}
                                logoWidth={50}
                                logoHeight={50}
                                logoOpacity={1}
                                removeQrCodeBehindLogo={true}
                                logoPadding={5}
                                logoPaddingStyle="circle"
                            />
                        </div>
                        <div className="mt-6 flex justify-center gap-2 text-orange-600/60 text-xs font-medium uppercase tracking-widest animate-pulse">
                             <ScanLine className="w-4 h-4" /> Ready to Scan
                        </div>
                    </div>
                ) : (
                    <div className="text-center opacity-50 flex flex-col items-center">
                        <div className="w-48 h-48 border-4 border-dashed border-orange-200 rounded-[2rem] flex items-center justify-center mb-4">
                            <p className="text-xs text-orange-300 font-bold px-8">Preview akan muncul di sini</p>
                        </div>
                    </div>
                )}
            </div>
        </div>

      </div>

      <p className="mt-8 text-xs text-slate-400 font-medium">
        &copy; {new Date().getFullYear()} Jerukmanis Creative
      </p>
    </div>
  );
}