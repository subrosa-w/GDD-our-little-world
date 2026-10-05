// Diálogos del prólogo y del final. Texto tomado de CLAUDE.md.
// TODO_CARTA: la carta la escribe Benja.

import type { Line } from '../ui/dialogPlayer';

export const PROLOGO: Line[] = [
  { who: 'belen-futuro', text: 'Mo...' },
  { who: 'benja-futuro', text: '¿Qué?' },
  { who: 'belen-futuro', text: '¿Te acuerdas de cómo nos conocimos?' },
];

/** Variante sutil cuando ya se completó todo y vuelve a entrar. */
export const PROLOGO_OTRA_VEZ: Line[] = [
  { who: 'belen-futuro', text: 'Mo...' },
  { who: 'benja-futuro', text: '¿Otra vez, mo?' },
  { who: 'belen-futuro', text: 'Otra vez.' },
];

export const PROLOGO_FECHA = { fecha: '19 · 08 · 2024', sub: '' };

export const FINAL_DIALOGO: Line[] = [
  { who: 'belen-futuro', text: 'Después de tantos años...' },
  { who: 'benja-futuro', text: '¿Todavía te acuerdas?' },
  { who: 'belen-futuro', text: 'De todo.' },
];

/** Flashes breves después del diálogo. */
export const FINAL_FLASHES: Array<{ fecha: string; sub: string }> = [
  { fecha: '19 · 08 · 2024', sub: 'El patio.' },
  { fecha: '29 · 08 · 2024', sub: 'La primera cita.' },
  { fecha: 'Puerto Montt', sub: 'El primer beso.' },
  { fecha: '05 · 10 · 2024', sub: 'La escalera.' },
  { fecha: 'Hoy', sub: '' },
];

/** Opcional (sección 6 de CLAUDE.md). Benja puede quitarlo dejando el arreglo vacío. */
export const FINAL_AMIGO: Line[] = [
  { who: 'belen-futuro', text: '¿Te acuerdas de él?' },
  { who: 'benja-futuro', text: 'Siempre.' },
];

export const FINAL_TEXTOS: string[] = [
  'Quizás algún día miremos hacia atrás y esto también sea un recuerdo.',
  'Pero quiero seguir llenando nuestra historia de ellos.',
  'No sé exactamente cómo será el futuro.',
  'Pero sí sé con quién quiero descubrirlo.',
];

export const FINAL_INTRO_CARTA = 'Si llegaste hasta aquí, mo...';

/** TODO_CARTA: Benja escribe la carta aquí. Cada string es un párrafo. */
export const CARTA: string[] = [
  'TODO_CARTA',
];

export const CARTA_CIERRE = 'Feliz aniversario, mo. ❤️';
export const CARTA_FIRMA = '— Mo';
