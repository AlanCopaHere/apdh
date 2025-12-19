"use client";
import { motion } from 'framer-motion';
import { Shield, MapPin, Calendar } from 'lucide-react';
import { CLUBES } from '@/lib/data';

export default function ClubesPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter mb-4">
            Nuestros <span className="text-emerald-500">Clubes</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            La élite del deporte regional. Organizaciones comprometidas con el desarrollo técnico y humano.
          </p>
        </motion.div>

        {/* Grid de Clubes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLUBES.map((club, index) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
              {/* Decoración Superior con el color del club */}
              <div className={`h-24 w-full bg-linear-to-br ${club.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
              
              <div className="p-8 -mt-12">
                {/* Placeholder de Escudo */}
                <div className="w-20 h-20 bg-[#0a0f0d] border-2 border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:border-emerald-500 transition-colors">
                  {/* <Shield size={40} className="text-emerald-500" /> */}
                  <img src={club.logo} alt={club.nombre} className="w-full h-full object-contain p-1" />
                </div>

                <h3 className="text-2xl font-black uppercase mb-1 tracking-tight">
                  {club.nombre}
                </h3>
                <p className="text-emerald-500/80 text-xs font-bold italic uppercase tracking-widest mb-6">
                  {club.lema}
                </p>

                <div className="space-y-3 text-sm text-gray-400 border-t border-white/5 pt-6">
                  <div className="flex items-center gap-3">
                    <Calendar size={14} className="text-gray-600" />
                    <span>Fundado en {club.fundacion}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={14} className="text-gray-600" />
                    <span>{club.estadio}</span>
                  </div>
                </div>

                <button className="w-full mt-8 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5 transition-all active:scale-95">
                  Ver Plantilla
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}