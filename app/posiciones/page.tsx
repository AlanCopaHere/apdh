"use client";
import { motion } from 'framer-motion';
import { Trophy, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { EQUIPOS } from '@/lib/data';

export default function PosicionesPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-5xl mx-auto"
      >
        {/* Cabecera de la página */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <Link href="/" className="text-emerald-500 flex items-center gap-2 text-sm font-bold uppercase mb-4 hover:underline">
              <ArrowLeft size={16} /> Volver al inicio
            </Link>
            <h1 className="text-5xl md:text-4xl font-black uppercase leading-none">
              Tabla de <br/> <span className="text-emerald-500">Posiciones</span>
            </h1>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md flex items-center gap-4">
            <Trophy className="text-emerald-500" size={40} />
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Temporada</p>
              <p className="font-black text-2xl">Apertura 2025</p>
            </div>
          </div>
        </div>

        {/* Tabla Profesional */}
        <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-[12px] uppercase tracking-[0.3em] text-rose-400">
                  <th className="p-8">Posición</th>
                  <th className="p-8">Club</th>
                  <th className="p-8 text-center">PJ</th>
                  <th className="p-8 text-center">PG</th>
                  <th className="p-8 text-right font-black">Puntos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {EQUIPOS.map((equipo, index) => (
                  <motion.tr 
                    key={equipo.nombre}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-emerald-500/5 transition-all group"
                  >
                    <td className="p-8">
                      <span className={`
                        w-10 h-10 flex items-center justify-center rounded-full font-black
                        ${index === 0 ? 'bg-emerald-500 text-black' : 'bg-white/10 text-gray-400'}
                      `}>
                        {equipo.pos}
                      </span>
                    </td>
                    <td className="p-8">
                      <p className="font-bold text-xl group-hover:text-emerald-400 transition-colors">
                        {equipo.nombre}
                      </p>
                    </td>
                    <td className="p-8 text-center text-gray-400 font-medium">{equipo.pj}</td>
                    <td className="p-8 text-center text-gray-400 font-medium">{equipo.pg}</td>
                    <td className="p-8 text-right">
                      <span className="text-3xl font-black text-emerald-500 tabular-nums">
                        {equipo.pts}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Nota al pie */}
        <p className="mt-8 text-gray-500 text-sm italic text-center">
          * Los primeros 2 equipos clasifican directamente a la Gran Final Regional 2025.
        </p>
      </motion.div>
    </main>
  );
}