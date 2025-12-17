"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Trophy, Star } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-emerald-500/10 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge superior */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <Star size={14} className="text-emerald-500 fill-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
              Campeonato Oficial 2026
            </span>
          </div>

          {/* Título Principal */}
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none mb-6">
            DOMINA LA <br/>
            <span className="bg-linear-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">CANCHA</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            La Asociación de Provincial de Deportes Huachacalla (APDH) presenta el torneo más prestigioso de la región. Pasión, técnica y gloria en un solo lugar.
          </p>

          {/* Botones de Acción - Aquí conectamos las rutas */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link 
              href="/posiciones" 
              className="group bg-emerald-500 hover:bg-emerald-400 text-black px-10 py-5 rounded-2xl font-black text-sm uppercase flex items-center gap-3 transition-all hover:scale-105"
            >
              Ver Tabla de Posiciones
              <Trophy size={18} className="transition-transform group-hover:rotate-12" />
            </Link>

            <Link 
              href="/about" 
              className="px-10 py-5 rounded-2xl font-black text-sm uppercase border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2"
            >
              Conócenos
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Stats rápidas al pie (Opcional) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-12 w-full max-w-4xl px-6 grid grid-cols-3 gap-8 border-t border-white/5 pt-8 md:grid"
      >
        <div className="text-center">
          <p className="text-2xl font-black text-white italic">12</p>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Clubes</p>
        </div>
        <div className="text-center border-x border-white/10">
          <p className="text-2xl font-black text-white italic">+40</p>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Partidos</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-black text-emerald-500 italic">2026</p>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Edición</p>
        </div>
      </motion.div>
    </div>
  );
}