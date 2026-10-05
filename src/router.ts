// Router de escenas DOM con fundido a negro entre pantallas.

export type SceneId = 'login' | 'menu' | 'prologo' | 'nivel1' | 'nivel2' | 'nivel3' | 'final';

export interface SceneContext {
  root: HTMLElement;
  go: (scene: SceneId) => void;
}

/** Una escena monta su UI y devuelve una función de limpieza. */
export type Scene = (ctx: SceneContext) => void | (() => void);

const registry = new Map<SceneId, () => Promise<Scene>>();
let current: SceneId | null = null;
let cleanup: (() => void) | void;
let busy = false;

export function registerScene(id: SceneId, loader: () => Promise<Scene>) {
  registry.set(id, loader);
}

export function currentScene() {
  return current;
}

export async function goTo(id: SceneId) {
  if (busy) return;
  const loader = registry.get(id);
  if (!loader) throw new Error(`Escena desconocida: ${id}`);
  busy = true;
  await fadeOut();
  try {
    if (cleanup) cleanup();
    cleanup = undefined;
    const root = document.getElementById('app')!;
    root.innerHTML = '';
    root.dataset.scene = id;
    window.scrollTo(0, 0);
    const scene = await loader();
    current = id;
    cleanup = scene({ root, go: (s) => void goTo(s) });
  } finally {
    await fadeIn();
    busy = false;
  }
}

const FADE_MS = 420;

function fadeEl() {
  return document.getElementById('fade')!;
}

export function fadeOut(): Promise<void> {
  const el = fadeEl();
  el.classList.add('on');
  return wait(FADE_MS);
}

export function fadeIn(): Promise<void> {
  const el = fadeEl();
  el.classList.remove('on');
  return wait(FADE_MS);
}

export function wait(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
