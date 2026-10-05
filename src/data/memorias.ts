// NIVEL 1 — Recuerdos desbloqueables.
// Todo lo que está aquí sale de CLAUDE.md. Nada inventado.
// TODO_FOTO_*: Benja deja las fotos en public/assets/fotos/ con esos nombres (WebP, máx. ~1200 px de ancho).
// TODO_RECUERDOS_2025_2026: faltan las Memorias 05+ (Benja las entrega). Se agregan al final de MEMORIAS.

import type { Line } from '../ui/dialogPlayer';

export type Paso =
  | { tipo: 'fecha'; fecha: string; sub: string }
  | { tipo: 'lineas'; lineas: Line[] }
  | { tipo: 'foto'; src: string; pie: string }
  | { tipo: 'cancion'; titulo: string; artista: string; src: string; nota: string };

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
          { who: 'narrador', text: 'Lunes 19 de agosto de 2024. Como a la una y media.' },
          { who: 'narrador', text: 'El patio de la universidad, lleno de gente.' },
          { who: 'narrador', text: 'Benja ya la había visto antes. Varias veces. Nunca se había atrevido a hablarle.' },
          { who: 'amigo', text: 'Anda.' },
          { who: 'benja', text: '...' },
          { who: 'benja', text: 'No me atrevo.' },
          { who: 'amigo', text: 'Entonces te voy a ayudar.' },
          { who: 'narrador', text: 'Y le quitó la mochila. Y la chaqueta.' },
          { who: 'narrador', text: 'Así que Benja fue. Por las escaleras, hasta donde estaba ella.' },
          { who: 'benja', text: 'Hola... ¿me das tu Instagram?' },
        ],
      },
      { tipo: 'fecha', fecha: '19 · 08 · 2024', sub: '13:30 aprox. Y sin saberlo, acababa de comenzar nuestra historia.' },
      {
        tipo: 'lineas',
        lineas: [
          { who: 'narrador', text: 'Al día siguiente, Benja le escribió primero.' },
          { who: 'narrador', text: 'Hablaron de videojuegos. Y de cuántos años tenían.' },
          { who: 'narrador', text: 'A la semana, los dos ya sabían que se gustaban.' },
          { who: 'belen-futuro', text: 'Todavía me acuerdo de ese día.' },
          { who: 'benja-futuro', text: 'Yo también.' },
          { who: 'benja-futuro', text: 'Ese fue el primer capítulo de nosotros.' },
        ],
      },
      { tipo: 'foto', src: '/assets/fotos/m01.webp', pie: 'TODO_FOTO_M01: una foto del comienzo.' },
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
          { who: 'narrador', text: 'Jueves 29 de agosto de 2024, como a las seis de la tarde.' },
          { who: 'narrador', text: 'Nuestra primera cita.' },
          { who: 'belen-futuro', text: 'Éramos tan chicos.' },
          { who: 'benja-futuro', text: 'Y ya sabíamos.' },
          { who: 'belen-futuro', text: '¿Sabíamos qué?' },
          { who: 'benja-futuro', text: 'Que esto iba a durar.' },
        ],
      },
      { tipo: 'fecha', fecha: '29 · 08 · 2024', sub: 'La primera de muchas.' },
      { tipo: 'foto', src: '/assets/fotos/m02.webp', pie: 'TODO_FOTO_M02: una foto de esos primeros días.' },
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
      { tipo: 'foto', src: '/assets/fotos/m03.webp', pie: 'TODO_FOTO_M03: una foto de la costanera o de esa época.' },
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
      { tipo: 'foto', src: '/assets/fotos/m04.webp', pie: 'TODO_FOTO_M04: una foto de Puerto Varas, idealmente en la escalera.' },
    ],
  },
  {
    id: 'c01',
    numero: 'CANCIÓN',
    titulo: 'Una canción que me recuerda a ti',
    fecha: '2! 3!',
    lugar: 'BTS',
    pasos: [
      {
        tipo: 'cancion',
        titulo: '2! 3!',
        artista: 'BTS',
        src: '/assets/musica/2-3.mp3',
        nota: 'Te la dediqué. Para mí representa muy bien lo que somos.',
      },
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
        src: '/assets/musica/one-less-lonely-girl.mp3',
        nota: 'Siempre quisiste que te la dedicaran. Y es la canción de ese 5 de octubre.',
      },
    ],
  },
  // TODO_RECUERDOS_2025_2026: Memorias 05+ (los dos años siguientes). Benja las entrega; no inventar.
];
