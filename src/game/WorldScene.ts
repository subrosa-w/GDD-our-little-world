import Phaser from 'phaser';
import { PATHS, SPRITE } from '../data/config';
import { MAPA_TERRENO } from '../data/mapa';
import { OBJETOS, type Objeto } from '../data/objetos';
import { pad, consumeAction } from './input';
import { createCharAnims, createCharacter, moveCharacter, type Character } from './player';
import { TILE, makeGrassTileset, makeTree, makeSign, makeBench } from './textures';

export interface WorldEvents {
  /** El jugador está cerca de un objeto (o de ninguno: null). */
  onNear: (o: Objeto | null) => void;
  /** El jugador activó un objeto. La escena del DOM muestra el diálogo y llama `resume` al cerrar. */
  onInteract: (o: Objeto, resume: () => void) => void;
}

interface Interactable {
  objeto: Objeto;
  x: number;
  y: number;
}

export class WorldScene extends Phaser.Scene {
  private player!: Character;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: Record<'W' | 'A' | 'S' | 'D' | 'E', Phaser.Input.Keyboard.Key>;
  private interactables: Interactable[] = [];
  private near: Interactable | null = null;
  private paused = false;
  private events_: WorldEvents;

  constructor(events: WorldEvents) {
    super('world');
    this.events_ = events;
  }

  preload() {
    const frameConfig = { frameWidth: SPRITE.frameWidth, frameHeight: SPRITE.frameHeight };
    this.load.spritesheet('belen', PATHS.belen, frameConfig);
    this.load.spritesheet('benja', PATHS.benja, frameConfig);
  }

  create() {
    makeGrassTileset(this);
    makeTree(this);
    makeSign(this);
    makeBench(this);
    createCharAnims(this, 'belen');
    createCharAnims(this, 'benja');

    const rows = MAPA_TERRENO.length;
    const cols = MAPA_TERRENO[0].length;
    const worldW = cols * TILE;
    const worldH = rows * TILE;

    // Capa de pasto (tilemap con variantes pseudoaleatorias).
    const data: number[][] = [];
    let seed = 3;
    for (let r = 0; r < rows; r++) {
      const row: number[] = [];
      for (let c = 0; c < cols; c++) {
        seed = (seed * 9301 + 49297) % 233280;
        const v = seed / 233280;
        row.push(v > 0.93 ? 3 : v > 0.6 ? 2 : v > 0.3 ? 1 : 0);
      }
      data.push(row);
    }
    const map = this.make.tilemap({ data, tileWidth: TILE, tileHeight: TILE });
    const tiles = map.addTilesetImage('grass', 'grass', TILE, TILE, 0, 0)!;
    map.createLayer(0, tiles, 0, 0)!.setDepth(-1000);

    // Obstáculos y objetos desde el ASCII.
    const solids = this.physics.add.staticGroup();
    let startX = worldW / 2;
    let startY = worldH / 2;
    const byTile = new Map(OBJETOS.filter((o) => o.tile).map((o) => [o.tile!, o]));

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const ch = MAPA_TERRENO[r][c];
        const cx = c * TILE + TILE / 2;
        const bottom = (r + 1) * TILE;
        if (ch === 'T') {
          const t = solids.create(cx, bottom, 'tree') as Phaser.Physics.Arcade.Sprite;
          t.setOrigin(0.5, 1).setDepth(bottom);
          const body = t.body as Phaser.Physics.Arcade.StaticBody;
          body.setSize(36, 22).setOffset(14, 96 - 22);
        } else if (ch === 'P') {
          startX = cx;
          startY = bottom;
        } else if (ch === 'S' || ch === 'B') {
          const key = ch === 'S' ? 'sign' : 'bench';
          const s = solids.create(cx, bottom, key) as Phaser.Physics.Arcade.Sprite;
          s.setOrigin(0.5, 1).setDepth(bottom);
          const body = s.body as Phaser.Physics.Arcade.StaticBody;
          if (ch === 'S') body.setSize(14, 10).setOffset(9, 30);
          else body.setSize(56, 14).setOffset(4, 14);
          const objeto = byTile.get(ch);
          if (objeto) this.interactables.push({ objeto, x: cx, y: bottom });
        }
      }
    }
    solids.refresh();

    this.physics.world.setBounds(0, 0, worldW, worldH);
    this.player = createCharacter(this, 'belen', startX, startY);
    this.physics.add.collider(this.player.sprite, solids);

    const cam = this.cameras.main;
    cam.setBounds(0, 0, worldW, worldH);
    cam.startFollow(this.player.sprite, true, 0.12, 0.12);
    cam.setRoundPixels(true);
    this.applyZoom();
    this.scale.on('resize', () => this.applyZoom());

    const kb = this.input.keyboard!;
    this.cursors = kb.createCursorKeys();
    this.wasd = kb.addKeys('W,A,S,D,E') as typeof this.wasd;
    // Que las flechas/espacio no hagan scroll a la página.
    kb.addCapture(['UP', 'DOWN', 'LEFT', 'RIGHT', 'SPACE']);
  }

  /** Zoom según el ancho de pantalla: en celular se ve más cerca. */
  private applyZoom() {
    const w = this.scale.width;
    const zoom = w < 480 ? 1.15 : w < 900 ? 1.3 : 1.5;
    this.cameras.main.setZoom(zoom);
  }

  setPaused(v: boolean) {
    this.paused = v;
    if (v) moveCharacter(this.player, 0, 0);
  }

  update() {
    if (this.paused) return;

    let vx = pad.x;
    let vy = pad.y;
    if (this.cursors.left.isDown || this.wasd.A.isDown) vx = -1;
    else if (this.cursors.right.isDown || this.wasd.D.isDown) vx = 1;
    if (this.cursors.up.isDown || this.wasd.W.isDown) vy = -1;
    else if (this.cursors.down.isDown || this.wasd.S.isDown) vy = 1;
    moveCharacter(this.player, vx, vy);

    // Objeto cercano
    const px = this.player.sprite.x;
    const py = this.player.sprite.y;
    let best: Interactable | null = null;
    let bestD = 64;
    for (const it of this.interactables) {
      const d = Math.hypot(it.x - px, it.y - py);
      if (d < bestD) {
        bestD = d;
        best = it;
      }
    }
    if (best !== this.near) {
      this.near = best;
      this.events_.onNear(best?.objeto ?? null);
    }

    const pressed =
      Phaser.Input.Keyboard.JustDown(this.wasd.E) || Phaser.Input.Keyboard.JustDown(this.cursors.space) || consumeAction();
    if (pressed && this.near) {
      this.setPaused(true);
      this.events_.onInteract(this.near.objeto, () => this.setPaused(false));
    }
  }
}
