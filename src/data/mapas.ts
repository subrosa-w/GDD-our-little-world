// Mapas del Nivel 3 y del prólogo.
//
// Hay dos tipos:
//  - 'imagen': un fondo pintado (public/assets/mapa/*.jpg) y, en píxeles de esa imagen,
//    los rectángulos sólidos, los puntos de interacción, las puertas y los recortes
//    que se dibujan por encima del jugador. Es el modo que se usa hoy.
//  - 'tiles': ASCII con tiles dibujados en código (modo anterior, se mantiene como respaldo).

export type MapId = 'terreno' | 'casa1' | 'casa2';

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Recorte de la imagen que se dibuja por encima del jugador. */
export interface Capa extends Rect {
  /** 'elipse' recorta una elipse inscrita en el rectángulo (copas de árboles). */
  forma?: 'rect' | 'elipse';
  /** Profundidad para el orden de dibujo; por defecto y + h. Para una copa, usar la base del tronco. */
  profundidad?: number;
}

export interface MapaImagen {
  tipo: 'imagen';
  id: MapId;
  nombre: string;
  imagen: string;
  ancho: number;
  alto: number;
  /** Rectángulos que bloquean el paso. */
  solidos: Rect[];
  /** Recortes de la imagen que se dibujan por encima del jugador. */
  capas: Capa[];
  /** Objetos interactivos: id de data/objetos.ts, centro y radio de alcance. */
  puntos: Array<{ objeto: string; x: number; y: number; radio?: number }>;
  /** Zonas que cambian de mapa. `entrada` es la clave en `entradas` del destino. */
  portales: Array<Rect & { to: MapId; entrada: string }>;
  /** Dónde aparece el jugador al llegar por un portal. */
  entradas: Record<string, { x: number; y: number }>;
  /** Punto de inicio sin portal. */
  spawn: { x: number; y: number };
  /** Centro de la banca (Benja espera ahí; en el prólogo se sientan los dos). */
  banca?: { x: number; y: number };
}

export interface Pieza {
  textura?: string;
  solido?: boolean;
  cuerpo?: { w: number; h: number; dx?: number; dy?: number };
  objeto?: string;
  portal?: { to: MapId; spawn: string };
  salida?: { dx: number; dy: number };
  centro?: { dx: number; dy: number };
  pared?: boolean;
}

export interface MapaTiles {
  tipo: 'tiles';
  id: MapId;
  nombre: string;
  fondo: 'pasto' | 'piso';
  noche: boolean;
  tiles: string[];
}

export type MapaDef = MapaImagen | MapaTiles;

/** Leyenda del modo 'tiles' (respaldo). */
export const LEYENDA: Record<string, Pieza> = {
  '.': {},
  '#': { solido: true },
  T: { textura: 'tree', solido: true, cuerpo: { w: 36, h: 22, dx: 14, dy: 0 } },
  S: { textura: 'sign', solido: true, objeto: 'cartel-entrada', cuerpo: { w: 14, h: 10, dx: 9 } },
  B: { textura: 'bench', solido: true, objeto: 'banca', cuerpo: { w: 88, h: 14, dx: 4 }, centro: { dx: 48, dy: -14 } },
  f: { textura: 'flowerbed' },
  g: { textura: 'flowerbed', objeto: 'jardin' },
  p: { textura: 'planter', solido: true, cuerpo: { w: 24, h: 16, dx: 4 } },
  h: { textura: 'plot' },
  v: { textura: 'plot', objeto: 'huerto' },
  H: { textura: 'house', solido: true, cuerpo: { w: 288, h: 192, dx: 0 }, centro: { dx: 144, dy: -96 } },
  D: { textura: 'doormat', portal: { to: 'casa1', spawn: 'd' }, salida: { dx: 0, dy: 1 } },
  C: { textura: 'car-benja', solido: true, objeto: 'auto-benja', cuerpo: { w: 92, h: 36, dx: 2 }, centro: { dx: 48, dy: -20 } },
  M: { textura: 'car-belen', solido: true, objeto: 'auto-belen', cuerpo: { w: 76, h: 34, dx: 2 }, centro: { dx: 40, dy: -18 } },
  P: { textura: 'path' },
  '=': { textura: 'path' },
  l: { textura: 'lamp', solido: true, cuerpo: { w: 12, h: 8, dx: 10 } },
  W: { textura: 'wall', solido: true, pared: true },
  '|': { textura: 'wall', solido: true, pared: true },
  F: { textura: 'frame', solido: true, pared: true, objeto: 'fotos-living' },
  X: { textura: 'frame-padrino', solido: true, pared: true, objeto: 'foto-matrimonio' },
  R: { textura: 'frame', solido: true, pared: true, objeto: 'fotos-dormitorio' },
  Q: { textura: 'plaque', solido: true, pared: true, objeto: 'habitacion-vacia' },
  K: { textura: 'counter', solido: true, objeto: 'cocina', cuerpo: { w: 64, h: 40 }, centro: { dx: 32, dy: -24 } },
  t: { textura: 'table', solido: true, objeto: 'mesa', cuerpo: { w: 56, h: 30, dx: 4 }, centro: { dx: 32, dy: -16 } },
  L: { textura: 'sofa', solido: true, objeto: 'living', cuerpo: { w: 96, h: 36 }, centro: { dx: 48, dy: -20 } },
  E: { textura: 'bed', solido: true, objeto: 'dormitorio', cuerpo: { w: 64, h: 90 }, centro: { dx: 32, dy: -48 } },
  O: { textura: 'desk', solido: true, objeto: 'oficina', cuerpo: { w: 64, h: 40 }, centro: { dx: 32, dy: -22 } },
  U: { textura: 'stairs-up', solido: false, portal: { to: 'casa2', spawn: 'u' }, cuerpo: { w: 64, h: 64 }, salida: { dx: 0, dy: 1 } },
  u: { textura: 'stairs-down', solido: false, portal: { to: 'casa1', spawn: 'U' }, cuerpo: { w: 64, h: 64 }, salida: { dx: -1.5, dy: 0 } },
  d: { textura: 'doormat', portal: { to: 'terreno', spawn: 'D' }, salida: { dx: 0, dy: -1 } },
  '+': {},
  r: { textura: 'rug' },
};

// ---------------------------------------------------------------- mapas con imagen
// Coordenadas en píxeles de cada imagen (terreno 1312×816, casas 1104×960).

export const MAPAS: Record<MapId, MapaDef> = {
  terreno: {
    tipo: 'imagen',
    id: 'terreno',
    nombre: 'El terreno',
    imagen: '/assets/mapa/terreno.jpg',
    ancho: 1312,
    alto: 816,
    solidos: [
      // bordes de bosque
      { x: 0, y: 0, w: 80, h: 816 },
      { x: 1232, y: 0, w: 80, h: 816 },
      { x: 0, y: 0, w: 440, h: 70 },
      { x: 870, y: 0, w: 442, h: 70 },
      { x: 0, y: 700, w: 1312, h: 116 },
      // casa (la puerta queda libre: ver portales)
      { x: 440, y: 0, w: 190, h: 362 },
      { x: 690, y: 0, w: 180, h: 362 },
      { x: 630, y: 0, w: 60, h: 305 },
      // jardinera, maceteros, banca
      { x: 440, y: 360, w: 145, h: 85 },
      { x: 995, y: 285, w: 170, h: 65 },
      { x: 730, y: 325, w: 105, h: 62 },
      // autos
      { x: 145, y: 335, w: 105, h: 160 },
      { x: 270, y: 325, w: 110, h: 170 },
      // huerto
      { x: 980, y: 360, w: 195, h: 140 },
      // faroles y cartel (solo la base)
      { x: 708, y: 480, w: 24, h: 30 },
      { x: 578, y: 600, w: 24, h: 30 },
      { x: 728, y: 630, w: 24, h: 25 },
      // troncos de los árboles interiores (solo la base)
      { x: 303, y: 238, w: 26, h: 22 },
      { x: 983, y: 202, w: 26, h: 22 },
      { x: 180, y: 672, w: 26, h: 20 },
      { x: 1104, y: 638, w: 16, h: 20 },
    ],
    capas: [
      // banca: borde del asiento y patas (tapa las piernas de los que se sientan)
      { x: 733, y: 360, w: 100, h: 12, profundidad: 388 },
      { x: 738, y: 372, w: 12, h: 14, profundidad: 388 },
      { x: 818, y: 372, w: 12, h: 14, profundidad: 388 },
      // faroles: cabeza y poste
      { x: 706, y: 440, w: 24, h: 36, profundidad: 518 },
      { x: 714, y: 474, w: 10, h: 44, profundidad: 518 },
      { x: 576, y: 560, w: 24, h: 36, profundidad: 638 },
      { x: 584, y: 594, w: 10, h: 44, profundidad: 638 },
      // cartel: tabla y poste
      { x: 711, y: 597, w: 54, h: 38, profundidad: 650 },
      { x: 734, y: 633, w: 12, h: 17, profundidad: 650 },
      // árboles: copa (elipse) y tronco, ordenados por la base del tronco
      { x: 250, y: 102, w: 132, h: 116, forma: 'elipse', profundidad: 260 },
      { x: 303, y: 212, w: 26, h: 48, profundidad: 260 },
      { x: 930, y: 42, w: 130, h: 132, forma: 'elipse', profundidad: 224 },
      { x: 983, y: 168, w: 26, h: 56, profundidad: 224 },
      { x: 132, y: 523, w: 120, h: 124, forma: 'elipse', profundidad: 692 },
      { x: 180, y: 640, w: 26, h: 52, profundidad: 692 },
      { x: 1075, y: 540, w: 72, h: 80, forma: 'elipse', profundidad: 658 },
      { x: 1104, y: 614, w: 16, h: 44, profundidad: 658 },
    ],
    puntos: [
      { objeto: 'banca', x: 782, y: 372, radio: 95 },
      { objeto: 'cartel-entrada', x: 740, y: 625, radio: 80 },
      { objeto: 'auto-belen', x: 197, y: 420, radio: 125 },
      { objeto: 'auto-benja', x: 325, y: 420, radio: 125 },
      { objeto: 'jardin', x: 512, y: 400, radio: 105 },
      { objeto: 'huerto', x: 1078, y: 430, radio: 135 },
    ],
    portales: [{ x: 630, y: 305, w: 60, h: 45, to: 'casa1', entrada: 'd' }],
    entradas: { D: { x: 657, y: 374 } },
    spawn: { x: 657, y: 640 },
    banca: { x: 782, y: 388 },
  },

  casa1: {
    tipo: 'imagen',
    id: 'casa1',
    nombre: 'Primer piso',
    imagen: '/assets/mapa/casa1.jpg',
    ancho: 1104,
    alto: 960,
    solidos: [
      { x: 0, y: 0, w: 75, h: 960 },
      { x: 1032, y: 0, w: 72, h: 960 },
      { x: 0, y: 0, w: 1104, h: 65 },
      { x: 0, y: 885, w: 1104, h: 75 },
      { x: 75, y: 65, w: 480, h: 285 }, // pared cocina + mesón
      { x: 75, y: 350, w: 70, h: 540 }, // plantas columna izquierda
      { x: 75, y: 790, w: 140, h: 95 }, // maceteros abajo izquierda
      { x: 555, y: 65, w: 340, h: 225 }, // pared living
      { x: 555, y: 280, w: 55, h: 100 }, // planta izquierda del sofá
      { x: 825, y: 250, w: 70, h: 130 }, // planta derecha del sofá
      { x: 605, y: 280, w: 220, h: 125 }, // sofá
      { x: 895, y: 65, w: 140, h: 340 }, // escalera
      { x: 150, y: 495, w: 260, h: 120 }, // mesa y sillas
      { x: 965, y: 445, w: 70, h: 255 }, // repisa con plantas
      { x: 890, y: 780, w: 145, h: 105 }, // plantas abajo derecha
      { x: 445, y: 735, w: 60, h: 150 }, // marco de la puerta
      { x: 605, y: 735, w: 40, h: 150 },
    ],
    capas: [],
    puntos: [
      { objeto: 'cocina', x: 310, y: 335, radio: 95 },
      { objeto: 'mesa', x: 280, y: 560, radio: 125 },
      { objeto: 'fotos-living', x: 610, y: 415, radio: 70 },
      { objeto: 'foto-matrimonio', x: 750, y: 415, radio: 70 },
    ],
    portales: [
      { x: 505, y: 800, w: 95, h: 85, to: 'terreno', entrada: 'D' },
      { x: 898, y: 405, w: 135, h: 40, to: 'casa2', entrada: 'u' },
    ],
    entradas: { d: { x: 552, y: 720 }, U: { x: 965, y: 480 } },
    spawn: { x: 552, y: 720 },
  },

  casa2: {
    tipo: 'imagen',
    id: 'casa2',
    nombre: 'Segundo piso',
    imagen: '/assets/mapa/casa2.jpg',
    ancho: 1104,
    alto: 960,
    solidos: [
      { x: 0, y: 0, w: 45, h: 960 },
      { x: 1068, y: 0, w: 36, h: 960 },
      { x: 0, y: 0, w: 1104, h: 45 },
      { x: 0, y: 890, w: 1104, h: 70 },
      { x: 45, y: 45, w: 500, h: 235 }, // pared y repisas dormitorio
      { x: 45, y: 170, w: 180, h: 250 }, // cama
      { x: 45, y: 420, w: 170, h: 80 }, // plantas y libros bajo la cama
      { x: 45, y: 500, w: 60, h: 90 },
      { x: 45, y: 590, w: 90, h: 160 }, // escritorio con computador
      { x: 130, y: 620, w: 55, h: 100 }, // silla
      { x: 115, y: 780, w: 220, h: 110 }, // mesa de bocetos
      { x: 45, y: 760, w: 70, h: 130 },
      { x: 445, y: 280, w: 100, h: 200 }, // escritorio de diseño
      { x: 470, y: 470, w: 70, h: 75 },
      { x: 540, y: 45, w: 28, h: 560 }, // muro interior (arriba)
      { x: 540, y: 665, w: 28, h: 225 }, // muro interior (abajo)
      { x: 568, y: 45, w: 500, h: 195 }, // pared habitación vacía
      { x: 935, y: 555, w: 135, h: 280 }, // escalera
    ],
    capas: [],
    puntos: [
      { objeto: 'dormitorio', x: 135, y: 455, radio: 110 },
      { objeto: 'fotos-dormitorio', x: 300, y: 300, radio: 100 },
      { objeto: 'oficina', x: 495, y: 520, radio: 110 },
      { objeto: 'oficina', x: 215, y: 680, radio: 110 },
      { objeto: 'habitacion-vacia', x: 820, y: 120, radio: 210 },
    ],
    portales: [{ x: 905, y: 580, w: 30, h: 240, to: 'casa1', entrada: 'U' }],
    entradas: { u: { x: 875, y: 700 } },
    spawn: { x: 875, y: 700 },
  },
};
