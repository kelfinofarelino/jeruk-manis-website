"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      // Keadaan awal (sebelum masuk)
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      // Keadaan akhir (saat masuk)
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      // Durasi dan jenis animasi
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} 
    >
      {children}
    </motion.div>
  );
}