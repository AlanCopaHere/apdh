"use client";

import { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle2, ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";
// Importa tu cliente de supabase si ya lo tienes
import { supabase } from "@/lib/supabase";

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
  const [canSubmit, setCanSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => setCanSubmit(true), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanSubmit(false);
    }
  }, [step]);

  const [formData, setFormData] = useState<FormData>({
    dni: "", apellidoP: "", apellidoM: "", nombres: "",
    fechaNac: "", lugarNac: "", sexo: "", estadoCivil: "",
    fotoAnverso: null, fotoReverso: null,
    padreP: "", padreM: "", padreNom: "",
    madreP: "", madreM: "", madreNom: "",
    club: ""
  });

  const progress = (step / 3) * 100;

  // Handlers para Input Masking (Validación en tiempo real)
  const handleNameChange = (val: string, field: string) => {
    // 1. Evitar espacios al inicio
    if (val.length === 1 && val === " ") return;
    // 2. Solo permitir letras y espacios (Regex estricto)
    if (val !== "" && !/^[a-zA-Z\u00C0-\u00FF\s]+$/.test(val)) return;

    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleTextChange = (val: string, field: string) => {
    // 1. Evitar espacios al inicio
    if (val.length === 1 && val === " ") return;
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const validateStep = (currentStep: number) => {
    // Validar Paso 1
    if (currentStep === 1) {
      const textFields = [
        { val: formData.dni, label: "N° Documento De Identidad" },
        { val: formData.apellidoP, label: "Apellido Paterno" },
        { val: formData.apellidoM, label: "Apellido Materno" },
        { val: formData.nombres, label: "Nombre(s)" },
        { val: formData.fechaNac, label: "Fecha de Nacimiento" },
        { val: formData.lugarNac, label: "Lugar de Nacimiento" },
        { val: formData.sexo, label: "Sexo" },
        { val: formData.estadoCivil, label: "Estado Civil" }
      ];

      for (const field of textFields) {
        if (!field.val || field.val.trim() === "") {
          setErrorMessage(`El campo "${field.label}" es obligatorio.`);
          return false;
        }
      }

      if (!formData.fotoAnverso || !formData.fotoReverso) {
        setErrorMessage("Debes subir ambas fotos (Anverso y Reverso)");
        return false;
      }
    }

    // Validar Paso 2
    if (currentStep === 2) {
      const parentFields = [
        { val: formData.padreP, label: "Padre - Ap. Paterno" },
        { val: formData.padreNom, label: "Padre - Nombres" },
        { val: formData.madreP, label: "Madre - Ap. Paterno" },
        { val: formData.madreNom, label: "Madre - Nombres" }
      ];

      for (const field of parentFields) {
        if (!field.val || field.val.trim() === "") {
          setErrorMessage(`El campo "${field.label}" es obligatorio.`);
          return false;
        }
      }
    }

    // Validar Paso 3
    if (currentStep === 3) {
      if (!formData.club) {
        setErrorMessage("Debes seleccionar un club");
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const getEstadoCivilOptions = () => {
    const suffix = formData.sexo === "Mujer" ? "a" : "o";
    return [`Casad${suffix}`, `Solter${suffix}`, "Conviviendo", `Viud${suffix}`];
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (step !== 3) return;

    // Validar paso 3 antes de enviar
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    try {
      // 1. Subir Foto Anverso
      const fileAnverso = formData.fotoAnverso;
      let urlAnverso = "";
      if (fileAnverso) {
        const fileExt = fileAnverso.name.split('.').pop();
        const fileName = `${formData.dni}_anverso.${fileExt}`;
        const { data, error: uploadError } = await supabase.storage
          .from('fotos_carnet_anverso')
          .upload(fileName, fileAnverso, { upsert: true });

        if (uploadError) throw uploadError;
        urlAnverso = supabase.storage.from('fotos_carnet_anverso').getPublicUrl(fileName).data.publicUrl;
      }

      // 2. Subir Foto Reverso
      const fileReverso = formData.fotoReverso;
      let urlReverso = "";
      if (fileReverso) {
        const fileExt = fileReverso.name.split('.').pop();
        const fileName = `${formData.dni}_reverso.${fileExt}`;
        const { data, error: uploadError } = await supabase.storage
          .from('fotos_carnet_anverso')
          .upload(fileName, fileReverso, { upsert: true });

        if (uploadError) throw uploadError;
        urlReverso = supabase.storage.from('fotos_carnet_anverso').getPublicUrl(fileName).data.publicUrl;
      }

      // 3. Guardar datos en la tabla 'jugadores'
      const { error: dbError } = await supabase
        .from('jugadores_registrados')
        .insert([{
          dni: formData.dni,
          apellido_p: formData.apellidoP,
          apellido_m: formData.apellidoM,
          nombres: formData.nombres,
          fecha_nac: formData.fechaNac,
          lugar_nac: formData.lugarNac,
          sexo: formData.sexo,
          estado_civil: formData.estadoCivil,
          foto_anverso_url: urlAnverso,
          foto_reverso_url: urlReverso,
          padre_p: formData.padreP,
          padre_m: formData.padreM,
          padre_nom: formData.padreNom,
          madre_p: formData.madreP,
          madre_m: formData.madreM,
          madre_nom: formData.madreNom,
          club: formData.club
        }]);

      if (dbError) throw dbError;

      // Si todo sale bien
      setIsSuccess(true);
    } catch (error: any) {
      alert("Error al registrar: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
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
                <Divider label="Datos Personales" />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="N° Documento de identidad" required value={formData.dni} onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextChange(e.target.value, 'dni')} />
                  <Input label="Apellido Paterno" required value={formData.apellidoP} onChange={(e: ChangeEvent<HTMLInputElement>) => handleNameChange(e.target.value, 'apellidoP')} />
                  <Input label="Apellido Materno" required value={formData.apellidoM} onChange={(e: ChangeEvent<HTMLInputElement>) => handleNameChange(e.target.value, 'apellidoM')} />
                  <Input label="Nombre(s)" required value={formData.nombres} onChange={(e: ChangeEvent<HTMLInputElement>) => handleNameChange(e.target.value, 'nombres')} />
                </div>

                <Divider label="Datos Requeridos" />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="Fecha de Nacimiento" type="date" required value={formData.fechaNac} onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextChange(e.target.value, 'fechaNac')} />
                  <div className="space-y-1">
                    <Input label="Lugar de Nacimiento" required value={formData.lugarNac} onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextChange(e.target.value, 'lugarNac')} />
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

                <Divider label="Datos del Documento De Identidad" />
                <div className="grid md:grid-cols-2 gap-4">
                  <FileInput
                    label="Foto CI Anverso"
                    desc="Frontal del documento"
                    value={formData.fotoAnverso}
                    onChange={(file) => setFormData({ ...formData, fotoAnverso: file })}
                  />

                  <FileInput
                    label="Foto CI Reverso"
                    desc="Trasera del documento"
                    value={formData.fotoReverso}
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
                  <Input label="Apellido Paterno" required value={formData.padreP} onChange={(e: ChangeEvent<HTMLInputElement>) => handleNameChange(e.target.value, 'padreP')} />
                  <Input label="Apellido Materno" value={formData.padreM} onChange={(e: ChangeEvent<HTMLInputElement>) => handleNameChange(e.target.value, 'padreM')} />
                  <Input label="Nombres" required value={formData.padreNom} onChange={(e: ChangeEvent<HTMLInputElement>) => handleNameChange(e.target.value, 'padreNom')} />
                </div>
                <Divider label="Datos de la Madre" />
                <div className="grid md:grid-cols-3 gap-4">
                  <Input label="Apellido Paterno" required value={formData.madreP} onChange={(e: ChangeEvent<HTMLInputElement>) => handleNameChange(e.target.value, 'madreP')} />
                  <Input label="Apellido Materno" value={formData.madreM} onChange={(e: ChangeEvent<HTMLInputElement>) => handleNameChange(e.target.value, 'madreM')} />
                  <Input label="Nombres" required value={formData.madreNom} onChange={(e: ChangeEvent<HTMLInputElement>) => handleNameChange(e.target.value, 'madreNom')} />
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
                  {/* <label className="text-xs font-bold uppercase text-gray-500">Club Deportivo</label> */}
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
                <button type="submit" disabled={isSubmitting || !canSubmit} className="bg-white hover:bg-emerald-500 hover:text-white text-black font-black px-12 py-3 rounded-full transition-all disabled:opacity-50">
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

      {/* Error Modal */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setErrorMessage(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-red-500/10 border border-red-500/20 p-8 rounded-[30px] text-center max-w-sm w-full space-y-4 shadow-2xl shadow-red-500/10"
            >
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div>
              <h3 className="text-xl font-black uppercase text-white">Atención</h3>
              <p className="text-gray-300 text-sm font-medium">{errorMessage}</p>
              <button onClick={() => setErrorMessage(null)} className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors mt-4">
                ENTENDIDO
              </button>
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

function FileInput({
  label,
  desc,
  value,
  onChange
}: {
  label: string,
  desc: string,
  value?: File | null,
  onChange: (file: File | null) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-bold uppercase text-gray-500 ml-2">{label}</label>
      <label className="cursor-pointer group">
        <div className={`border-2 border-dashed p-6 rounded-2xl flex flex-col items-center gap-2 transition-all ${value ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/10 group-hover:border-emerald-500/50 bg-white/5'}`}>
          {value ? (
            <>
              <CheckCircle2 size={20} className="text-emerald-500" />
              <span className="text-xs font-bold text-white max-w-[200px] truncate text-center">{value.name}</span>
              <span className="text-[10px] text-emerald-500 uppercase">Archivo seleccionado</span>
            </>
          ) : (
            <>
              <Upload size={20} className="text-gray-500 group-hover:text-emerald-500" />
              <span className="text-[10px] text-gray-400 uppercase text-center">{desc}</span>
            </>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files ? e.target.files[0] : null;
            onChange(file);
          }}
        />
      </label>
    </div>
  );
}