import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "APDH",
  description: "Asociación Provincial de Deportes Huachacalla",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-[#0a0f0d] text-white antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}