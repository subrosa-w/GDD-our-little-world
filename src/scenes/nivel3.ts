import Phaser from 'phaser';
import type { Scene } from '../router';
import { h, isTouch } from '../ui/dom';
import { playDialog, type DialogHandle } from '../ui/dialogPlayer';
import { mountTouchControls, pad } from '../game/input';
import { WorldScene } from '../game/WorldScene';
import { markObjeto } from '../progress';
import type { Objeto } from '../data/objetos';

const nivel3: Scene = ({ root }) => {
  const wrap = h('div', { class: 'game-wrap' });
  const hud = h('div', { class: 'game-hud' }, isTouch() ? 'Muévete con el joystick' : 'Flechas o WASD para moverte');
  const dialogBox = h('div', { class: 'game-dialog' });
  root.append(wrap, hud, dialogBox);

  let dialog: DialogHandle | null = null;
  const actionKey = isTouch() ? 'E' : '[E]';

  const world = new WorldScene({
    onNear: (o: Objeto | null) => {
      hud.textContent = o ? `${actionKey} ${o.accion}` : isTouch() ? 'Muévete con el joystick' : 'Flechas o WASD para moverte';
    },
    onInteract: (o, resume) => {
      markObjeto(o.id);
      dialogBox.classList.add('show');
      dialog = playDialog(dialogBox, o.lineas);
      dialog.done.then(() => {
        dialogBox.classList.remove('show');
        dialogBox.innerHTML = '';
        dialog = null;
        // Pequeña espera para que la tecla E que cerró el diálogo no vuelva a abrirlo.
        setTimeout(resume, 120);
      });
    },
  });

  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: wrap,
    backgroundColor: '#1b2a1e',
    pixelArt: true,
    roundPixels: true,
    scale: {
      mode: Phaser.Scale.RESIZE,
      width: '100%',
      height: '100%',
    },
    physics: { default: 'arcade', arcade: { debug: false } },
    scene: [world],
    input: { keyboard: true, touch: true },
  });

  const cleanupTouch = mountTouchControls(root, 'E');

  if (import.meta.env.DEV) {
    // Solo para depurar desde la consola del navegador.
    (window as unknown as { __game?: Phaser.Game; __pad?: typeof pad }).__game = game;
    (window as unknown as { __pad?: typeof pad }).__pad = pad;
  }

  return () => {
    dialog?.cancel();
    cleanupTouch();
    game.destroy(true);
  };
};

export default nivel3;
