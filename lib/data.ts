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
    logo: "/logos/PAYRUMANI.png"
  },
  { 
    id: 2, 
    nombre: "16 De Julio", 
    lema: "Relleno textual demostrativo", 
    fundacion: "2005", 
    color: "from-yellow-500",
    estadio: "Some Arena",
    logo: "/logos/16 DE JULIO.png"
  },
  { 
    id: 3, 
    nombre: "Los Andes", 
    lema: "Lorem ipusun", 
    fundacion: "2010", 
    color: "from-red-500",
    estadio: "Coliseo",
    logo: "/logos/LOS ANDES.png"
  },
  { 
    id: 4, 
    nombre: "Stroyers", 
    lema: "No me sé ningún lema", 
    fundacion: "2015", 
    color: "from-orange-600",
    estadio: "Coliseo",
    logo: "/logos/STROYERS.png"
  },
  { 
    id: 5, 
    nombre: "Bolívar Rosario", 
    lema: "No me sé ningún lema", 
    fundacion: "2015", 
    color: "from-blue-600",
    estadio: "Coliseo",
    logo: "/logos/BOLIVAR ROSARIO.png"
  },
  { 
    id: 6, 
    nombre: "Bolívar Nimbles", 
    lema: "No me sé ningún lema", 
    fundacion: "2015", 
    color: "from-rose-600",
    estadio: "Coliseo",
    logo: "/logos/BOLIVAR NIMBLES.png"
  },
  { 
    id: 7, 
    nombre: "Alianza", 
    lema: "No me sé ningún lema", 
    fundacion: "2015", 
    color: "from-indigo-600",
    estadio: "Coliseo",
    logo: "/logos/ALIANZA.png"
  },
  { 
    id: 8, 
    nombre: "25 De Julio", 
    lema: "No me sé ningún lema", 
    fundacion: "2015", 
    color: "from-lime-600",
    estadio: "Coliseo",
    logo: "/logos/25 DE JULIO.png"
  },
  { 
    id: 9, 
    nombre: "Sajama", 
    lema: "No me sé ningún lema", 
    fundacion: "2015", 
    color: "from-green-600",
    estadio: "Coliseo",
    logo: "/logos/SAJAMA.png"
  },
  { 
    id: 10, 
    nombre: "Tunari", 
    lema: "No me sé ningún lema", 
    fundacion: "2015", 
    color: "from-blue-800",
    estadio: "Coliseo",
    logo: "/logos/TUNARI.png"
  },
  { 
    id: 11, 
    nombre: "San José", 
    lema: "No me sé ningún lema", 
    fundacion: "2015", 
    color: "from-sky-500",
    estadio: "Coliseo",
    logo: "/logos/SAN JOSE.png"
  },
  { 
    id: 12, 
    nombre: "Atlético Junior", 
    lema: "No me sé ningún lema", 
    fundacion: "2015", 
    color: "from-yellow-500",
    estadio: "Coliseo",
    logo: "/logos/ATLETICO JUNIOR.png"
  },
  { 
    id: 13, 
    nombre: "Florida", 
    lema: "No me sé ningún lema", 
    fundacion: "2015", 
    color: "from-emerald-500",
    estadio: "Coliseo",
    logo: "/logos/FLORIDA.png"
  },
  { 
    id: 14, 
    nombre: "Esmeralda", 
    lema: "No me sé ningún lema", 
    fundacion: "2015", 
    color: "from-cyan-400",
    estadio: "Coliseo",
    logo: "/logos/ESMERALDA.png"
  },
  { 
    id: 15, 
    nombre: "Real Central", 
    lema: "No me sé ningún lema", 
    fundacion: "2015", 
    color: "from-red-400",
    estadio: "Coliseo",
    logo: "/logos/REAL CENTRAL.png"
  },
  { 
    id: 16, 
    nombre: "Cosmos", 
    lema: "No me sé ningún lema", 
    fundacion: "2015", 
    color: "from-red-600",
    estadio: "Coliseo",
    logo: "/logos/COSMOS.png"
  },
  { 
    id: 17, 
    nombre: "Illimani", 
    lema: "No me sé ningún lema", 
    fundacion: "2015", 
    color: "from-sky-600",
    estadio: "Coliseo",
    logo: "/logos/ILLIMANI.png"
  },
  { 
    id: 18, 
    nombre: "Altiplano", 
    lema: "No me sé ningún lema", 
    fundacion: "2015", 
    color: "from-green-500",
    estadio: "Coliseo",
    logo: "/logos/ALTIPLANO.png"
  },
  { 
    id: 19, 
    nombre: "Peñarol", 
    lema: "No me sé ningún lema", 
    fundacion: "2015", 
    color: "from-green-900",
    estadio: "Coliseo",
    logo: "/logos/PEÑAROL.png"
  },
];