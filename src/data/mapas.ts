// Mapas en ASCII, editables a mano. Cada carácter es un tile de 32 px.
// Las piezas grandes tienen un carácter "ancla" (esquina inferior izquierda)
// y el resto de su huella se rellena con '#' (sólido invisible).

export type MapId = 'terreno' | 'casa1' | 'casa2';

export interface Pieza {
  /** Textura a dibujar (ver game/textures.ts). Si falta, no dibuja nada. */
  textura?: string;
  /** Bloquea el paso. */
  solido?: boolean;
  /** Cuerpo de colisión en px relativo al ancla (x desde la izquierda, y desde abajo). Por defecto el tile. */
  cuerpo?: { w: number; h: number; dx?: number; dy?: number };
  /** Id en data/objetos.ts para interactuar. */
  objeto?: string;
  /** Al pisarlo, cambia de mapa y aparece junto al carácter `spawn` del destino. */
  portal?: { to: MapId; spawn: string };
  /** Dónde aparece el jugador al llegar a esta pieza por un portal (en tiles, relativo a la pieza). Por defecto un tile abajo. */
  salida?: { dx: number; dy: number };
  /** Para piezas grandes: centro de interacción desplazado (px desde el ancla). */
  centro?: { dx: number; dy: number };
  /** Se dibuja como tile de pared (fondo) además de la textura. */
  pared?: boolean;
}

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
  P: {},
  // interiores
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

export interface MapaDef {
  id: MapId;
  nombre: string;
  fondo: 'pasto' | 'piso';
  noche: boolean;
  tiles: string[];
}

export const MAPAS: Record<MapId, MapaDef> = {
  terreno: {
    id: 'terreno',
    nombre: 'El terreno',
    fondo: 'pasto',
    noche: true,
    tiles: [
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      'T..................................T',
      'T..T.........................T.....T',
      'T..........#########...............T',
      'T..........#########.......T.......T',
      'T.....T....#########...............T',
      'T..........#########......pfp......T',
      'T..........#########......fgf......T',
      'T..........H###D####......pfp......T',
      'T.........ff.......ff..............T',
      'T.........f....B....f..............T',
      'T......................hvh.........T',
      'T....C....M.......S....hhh.........T',
      'T......................hhh.........T',
      'T............P.....................T',
      'T..........T.............T.........T',
      'T..................................T',
      'T....T.....................T.......T',
      'T..................................T',
      'T.............T....................T',
      'T..T.......................T.......T',
      'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
    ],
  },
  casa1: {
    id: 'casa1',
    nombre: 'Primer piso',
    fondo: 'piso',
    noche: false,
    tiles: [
      'WWWWWWWWWWWWWWWWWWWWWW',
      'WWWWWWWWWWWFWXWFWWWWWW',
      'WK#K#..............U#W',
      'W....................W',
      'W....t#.........L##..W',
      'W.........r..........W',
      'W....................W',
      'W.........d..........W',
      'WWWWWWWWWWWWWWWWWWWWWW',
    ],
  },
  casa2: {
    id: 'casa2',
    nombre: 'Segundo piso',
    fondo: 'piso',
    noche: false,
    tiles: [
      'WWWWWWWWWWWWWWWWWWWWWW',
      'WWWWRWWWWWWWWW|WWWQWWW',
      'W##...........|......W',
      'W##...........|......W',
      'WE#...O#......|......W',
      'W.............|......W',
      'W.............+......W',
      'W.............|......W',
      'W..................u#W',
      'WWWWWWWWWWWWWWWWWWWWWW',
    ],
  },
};
