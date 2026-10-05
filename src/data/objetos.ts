// Objetos interactivos del mundo (Nivel 3). Texto según CLAUDE.md; nada inventado.
// TODO_FOTO_*: fotos reales en public/assets/fotos/.
// TODO_AUTO_BENJA: definir si es JDM o camioneta (hoy se deja ambiguo a propósito).

import type { Line } from '../ui/dialogPlayer';

export interface Objeto {
  id: string;
  /** Texto del HUD: "[E] Leer" */
  accion: string;
  lineas: Line[];
  /** Foto opcional que se muestra sobre el diálogo. */
  foto?: string;
}

export const OBJETOS: Record<string, Objeto> = {
  'cartel-entrada': {
    id: 'cartel-entrada',
    accion: 'Leer',
    lineas: [
      { who: 'narrador', text: 'Un cartel de madera, medio torcido.' },
      { who: 'narrador', text: '"Our Little World". Y abajo, más chico: "— Mo".' },
    ],
  },
  banca: {
    id: 'banca',
    accion: 'Hablar',
    lineas: [
      { who: 'benja-futuro', text: 'Anda a mirar la casa, mo. Yo te espero aquí.' },
    ],
  },
  'banca-final': {
    id: 'banca-final',
    accion: 'Sentarse',
    lineas: [
      { who: 'benja-futuro', text: '¿Vamos, mo?' },
    ],
  },
  jardin: {
    id: 'jardin',
    accion: 'Mirar',
    lineas: [
      { who: 'narrador', text: 'El jardín. Plantas por todos lados, como siempre quisieron.' },
      { who: 'narrador', text: 'Todo esto lo construyeron juntos.' },
    ],
  },
  huerto: {
    id: 'huerto',
    accion: 'Mirar',
    lineas: [{ who: 'narrador', text: 'Un pedacito de huerto. Todavía no sale todo lo que plantan, pero algo sale.' }],
  },
  'auto-benja': {
    id: 'auto-benja',
    accion: 'Mirar',
    lineas: [
      { who: 'narrador', text: 'El auto que siempre quiso.' },
      { who: 'belen-futuro', text: '¿Todavía lo lavas los domingos?' },
      { who: 'benja-futuro', text: 'Obviamente.' },
    ],
  },
  'auto-belen': {
    id: 'auto-belen',
    accion: 'Mirar',
    lineas: [
      { who: 'narrador', text: 'Un Mini Cooper.' },
      { who: 'benja-futuro', text: '¿Todavía te gusta?' },
      { who: 'belen-futuro', text: 'Obviamente.' },
    ],
  },
  cocina: {
    id: 'cocina',
    accion: 'Mirar',
    lineas: [
      { who: 'narrador', text: 'La cocina. La vida de todos los días.' },
      { who: 'narrador', text: 'Desayunos, almuerzos, platos que uno lava y el otro seca.' },
    ],
  },
  mesa: {
    id: 'mesa',
    accion: 'Sentarse',
    lineas: [{ who: 'narrador', text: 'La mesa donde se come, se conversa y a veces se juega.' }],
  },
  living: {
    id: 'living',
    accion: 'Sentarse',
    lineas: [
      { who: 'narrador', text: 'El living. En la pared, fotos de ustedes.' },
      { who: 'benja-futuro', text: 'Mira las fotos, mo.' },
    ],
  },
  'fotos-living': {
    id: 'fotos-living',
    accion: 'Mirar',
    foto: '/assets/fotos/primer_dia_de_novios.webp',
    lineas: [{ who: 'narrador', text: 'Fotos de ustedes dos. De todos los años.' }],
  },
  'foto-matrimonio': {
    id: 'foto-matrimonio',
    accion: 'Mirar',
    foto: '/assets/fotos/matrimonio.webp', // TODO_FOTO_MATRIMONIO: no existe todavía; se oculta sola
    lineas: [
      { who: 'narrador', text: 'La foto del matrimonio. Benja y Belen. Y al lado, él.' },
      { who: 'narrador', text: 'Nuestro padrino.' },
    ],
  },
  dormitorio: {
    id: 'dormitorio',
    accion: 'Mirar',
    lineas: [{ who: 'narrador', text: 'El dormitorio. Fotos y recuerdos en cada rincón.' }],
  },
  'fotos-dormitorio': {
    id: 'fotos-dormitorio',
    accion: 'Mirar',
    foto: '/assets/fotos/primer_beso.webp',
    lineas: [{ who: 'narrador', text: 'Una foto de los dos, de las primeras.' }],
  },
  oficina: {
    id: 'oficina',
    accion: 'Mirar',
    lineas: [
      { who: 'narrador', text: 'El espacio de trabajo. Un computador de un lado, bocetos y diseños del otro.' },
      { who: 'narrador', text: 'Informática y diseño, uno al lado del otro.' },
    ],
  },
  'habitacion-vacia': {
    id: 'habitacion-vacia',
    accion: 'Leer',
    lineas: [
      { who: 'narrador', text: 'Una habitación vacía. Solo una placa en la pared.' },
      { who: 'narrador', text: '"Todavía no sabemos qué habrá aquí."' },
      { who: 'narrador', text: '"Y está bien."' },
    ],
  },
};

/** Objeto que cierra el Nivel 3: el último que se descubre antes del final. */
export const OBJETO_FINAL = 'foto-matrimonio';
