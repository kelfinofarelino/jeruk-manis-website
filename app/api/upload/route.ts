import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    // Ambil semua file yang dikirim dengan nama "files"
    const files = form.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "Tidak ada file yang diunggah." }, { status: 400 });
    }

    // Upload semua file secara paralel ke Vercel Blob
    const uploadPromises = files.map(async (file) => {
      // put() akan mengupload file dan mengembalikan URL publiknya
      const blob = await put(file.name, file, { 
        access: 'public',
        addRandomSuffix: true // <--- INI KUNCI JAWABANNYA BIAR NAMA FILE SELALU UNIK
      });
      return blob.url;
    });

    const urls = await Promise.all(uploadPromises);
    
    // Kembalikan daftar URL ke frontend
    return NextResponse.json({ urls });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Gagal mengunggah file." }, { status: 500 });
  }
}