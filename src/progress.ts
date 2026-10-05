// Guardado en localStorage. Todo envuelto en try/catch:
// si no hay nada guardado o algo falla, se parte de cero sin romper nada.

export type LevelId = 'prologo' | 'nivel1' | 'nivel2' | 'nivel3' | 'final';

export const LEVEL_ORDER: LevelId[] = ['prologo', 'nivel1', 'nivel2', 'nivel3', 'final'];

export interface Progress {
  loggedIn: boolean;
  completed: LevelId[];
  memoriasAbiertas: string[];
  objetosEncontrados: string[];
  triviaCompletada: boolean;
  visitasPrologo: number;
}

const KEY = 'our-little-world:progress:v1';

const EMPTY: Progress = {
  loggedIn: false,
  completed: [],
  memoriasAbiertas: [],
  objetosEncontrados: [],
  triviaCompletada: false,
  visitasPrologo: 0,
};

type Listener = (p: Progress) => void;
const listeners = new Set<Listener>();

let state: Progress = load();

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...EMPTY };
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return {
      loggedIn: !!parsed.loggedIn,
      completed: Array.isArray(parsed.completed) ? parsed.completed.filter(isLevelId) : [],
      memoriasAbiertas: Array.isArray(parsed.memoriasAbiertas) ? parsed.memoriasAbiertas.map(String) : [],
      objetosEncontrados: Array.isArray(parsed.objetosEncontrados) ? parsed.objetosEncontrados.map(String) : [],
      triviaCompletada: !!parsed.triviaCompletada,
      visitasPrologo: Number(parsed.visitasPrologo) || 0,
    };
  } catch {
    return { ...EMPTY };
  }
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Sin almacenamiento disponible: seguimos en memoria.
  }
  listeners.forEach((fn) => fn(state));
}

function isLevelId(x: unknown): x is LevelId {
  return typeof x === 'string' && (LEVEL_ORDER as string[]).includes(x);
}

export function getProgress(): Readonly<Progress> {
  return state;
}

export function onProgressChange(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function setLoggedIn(v: boolean) {
  state = { ...state, loggedIn: v };
  save();
}

export function isCompleted(level: LevelId): boolean {
  return state.completed.includes(level);
}

/** Un nivel está abierto si es el primero o si el anterior está completado. */
export function isUnlocked(level: LevelId): boolean {
  const i = LEVEL_ORDER.indexOf(level);
  if (i <= 0) return true;
  return isCompleted(LEVEL_ORDER[i - 1]);
}

export function completeLevel(level: LevelId) {
  if (isCompleted(level)) return;
  state = { ...state, completed: [...state.completed, level] };
  save();
}

/** Modo libre: todo completado, puede ir a cualquier parte. */
export function isAllCompleted(): boolean {
  return LEVEL_ORDER.every(isCompleted);
}

/** Siguiente nivel que todavía no se completa (o null si está todo listo). */
export function nextLevel(): LevelId | null {
  return LEVEL_ORDER.find((l) => !isCompleted(l)) ?? null;
}

export function markMemoria(id: string) {
  if (state.memoriasAbiertas.includes(id)) return;
  state = { ...state, memoriasAbiertas: [...state.memoriasAbiertas, id] };
  save();
}

export function markObjeto(id: string) {
  if (state.objetosEncontrados.includes(id)) return;
  state = { ...state, objetosEncontrados: [...state.objetosEncontrados, id] };
  save();
}

export function setTriviaCompletada() {
  state = { ...state, triviaCompletada: true };
  save();
}

export function bumpVisitasPrologo() {
  state = { ...state, visitasPrologo: state.visitasPrologo + 1 };
  save();
}

/** Solo para desarrollo/pruebas: borra todo. */
export function resetProgress() {
  state = { ...EMPTY };
  try {
    localStorage.removeItem(KEY);
  } catch {
    // nada
  }
  listeners.forEach((fn) => fn(state));
}
