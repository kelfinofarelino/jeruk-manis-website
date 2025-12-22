// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 overflow-hidden relative bg-grid-pattern">
      {/* Background blobs ... (kode sebelumnya) */}
      
      <div className="text-center relative z-10">
        {/* Angka 404 Besar ... (kode sebelumnya) */}
        <h1 className="text-[10rem] md:text-[12rem] font-black leading-none opacity-20 dark:opacity-10 select-none text-orange-900 dark:text-orange-500">
            404
        </h1>

        <div className="-mt-24 md:-mt-32 relative">
          {/* === IKON JERUK GELENG-GELENG === */}
          <div className="mb-4">
             {/* Container untuk animasi */}
            <div className="animate-shake-head">
              {/* SVG Jeruk Lucu Inline (Sangat Ringan) */}
              <svg className="w-24 h-24 md:w-32 md:h-32 text-orange-500 drop-shadow-lg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Badan Jeruk */}
                <circle cx="50" cy="55" r="40" fill="currentColor"/>
                <circle cx="50" cy="55" r="35" fill="#fb923c"/> {/* Warna orange-400 untuk bagian dalam */}
                
                {/* Bintik-bintik pori jeruk */}
                <circle cx="35" cy="45" r="2" fill="#ea580c" opacity="0.5"/>
                <circle cx="65" cy="45" r="2" fill="#ea580c" opacity="0.5"/>
                <circle cx="50" cy="75" r="2" fill="#ea580c" opacity="0.5"/>
                <circle cx="30" cy="65" r="2" fill="#ea580c" opacity="0.5"/>
                <circle cx="70" cy="65" r="2" fill="#ea580c" opacity="0.5"/>
                
                {/* Tangkai & Daun */}
                <path d="M50 15V5" stroke="#78350f" strokeWidth="4" strokeLinecap="round"/> {/* Tangkai coklat */}
                <path d="M50 15C50 15 65 5 75 15C85 25 70 30 55 25" fill="#65a30d"/> {/* Daun hijau */}
                
                {/* Mata (Opsional, hapus jika ingin jeruk polos) */}
                 <circle cx="38" cy="50" r="3" fill="#78350f"/>
                 <circle cx="62" cy="50" r="3" fill="#78350f"/>
                 {/* Mulut sedih kecil */}
                 <path d="M45 65C45 65 50 62 55 65" stroke="#78350f" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          {/* === END IKON JERUK === */}

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Waduh, <span className="font-serif italic text-jeruk-600">Si Jeruk </span>Bingung.
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto text-lg">
            Halaman yang kamu cari sepertinya tidak ada di kebun kami. Yuk balik ke beranda.
          </p>
          
          {/* Tombol ... (kode sebelumnya) */}
          <Link 
            href="/"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-orange-500 rounded-full hover:bg-orange-600 hover:-translate-y-1 shadow-lg hover:shadow-orange-500/50 active:scale-95 overflow-hidden"
          >
             Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}