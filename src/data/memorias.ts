// NIVEL 1 — Recuerdos desbloqueables.
// Todo lo que está aquí sale de CLAUDE.md. Nada inventado.
// Fotos en public/assets/fotos/ (WebP, máx. 1200 px de ancho). Los originales quedan en originales/fotos/.
// TODO_FOTO_M01: falta una foto del comienzo para la Memoria 01 (hoy no muestra foto).
// TODO_RECUERDOS_2025_2026: faltan las Memorias 05+ (Benja las entrega). Se agregan al final de MEMORIAS.

import type { Line } from '../ui/dialogPlayer';

export type Paso =
  | { tipo: 'fecha'; fecha: string; sub: string }
  | { tipo: 'lineas'; lineas: Line[] }
  | { tipo: 'foto'; src: string; pie: string }
  | { tipo: 'cancion'; titulo: string; artista: string; nota: string; /** id de pista de Spotify (open.spotify.com/track/ID) */ spotify?: string; /** mp3 local opcional (versión 8-bit) */ src?: string };

export interface Memoria {
  id: string;
  numero: string;
  titulo: string;
  fecha: string;
  lugar: string;
  pasos: Paso[];
}

export const MEMORIAS: Memoria[] = [
  {
    id: 'm01',
    numero: 'MEMORIA 01',
    titulo: 'El día que todo comenzó',
    fecha: '19.08.2024',
    lugar: 'Universidad',
    pasos: [
      {
        tipo: 'lineas',
        lineas: [
          { who: 'narrador', text: 'Lunes 19 de agosto de 2024. 13:30 de la tarde.' },
          { who: 'narrador', text: 'El patio de la universidad, esta lleno de gente.' },
          { who: 'benja', text: 'Ya la había visto antes. Varias veces. Es muy bonita, me da verguenza hablarle.' },
          { who: 'nico', text: 'Anda.' },
          { who: 'benja', text: '...' },
          { who: 'benja', text: 'No me atrevo.' },
          { who: 'nico', text: 'Anda nomas, yo te acompaño, recuerda, La verguenza dura un rato, el arrepentimiento para siempre.' },
          { who: 'narrador', text: 'Y le quitó la mochila. Y la chaqueta.' },
          { who: 'nico', text: 'Vamos, juntos.' },
          { who: 'benja', text: 'No, dejame a mi.' },
          { who: 'narrador', text: 'Así que Benja fue. Por las escaleras, mientras subia.' },
          { who: 'benja', text: 'Hola... me parecias bonita, ¿me das tu Instagram?' },
        ],
      },
      { tipo: 'fecha', fecha: '19 · 08 · 2024', sub: '13:30 aprox. Y sin saberlo, acababa de comenzar nuestra historia.' },
      {
        tipo: 'lineas',
        lineas: [
          { who: 'narrador', text: 'Al día siguiente, Benja le escribió primero.' },
          { who: 'narrador', text: 'Hablaron de muchas cosas, conectaron rapidamente.' },
          { who: 'narrador', text: 'A la semana, los dos ya sabían que se gustaban.' },
          { who: 'belen-futuro', text: 'Todavía me acuerdo de ese día.' },
          { who: 'benja-futuro', text: 'Yo también.' },
          { who: 'benja-futuro', text: 'Ese fue el primer capítulo de nosotros.' },
        ],
      },
    ],
  },
  {
    id: 'm02',
    numero: 'MEMORIA 02',
    titulo: 'La primera vez que salimos',
    fecha: '29.08.2024',
    lugar: '18:00 aprox.',
    pasos: [
      {
        tipo: 'lineas',
        lineas: [
          { who: 'narrador', text: 'Diez días después del Instagram.' },
          { who: 'narrador', text: 'Jueves 29 de agosto de 2024, a las 6:30.' },
          { who: 'narrador', text: 'Nuestra primera cita.' },
          { who: 'belen-futuro', text: 'Éramos tan chicos.' },
          { who: 'benja-futuro', text: 'Y ya sabíamos.' },
          { who: 'belen-futuro', text: '¿Sabíamos qué?' },
          { who: 'benja-futuro', text: 'Que esto iba a durar.' },
        ],
      },
      { tipo: 'fecha', fecha: '29 · 08 · 2024', sub: 'La primera de muchas.' },
      { tipo: 'foto', src: '/assets/fotos/primera_cita.webp', pie: 'Nuestra primera cita.' },
    ],
  },
  {
    id: 'm03',
    numero: 'MEMORIA 03',
    titulo: 'El primer beso',
    fecha: 'Costanera',
    lugar: 'Puerto Montt',
    pasos: [
      {
        tipo: 'lineas',
        lineas: [
          { who: 'narrador', text: 'Entre agosto y octubre nos vimos mucho. En la universidad, y afuera también.' },
          { who: 'narrador', text: 'Y una de esas veces, en la costanera de Puerto Montt...' },
          { who: 'narrador', text: 'Nuestro primer beso.' },
          { who: 'benja-futuro', text: 'Desde el principio los dos lo teníamos claro.' },
          { who: 'belen-futuro', text: 'Siempre.' },
        ],
      },
      { tipo: 'foto', src: '/assets/fotos/primer_beso.webp', pie: 'El primer beso.' },
    ],
  },
  {
    id: 'm04',
    numero: 'MEMORIA 04',
    titulo: 'El día que dejamos de ser solamente dos',
    fecha: '05.10.2024',
    lugar: 'Puerto Varas',
    pasos: [
      {
        tipo: 'lineas',
        lineas: [
          { who: 'narrador', text: 'Ese día viajamos desde Puerto Montt hasta Puerto Varas.' },
          { who: 'narrador', text: '⛸️ Patinamos en hielo.' },
          { who: 'narrador', text: '🏙️ Caminamos por la ciudad.' },
          { who: 'narrador', text: '🍽️ Comimos en el Mawhuen.' },
          { who: 'narrador', text: '📸 Nos tomamos fotos.' },
          { who: 'narrador', text: 'Y llegamos a la escalera Eduardo Ricke.' },
          { who: 'benja', text: 'Ya no podía seguir guardándomelo.' },
          { who: 'benja', text: 'Así que te lo dije.' },
        ],
      },
      { tipo: 'fecha', fecha: '05 · 10 · 2024', sub: 'Nosotros. ❤️' },
      {
        tipo: 'lineas',
        lineas: [
          { who: 'narrador', text: 'Y entonces pasó algo más.' },
          { who: 'narrador', text: 'Desde un restaurante cercano empezó a sonar Justin Bieber.' },
          { who: 'belen', text: 'Siempre suena en los momentos especiales de mi vida.' },
          { who: 'benja-futuro', text: 'Supongo que este terminó siendo uno de ellos.' },
          { who: 'belen-futuro', text: 'Ese día siempre me pareció especial.' },
          { who: 'benja-futuro', text: 'A mí también.' },
          { who: 'benja-futuro', text: 'Aunque no sabía cuánto.' },
        ],
      },
      { tipo: 'foto', src: '/assets/fotos/primer_dia_de_novios.webp', pie: 'Nuestro primer día de novios.' },
    ],
  },
  {
    id: 'c02',
    numero: 'CANCIÓN',
    titulo: 'Una canción que siempre quisiste que te dedicaran',
    fecha: 'One Less Lonely Girl',
    lugar: 'Justin Bieber',
    pasos: [
      {
        tipo: 'cancion',
        titulo: 'One Less Lonely Girl',
        artista: 'Justin Bieber',
        spotify: '1PQtQQ0Gm4HyqvB3JSVMon',
        nota: 'Siempre quisiste que te la dedicaran. Y es la canción de ese 5 de octubre.',
      },
    ],
  },
  // TODO_RECUERDOS_2025_2026: Memorias 05+ (los dos años siguientes). Benja las entrega; no inventar.
];
