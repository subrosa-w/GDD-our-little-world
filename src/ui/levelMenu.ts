import { h } from './dom';
import { toast } from './toast';
import { goTo, currentScene } from '../router';
import { LEVEL_ORDER, isCompleted, isUnlocked, onProgressChange, getProgress, type LevelId } from '../progress';

const TITLES: Record<LevelId, { n: string; t: string }> = {
  prologo: { n: 'PRÓLOGO', t: 'Muchos años después' },
  nivel1: { n: 'NIVEL 1', t: 'Nuestra historia' },
  nivel2: { n: 'NIVEL 2', t: '¿Cuánto sabes de nosotros?' },
  nivel3: { n: 'NIVEL 3', t: 'Our Little World' },
  final: { n: 'FINAL', t: 'La carta' },
};

export function levelTitle(id: LevelId) {
  return TITLES[id];
}

let btn: HTMLButtonElement;
let overlay: HTMLDivElement;

export function mountLevelMenuButton() {
  btn = h('button', { id: 'level-menu-btn', 'aria-label': 'Niveles', onClick: open }, '≡');
  overlay = h('div', { id: 'level-menu' });
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  document.body.append(btn, overlay);

  const refresh = () => {
    const scene = document.getElementById('app')?.dataset.scene ?? currentScene();
    btn.classList.toggle('show', getProgress().loggedIn && scene !== 'login');
    if (overlay.classList.contains('open')) render();
  };
  onProgressChange(refresh);
  // El router cambia data-scene; observamos para ocultar el botón en el login.
  new MutationObserver(refresh).observe(document.getElementById('app')!, {
    attributes: true,
    attributeFilter: ['data-scene'],
  });
  refresh();
}

function open() {
  render();
  overlay.classList.add('open');
}

export function closeLevelMenu() {
  close();
}

function close() {
  overlay.classList.remove('open');
}

function render() {
  overlay.innerHTML = '';
  const list = h('div', { class: 'level-list' });
  list.append(h('h2', { class: 'pixel center' }, 'NIVELES'));
  for (const id of LEVEL_ORDER) {
    const done = isCompleted(id);
    const unlocked = isUnlocked(id);
    const item = h(
      'button',
      {
        class: `level-item ${done ? 'done' : ''} ${unlocked ? '' : 'locked'}`,
        onClick: () => {
          if (!unlocked) {
            toast('Todavía no, mo.');
            return;
          }
          close();
          goTo(id);
        },
      },
      h('span', { class: 'n' }, TITLES[id].n),
      h('span', { class: 't' }, TITLES[id].t),
      h('span', { class: 's' }, done ? '♥' : unlocked ? '›' : '🔒'),
    );
    list.append(item);
  }
  list.append(
    h('button', { class: 'btn ghost block', onClick: () => { close(); goTo('menu'); } }, 'IR AL MENÚ'),
    h('button', { class: 'btn ghost block', onClick: close }, 'CERRAR'),
  );
  overlay.append(list);
}
