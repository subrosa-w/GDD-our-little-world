import { h } from './dom';

/** Fondo fijo: estrellas (CSS) y luciérnagas repartidas al azar. */
export function mountSky() {
  const sky = h('div', { class: 'sky', 'aria-hidden': 'true' });
  for (let i = 0; i < 14; i++) {
    const f = h('i');
    f.style.left = `${Math.round(Math.random() * 100)}%`;
    f.style.top = `${30 + Math.round(Math.random() * 65)}%`;
    f.style.animationDelay = `${(Math.random() * 9).toFixed(2)}s`;
    f.style.animationDuration = `${(7 + Math.random() * 6).toFixed(2)}s`;
    sky.append(f);
  }
  document.body.prepend(sky);
}
