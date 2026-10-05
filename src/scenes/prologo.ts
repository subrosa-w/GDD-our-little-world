import Phaser from 'phaser';
import type { Scene } from '../router';
import { h } from '../ui/dom';
import { playDialog, showDateScreen, type DialogHandle } from '../ui/dialogPlayer';
import { wait } from '../router';
import { WorldScene } from '../game/WorldScene';
import { PROLOGO, PROLOGO_OTRA_VEZ, PROLOGO_FECHA } from '../data/dialogos';
import { bumpVisitasPrologo, completeLevel, isAllCompleted } from '../progress';
import { PATHS } from '../data/config';
import { assetExists } from '../ui/assets';

const prologo: Scene = ({ root, go }) => {
  const wrap = h('div', { class: 'game-wrap' });
  const title = h('div', { class: 'prologo-title pixel' }, 'Muchos años después');
  const dialogBox = h('div', { class: 'game-dialog low' });
  root.append(wrap, title, dialogBox);

  let dialog: DialogHandle | null = null;
  let game: Phaser.Game | null = null;
  let cancelled = false;

  async function cinematica() {
    await wait(1600);
    if (cancelled) return;
    title.classList.add('hide');
    await wait(900);
    if (cancelled) return;
    const lineas = isAllCompleted() ? PROLOGO_OTRA_VEZ : PROLOGO;
    dialogBox.classList.add('show');
    dialog = playDialog(dialogBox, lineas, { charMs: 34 });
    await dialog.done;
    if (cancelled) return;
    dialogBox.classList.remove('show');
    await wait(500);
    await showDateScreen(PROLOGO_FECHA.fecha, PROLOGO_FECHA.sub, 3000);
    if (cancelled) return;
    bumpVisitasPrologo();
    completeLevel('prologo');
    go('nivel1');
  }

  void (async () => {
    const mayores = (await assetExists(PATHS.benjaMayor)) && (await assetExists(PATHS.belenMayor));
    if (cancelled) return;
    const world = new WorldScene({
      modo: 'prologo',
      mapa: 'terreno',
      mayores,
      events: { onReady: () => void cinematica() },
    });
    game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: wrap,
      backgroundColor: '#14101c',
      pixelArt: true,
      roundPixels: true,
      scale: { mode: Phaser.Scale.RESIZE, width: '100%', height: '100%' },
      physics: { default: 'arcade' },
      scene: [world],
    });
  })();

  return () => {
    cancelled = true;
    dialog?.cancel();
    document.querySelectorAll('.date-screen').forEach((d) => d.remove());
    game?.destroy(true);
  };
};

export default prologo;
