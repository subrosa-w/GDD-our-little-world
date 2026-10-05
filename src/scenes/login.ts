import type { Scene } from '../router';
import { h } from '../ui/dom';
import { CLAVE, PATHS } from '../data/config';
import { setLoggedIn } from '../progress';

const SUAVES = [
  'Mmm, esa no es, mo. Intenta de nuevo.',
  'Casi. Piensa en algo que solo tú sabes.',
  'Todavía no. Tranquila, no hay apuro.',
];

function normalize(s: string) {
  return s.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function sticker(src: string, label: string) {
  const img = h('img', { class: 'sticker', src, alt: label });
  // Si la imagen aún no existe, mostramos un círculo placeholder.
  img.addEventListener('error', () => {
    img.replaceWith(h('div', { class: 'sticker placeholder' }, label));
  });
  return img;
}

const login: Scene = ({ root, go }) => {
  let intentos = 0;
  const input = h('input', {
    class: 'input',
    type: 'password',
    autocomplete: 'off',
    autocapitalize: 'off',
    placeholder: '…',
    'aria-label': 'Clave',
  }) as HTMLInputElement;
  const msg = h('p', { class: 'muted small center' }, ' ');

  function intentar() {
    if (normalize(input.value) === normalize(CLAVE)) {
      setLoggedIn(true);
      go('menu');
      return;
    }
    msg.textContent = SUAVES[Math.min(intentos, SUAVES.length - 1)];
    intentos++;
    input.value = '';
    input.focus();
  }

  const form = h(
    'form',
    {
      class: 'card',
      onSubmit: (e: Event) => {
        e.preventDefault();
        intentar();
      },
    },
    h('p', { class: 'muted small center', style: 'margin:0 0 10px' }, 'Hay una sola clave y solo tú la sabes.'),
    input,
    msg,
    h('button', { class: 'btn block', type: 'submit' }, 'ENTRAR'),
  );

  root.append(
    h(
      'div',
      { class: 'screen' },
      h('p', { class: 'fecha-tag' }, 'OUR LITTLE WORLD'),
      h(
        'div',
        { class: 'pareja' },
        h('img', { src: PATHS.retratoBenja, alt: '' }),
        h('span', { class: 'corazon' }, '♥'),
        h('img', { src: PATHS.retratoBelen, alt: '' }),
      ),
      h('h1', { class: 'pixel center' }, 'Bienvenida, mo.'),
      form,
      h('div', { class: 'stickers' }, sticker(PATHS.bubu, 'bubu'), sticker(PATHS.dudu, 'dudu')),
    ),
  );
  setTimeout(() => input.focus(), 500);
};

export default login;
