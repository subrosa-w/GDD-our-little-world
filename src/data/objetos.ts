import type { Line } from '../ui/dialogPlayer';

/** Objeto interactivo del mundo. La posición la define el mapa ASCII (letra) o `at` en tiles. */
export interface Objeto {
  id: string;
  /** Texto que aparece en el HUD: "[E] Leer" */
  accion: string;
  lineas: Line[];
  /** Carácter del mapa al que está asociado (si aplica). */
  tile?: string;
}

export const OBJETOS: Objeto[] = [
  {
    id: 'cartel-entrada',
    tile: 'S',
    accion: 'Leer',
    lineas: [
      { who: 'narrador', text: 'Un cartel de madera, medio torcido.' },
      { who: 'narrador', text: '"Our Little World". Y abajo, más chico: "— Mo".' },
    ],
  },
  {
    id: 'banca',
    tile: 'B',
    accion: 'Sentarse',
    lineas: [
      { who: 'narrador', text: 'La banca de afuera. Desde aquí se ve todo el terreno.' },
      { who: 'belen-futuro', text: 'Aquí fue donde te pregunté si te acordabas.' },
      { who: 'benja-futuro', text: 'Me acuerdo de todo, mo.' },
    ],
  },
];
