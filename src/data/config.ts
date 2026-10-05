// Ajustes que Benja define. TODO_ marca lo que falta.

/** Clave de entrada. Belen la escribe en el login. Se compara sin mayúsculas ni espacios extra. */
export const CLAVE = '05102024';

/** Nombre del amigo (Benja decide si aparece). Se usa solo si no está vacío. */
export const NOMBRE_AMIGO = '';

export const SPRITE = {
  frameWidth: 104,
  frameHeight: 192,
  rows: { down: 0, left: 1, right: 2, up: 3 },
  cols: { idle: 0, stepA: 1, stepB: 2 },
  frameMs: 180,
  /** Escala con la que se dibujan los personajes en el mundo (tiles de 32 px). */
  scale: 0.5,
} as const;

export const PATHS = {
  benja: '/assets/sprites/benja_spritesheet.png',
  belen: '/assets/sprites/belen_spritesheet.png',
  /** Versiones mayores (pendientes). Si no existen, se usan las jóvenes. */
  benjaMayor: '/assets/sprites/benja_mayor_spritesheet.png',
  belenMayor: '/assets/sprites/belen_mayor_spritesheet.png',
  retratoBenja: '/assets/sprites/retrato_benja_busto.png',
  retratoBelen: '/assets/sprites/retrato_belen_busto.png',
  bubu: '/assets/bubu-dudu/bubu.png',
  dudu: '/assets/bubu-dudu/dudu.png',
} as const;
