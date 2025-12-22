import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jerukmanis | Creative Agency & Event Organizer Jogja",
  description: "Creative Agency & Event Organizer Jogja",
  icons: {
    icon: '/brand-icon.png',
    shortcut: '/brand-icon.png',
    apple: '/brand-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/brand-icon.png" sizes="any" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}