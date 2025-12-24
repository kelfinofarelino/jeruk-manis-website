'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 text-center bg-grid-pattern relative overflow-hidden">
        
      {/* Background blob */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full filter blur-3xl -z-10"></div>

      {/* Ikon Warning Berdenyut */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-full mb-6 shadow-xl shadow-orange-500/10 animate-pulse-orange">
        <svg className="w-20 h-20 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>

      <h2 className="text-4xl font-black text-gray-800 dark:text-white mb-2 tracking-tight">
        Houston, Kita Punya Masalah!
      </h2>
      
      <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg text-lg">
        Sistem kami mengalami sedikit gangguan teknis. Jangan khawatir, ini bukan salahmu. Coba muat ulang sebentar lagi ya.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Tombol Coba Lagi */}
        <button
          onClick={() => reset()}
          className="px-8 py-4 text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/30 font-bold active:scale-95"
        >
          Coba Muat Ulang ↻
        </button>

        {/* Tombol Pulang */}
        <a 
            href="/" 
            className="px-8 py-4 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover:-translate-y-1 font-semibold active:scale-95"
        >
            Ke Beranda Saja
        </a>
      </div>
    </div>
  )
}