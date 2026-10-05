import type { Scene } from '../router';
import { h } from '../ui/dom';
import { playDialog, showDateScreen, type DialogHandle } from '../ui/dialogPlayer';
import { wait } from '../router';
import { PATHS } from '../data/config';
import {
  FINAL_DIALOGO,
  FINAL_FLASHES,
  FINAL_AMIGO,
  FINAL_TEXTOS,
  FINAL_INTRO_CARTA,
  CARTA,
  CARTA_CIERRE,
  CARTA_FIRMA,
} from '../data/dialogos';
import { completeLevel, isCompleted } from '../progress';

const final: Scene = ({ root, go }) => {
  let dialog: DialogHandle | null = null;
  let cancelled = false;

  const stage = h('div', { class: 'final-stage' });
  const screen = h('div', { class: 'screen' }, stage);
  root.append(screen);

  async function run() {
    // Si ya lo vio, puede saltar directo a la carta.
    if (isCompleted('final')) {
      stage.append(
        h('p', { class: 'muted center' }, 'Ya llegaste hasta aquí una vez, mo.'),
        h('button', { class: 'btn block', onClick: () => { stage.innerHTML = ''; void secuencia(); } }, 'VERLO DE NUEVO'),
        h('button', { class: 'btn ghost block', onClick: () => { stage.innerHTML = ''; carta(); } }, 'IR A LA CARTA'),
      );
      return;
    }
    await secuencia();
  }

  async function secuencia() {
    stage.innerHTML = '';
    stage.append(h('p', { class: 'muted center' }, 'Belen encuentra a Benja. Se sientan frente a la casa.'));
    await wait(1800);
    if (cancelled) return;

    const box = h('div', { class: 'memoria-dialog' });
    stage.innerHTML = '';
    stage.append(box);
    dialog = playDialog(box, FINAL_DIALOGO);
    await dialog.done;
    if (cancelled) return;

    stage.innerHTML = '';
    for (const f of FINAL_FLASHES) {
      await showDateScreen(f.fecha, f.sub, 1900);
      if (cancelled) return;
    }

    if (FINAL_AMIGO.length) {
      const box2 = h('div', { class: 'memoria-dialog' });
      stage.append(box2);
      dialog = playDialog(box2, FINAL_AMIGO);
      await dialog.done;
      if (cancelled) return;
      stage.innerHTML = '';
    }

    for (const t of FINAL_TEXTOS) {
      const p = h('p', { class: 'final-text' }, t);
      stage.append(p);
      await wait(60);
      p.classList.add('on');
      await wait(2300);
      if (cancelled) return;
    }
    await wait(600);
    stage.append(h('button', { class: 'btn block', onClick: () => carta() }, 'SEGUIR'));
  }

  function carta() {
    completeLevel('final');
    stage.innerHTML = '';
    const sticker = h('img', { class: 'sticker', src: PATHS.bubu, alt: '' });
    sticker.addEventListener('error', () => sticker.remove());
    const sticker2 = h('img', { class: 'sticker', src: PATHS.dudu, alt: '' });
    sticker2.addEventListener('error', () => sticker2.remove());
    const parrafos = CARTA.map((p) => h('p', {}, p));
    stage.append(
      h('h2', { class: 'pixel center' }, 'Nuestro pequeño mundo'),
      h('p', { class: 'center', style: 'font-size:1.15rem; margin:0 0 6px' }, FINAL_INTRO_CARTA),
      h('article', { class: 'carta' }, ...parrafos, h('p', { class: 'cierre pixel' }, CARTA_CIERRE), h('p', { class: 'firma' }, CARTA_FIRMA)),
      h('div', { class: 'stickers' }, sticker, sticker2),
      h('button', { class: 'btn ghost block', onClick: () => go('menu') }, 'VOLVER AL MENÚ'),
    );
    window.scrollTo({ top: 0 });
  }

  void run();

  return () => {
    cancelled = true;
    dialog?.cancel();
    document.querySelectorAll('.date-screen').forEach((d) => d.remove());
  };
};

export default final;
