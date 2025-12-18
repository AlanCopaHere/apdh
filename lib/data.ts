// src/lib/data.ts
// export const EQUIPOS = [
//   { pos: 1, nombre: "Payrumani", pj: 5, pg: 4, pts: 12 },
//   { pos: 2, nombre: "Sajama", pj: 5, pg: 3, pts: 10 },
//   { pos: 3, nombre: "Alianza", pj: 5, pg: 2, pts: 7 },
//   { pos: 4, nombre: "25 De Julio", pj: 5, pg: 1, pts: 4 },
// ];

export const EQUIPOS = [
  { pos: 1, nombre: "Payrumani", logo: "/logos/PAYRUMANI.png", pj: 5, pg: 4, pe: 0, pp: 1, pts: 12 },
  { pos: 2, nombre: "Sajama", logo: "/logos/SAJAMA.png", pj: 5, pg: 3, pe: 1, pp: 1, pts: 10 },
  { pos: 3, nombre: "Alianza", logo: "/logos/ALIANZA.png", pj: 5, pg: 3, pe: 1, pp: 1, pts: 10 },
  { pos: 4, nombre: "25 De Julio", logo: "/logos/25 DE JULIO.png", pj: 5, pg: 3, pe: 1, pp: 1, pts: 10 },
  { pos: 5, nombre: "Stroyers", logo: "/logos/STROYERS.png", pj: 5, pg: 3, pe: 1, pp: 1, pts: 10 },
  { pos: 6, nombre: "Bolivar Nimbles", logo: "/logos/BOLIVAR NIMBLES.png", pj: 5, pg: 3, pe: 1, pp: 1, pts: 10 },
];

export const PARTIDOS = [
  { local: "Halcones", hora: "14:00", visitante: "Rayo FC", estado: "Pendiente" },
  { local: "Leones", hora: "16:30", visitante: "Dragones", estado: "Pendiente" },
];

// src/lib/data.ts (Añade esto al final)
export const CLUBES = [
  { 
    id: 1, 
    nombre: "Payrumani", 
    lema: "Payru uh-uh-uh-uh", 
    fundacion: "1998", 
    color: "from-emerald-500",
    estadio: "Cancha Payrumani",
  },
  { 
    id: 2, 
    nombre: "16 De Julio", 
    lema: "Relleno textual demostrativo", 
    fundacion: "2005", 
    color: "from-yellow-500",
    estadio: "Some Arena"
  },
  { 
    id: 3, 
    nombre: "Los Andes", 
    lema: "Lorem ipusun", 
    fundacion: "2010", 
    color: "from-rose-500",
    estadio: "Coliseo"
  },
  { 
    id: 4, 
    nombre: "Stroyers", 
    lema: "No me sé ningún lema", 
    fundacion: "2015", 
    color: "from-orange-600",
    estadio: "Coliseo"
  }
];