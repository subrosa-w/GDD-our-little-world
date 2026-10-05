import Phaser from 'phaser';
import type { Scene } from '../router';
import { h, isTouch } from '../ui/dom';
import { playDialog, type DialogHandle } from '../ui/dialogPlayer';
import { toast } from '../ui/toast';
import { mountTouchControls, pad } from '../game/input';
import { WorldScene } from '../game/WorldScene';
import { markObjeto, getProgress, completeLevel, isCompleted } from '../progress';
import { OBJETO_FINAL, type Objeto } from '../data/objetos';
import { PATHS } from '../data/config';
import { assetExists } from '../ui/assets';

const nivel3: Scene = ({ root, go }) => {
  const wrap = h('div', { class: 'game-wrap' });
  const defaultHint = isTouch() ? 'Muévete con el joystick' : 'Flechas o WASD · E para interactuar';
  const hud = h('div', { class: 'game-hud' }, defaultHint);
  const place = h('div', { class: 'game-place pixel' }, '');
  const dialogBox = h('div', { class: 'game-dialog' });
  root.append(wrap, hud, place, dialogBox);

  let dialog: DialogHandle | null = null;
  let game: Phaser.Game | null = null;
  let destroyed = false;
  const actionKey = isTouch() ? 'E' : '[E]';

  const finalListo = () => getProgress().objetosEncontrados.includes(OBJETO_FINAL);

  const world = new WorldScene({
    modo: 'juego',
    mapa: 'terreno',
    finalListo,
    events: {
      onNear: (o: Objeto | null) => {
        hud.textContent = o ? `${actionKey} ${o.accion}` : defaultHint;
      },
      onMapChange: (_id, nombre) => {
        place.textContent = nombre;
      },
      onInteract: (o, resume) => {
        if (o.id === 'banca-final') {
          completeLevel('nivel3');
          dialogBox.classList.add('show');
          dialog = playDialog(dialogBox, o.lineas);
          dialog.done.then(() => {
            dialogBox.classList.remove('show');
            go('final');
          });
          return;
        }
        const yaVisto = getProgress().objetosEncontrados.includes(o.id);
        markObjeto(o.id);
        dialogBox.classList.add('show');
        dialogBox.innerHTML = '';
        if (o.foto) {
          const img = h('img', { class: 'game-foto', src: o.foto, alt: '' });
          img.addEventListener('error', () => img.remove());
          dialogBox.append(img);
        }
        const box = h('div');
        dialogBox.append(box);
        dialog = playDialog(box, o.lineas);
        dialog.done.then(() => {
          dialogBox.classList.remove('show');
          dialogBox.innerHTML = '';
          dialog = null;
          if (o.id === OBJETO_FINAL && !yaVisto) {
            completeLevel('nivel3');
            setTimeout(() => toast('Benja te espera afuera, en la banca.', 3200), 400);
          }
          setTimeout(resume, 120);
        });
      },
    },
  });

  void (async () => {
    // Versiones mayores de los sprites: se usan si Benja ya las dejó en la carpeta.
    const mayores = (await assetExists(PATHS.benjaMayor)) && (await assetExists(PATHS.belenMayor));
    if (destroyed) return;
    (world as unknown as { opts: { mayores: boolean } }).opts.mayores = mayores;
    game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: wrap,
      backgroundColor: '#14101c',
      pixelArt: true,
      roundPixels: true,
      scale: { mode: Phaser.Scale.RESIZE, width: '100%', height: '100%' },
      physics: { default: 'arcade', arcade: { debug: false } },
      scene: [world],
      input: { keyboard: true, touch: true },
    });
    if (import.meta.env.DEV) {
      (window as unknown as { __game?: Phaser.Game; __pad?: typeof pad }).__game = game;
      (window as unknown as { __pad?: typeof pad }).__pad = pad;
    }
  })();

  const cleanupTouch = mountTouchControls(root, 'E');
  if (isCompleted('nivel3')) setTimeout(() => toast('Puedes pasear tranquila, mo.'), 800);

  return () => {
    destroyed = true;
    dialog?.cancel();
    cleanupTouch();
    game?.destroy(true);
  };
};

export default nivel3;
