// PLACEHOLDER Fase 1: se reemplaza por la escena real en la Fase 2.
import type { Scene } from '../router';
import { h } from '../ui/dom';
import { completeLevel, nextLevel } from '../progress';
import { levelTitle } from '../ui/levelMenu';

const scene: Scene = ({ root, go }) => {
  const { n, t } = levelTitle('nivel2');
  root.append(
    h(
      'div',
      { class: 'screen' },
      h('h2', { class: 'pixel center' }, n),
      h('h1', { class: 'pixel center' }, t),
      h('p', { class: 'muted center' }, 'TODO_ESCENA: contenido en construcción.'),
      h(
        'button',
        {
          class: 'btn block',
          onClick: () => {
            completeLevel('nivel2');
            go(nextLevel() ?? 'menu');
          },
        },
        'CONTINUAR',
      ),
    ),
  );
};

export default scene;
