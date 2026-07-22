import { NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";

const DATA_FILENAME = "portfolios-data.json";

// --- FUNGSI BANTUAN: AMBIL DATA DARI BLOB JSON ---
async function getPortfoliosFromBlob() {
  try {
    const { blobs } = await list();
    const dataBlob = blobs.find((b) => b.pathname === DATA_FILENAME);
    if (!dataBlob) return [];

    const response = await fetch(dataBlob.url, { cache: 'no-store' });
    if (!response.ok) return [];
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Gagal membaca data dari Blob:", error);
    return [];
  }
}

// --- FUNGSI BANTUAN: SIMPAN DATA KE BLOB JSON ---
async function savePortfoliosToBlob(portfolios: any[]) {
  // Hapus file json lama jika sudah ada supaya tidak menumpuk
  const { blobs } = await list();
  const oldBlob = blobs.find((b) => b.pathname === DATA_FILENAME);
  if (oldBlob) {
    await del(oldBlob.url);
  }

  // Upload ulang file json yang berisi data terbaru
  const jsonString = JSON.stringify(portfolios, null, 2);
  const file = new File([jsonString], DATA_FILENAME, { type: "application/json" });
  
  await put(DATA_FILENAME, file, {
    access: "public",
    addRandomSuffix: false, // Nama file tetap konsisten
  });
}

// --- GET: AMBIL SEMUA DATA PORTOFOLIO ---
export async function GET() {
  try {
    const portfolios = await getPortfoliosFromBlob();
    return NextResponse.json(portfolios, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data portofolio" }, { status: 500 });
  }
}

// --- POST: TAMBAH, UPDATE, ATAU HAPUS DATA ---
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, payload } = body;

    let currentPortfolios = await getPortfoliosFromBlob();

    if (action === "ADD") {
      const newItem = {
        id: Date.now().toString(),
        isPinned: false,
        ...payload,
      };
      currentPortfolios.unshift(newItem);
    } 
    else if (action === "UPDATE_ALL") {
      // Cek portofolio mana yang dihapus untuk membersihkan file media aslinya di Blob
      const newIds = new Set(payload.map((p: any) => p.id));
      const deletedPortfolios = currentPortfolios.filter((p) => !newIds.has(p.id));

      for (const item of deletedPortfolios) {
        if (item.mediaUrls && Array.isArray(item.mediaUrls)) {
          for (const url of item.mediaUrls) {
            try {
              await del(url); // Hapus file media dari Vercel Blob
            } catch (blobErr) {
              console.error(`Gagal menghapus file blob ${url}:`, blobErr);
            }
          }
        }
      }

      currentPortfolios = payload;
    }

    // Simpan daftar terbaru ke Vercel Blob
    await savePortfoliosToBlob(currentPortfolios);

    return NextResponse.json({ success: true, data: currentPortfolios }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}