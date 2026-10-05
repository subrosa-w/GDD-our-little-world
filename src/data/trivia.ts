// NIVEL 2 — Trivia "¿Cuánto sabes de nosotros, mo?"
// Preguntas propuestas a partir de los datos fijos de CLAUDE.md.
// TODO_TRIVIA: Benja revisa, cambia o agrega preguntas. Las opciones incorrectas son solo distractores.

export interface Pregunta {
  id: string;
  pregunta: string;
  opciones: string[];
  /** Índice de la opción correcta dentro de `opciones`. */
  correcta: number;
  /** Pista cariñosa si falla. */
  pista: string;
  /** Comentario corto al acertar. */
  acierto: string;
}

export const TRIVIA: Pregunta[] = [
  {
    id: 't01',
    pregunta: '¿Qué día nos conocimos?',
    opciones: ['19 de agosto de 2024', '29 de agosto de 2024', '5 de octubre de 2024', '31 de octubre de 2024'],
    correcta: 0,
    pista: 'Fue un lunes, a la hora de almuerzo, y hacía frío todavía.',
    acierto: 'Como a la una y media. Obvio que te acuerdas.',
  },
  {
    id: 't02',
    pregunta: '¿Qué tuvo que pasar para que me atreviera a pedirte el Instagram?',
    opciones: ['Me quitaron la mochila y la chaqueta', 'Tú me hablaste primero', 'Nos presentó un profe', 'Te lo pedí por mensaje'],
    correcta: 0,
    pista: 'Yo solo no iba a ir. Alguien me "ayudó".',
    acierto: 'Sin mochila ni chaqueta no me quedó otra.',
  },
  {
    id: 't03',
    pregunta: '¿De qué fue nuestra primera conversación importante?',
    opciones: ['De videojuegos y de la edad', 'De música', 'De la universidad', 'De series'],
    correcta: 0,
    pista: 'Dos temas. Uno tenía que ver con jugar.',
    acierto: 'Videojuegos y cuántos años teníamos. Clásico.',
  },
  {
    id: 't04',
    pregunta: '¿Cuándo fue nuestra primera cita?',
    opciones: ['29 de agosto, como a las seis', '19 de agosto, al mediodía', '5 de octubre, en la mañana', '1 de septiembre, en la tarde'],
    correcta: 0,
    pista: 'Diez días después del Instagram, al atardecer.',
    acierto: 'La primera de muchas.',
  },
  {
    id: 't05',
    pregunta: '¿Dónde fue nuestro primer beso?',
    opciones: ['En la costanera de Puerto Montt', 'En Puerto Varas', 'En la universidad', 'En el Mawhuen'],
    correcta: 0,
    pista: 'Cerca del mar, en nuestra ciudad.',
    acierto: 'La costanera. Sí.',
  },
  {
    id: 't06',
    pregunta: 'El 5 de octubre, ¿qué hicimos antes de llegar a la escalera?',
    opciones: ['Patinamos en hielo', 'Fuimos al cine', 'Subimos un cerro', 'Fuimos a la playa'],
    correcta: 0,
    pista: 'Había que mantener el equilibrio.',
    acierto: 'Patinamos, caminamos, comimos, nos sacamos fotos.',
  },
  {
    id: 't07',
    pregunta: '¿Dónde comimos ese día en Puerto Varas?',
    opciones: ['En el Mawhuen', 'En un carrito', 'En la casa de alguien', 'No comimos'],
    correcta: 0,
    pista: 'Empieza con M.',
    acierto: 'El Mawhuen.',
  },
  {
    id: 't08',
    pregunta: '¿Cómo se llama la escalera donde empezamos a ser nosotros?',
    opciones: ['Eduardo Ricke', 'Costanera', 'Escalera del cerro', 'Los Lagos'],
    correcta: 0,
    pista: 'Lleva nombre y apellido.',
    acierto: 'Escalera Eduardo Ricke. 05 · 10 · 2024.',
  },
  {
    id: 't09',
    pregunta: 'Justo después, ¿quién empezó a sonar desde un restaurante cercano?',
    opciones: ['Justin Bieber', 'BTS', 'Bad Bunny', 'Nadie, estaba en silencio'],
    correcta: 0,
    pista: 'Tú misma me dijiste que siempre aparece en tus momentos especiales.',
    acierto: 'Y ese terminó siendo uno de ellos.',
  },
  {
    id: 't10',
    pregunta: '¿Qué canción te dediqué?',
    opciones: ['2! 3! — BTS', 'One Less Lonely Girl — Justin Bieber', 'Perfect — Ed Sheeran', 'Ninguna'],
    correcta: 0,
    pista: 'Son dos números con signos de exclamación.',
    acierto: 'Para mí representa lo que somos.',
  },
];
