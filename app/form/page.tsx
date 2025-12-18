"use client";

import { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle2, ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";
// Importa tu cliente de supabase si ya lo tienes
// import { supabase } from "@/lib/supabase"; 

const CLUBES = [
  "Payrumani", "16 De Julio", "25 De Julio", "Stroyers", "Sajama", "Alianza",
  "Atletico Junior", "Tunari", "Bolivar Nimbles", "San Jose", "Real Central",
  "Peñarol", "Los Andes", "Illimani", "Altiplano", "Cosmos", "Bolivar Rosario",
  "Esmeralda", "Florida"
].sort();

// Definimos la estructura de los datos para TypeScript
interface FormData {
  dni: string;
  apellidoP: string;
  apellidoM: string;
  nombres: string;
  fechaNac: string;
  lugarNac: string;
  sexo: string;
  estadoCivil: string;
  fotoAnverso: File | null;
  fotoReverso: File | null;
  padreP: string;
  padreM: string;
  padreNom: string;
  madreP: string;
  madreM: string;
  madreNom: string;
  club: string;
}

export default function RegistroJugador() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    dni: "", apellidoP: "", apellidoM: "", nombres: "",
    fechaNac: "", lugarNac: "", sexo: "", estadoCivil: "",
    fotoAnverso: null, fotoReverso: null,
    padreP: "", padreM: "", padreNom: "",
    madreP: "", madreM: "", madreNom: "",
    club: ""
  });

  const progress = (step / 3) * 100;

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const getEstadoCivilOptions = () => {
    const suffix = formData.sexo === "Mujer" ? "a" : "o";
    return [`Casad${suffix}`, `Solter${suffix}`, "Conviviendo", `Viud${suffix}`];
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <main className="pt-32 min-h-screen px-6 bg-black text-white pb-20">
      <div className="max-w-3xl mx-auto">

        {/* Progress Bar */}
        <div className="mb-12 space-y-4">
          <div className="flex justify-between text-xs uppercase tracking-widest text-emerald-500 font-bold">
            <span>Paso {step} de 3</span>
            <span>{Math.round(progress)}% Completado</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-emerald-500"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <Divider label="Datos Principales" />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="N° Documento" required onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, dni: e.target.value })} />
                  <Input label="Apellido Paterno" required onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, apellidoP: e.target.value })} />
                  <Input label="Apellido Materno" required onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, apellidoM: e.target.value })} />
                  <Input label="Nombre(s)" required onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, nombres: e.target.value })} />
                </div>

                <Divider label="Datos Puntuales" />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="Fecha de Nacimiento" type="date" required onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, fechaNac: e.target.value })} />
                  <div className="space-y-1">
                    <Input label="Lugar de Nacimiento" required onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, lugarNac: e.target.value })} />
                    <p className="text-[10px] text-gray-500 ml-2">Escribe el lugar tal cual indica tu documento.</p>
                  </div>
                  <Select
                    label="Sexo"
                    options={["Varón", "Mujer"]}
                    required
                    value={formData.sexo}
                    onChange={(val: string) => setFormData({ ...formData, sexo: val })}
                  />
                  <Select
                    label="Estado Civil"
                    options={getEstadoCivilOptions()}
                    required
                    value={formData.estadoCivil}
                    onChange={(val: string) => setFormData({ ...formData, estadoCivil: val })}
                  />
                </div>

                <Divider label="Datos del Documento" />
                <div className="grid md:grid-cols-2 gap-4">
                  <FileInput
                    label="Foto Anverso"
                    desc="Frontal del documento"
                    onChange={(file) => setFormData({ ...formData, fotoAnverso: file })}
                  />
                  <FileInput
                    label="Foto Reverso"
                    desc="Trasera del documento"
                    onChange={(file) => setFormData({ ...formData, fotoReverso: file })}
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <Divider label="Datos del Padre" />
                <div className="grid md:grid-cols-3 gap-4">
                  <Input label="Ap. Paterno" required onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, padreP: e.target.value })} />
                  <Input label="Ap. Materno" onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, padreM: e.target.value })} />
                  <Input label="Nombres" required onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, padreNom: e.target.value })} />
                </div>
                <Divider label="Datos de la Madre" />
                <div className="grid md:grid-cols-3 gap-4">
                  <Input label="Ap. Paterno" required onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, madreP: e.target.value })} />
                  <Input label="Ap. Materno" onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, madreM: e.target.value })} />
                  <Input label="Nombres" required onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, madreNom: e.target.value })} />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-black uppercase italic text-emerald-500">Selección de Club</h2>
                <div className="grid gap-4">
                  <label className="text-xs font-bold uppercase text-gray-500">Club Deportivo</label>
                  <Select
                    label="Club Deportivo"
                    options={CLUBES}
                    value={formData.club}
                    onChange={(val: string) => setFormData({ ...formData, club: val })}
                    placeholder="Selecciona un club..."
                    renderOption={(opt: string, isValue: boolean) => (
                      <div className={`flex items-center gap-2 ${isValue ? "" : ""}`}>
                        <img
                          src={`logos/${opt.toUpperCase()}.png`}
                          className="w-6 h-6 object-contain"
                          onError={(e: any) => { e.currentTarget.style.display = 'none'; }}
                        />
                        {isValue && <span>{opt}</span>}
                      </div>
                    )}
                  />
                  {formData.club && (
                    <div className="flex items-center gap-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                      <img
                        src={`logos/${formData.club.toUpperCase()}.png`}
                        alt="Logo"
                        className="w-12 h-12 object-contain"
                        onError={(e: any) => { e.currentTarget.src = 'https://via.placeholder.com/50?text=?'; }}
                      />
                      <span className="font-black uppercase tracking-widest">{formData.club}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between pt-8">
            {step > 1 && (
              <button type="button" onClick={handleBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <ChevronLeft size={20} /> Anterior
              </button>
            )}
            <div className="ml-auto">
              {step < 3 ? (
                <button type="button" onClick={handleNext} className="bg-emerald-500 hover:bg-emerald-400 text-black font-black px-8 py-3 rounded-full flex items-center gap-2 transition-all transform hover:scale-105">
                  Siguiente <ChevronRight size={20} />
                </button>
              ) : (
                <button type="submit" disabled={isSubmitting} className="bg-white hover:bg-emerald-500 hover:text-white text-black font-black px-12 py-3 rounded-full transition-all disabled:opacity-50">
                  {isSubmitting ? "PROCESANDO..." : "FINALIZAR REGISTRO"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <AnimatePresence>
        {isSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-6">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white/5 border border-white/10 p-12 rounded-[40px] text-center max-w-md space-y-6">
              <CheckCircle2 className="text-emerald-500 mx-auto" size={80} />
              <h2 className="text-3xl font-black uppercase">¡Registro Exitoso!</h2>
              <p className="text-gray-400">Los datos del jugador han sido guardados correctamente.</p>
              <button onClick={() => window.location.reload()} className="w-full py-4 bg-emerald-500 text-black font-black rounded-2xl">ENTENDIDO</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// COMPONENTES AUXILIARES CON TIPOS
function Divider({ label }: { label: string }) {
  return (
    <div className="relative py-4">
      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
      <div className="relative flex justify-start"><span className="bg-black pr-4 text-[10px] font-black uppercase tracking-widest text-emerald-500/50">{label}</span></div>
    </div>
  );
}

function Input({ label, type = "text", ...props }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-bold uppercase text-gray-500 ml-2">{label}</label>
      <input type={type} {...props} className="bg-white/5 border border-white/10 p-3 rounded-xl focus:border-emerald-500 outline-none transition-all text-sm w-full" />
    </div>
  );
}

function Select({ label, options, value, onChange, placeholder = "Seleccionar...", renderOption }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-2" ref={containerRef}>
      <label className="text-[10px] font-bold uppercase text-gray-500 ml-2">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-white/5 border border-white/10 p-3 rounded-xl flex items-center justify-between transition-all text-sm outline-none ${isOpen ? 'border-emerald-500 ring-1 ring-emerald-500' : 'hover:border-white/20'}`}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            {value && renderOption && renderOption(value, true)}
            <span className={`truncate ${value ? "text-white" : "text-gray-500"}`}>
              {value ? (renderOption ? null : value) : placeholder}
            </span>
          </div>
          <ChevronDown size={16} className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ml-2 shrink-0`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 top-full left-0 right-0 mt-2 bg-black border border-white/10 rounded-xl overflow-hidden shadow-xl shadow-black/50 max-h-60 overflow-y-auto"
            >
              {options.map((opt: string) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-white/10 transition-colors flex items-center justify-between ${value === opt ? 'bg-emerald-500/10 text-emerald-500' : 'text-gray-300'}`}
                >
                  <div className="flex items-center gap-2 w-full">
                    {renderOption && renderOption(opt, false)}
                    <span>{opt}</span>
                  </div>
                  {value === opt && <CheckCircle2 size={14} className="ml-2 shrink-0" />}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FileInput({ label, desc, onChange }: { label: string, desc: string, onChange: (file: File | null) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-bold uppercase text-gray-500 ml-2">{label}</label>
      <label className="cursor-pointer group">
        <div className="border-2 border-dashed border-white/10 group-hover:border-emerald-500/50 p-6 rounded-2xl flex flex-col items-center gap-2 transition-all bg-white/5">
          <Upload size={20} className="text-gray-500 group-hover:text-emerald-500" />
          <span className="text-[10px] text-gray-400 uppercase text-center">{desc}</span>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : null;
            onChange(file);
          }}
        />
      </label>
    </div>
  );
}