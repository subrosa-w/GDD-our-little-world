// Texturas placeholder dibujadas en canvas. Se reemplazan por tiles reales
// (misma clave, mismo tamaño) sin tocar la lógica del mundo.

import Phaser from 'phaser';

export const TILE = 32;

type Ctx = CanvasRenderingContext2D;

function canvas(scene: Phaser.Scene, key: string, w: number, h: number, draw: (c: Ctx) => void) {
  if (scene.textures.exists(key)) return;
  const tex = scene.textures.createCanvas(key, w, h)!;
  const c = tex.getContext();
  c.imageSmoothingEnabled = false;
  draw(c);
  tex.refresh();
}

function rect(c: Ctx, x: number, y: number, w: number, h: number, col: string) {
  c.fillStyle = col;
  c.fillRect(x, y, w, h);
}

let seed = 7;
const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;

/** Pasto nocturno: 4 variantes en fila. */
function grass(scene: Phaser.Scene) {
  canvas(scene, 'grass', TILE * 4, TILE, (c) => {
    for (let v = 0; v < 4; v++) {
      const ox = v * TILE;
      rect(c, ox, 0, TILE, TILE, '#2d4a33');
      for (let i = 0; i < 26; i++) rect(c, ox + Math.floor(rnd() * TILE), Math.floor(rnd() * TILE), 2, 2, rnd() > 0.5 ? '#27402d' : '#37593c');
      for (let i = 0; i < 6; i++) rect(c, ox + Math.floor(rnd() * (TILE - 2)), Math.floor(rnd() * (TILE - 4)), 2, 4, '#37593c');
      if (v === 3) {
        rect(c, ox + 14, 14, 4, 4, ['#e0b06a', '#d58aa0', '#cfd7a0'][Math.floor(rnd() * 3)]);
        rect(c, ox + 15, 18, 2, 4, '#37593c');
      }
    }
  });
}

/** Piso de madera interior: 4 variantes. */
function floor(scene: Phaser.Scene) {
  canvas(scene, 'floor', TILE * 4, TILE, (c) => {
    for (let v = 0; v < 4; v++) {
      const ox = v * TILE;
      rect(c, ox, 0, TILE, TILE, '#5a4033');
      for (let y = 0; y < TILE; y += 8) {
        rect(c, ox, y, TILE, 1, '#4a3328');
        const off = (y / 8 + v) % 2 === 0 ? 10 : 24;
        rect(c, ox + off, y, 1, 8, '#4a3328');
        rect(c, ox, y + 1, TILE, 1, '#66493a');
      }
    }
  });
}

function wall(scene: Phaser.Scene) {
  canvas(scene, 'wall', TILE, TILE, (c) => {
    rect(c, 0, 0, TILE, TILE, '#6e5a78');
    rect(c, 0, 0, TILE, 6, '#8a7394');
    rect(c, 0, TILE - 4, TILE, 4, '#4f4058');
    for (let y = 8; y < TILE - 4; y += 8) rect(c, 0, y, TILE, 1, '#64516e');
  });
}

function tree(scene: Phaser.Scene) {
  canvas(scene, 'tree', 64, 96, (c) => {
    rect(c, 26, 64, 12, 30, '#4a3326');
    rect(c, 28, 64, 4, 30, '#5c4030');
    const canopy: Array<[number, number, number, number, string]> = [
      [12, 28, 40, 40, '#24412b'], [6, 36, 52, 26, '#24412b'], [16, 18, 32, 20, '#24412b'],
      [20, 24, 24, 32, '#2f5636'], [10, 40, 44, 16, '#2f5636'], [22, 20, 10, 10, '#3d6b43'], [14, 42, 10, 8, '#3d6b43'],
    ];
    for (const [x, y, w, h, col] of canopy) rect(c, x, y, w, h, col);
  });
}

function sign(scene: Phaser.Scene) {
  canvas(scene, 'sign', 32, 40, (c) => {
    rect(c, 14, 20, 4, 20, '#5c4030');
    rect(c, 2, 4, 28, 18, '#7a553d');
    rect(c, 2, 4, 28, 2, '#4a3326');
    rect(c, 2, 20, 28, 2, '#4a3326');
    rect(c, 6, 9, 20, 2, '#d8c3a0');
    rect(c, 6, 14, 14, 2, '#d8c3a0');
  });
}

function bench(scene: Phaser.Scene) {
  canvas(scene, 'bench', 96, 28, (c) => {
    rect(c, 4, 0, 88, 8, '#5c4030');
    rect(c, 6, 2, 84, 4, '#7a553d');
    rect(c, 4, 10, 88, 8, '#7a553d');
    rect(c, 4, 10, 88, 2, '#8f6648');
    rect(c, 4, 18, 88, 3, '#5c4030');
    rect(c, 8, 21, 6, 7, '#5c4030');
    rect(c, 82, 21, 6, 7, '#5c4030');
  });
}

function flowerbed(scene: Phaser.Scene) {
  canvas(scene, 'flowerbed', TILE, TILE, (c) => {
    rect(c, 0, 0, TILE, TILE, '#3b2a20');
    rect(c, 2, 2, TILE - 4, TILE - 4, '#4a3528');
    const cols = ['#e0b06a', '#d58aa0', '#e07a7a', '#cfd7a0', '#9fb7e0'];
    for (let i = 0; i < 7; i++) {
      const x = 4 + Math.floor(rnd() * 22);
      const y = 4 + Math.floor(rnd() * 22);
      rect(c, x, y + 3, 2, 4, '#3d6b43');
      rect(c, x - 1, y, 4, 4, cols[Math.floor(rnd() * cols.length)]);
    }
  });
}

function planter(scene: Phaser.Scene) {
  canvas(scene, 'planter', TILE, 44, (c) => {
    rect(c, 6, 24, 20, 18, '#8a4b3a');
    rect(c, 4, 22, 24, 4, '#a85c45');
    rect(c, 6, 40, 20, 2, '#6b3a2c');
    rect(c, 12, 8, 8, 16, '#3d6b43');
    rect(c, 6, 12, 8, 10, '#2f5636');
    rect(c, 18, 10, 9, 11, '#2f5636');
    rect(c, 14, 2, 4, 8, '#3d6b43');
    rect(c, 8, 6, 4, 4, '#4f8a52');
  });
}

function plot(scene: Phaser.Scene) {
  canvas(scene, 'plot', TILE, TILE, (c) => {
    rect(c, 0, 0, TILE, TILE, '#3b2a20');
    for (let y = 2; y < TILE; y += 8) {
      rect(c, 0, y, TILE, 4, '#4a3528');
      rect(c, 6, y - 1, 3, 5, '#3d6b43');
      rect(c, 20, y - 1, 3, 5, '#3d6b43');
    }
  });
}

/** Casa de dos pisos, 288×256 (huella 288×192 + techo 64 arriba). */
function house(scene: Phaser.Scene) {
  canvas(scene, 'house', 288, 256, (c) => {
    // sombra/base
    rect(c, 0, 248, 288, 8, '#1a1a1a');
    // muros
    rect(c, 8, 96, 272, 156, '#cdb8a0');
    rect(c, 8, 96, 272, 4, '#b39f88');
    rect(c, 8, 170, 272, 6, '#b39f88'); // división de pisos
    // techo
    rect(c, 0, 64, 288, 36, '#6b3b3b');
    rect(c, 16, 40, 256, 28, '#7a4444');
    rect(c, 40, 20, 208, 24, '#6b3b3b');
    rect(c, 0, 96, 288, 4, '#4a2a2a');
    for (let x = 0; x < 288; x += 16) rect(c, x, 64, 2, 36, '#5a3232');
    // ventanas (cálidas)
    const win = (x: number, y: number) => {
      rect(c, x - 2, y - 2, 36, 40, '#4a3326');
      rect(c, x, y, 32, 36, '#f2b35c');
      rect(c, x + 15, y, 2, 36, '#4a3326');
      rect(c, x, y + 17, 32, 2, '#4a3326');
      rect(c, x + 2, y + 2, 10, 12, '#ffd27a');
    };
    win(40, 110);
    win(216, 110);
    win(40, 190);
    win(216, 190);
    win(128, 110);
    // puerta
    rect(c, 124, 192, 40, 60, '#5c4030');
    rect(c, 128, 196, 32, 56, '#7a553d');
    rect(c, 152, 224, 4, 4, '#f2b35c');
    rect(c, 116, 186, 56, 6, '#4a3326');
    // luz de puerta
    rect(c, 136, 180, 16, 6, '#ffd27a');
    // plantas colgantes / maceteros en fachada
    const pot = (x: number, y: number) => {
      rect(c, x, y, 16, 10, '#8a4b3a');
      rect(c, x + 2, y - 10, 12, 10, '#3d6b43');
      rect(c, x - 2, y - 6, 6, 6, '#2f5636');
      rect(c, x + 12, y - 8, 6, 6, '#2f5636');
    };
    pot(84, 240);
    pot(188, 240);
    pot(84, 160);
    pot(188, 160);
    // enredadera
    for (let y = 100; y < 240; y += 12) rect(c, 12 + (y % 24 === 0 ? 4 : 0), y, 6, 8, '#2f5636');
  });
}

function car(scene: Phaser.Scene, key: string, body: string, dark: string, w: number) {
  canvas(scene, key, w, 44, (c) => {
    rect(c, 2, 36, w - 4, 6, '#1a1a1a');
    rect(c, 4, 16, w - 8, 20, body);
    rect(c, 14, 6, w - 28, 14, dark);
    rect(c, 18, 8, w - 36, 10, '#9fb7e0');
    rect(c, 4, 16, w - 8, 3, dark);
    rect(c, 10, 32, 14, 10, '#222');
    rect(c, w - 24, 32, 14, 10, '#222');
    rect(c, 13, 35, 8, 4, '#777');
    rect(c, w - 21, 35, 8, 4, '#777');
    rect(c, 4, 24, 6, 4, '#ffd27a');
    rect(c, w - 10, 24, 6, 4, '#e07a7a');
  });
}

function doormat(scene: Phaser.Scene) {
  canvas(scene, 'doormat', TILE, TILE, (c) => {
    rect(c, 2, 8, 28, 18, '#8a6a4a');
    rect(c, 4, 10, 24, 14, '#a88458');
    for (let y = 12; y < 24; y += 4) rect(c, 6, y, 20, 1, '#8a6a4a');
  });
}

function rug(scene: Phaser.Scene) {
  canvas(scene, 'rug', 96, 64, (c) => {
    rect(c, 0, 0, 96, 64, '#8a2f4a');
    rect(c, 6, 6, 84, 52, '#a94a63');
    rect(c, 14, 14, 68, 36, '#8a2f4a');
    rect(c, 24, 24, 48, 16, '#e98fa4');
  });
}

function counter(scene: Phaser.Scene) {
  canvas(scene, 'counter', 64, 48, (c) => {
    rect(c, 0, 12, 64, 36, '#7a5a48');
    rect(c, 0, 8, 64, 8, '#d8c3a0');
    rect(c, 4, 20, 24, 24, '#5c4030');
    rect(c, 34, 20, 26, 24, '#5c4030');
    rect(c, 36, 2, 20, 8, '#444');
    rect(c, 38, 4, 6, 4, '#222');
    rect(c, 48, 4, 6, 4, '#222');
    rect(c, 8, 2, 16, 8, '#9fb7e0');
    rect(c, 10, 4, 12, 4, '#cfe0ff');
  });
}

function table(scene: Phaser.Scene) {
  canvas(scene, 'table', 64, 40, (c) => {
    rect(c, 4, 8, 56, 20, '#8f6648');
    rect(c, 4, 8, 56, 3, '#a87a58');
    rect(c, 8, 28, 6, 12, '#5c4030');
    rect(c, 50, 28, 6, 12, '#5c4030');
    rect(c, 26, 12, 12, 10, '#e0b06a');
    rect(c, 28, 4, 8, 10, '#3d6b43');
  });
}

function sofa(scene: Phaser.Scene) {
  canvas(scene, 'sofa', 96, 48, (c) => {
    rect(c, 0, 0, 96, 40, '#3b4a6b');
    rect(c, 6, 14, 84, 22, '#4f638a');
    rect(c, 6, 14, 84, 4, '#5d74a0');
    rect(c, 0, 0, 10, 40, '#2f3c57');
    rect(c, 86, 0, 10, 40, '#2f3c57');
    rect(c, 14, 18, 20, 12, '#e98fa4');
    rect(c, 60, 18, 20, 12, '#f2b35c');
    rect(c, 4, 40, 8, 8, '#2a2a2a');
    rect(c, 84, 40, 8, 8, '#2a2a2a');
  });
}

function frame(scene: Phaser.Scene, key: string, border: string, inner: string) {
  canvas(scene, key, TILE, TILE, (c) => {
    rect(c, 0, 0, TILE, TILE, '#6e5a78');
    rect(c, 0, 0, TILE, 6, '#8a7394');
    rect(c, 5, 6, 22, 22, border);
    rect(c, 8, 9, 16, 16, inner);
    rect(c, 11, 18, 4, 7, '#222');
    rect(c, 17, 18, 4, 7, '#222');
    rect(c, 12, 13, 3, 4, '#f1d2b6');
    rect(c, 18, 13, 3, 4, '#f1d2b6');
  });
}

function plaque(scene: Phaser.Scene) {
  canvas(scene, 'plaque', TILE, TILE, (c) => {
    rect(c, 0, 0, TILE, TILE, '#6e5a78');
    rect(c, 0, 0, TILE, 6, '#8a7394');
    rect(c, 6, 10, 20, 12, '#c9a35a');
    rect(c, 8, 12, 16, 8, '#e0c47a');
    rect(c, 10, 14, 12, 1, '#8a6a2a');
    rect(c, 10, 17, 8, 1, '#8a6a2a');
  });
}

function bed(scene: Phaser.Scene) {
  canvas(scene, 'bed', 64, 96, (c) => {
    rect(c, 0, 0, 64, 14, '#5c4030');
    rect(c, 4, 14, 56, 78, '#e9e2d6');
    rect(c, 4, 44, 56, 48, '#8a2f4a');
    rect(c, 4, 44, 56, 6, '#a94a63');
    rect(c, 8, 18, 22, 18, '#f3ecf5');
    rect(c, 34, 18, 22, 18, '#f3ecf5');
    rect(c, 0, 90, 64, 6, '#5c4030');
  });
}

function desk(scene: Phaser.Scene) {
  canvas(scene, 'desk', 64, 48, (c) => {
    rect(c, 0, 20, 64, 20, '#7a553d');
    rect(c, 0, 20, 64, 3, '#8f6648');
    rect(c, 4, 40, 6, 8, '#5c4030');
    rect(c, 54, 40, 6, 8, '#5c4030');
    rect(c, 8, 2, 24, 18, '#222');
    rect(c, 10, 4, 20, 14, '#4f8aa8');
    rect(c, 18, 20, 4, 4, '#222');
    rect(c, 38, 8, 20, 12, '#f3ecf5');
    rect(c, 40, 10, 16, 2, '#e98fa4');
    rect(c, 40, 14, 10, 2, '#9fb7e0');
    rect(c, 56, 2, 6, 8, '#3d6b43');
  });
}

function stairs(scene: Phaser.Scene, key: string, up: boolean) {
  canvas(scene, key, 64, 64, (c) => {
    rect(c, 0, 0, 64, 64, '#4a3328');
    for (let i = 0; i < 6; i++) {
      const y = up ? 54 - i * 10 : 4 + i * 10;
      rect(c, 4, y, 56, 8, i % 2 ? '#8f6648' : '#7a553d');
      rect(c, 4, y, 56, 2, '#a87a58');
    }
    rect(c, 0, 0, 4, 64, '#5c4030');
    rect(c, 60, 0, 4, 64, '#5c4030');
  });
}

/** Resplandor suave para ventanas de noche. */
function glow(scene: Phaser.Scene) {
  canvas(scene, 'glow', 128, 128, (c) => {
    const g = c.createRadialGradient(64, 64, 4, 64, 64, 64);
    g.addColorStop(0, 'rgba(255, 210, 122, 0.55)');
    g.addColorStop(1, 'rgba(255, 210, 122, 0)');
    c.fillStyle = g;
    c.fillRect(0, 0, 128, 128);
  });
}

export function ensureTextures(scene: Phaser.Scene) {
  grass(scene);
  floor(scene);
  wall(scene);
  tree(scene);
  sign(scene);
  bench(scene);
  flowerbed(scene);
  planter(scene);
  plot(scene);
  house(scene);
  car(scene, 'car-benja', '#2a4d8f', '#1b3360', 96);
  car(scene, 'car-belen', '#b53a3a', '#7a2626', 80);
  doormat(scene);
  rug(scene);
  counter(scene);
  table(scene);
  sofa(scene);
  frame(scene, 'frame', '#7a553d', '#9fb7e0');
  frame(scene, 'frame-padrino', '#c9a35a', '#e9e2d6');
  plaque(scene);
  bed(scene);
  desk(scene);
  stairs(scene, 'stairs-up', true);
  stairs(scene, 'stairs-down', false);
  glow(scene);
}
