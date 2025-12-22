import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jerukmanis | Creative Agency",
  description: "Jasa videografi, fotografi, desain grafis, dan web development untuk UMKM. Ide Segar, Hasil Manis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${jakarta.variable} ${playfair.variable} font-sans antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}