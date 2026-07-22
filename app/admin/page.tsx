"use client";

import { useState, useEffect } from "react";
import imageCompression from "browser-image-compression"; 
import { 
  Trash2, Pin, Plus, Loader2, LayoutDashboard, 
  Briefcase, Settings, LogOut, Lock, Instagram, User, Image as ImageIcon, X, FileVideo, Edit3
} from "lucide-react";

// --- TIPE DATA ---
type Portfolio = {
  id: string;
  title: string;
  type: string;
  mediaUrls: string[]; 
  instagramLink: string; 
  customerName: string; 
  review: string;
  isPinned: boolean;
};

// --- DATA DUMMY LOGIN ---
const USERS = {
  "admin": { password: "123", role: "admin", name: "Super Admin" },
  "staff": { password: "123", role: "staff", name: "Editor Kreatif" }
};

// --- FUNGSI BANTUAN UNTUK FORMAT UKURAN FILE ---
const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default function AdminDashboard() {
  // --- AUTH STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authUser, setAuthUser] = useState<{username: string, role: string, name: string} | null>(null);
  
  // Login Form State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // --- PORTFOLIO STATE ---
  const [activeMenu, setActiveMenu] = useState("portfolio");
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  
  // STATE UNTUK EDIT
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Portfolio
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [instagramLink, setInstagramLink] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [review, setReview] = useState("");

  // --- CEK SESSION SAAT HALAMAN DIBUKA ---
  useEffect(() => {
    const session = sessionStorage.getItem("admin_session");
    if (session) {
      setAuthUser(JSON.parse(session));
      setIsLoggedIn(true);
      fetchPortfolios();
    } else {
      setIsLoading(false);
    }
  }, []);

  // --- FUNGSI LOGIN & LOGOUT ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = USERS[username as keyof typeof USERS];
    
    if (user && user.password === password) {
      const userData = { username, role: user.role, name: user.name };
      sessionStorage.setItem("admin_session", JSON.stringify(userData));
      setAuthUser(userData);
      setIsLoggedIn(true);
      setLoginError("");
      fetchPortfolios();
    } else {
      setLoginError("Username atau password salah!");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_session");
    setIsLoggedIn(false);
    setAuthUser(null);
    setUsername("");
    setPassword("");
  };

  // --- FUNGSI AMBIL DATA PORTFOLIO ---
  const fetchPortfolios = () => {
    setIsLoading(true);
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPortfolios(data);
        else setPortfolios([]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data admin:", err);
        setPortfolios([]);
        setIsLoading(false);
      });
  };

  // --- RESET FORM ---
  const resetForm = () => {
    setEditingId(null);
    setTitle(""); 
    setType(""); 
    setSelectedFiles([]); 
    setInstagramLink(""); 
    setCustomerName(""); 
    setReview("");
  };

  // --- FUNGSI HANDLE FILE ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
    e.target.value = ""; 
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  // --- FUNGSI KLIK EDIT (POPULATE FORM) ---
  const handleEditClick = (item: Portfolio) => {
    setEditingId(item.id);
    setTitle(item.title);
    setType(item.type);
    setInstagramLink(item.instagramLink || "");
    setCustomerName(item.customerName || "");
    setReview(item.review || "");
    setSelectedFiles([]); 
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- FUNGSI SUBMIT (TAMBAH & EDIT) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // JIKA DALAM MODE EDIT
      if (editingId) {
        setLoadingText("Menyimpan Perubahan...");
        
        const updatedPortfolios = portfolios.map((p) => {
          if (p.id === editingId) {
            return { ...p, title, type, instagramLink, customerName, review };
          }
          return p;
        });

        const kvRes = await fetch("/api/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "UPDATE_ALL", payload: updatedPortfolios }),
        });
        
        if (kvRes.ok) {
          setPortfolios(updatedPortfolios);
          resetForm();
          alert("Karya berhasil diperbarui!");
        } else {
          throw new Error("Gagal memperbarui data");
        }
      } 
      
      // JIKA DALAM MODE TAMBAH BARU
      else {
        if (selectedFiles.length < 3) {
          alert("Wajib mengunggah minimal 3 foto/video!");
          setIsSaving(false);
          return;
        }

        setLoadingText("Mengompresi Gambar...");
        const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };

        const compressedFiles = await Promise.all(
          selectedFiles.map(async (file) => {
            if (file.type.startsWith("image/")) {
              try {
                const compressedBlob = await imageCompression(file, options);
                return new File([compressedBlob], file.name, { type: file.type });
              } catch (error) {
                console.error(`Gagal kompresi ${file.name}`, error);
                return file; 
              }
            }
            return file; 
          })
        );

        // Tahap 1: Upload ke Vercel Blob via /api/upload
        setLoadingText("Mengunggah ke Server...");
        const formData = new FormData();
        compressedFiles.forEach((file) => formData.append("files", file));

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error || "Gagal upload file");
        
        // Tahap 2: Simpan Data ke Vercel KV via /api/portfolio
        setLoadingText("Menyimpan Portofolio...");
        const payload = { 
          title, 
          type, 
          mediaUrls: uploadData.urls, // URL hasil upload dari Blob
          instagramLink, 
          customerName, 
          review 
        };
        
        const kvRes = await fetch("/api/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "ADD", payload }),
        });
        
        if (kvRes.ok) {
          const { data } = await kvRes.json();
          setPortfolios(data); // Memperbarui tampilan list portofolio
          resetForm();
        } else {
          throw new Error("Gagal menyimpan data ke database");
        }
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat memproses portofolio.");
    } finally {
      setIsSaving(false);
      setLoadingText("");
    }
  };

  // --- FUNGSI PIN PORTFOLIO ---
  const handleTogglePin = async (id: string) => {
    if (authUser?.role !== "admin") {
        alert("Maaf, hanya Admin yang dapat menyematkan (Pin) portofolio ke Beranda.");
        return;
    }

    const updated = portfolios.map((p) => {
      if (p.id === id) return { ...p, isPinned: !p.isPinned };
      return p;
    });
    
    if (updated.filter(p => p.isPinned).length > 3) {
        alert("Maksimal hanya 3 Portofolio yang bisa di-Pin!");
        return;
    }

    setPortfolios(updated);
    await fetch("/api/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "UPDATE_ALL", payload: updated }),
    });
  };

  // --- FUNGSI HAPUS PORTFOLIO ---
  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus ini? Data dan file di Blob akan terhapus permanen.")) return;
    const updated = portfolios.filter((p) => p.id !== id);
    setPortfolios(updated);
    await fetch("/api/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "UPDATE_ALL", payload: updated }),
    });
  };

  // --- TAMPILAN LOGIN ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 selection:bg-orange-200">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-slate-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
            <p className="text-sm text-slate-500 mt-2">Masuk untuk mengelola Jerukmanis.</p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl text-center font-medium border border-red-100">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-bold text-slate-700">Username</label>
              <input 
                type="text" required value={username} onChange={e=>setUsername(e.target.value)} 
                className="w-full p-3 border-2 border-slate-100 rounded-xl bg-slate-50 mt-1 focus:border-orange-500 focus:bg-white transition-all focus:outline-none" 
                placeholder="admin / staff" 
              />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700">Password</label>
              <input 
                type="password" required value={password} onChange={e=>setPassword(e.target.value)} 
                className="w-full p-3 border-2 border-slate-100 rounded-xl bg-slate-50 mt-1 focus:border-orange-500 focus:bg-white transition-all focus:outline-none" 
                placeholder="123" 
              />
            </div>
            <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg hover:shadow-orange-500/25 mt-2">
              Masuk Dashboard
            </button>
          </form>

          <div className="mt-8 p-4 bg-blue-50 rounded-xl text-xs text-blue-700">
            <strong>Info Akun Dummy:</strong><br/>
            - Admin (Bisa Pin): <code>admin</code> | pass: <code>123</code><br/>
            - Staff (Hanya Input): <code>staff</code> | pass: <code>123</code>
          </div>
        </div>
      </div>
    );
  }

  // --- TAMPILAN DASHBOARD ADMIN ---
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans selection:bg-orange-200">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 flex-shrink-0">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white tracking-tight">
            jeruk<span className="text-orange-500 font-serif italic">manis</span>.
          </h2>
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500 mt-1 block">Workspace</span>
        </div>

        <div className="p-6 border-b border-slate-800 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-orange-500 font-bold">
                {authUser?.name.charAt(0)}
            </div>
            <div>
                <p className="font-bold text-white text-sm">{authUser?.name}</p>
                <p className="text-xs text-orange-400 capitalize">{authUser?.role}</p>
            </div>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          <button onClick={() => setActiveMenu('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeMenu === 'dashboard' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'hover:bg-slate-800 hover:text-white'}`}>
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button onClick={() => setActiveMenu('portfolio')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeMenu === 'portfolio' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'hover:bg-slate-800 hover:text-white'}`}>
            <Briefcase className="w-5 h-5" /> Portofolio
          </button>
          <button onClick={() => alert('Fitur Pengaturan Segera Hadir')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm hover:bg-slate-800 hover:text-white">
            <Settings className="w-5 h-5" /> Pengaturan
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all font-medium text-sm bg-slate-800 text-red-400 hover:bg-red-500 hover:text-white">
            <LogOut className="w-4 h-4" /> Keluar
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow p-6 md:p-10 h-screen overflow-y-auto">
        
        {/* Konten Dashboard */}
        {activeMenu === 'dashboard' && (
            <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Selamat Datang, {authUser?.name}!</h1>
                <p className="text-slate-500 mb-8">Pilih menu di samping untuk mulai mengelola website.</p>
                <div className="p-8 bg-orange-100 text-orange-800 rounded-3xl border border-orange-200 text-center font-medium">
                    Pilih menu <strong className="font-bold">Portofolio</strong> untuk mengunggah karya baru.
                </div>
            </div>
        )}

        {/* Konten Portofolio */}
        {activeMenu === 'portfolio' && (
            <>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Kelola Portofolio</h1>
                    <p className="text-slate-500">Upload karya terbaru dan pilih 3 karya terbaik untuk di-pin ke Beranda.</p>
                </div>
                
                <div className="grid xl:grid-cols-3 gap-8">
                    
                    {/* FORM INPUT PORTFOLIO */}
                    <div className="xl:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-slate-200 h-fit">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className={`text-xl font-bold flex items-center gap-2 ${editingId ? "text-blue-600" : "text-slate-800"}`}>
                            {editingId ? <Edit3 className="w-5 h-5"/> : <Plus className="w-5 h-5 text-orange-500"/>} 
                            {editingId ? "Edit Karya" : "Tambah Karya"}
                        </h2>
                        {editingId && (
                            <button onClick={resetForm} className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-200 font-bold transition-colors">
                                Batal
                            </button>
                        )}
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-bold text-slate-700">Judul Karya <span className="text-red-500">*</span></label>
                            <input required value={title} onChange={e=>setTitle(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 mt-1 focus:outline-none focus:border-orange-500 focus:bg-white text-sm" placeholder="Contoh: Neon Night Party" />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-slate-700">Kategori Layanan <span className="text-red-500">*</span></label>
                            <input required value={type} onChange={e=>setType(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 mt-1 focus:outline-none focus:border-orange-500 focus:bg-white text-sm" placeholder="Contoh: Sweet 17 Specialist" />
                        </div>
                        
                        {/* INPUT FILE HANYA MUNCUL SAAT TAMBAH BARU */}
                        {!editingId && (
                          <div>
                              <label className="text-sm font-bold text-slate-700 flex items-center gap-1 mb-2">
                                  <ImageIcon className="w-4 h-4"/> Upload Media (Min. 3 Foto/Video) <span className="text-red-500">*</span>
                              </label>
                              
                              <label className="w-full flex flex-col items-center justify-center p-4 border-2 border-dashed border-orange-300 rounded-xl bg-orange-50 text-orange-600 cursor-pointer hover:bg-orange-100 transition-colors">
                                <Plus className="w-6 h-6 mb-1" />
                                <span className="text-sm font-bold">Pilih File (Bisa diulang)</span>
                                <input 
                                    type="file" 
                                    multiple 
                                    accept="image/*,video/*" 
                                    onChange={handleFileChange} 
                                    className="hidden" 
                                />
                              </label>

                              {selectedFiles.length > 0 && (
                                  <div className="mt-4">
                                    <ul className="space-y-3 mb-3 max-h-56 overflow-y-auto pr-1">
                                      {selectedFiles.map((file, idx) => (
                                        <li key={idx} className="flex justify-between items-center text-xs p-2 bg-white border border-slate-200 rounded-xl shadow-sm">
                                          <div className="flex items-center gap-3 overflow-hidden mr-2">
                                            <div className="w-12 h-12 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex items-center justify-center">
                                              {file.type.startsWith("image/") ? (
                                                <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                                              ) : file.type.startsWith("video/") ? (
                                                <video src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
                                              ) : (
                                                <FileVideo className="w-5 h-5 text-slate-400" />
                                              )}
                                            </div>
                                            <div className="flex flex-col overflow-hidden">
                                              <span className="truncate font-semibold text-slate-700 text-sm" title={file.name}>{file.name}</span>
                                              <span className="text-slate-400 mt-0.5 font-medium">{formatBytes(file.size)}</span>
                                            </div>
                                          </div>
                                          <button type="button" onClick={() => handleRemoveFile(idx)} className="text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-lg transition-colors flex-shrink-0">
                                            <X className="w-4 h-4" />
                                          </button>
                                        </li>
                                      ))}
                                    </ul>
                                    <p className={`text-xs font-bold ${selectedFiles.length < 3 ? "text-red-500" : "text-green-600"}`}>
                                        Total: {selectedFiles.length} file dipilih {selectedFiles.length < 3 ? `(Kurang ${3 - selectedFiles.length} lagi)` : "✅ Siap Upload"}
                                    </p>
                                  </div>
                              )}
                          </div>
                        )}

                        <div className={`pt-4 ${!editingId ? 'border-t border-slate-100' : ''}`}>
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-1"><Instagram className="w-4 h-4"/> Link Postingan Instagram (Opsional)</label>
                            <input type="url" value={instagramLink} onChange={e=>setInstagramLink(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 mt-1 focus:outline-none focus:border-orange-500 focus:bg-white text-sm" placeholder="https://instagram.com/p/..." />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-1"><User className="w-4 h-4"/> Nama Customer (Opsional)</label>
                            <input type="text" value={customerName} onChange={e=>setCustomerName(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 mt-1 focus:outline-none focus:border-orange-500 focus:bg-white text-sm" placeholder="Mba Clarissa" />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-slate-700">Review Customer (Opsional)</label>
                            <textarea value={review} onChange={e=>setReview(e.target.value)} rows={3} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 mt-1 focus:outline-none focus:border-orange-500 focus:bg-white text-sm" placeholder="Keren banget acaranya..."></textarea>
                        </div>
                        
                        <button disabled={isSaving} className={`w-full py-4 text-white rounded-xl font-bold transition-colors flex justify-center items-center gap-2 mt-6 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${editingId ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-900/20' : 'bg-slate-900 hover:bg-orange-600 shadow-slate-900/10'}`}>
                          {isSaving ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin"/> 
                              {loadingText || "Memproses..."}
                            </>
                          ) : (
                            editingId ? "Simpan Perubahan" : "Simpan Portofolio"
                          )}
                        </button>
                    </form>
                    </div>

                    {/* LIST PORTOFOLIO */}
                    <div className="xl:col-span-2 space-y-4">
                        <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                            <h2 className="font-bold text-slate-800">Total Data: {portfolios.length}</h2>
                            {isLoading && <Loader2 className="w-5 h-5 animate-spin text-orange-500"/>}
                        </div>

                        {portfolios.map((item) => (
                            <div key={item.id} className={`bg-white p-5 rounded-3xl shadow-sm border flex flex-col sm:flex-row gap-5 items-start sm:items-center transition-all ${editingId === item.id ? 'border-blue-500 ring-4 ring-blue-50 scale-[1.01]' : 'border-slate-200 hover:shadow-md'}`}>
                                <img src={item.mediaUrls?.[0]} alt={item.title} className="w-full sm:w-32 h-32 object-cover rounded-2xl bg-slate-100 flex-shrink-0 border border-slate-100" />
                                
                                <div className="flex-grow">
                                    <div className="flex gap-2 items-center mb-1">
                                        <span className="text-[10px] font-extrabold text-orange-600 bg-orange-100 px-2 py-1 rounded-md uppercase tracking-wider">{item.type}</span>
                                        {item.isPinned && <span className="text-[10px] font-extrabold text-green-700 bg-green-100 px-2 py-1 rounded-md flex items-center gap-1"><Pin className="w-3 h-3"/> Ter-Pin</span>}
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-xl">{item.title}</h3>
                                    
                                    <div className="mt-2 text-xs text-slate-500 space-y-1">
                                        {item.customerName && <p className="flex items-center gap-1"><User className="w-3 h-3"/> {item.customerName}</p>}
                                        {item.instagramLink && (
                                            <a href={item.instagramLink} target="_blank" className="flex items-center gap-1 text-blue-500 hover:underline">
                                                <Instagram className="w-3 h-3"/> Lihat di IG
                                            </a>
                                        )}
                                        {item.review && <p className="italic bg-slate-50 p-2 rounded-lg mt-2 border border-slate-100">"{item.review.substring(0, 50)}{item.review.length > 50 ? '...' : ''}"</p>}
                                    </div>
                                </div>

                                <div className="flex sm:flex-col gap-2 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                                    <button 
                                        onClick={() => handleEditClick(item)} 
                                        className="flex-1 sm:flex-none p-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
                                    >
                                        <Edit3 className="w-5 h-5" />
                                        <span className="sm:hidden text-sm font-bold">Edit</span>
                                    </button>

                                    {authUser?.role === "admin" ? (
                                        <button 
                                            title="Sematkan ke Beranda"
                                            onClick={() => handleTogglePin(item.id)} 
                                            className={`flex-1 sm:flex-none p-3 rounded-xl transition-all flex items-center justify-center gap-2 ${item.isPinned ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" : "bg-slate-100 text-slate-500 hover:bg-orange-100 hover:text-orange-600"}`}
                                        >
                                            <Pin className="w-5 h-5" />
                                            <span className="sm:hidden text-sm font-bold">{item.isPinned ? 'Lepas Pin' : 'Pin'}</span>
                                        </button>
                                    ) : (
                                        <button 
                                            title="Hanya Admin yang bisa Pin"
                                            disabled
                                            className="flex-1 sm:flex-none p-3 rounded-xl bg-slate-50 text-slate-300 cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            <Lock className="w-5 h-5" />
                                            <span className="sm:hidden text-sm font-bold">Terkunci</span>
                                        </button>
                                    )}

                                    <button 
                                        onClick={() => handleDelete(item.id)} 
                                        className="flex-1 sm:flex-none p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                        <span className="sm:hidden text-sm font-bold">Hapus</span>
                                    </button>
                                </div>
                            </div>
                        ))}

                        {!isLoading && portfolios.length === 0 && (
                            <div className="text-center p-12 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                                <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                <h3 className="font-bold text-slate-700 text-lg">Belum Ada Karya</h3>
                                <p className="text-slate-500">Mulai tambahkan portofolio di form sebelah kiri.</p>
                            </div>
                        )}
                    </div>
                </div>
            </>
        )}
      </main>
    </div>
  );
}