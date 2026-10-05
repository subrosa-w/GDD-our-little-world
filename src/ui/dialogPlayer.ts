import { h } from './dom';
import { PATHS } from '../data/config';

export type Speaker = 'benja' | 'belen' | 'amigo' | 'narrador' | 'benja-futuro' | 'belen-futuro';

export interface Line {
  who: Speaker;
  text: string;
}

const NAMES: Record<Speaker, string> = {
  benja: 'Benja',
  belen: 'Belen',
  amigo: 'Amigo',
  narrador: '',
  'benja-futuro': 'Benja, muchos años después',
  'belen-futuro': 'Belen, muchos años después',
};

function portraitFor(who: Speaker): string | null {
  if (who === 'benja' || who === 'benja-futuro') return PATHS.retratoBenja;
  if (who === 'belen' || who === 'belen-futuro') return PATHS.retratoBelen;
  return null;
}

export interface DialogHandle {
  /** Resuelve cuando se pasaron todas las líneas. */
  done: Promise<void>;
  /** Fuerza el cierre (por ejemplo al desmontar la escena). */
  cancel: () => void;
}

/**
 * Reproduce líneas de diálogo estilo RPG dentro de `container`.
 * Toque/clic o Enter/E/Espacio avanzan. Si el texto sigue escribiéndose, lo completa primero.
 */
export function playDialog(container: HTMLElement, lines: Line[], opts: { charMs?: number } = {}): DialogHandle {
  const charMs = opts.charMs ?? 22;
  const portrait = h('img', { class: 'portrait', alt: '' });
  const who = h('div', { class: 'who' });
  const text = h('div', { class: 'text' });
  const hint = h('div', { class: 'hint' }, '▼');
  const box = h('div', { class: 'dialog' }, portrait, h('div', {}, who, text, hint));
  container.innerHTML = '';
  container.append(box);

  let i = 0;
  let typing: number | undefined;
  let fullText = '';
  let cancelled = false;
  let resolveDone!: () => void;
  const done = new Promise<void>((r) => (resolveDone = r));

  function showLine() {
    const line = lines[i];
    const p = portraitFor(line.who);
    if (p) {
      portrait.src = p;
      portrait.style.display = '';
      box.classList.remove('no-portrait');
    } else {
      portrait.style.display = 'none';
      box.classList.add('no-portrait');
    }
    who.textContent = NAMES[line.who];
    who.style.display = NAMES[line.who] ? '' : 'none';
    who.classList.toggle('future', line.who.endsWith('futuro'));
    fullText = line.text;
    text.textContent = '';
    hint.style.visibility = 'hidden';
    let k = 0;
    window.clearInterval(typing);
    typing = window.setInterval(() => {
      k++;
      text.textContent = fullText.slice(0, k);
      if (k >= fullText.length) {
        window.clearInterval(typing);
        typing = undefined;
        hint.style.visibility = '';
      }
    }, charMs);
  }

  function advance() {
    if (cancelled) return;
    if (typing !== undefined) {
      window.clearInterval(typing);
      typing = undefined;
      text.textContent = fullText;
      hint.style.visibility = '';
      return;
    }
    i++;
    if (i >= lines.length) {
      finish();
    } else {
      showLine();
    }
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ' || e.key.toLowerCase() === 'e') {
      e.preventDefault();
      advance();
    }
  }

  function finish() {
    if (cancelled) return;
    cancelled = true;
    window.clearInterval(typing);
    box.removeEventListener('click', advance);
    window.removeEventListener('keydown', onKey);
    resolveDone();
  }

  box.addEventListener('click', advance);
  window.addEventListener('keydown', onKey);
  showLine();

  return { done, cancel: finish };
}

/** Pantalla negra con una fecha y una frase. Se cierra con toque o sola después de `ms`. */
export function showDateScreen(date: string, sub: string, ms = 3200): Promise<void> {
  const el = h('div', { class: 'date-screen' }, h('div', { class: 'date' }, date), h('div', { class: 'sub' }, sub));
  document.body.append(el);
  requestAnimationFrame(() => el.classList.add('on'));
  return new Promise((resolve) => {
    let closed = false;
    const close = () => {
      if (closed) return;
      closed = true;
      el.classList.remove('on');
      setTimeout(() => {
        el.remove();
        resolve();
      }, 600);
    };
    el.addEventListener('click', close);
    setTimeout(close, ms);
  });
}
