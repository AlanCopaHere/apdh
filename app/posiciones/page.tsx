"use client";
import { motion } from 'framer-motion';
import { Trophy, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { EQUIPOS } from '@/lib/data';

export default function PosicionesPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-4 md:px-6 bg-white dark:bg-[#0a0f0d] transition-colors">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Cabecera Compacta */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <Link href="/" className="text-emerald-500 flex items-center gap-1 text-xs font-black uppercase mb-2 hover:opacity-80">
              <ArrowLeft size={14} /> Inicio
            </Link>
            <h1 className="text-3xl md:text-5xl font-black uppercase leading-none dark:text-white text-black">
              Tabla <span className="text-emerald-500">APDH</span>
            </h1>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-widest">Temporada 2025</p>
            <p className="font-black text-lg dark:text-white text-black">Apertura</p>
          </div>
        </div>

        {/* Contenedor de Tabla estilo Google/NBA */}
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-[10px] md:text-xs uppercase font-black text-gray-500 dark:text-gray-400">
                <th className="py-4 px-3 md:px-6 w-12 text-center">#</th>
                <th className="py-4 px-2">Club</th>
                <th className="py-4 px-2 text-center">PJ</th>
                <th className="py-4 px-2 text-center">PG</th>
                <th className="py-4 px-2 text-center hidden md:table-cell">PE</th>
                <th className="py-4 px-2 text-center hidden md:table-cell">PP</th>
                <th className="py-4 px-3 md:px-6 text-right">PTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {EQUIPOS.map((equipo, index) => (
                <tr key={equipo.nombre} className="hover:bg-gray-50 dark:hover:bg-emerald-500/5 transition-colors">
                  {/* Posición con indicador de color para el líder */}
                  <td className="py-4 px-3 md:px-6 text-center">
                    <span className={`text-sm font-black ${index < 2 ? 'text-emerald-500' : 'text-gray-400'}`}>
                      {equipo.pos}
                    </span>
                  </td>
                  
                  {/* Club con Logo */}
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 dark:bg-white/10 rounded-lg shrink-0 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-white/10">
                        {equipo.logo ? (
                          <img src={equipo.logo} alt={equipo.nombre} className="w-full h-full object-contain p-1" />
                        ) : (
                          <Trophy size={16} className="text-gray-400" />
                        )}
                      </div>
                      <span className="font-bold text-sm md:text-base dark:text-gray-100 text-gray-800 truncate max-w-25 md:max-w-none">
                        {equipo.nombre}
                      </span>
                    </div>
                  </td>

                  {/* Estadísticas */}
                  <td className="py-4 px-2 text-center text-sm font-medium dark:text-gray-300 text-gray-600">{equipo.pj}</td>
                  <td className="py-4 px-2 text-center text-sm font-medium dark:text-gray-300 text-gray-600">{equipo.pg}</td>
                  <td className="py-4 px-2 text-center text-sm font-medium dark:text-gray-300 text-gray-600 hidden md:table-cell">{equipo.pe}</td>
                  <td className="py-4 px-2 text-center text-sm font-medium dark:text-gray-300 text-gray-600 hidden md:table-cell">{equipo.pp}</td>
                  
                  {/* Puntos destacados */}
                  <td className="py-4 px-3 md:px-6 text-right">
                    <span className="text-base md:text-lg font-black text-black dark:text-white">
                      {equipo.pts}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Glosario Compacto */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start text-[10px] font-bold uppercase tracking-wider text-gray-500">
          <div className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Clasificación</div>
          <div>PJ: Partidos Jugados</div>
          <div>PG: Ganados</div>
          <div className="hidden md:block">PE: Empatados</div>
          <div className="hidden md:block">PP: Perdidos</div>
        </div>
      </motion.div>
    </main>
  );
}