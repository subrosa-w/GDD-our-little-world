// Estado de entrada compartido entre el DOM (joystick táctil) y Phaser.
// Phaser lee `pad` cada frame; el joystick lo escribe.

import { h, isTouch } from '../ui/dom';

export const pad = {
  x: 0,
  y: 0,
  /** Se pone en true al tocar el botón de acción; el juego lo consume con `consumeAction()`. */
  actionQueued: false,
};

export function consumeAction(): boolean {
  const a = pad.actionQueued;
  pad.actionQueued = false;
  return a;
}

/** Monta joystick + botón de acción si el dispositivo es táctil. Devuelve limpieza. */
export function mountTouchControls(parent: HTMLElement, actionLabel = 'E'): () => void {
  if (!isTouch()) return () => {};

  const knob = h('div', { class: 'knob' });
  const stick = h('div', { class: 'touch-pad show' }, knob);
  const action = h('button', { class: 'touch-action show', type: 'button' }, actionLabel);
  parent.append(stick, action);

  const R = 42; // radio máximo del knob en px
  let activeId: number | null = null;
  let cx = 0;
  let cy = 0;

  const setKnob = (dx: number, dy: number) => {
    knob.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onDown = (e: PointerEvent) => {
    if (activeId !== null) return;
    activeId = e.pointerId;
    stick.setPointerCapture(e.pointerId);
    const r = stick.getBoundingClientRect();
    cx = r.left + r.width / 2;
    cy = r.top + r.height / 2;
    onMove(e);
  };
  const onMove = (e: PointerEvent) => {
    if (e.pointerId !== activeId) return;
    let dx = e.clientX - cx;
    let dy = e.clientY - cy;
    const d = Math.hypot(dx, dy);
    if (d > R) {
      dx = (dx / d) * R;
      dy = (dy / d) * R;
    }
    setKnob(dx, dy);
    const dead = 8;
    pad.x = Math.abs(dx) < dead ? 0 : dx / R;
    pad.y = Math.abs(dy) < dead ? 0 : dy / R;
  };
  const onUp = (e: PointerEvent) => {
    if (e.pointerId !== activeId) return;
    activeId = null;
    pad.x = 0;
    pad.y = 0;
    setKnob(0, 0);
  };
  stick.addEventListener('pointerdown', onDown);
  stick.addEventListener('pointermove', onMove);
  stick.addEventListener('pointerup', onUp);
  stick.addEventListener('pointercancel', onUp);

  const onAction = (e: Event) => {
    e.preventDefault();
    pad.actionQueued = true;
  };
  action.addEventListener('pointerdown', onAction);

  return () => {
    stick.remove();
    action.remove();
    pad.x = 0;
    pad.y = 0;
    pad.actionQueued = false;
  };
}
