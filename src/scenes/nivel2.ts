import type { Scene } from '../router';
import { h } from '../ui/dom';
import { TRIVIA } from '../data/trivia';
import { PATHS } from '../data/config';
import { completeLevel, setTriviaCompletada, isCompleted } from '../progress';

const nivel2: Scene = ({ root, go }) => {
  let i = 0;
  let aciertosPrimera = 0;
  let falloEnEsta = false;

  const card = h('div', { class: 'card trivia' });
  const progress = h('div', { class: 'trivia-progress' });

  function renderPregunta() {
    const q = TRIVIA[i];
    falloEnEsta = false;
    progress.innerHTML = '';
    for (let k = 0; k < TRIVIA.length; k++) {
      progress.append(h('span', { class: `dot ${k < i ? 'done' : k === i ? 'now' : ''}` }));
    }
    const pista = h('p', { class: 'pista' }, ' ');
    const opts = h('div', { class: 'opciones' });
    // Barajamos las opciones para que la correcta no sea siempre la primera.
    const order = q.opciones.map((_, idx) => idx).sort(() => Math.random() - 0.5);
    for (const idx of order) {
      const b = h(
        'button',
        {
          class: 'opcion',
          onClick: () => {
            if (idx === q.correcta) {
              if (!falloEnEsta) aciertosPrimera++;
              opts.querySelectorAll('button').forEach((x) => ((x as HTMLButtonElement).disabled = true));
              b.classList.add('ok');
              pista.textContent = q.acierto;
              pista.classList.add('ok');
              setTimeout(siguiente, 1400);
            } else {
              falloEnEsta = true;
              b.classList.add('bad');
              b.disabled = true;
              pista.textContent = `Pista: ${q.pista}`;
            }
          },
        },
        q.opciones[idx],
      );
      opts.append(b);
    }
    card.innerHTML = '';
    card.append(
      h('p', { class: 'pixel num' }, `PREGUNTA ${i + 1} / ${TRIVIA.length}`),
      h('p', { class: 'pregunta' }, q.pregunta),
      opts,
      pista,
    );
  }

  function siguiente() {
    i++;
    if (i >= TRIVIA.length) terminar();
    else renderPregunta();
  }

  function terminar() {
    setTriviaCompletada();
    completeLevel('nivel2');
    progress.innerHTML = '';
    const bubu = h('img', { class: 'sticker', src: PATHS.bubu, alt: '' });
    const dudu = h('img', { class: 'sticker', src: PATHS.dudu, alt: '' });
    bubu.addEventListener('error', () => bubu.replaceWith(h('div', { class: 'sticker placeholder' }, 'bubu')));
    dudu.addEventListener('error', () => dudu.replaceWith(h('div', { class: 'sticker placeholder' }, 'dudu')));
    card.innerHTML = '';
    card.append(
      h('div', { class: 'stickers celebra' }, bubu, dudu),
      h('h2', { class: 'pixel center' }, 'Lo sabías todo.'),
      h('p', { class: 'center' }, aciertosPrimera === TRIVIA.length ? 'Todas a la primera. Obvio.' : 'Alguna pista hizo falta, pero igual llegaste. Siempre llegas.'),
      h('p', { class: 'center muted' }, 'Ahora sí: ven a ver nuestro pequeño mundo.'),
      h('button', { class: 'btn block', onClick: () => go('nivel3') }, 'IR A OUR LITTLE WORLD'),
    );
  }

  const intro = h(
    'div',
    { class: 'screen' },
    h('h2', { class: 'pixel center' }, 'NIVEL 2'),
    h('h1', { class: 'pixel center', style: 'margin-bottom:0' }, '¿Cuánto sabes de nosotros, mo?'),
    h('div', { class: 'divisor' }, '♥'),
    h('p', { class: 'muted center', style: 'margin:0' }, 'Si te equivocas no pasa nada: te doy una pista y seguimos.'),
    isCompleted('nivel2')
      ? h('button', { class: 'btn ghost block', onClick: () => go('nivel3') }, 'YA LA HICE, IR AL NIVEL 3')
      : null,
    h(
      'button',
      {
        class: 'btn block',
        onClick: () => {
          intro.replaceWith(juego);
          renderPregunta();
        },
      },
      'EMPEZAR',
    ),
  );
  const juego = h('div', { class: 'screen top' }, progress, card);
  root.append(intro);
};

export default nivel2;
