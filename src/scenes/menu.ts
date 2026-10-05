import type { Scene } from '../router';
import { h } from '../ui/dom';
import { toast } from '../ui/toast';
import { levelTitle } from '../ui/levelMenu';
import { LEVEL_ORDER, isCompleted, isUnlocked, isAllCompleted, nextLevel, resetProgress } from '../progress';

const menu: Scene = ({ root, go }) => {
  const todo = isAllCompleted();
  const next = nextLevel();

  const list = h('div', { class: 'level-list' });
  for (const id of LEVEL_ORDER) {
    const done = isCompleted(id);
    const unlocked = isUnlocked(id);
    const { n, t } = levelTitle(id);
    list.append(
      h(
        'button',
        {
          class: `level-item ${done ? 'done' : ''} ${unlocked ? '' : 'locked'}`,
          onClick: () => (unlocked ? go(id) : toast('Todavía no, mo.')),
        },
        h('span', { class: 'n' }, n),
        h('span', { class: 't' }, t),
        h('span', { class: 's' }, done ? '♥' : unlocked ? '›' : '🔒'),
      ),
    );
  }

  const cta = next
    ? h('button', { class: 'btn block', onClick: () => go(next) }, isCompleted('prologo') ? 'CONTINUAR' : 'EMPEZAR')
    : h('p', { class: 'muted center small' }, 'Ya lo viste todo. Puedes volver a donde quieras, mo.');

  // Solo en desarrollo: botón para borrar el progreso y probar desde cero.
  const devReset = import.meta.env.DEV
    ? h(
        'button',
        {
          class: 'btn ghost',
          style: 'position:fixed; left:8px; bottom:8px; font-size:7px; min-height:28px; padding:6px 8px; opacity:.35; z-index:5',
          onClick: () => {
            resetProgress();
            go('login');
          },
        },
        'DEV: BORRAR PROGRESO',
      )
    : null;

  root.append(
    h(
      'div',
      { class: 'screen' },
      h('p', { class: 'fecha-tag' }, 'DESDE EL 05 · 10 · 2024'),
      h('h1', { class: 'pixel center', style: 'margin-bottom:0' }, 'OUR LITTLE WORLD'),
      h('div', { class: 'divisor' }, '♥'),
      h('p', { class: 'muted center', style: 'margin:0' }, todo ? 'Nuestro pequeño mundo, abierto entero.' : 'Una historia en cinco partes.'),
      list,
      cta,
      devReset,
    ),
  );
};

export default menu;
