import Phaser from 'phaser';
import { SPRITE } from '../data/config';

export type Dir = 'down' | 'left' | 'right' | 'up';
export type CharKey = 'benja' | 'belen';

const DIRS: Dir[] = ['down', 'left', 'right', 'up'];

/** Crea las animaciones de caminar/idle para un spritesheet ya cargado con `key`. */
export function createCharAnims(scene: Phaser.Scene, key: CharKey) {
  const cols = 3;
  for (const dir of DIRS) {
    const row = SPRITE.rows[dir];
    const base = row * cols;
    const idle = base + SPRITE.cols.idle;
    const a = base + SPRITE.cols.stepA;
    const b = base + SPRITE.cols.stepB;
    if (!scene.anims.exists(`${key}-walk-${dir}`)) {
      scene.anims.create({
        key: `${key}-walk-${dir}`,
        frames: [idle, a, idle, b].map((frame) => ({ key, frame })),
        frameRate: 1000 / SPRITE.frameMs,
        repeat: -1,
      });
    }
    if (!scene.anims.exists(`${key}-idle-${dir}`)) {
      scene.anims.create({ key: `${key}-idle-${dir}`, frames: [{ key, frame: idle }], frameRate: 1 });
    }
  }
}

export interface Character {
  sprite: Phaser.Physics.Arcade.Sprite;
  key: CharKey;
  dir: Dir;
}

export function createCharacter(scene: Phaser.Scene, key: CharKey, x: number, y: number): Character {
  const sprite = scene.physics.add.sprite(x, y, key, SPRITE.rows.down * 3);
  sprite.setScale(SPRITE.scale);
  sprite.setOrigin(0.5, 1); // (x, y) son los pies
  // Cuerpo de colisión solo en los pies (en px de la textura sin escalar).
  const bodyW = 56;
  const bodyH = 26;
  sprite.body!.setSize(bodyW, bodyH);
  sprite.body!.setOffset((SPRITE.frameWidth - bodyW) / 2, SPRITE.frameHeight - bodyH - 4);
  sprite.setCollideWorldBounds(true);
  sprite.play(`${key}-idle-down`);
  return { sprite, key, dir: 'down' };
}

const SPEED = 150;

/** Mueve al personaje según un vector (-1..1, -1..1) y actualiza la animación. */
export function moveCharacter(ch: Character, vx: number, vy: number) {
  const body = ch.sprite.body as Phaser.Physics.Arcade.Body;
  const len = Math.hypot(vx, vy);
  if (len > 0.01) {
    const nx = vx / Math.max(len, 1);
    const ny = vy / Math.max(len, 1);
    body.setVelocity(nx * SPEED, ny * SPEED);
    if (Math.abs(vx) >= Math.abs(vy)) ch.dir = vx > 0 ? 'right' : 'left';
    else ch.dir = vy > 0 ? 'down' : 'up';
    ch.sprite.play(`${ch.key}-walk-${ch.dir}`, true);
  } else {
    body.setVelocity(0, 0);
    ch.sprite.play(`${ch.key}-idle-${ch.dir}`, true);
  }
  ch.sprite.setDepth(ch.sprite.y);
}

export function faceDir(ch: Character, dir: Dir) {
  ch.dir = dir;
  ch.sprite.play(`${ch.key}-idle-${dir}`, true);
}
