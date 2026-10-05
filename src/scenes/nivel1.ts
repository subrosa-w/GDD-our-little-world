import type { Scene } from '../router';
import { h } from '../ui/dom';
import { playDialog, showDateScreen, type DialogHandle } from '../ui/dialogPlayer';
import { MEMORIAS, type Memoria, type Paso } from '../data/memorias';
import { getProgress, markMemoria, completeLevel, isCompleted } from '../progress';

const nivel1: Scene = ({ root, go }) => {
  let activeDialog: DialogHandle | null = null;
  let cancelled = false;

  const grid = h('div', { class: 'memorias' });
  const footer = h('div', { class: 'nivel-footer' });

  function render() {
    grid.innerHTML = '';
    const abiertas = getProgress().memoriasAbiertas;
    for (const m of MEMORIAS) {
      const open = abiertas.includes(m.id);
      grid.append(
        h(
          'button',
          { class: `memoria-card ${open ? 'open' : ''}`, onClick: () => abrir(m) },
          h('span', { class: 'num pixel' }, m.numero),
          h('span', { class: 'tit' }, m.titulo),
          h('span', { class: 'meta' }, `${m.fecha} · ${m.lugar}`),
          h('span', { class: 'mark' }, open ? '♥' : '›'),
        ),
      );
    }
    const todas = MEMORIAS.every((m) => abiertas.includes(m.id));
    footer.innerHTML = '';
    if (todas || isCompleted('nivel1')) {
      footer.append(
        h(
          'button',
          {
            class: 'btn block',
            onClick: () => {
              completeLevel('nivel1');
              go('nivel2');
            },
          },
          isCompleted('nivel1') ? 'IR AL NIVEL 2' : 'SEGUIR',
        ),
      );
    } else {
      const faltan = MEMORIAS.length - MEMORIAS.filter((m) => abiertas.includes(m.id)).length;
      footer.append(h('p', { class: 'muted center small' }, `Te quedan ${faltan} por abrir.`));
    }
  }

  async function abrir(m: Memoria) {
    const view = h('div', { class: 'memoria-view' });
    const head = h(
      'div',
      { class: 'memoria-head' },
      h('span', { class: 'pixel num' }, m.numero),
      h('span', { class: 'tit' }, m.titulo),
    );
    const stage = h('div', { class: 'memoria-stage' });
    const cerrar = h('button', { class: 'btn ghost', onClick: () => close() }, 'CERRAR');
    view.append(head, stage, h('div', { class: 'memoria-actions' }, cerrar));
    document.body.append(view);
    requestAnimationFrame(() => view.classList.add('on'));
    let closed = false;

    function close() {
      if (closed) return;
      closed = true;
      activeDialog?.cancel();
      activeDialog = null;
      view.classList.remove('on');
      setTimeout(() => view.remove(), 400);
      render();
    }

    for (const paso of m.pasos) {
      if (closed || cancelled) return;
      await runPaso(stage, paso);
    }
    if (closed || cancelled) return;
    markMemoria(m.id);
    stage.innerHTML = '';
    stage.append(
      h('p', { class: 'center muted' }, 'Recuerdo guardado.'),
      h('button', { class: 'btn block', onClick: () => close() }, 'VOLVER'),
    );
    cerrar.remove();
  }

  function runPaso(stage: HTMLElement, paso: Paso): Promise<void> {
    stage.innerHTML = '';
    switch (paso.tipo) {
      case 'fecha':
        return showDateScreen(paso.fecha, paso.sub, 3600);
      case 'lineas': {
        const box = h('div', { class: 'memoria-dialog' });
        stage.append(box);
        activeDialog = playDialog(box, paso.lineas);
        return activeDialog.done;
      }
      case 'foto':
        return new Promise((resolve) => {
          const img = h('img', { class: 'foto', src: paso.src, alt: '', loading: 'lazy' });
          const frame = h('figure', { class: 'foto-frame' }, img, h('figcaption', {}, paso.pie));
          img.addEventListener('error', () => {
            img.replaceWith(h('div', { class: 'foto placeholder pixel' }, 'FOTO PENDIENTE'));
          });
          stage.append(frame, h('button', { class: 'btn block', onClick: () => resolve() }, 'SEGUIR'));
        });
      case 'cancion':
        return new Promise((resolve) => {
          const audio = h('audio', { controls: true, preload: 'none', src: paso.src }) as HTMLAudioElement;
          const nota = h('p', { class: 'small muted center' }, 'Versión 8-bit. La original la conoces de memoria.');
          audio.addEventListener('error', () => {
            audio.replaceWith(h('p', { class: 'small muted center pixel', style: 'font-size:8px' }, 'TODO_MUSICA_8BIT: versión chiptune pendiente'));
          });
          stage.append(
            h(
              'div',
              { class: 'cancion' },
              h('div', { class: 'pixel disco' }, '♪'),
              h('h2', { class: 'pixel' }, paso.titulo),
              h('p', { class: 'muted', style: 'margin:0 0 14px' }, paso.artista),
              h('p', { class: 'nota' }, paso.nota),
              audio,
              nota,
            ),
            h('button', { class: 'btn block', onClick: () => resolve() }, 'SEGUIR'),
          );
        });
    }
  }

  root.append(
    h(
      'div',
      { class: 'screen top' },
      h('h2', { class: 'pixel center' }, 'NIVEL 1'),
      h('h1', { class: 'pixel center', style: 'margin-bottom:0' }, 'Nuestra historia'),
      h('div', { class: 'divisor' }, '♥'),
      h('p', { class: 'muted center', style: 'margin:0' }, 'Toca un recuerdo para abrirlo. Benja y Belen, muchos años después, los van contando.'),
      grid,
      footer,
    ),
  );
  render();

  return () => {
    cancelled = true;
    activeDialog?.cancel();
    document.querySelectorAll('.memoria-view').forEach((v) => v.remove());
  };
};

export default nivel1;
