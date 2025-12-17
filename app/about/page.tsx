"use client";
import { motion } from "framer-motion";
import { Trophy, Users, Calendar } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="pt-32 min-h-screen px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto space-y-12"
      >
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-black">SOBRE <span className="text-emerald-500">NOSOTROS</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Elevando el estándar del deporte regional a través de la transparencia y la competencia de alto nivel.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Aquí puedes reutilizar las tarjetas que hicimos antes */}
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
            <Trophy className="text-emerald-500 mb-4" size={32} />
            <h3 className="font-black uppercase mb-2">Misión</h3>
            <p className="text-sm text-gray-400">Fomentar el deporte integral en nuestra región.</p>
          </div>
          {/* ... más tarjetas */}
        </div>
      </motion.div>
    </main>
  );
}