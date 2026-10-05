// Texturas placeholder dibujadas en canvas (pasto, árbol, cartel).
// Se reemplazan por el tileset real en la Fase 3 sin tocar la lógica del mundo.

import Phaser from 'phaser';

export const TILE = 32;

function ctx2d(scene: Phaser.Scene, key: string, w: number, h: number) {
  const tex = scene.textures.createCanvas(key, w, h)!;
  const c = tex.getContext();
  c.imageSmoothingEnabled = false;
  return { tex, c };
}

/** Tileset de pasto nocturno: 4 variantes en una fila (índices 0..3). */
export function makeGrassTileset(scene: Phaser.Scene, key = 'grass') {
  if (scene.textures.exists(key)) return;
  const variants = 4;
  const { tex, c } = ctx2d(scene, key, TILE * variants, TILE);
  const base = '#2d4a33';
  const dark = '#27402d';
  const light = '#37593c';
  const flower = ['#e0b06a', '#d58aa0', '#cfd7a0'];
  let seed = 7;
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  for (let v = 0; v < variants; v++) {
    const ox = v * TILE;
    c.fillStyle = base;
    c.fillRect(ox, 0, TILE, TILE);
    for (let i = 0; i < 26; i++) {
      c.fillStyle = rnd() > 0.5 ? dark : light;
      const x = ox + Math.floor(rnd() * TILE);
      const y = Math.floor(rnd() * TILE);
      c.fillRect(x, y, 2, 2);
    }
    // briznas
    for (let i = 0; i < 6; i++) {
      c.fillStyle = light;
      const x = ox + Math.floor(rnd() * (TILE - 2));
      const y = Math.floor(rnd() * (TILE - 4));
      c.fillRect(x, y, 2, 4);
    }
    if (v === 3) {
      c.fillStyle = flower[Math.floor(rnd() * flower.length)];
      c.fillRect(ox + 14, 14, 4, 4);
      c.fillStyle = light;
      c.fillRect(ox + 15, 18, 2, 4);
    }
  }
  tex.refresh();
}

/** Árbol placeholder 64×96 (origen abajo-centro al usarlo). */
export function makeTree(scene: Phaser.Scene, key = 'tree') {
  if (scene.textures.exists(key)) return;
  const w = 64;
  const h = 96;
  const { tex, c } = ctx2d(scene, key, w, h);
  // tronco
  c.fillStyle = '#4a3326';
  c.fillRect(26, 64, 12, 30);
  c.fillStyle = '#5c4030';
  c.fillRect(28, 64, 4, 30);
  // copa (bloques escalonados para look pixel)
  const canopy: Array<[number, number, number, number, string]> = [
    [12, 28, 40, 40, '#24412b'],
    [6, 36, 52, 26, '#24412b'],
    [16, 18, 32, 20, '#24412b'],
    [20, 24, 24, 32, '#2f5636'],
    [10, 40, 44, 16, '#2f5636'],
    [22, 20, 10, 10, '#3d6b43'],
    [14, 42, 10, 8, '#3d6b43'],
  ];
  for (const [x, y, ww, hh, col] of canopy) {
    c.fillStyle = col;
    c.fillRect(x, y, ww, hh);
  }
  tex.refresh();
}

/** Cartel de madera 32×40. */
export function makeSign(scene: Phaser.Scene, key = 'sign') {
  if (scene.textures.exists(key)) return;
  const { tex, c } = ctx2d(scene, key, 32, 40);
  c.fillStyle = '#5c4030';
  c.fillRect(14, 20, 4, 20);
  c.fillStyle = '#7a553d';
  c.fillRect(2, 4, 28, 18);
  c.fillStyle = '#4a3326';
  c.fillRect(2, 4, 28, 2);
  c.fillRect(2, 20, 28, 2);
  c.fillStyle = '#d8c3a0';
  c.fillRect(6, 9, 20, 2);
  c.fillRect(6, 14, 14, 2);
  tex.refresh();
}

/** Banca de madera 64×28 (donde parte el prólogo). */
export function makeBench(scene: Phaser.Scene, key = 'bench') {
  if (scene.textures.exists(key)) return;
  const { tex, c } = ctx2d(scene, key, 64, 28);
  c.fillStyle = '#7a553d';
  c.fillRect(4, 10, 56, 8);
  c.fillStyle = '#5c4030';
  c.fillRect(4, 18, 56, 3);
  c.fillRect(8, 21, 6, 7);
  c.fillRect(50, 21, 6, 7);
  c.fillStyle = '#8f6648';
  c.fillRect(4, 10, 56, 2);
  c.fillStyle = '#5c4030';
  c.fillRect(4, 0, 56, 8);
  c.fillStyle = '#7a553d';
  c.fillRect(6, 2, 52, 4);
  tex.refresh();
}
