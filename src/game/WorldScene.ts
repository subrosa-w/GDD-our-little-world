import Phaser from 'phaser';
import { PATHS, SPRITE } from '../data/config';
import { LEYENDA, MAPAS, type MapId, type Pieza } from '../data/mapas';
import { OBJETOS, type Objeto } from '../data/objetos';
import { pad, consumeAction } from './input';
import { createCharAnims, createCharacter, moveCharacter, faceDir, type Character } from './player';
import { TILE, ensureTextures } from './textures';

export interface WorldEvents {
  onNear?: (o: Objeto | null) => void;
  onInteract?: (o: Objeto, resume: () => void) => void;
  onMapChange?: (id: MapId, nombre: string) => void;
  onReady?: () => void;
}

export interface WorldOptions {
  /** 'juego': Belen controla. 'prologo': cinemática sin control, los dos sentados en la banca. */
  modo: 'juego' | 'prologo';
  mapa?: MapId;
  /** Usar spritesheets de las versiones mayores (si existen). */
  mayores?: boolean;
  /** Si es true, Benja en la banca dice la línea final y la interacción se reporta como 'banca-final'. */
  finalListo?: () => boolean;
  events: WorldEvents;
}

interface Interactable {
  objeto: Objeto;
  x: number;
  y: number;
}

interface Portal {
  zone: Phaser.GameObjects.Zone;
  to: MapId;
  spawn: string;
}

export class WorldScene extends Phaser.Scene {
  private opts: WorldOptions;
  private mapId: MapId;
  private player?: Character;
  private benja?: Character;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd?: Record<'W' | 'A' | 'S' | 'D' | 'E', Phaser.Input.Keyboard.Key>;
  private interactables: Interactable[] = [];
  private portals: Portal[] = [];
  private near: Interactable | null = null;
  private paused = false;
  private portalArmed = true;
  private pendingSpawn: string | null = null;
  private layers: Phaser.GameObjects.GameObject[] = [];
  private solids?: Phaser.Physics.Arcade.StaticGroup;

  constructor(opts: WorldOptions) {
    super('world');
    this.opts = opts;
    this.mapId = opts.mapa ?? 'terreno';
  }

  preload() {
    const frameConfig = { frameWidth: SPRITE.frameWidth, frameHeight: SPRITE.frameHeight };
    const m = this.opts.mayores;
    this.load.spritesheet('belen', m ? PATHS.belenMayor : PATHS.belen, frameConfig);
    this.load.spritesheet('benja', m ? PATHS.benjaMayor : PATHS.benja, frameConfig);
  }

  create() {
    ensureTextures(this);
    createCharAnims(this, 'belen');
    createCharAnims(this, 'benja');

    const kb = this.input.keyboard;
    if (kb && this.opts.modo === 'juego') {
      this.cursors = kb.createCursorKeys();
      this.wasd = kb.addKeys('W,A,S,D,E') as typeof this.wasd;
      kb.addCapture(['UP', 'DOWN', 'LEFT', 'RIGHT', 'SPACE']);
    }

    this.buildMap(this.mapId, null);
    this.scale.on('resize', () => this.applyZoom());
    this.opts.events.onReady?.();
  }

  // ---------------------------------------------------------------- mapa

  private clearMap() {
    for (const g of this.layers) g.destroy();
    this.layers = [];
    // El grupo estático hay que destruirlo con sus hijos (árboles, casa, autos, zonas).
    this.solids?.clear(true, true);
    this.solids?.destroy(true);
    this.solids = undefined;
    this.interactables = [];
    this.portals = [];
    this.near = null;
    this.player?.sprite.destroy();
    this.player = undefined;
    this.benja?.sprite.destroy();
    this.benja = undefined;
    this.physics.world.colliders.destroy();
  }

  private buildMap(id: MapId, spawnChar: string | null) {
    this.clearMap();
    this.mapId = id;
    const def = MAPAS[id];
    const rows = def.tiles.length;
    const cols = def.tiles[0].length;
    const worldW = cols * TILE;
    const worldH = rows * TILE;

    // Fondo
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
    const bgKey = def.fondo === 'pasto' ? 'grass' : 'floor';
    const map = this.make.tilemap({ data, tileWidth: TILE, tileHeight: TILE });
    const tiles = map.addTilesetImage(bgKey, bgKey, TILE, TILE, 0, 0)!;
    const layer = map.createLayer(0, tiles, 0, 0)!.setDepth(-1000);
    this.layers.push(layer);

    const solids = this.physics.add.staticGroup();
    this.solids = solids;
    let startX = worldW / 2;
    let startY = worldH / 2;
    let spawnFound = false;
    let benchPos: { x: number; y: number } | null = null;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const ch = def.tiles[r][c];
        const pieza: Pieza | undefined = LEYENDA[ch];
        const left = c * TILE;
        const bottom = (r + 1) * TILE;
        const cx = left + TILE / 2;

        if (ch === 'P' && !spawnChar) {
          startX = cx;
          startY = bottom;
          spawnFound = true;
        }
        if (spawnChar && ch === spawnChar) {
          const sal = LEYENDA[ch]?.salida ?? { dx: 0, dy: 1 };
          startX = cx + sal.dx * TILE;
          startY = bottom + sal.dy * TILE;
          spawnFound = true;
        }
        if (!pieza) continue;

        if (pieza.pared) {
          const w = this.add.image(left, bottom, 'wall').setOrigin(0, 1).setDepth(-900);
          this.layers.push(w);
        }

        let sprite: Phaser.GameObjects.Image | null = null;
        if (pieza.textura && !(pieza.pared && pieza.textura === 'wall')) {
          if (pieza.solido) {
            const s = solids.create(left, bottom, pieza.textura) as Phaser.Physics.Arcade.Sprite;
            s.setOrigin(0, 1);
            const body = s.body as Phaser.Physics.Arcade.StaticBody;
            const cu = pieza.cuerpo;
            if (cu) {
              const h = s.height;
              body.setSize(cu.w, cu.h);
              body.setOffset(cu.dx ?? 0, h - cu.h - (cu.dy ?? 0));
            }
            sprite = s;
          } else {
            sprite = this.add.image(left, bottom, pieza.textura).setOrigin(0, 1);
            this.layers.push(sprite);
          }
          // Las piezas de pared se dibujan planas (sobre la pared); el resto se ordena por y.
          sprite.setDepth(pieza.pared ? -800 : pieza.textura.startsWith('stairs') || pieza.textura === 'rug' || pieza.textura === 'doormat' || pieza.textura === 'flowerbed' || pieza.textura === 'plot' ? -700 : bottom);
        } else if (pieza.solido) {
          const z = this.add.zone(left, bottom - TILE, TILE, TILE).setOrigin(0, 0);
          this.physics.add.existing(z, true);
          solids.add(z);
          this.layers.push(z);
        }

        if (pieza.objeto) {
          const objeto = OBJETOS[pieza.objeto];
          if (objeto) {
            const dx = pieza.centro?.dx ?? TILE / 2;
            const dy = pieza.centro?.dy ?? -TILE / 2;
            this.interactables.push({ objeto, x: left + dx, y: bottom + dy });
          }
        }
        if (ch === 'B') benchPos = { x: left + 48, y: bottom };

        if (pieza.portal) {
          const w = pieza.cuerpo?.w ?? TILE;
          const h = pieza.cuerpo?.h ?? TILE;
          const zone = this.add.zone(left, bottom - h, w, h).setOrigin(0, 0);
          this.physics.add.existing(zone, true);
          this.layers.push(zone);
          this.portals.push({ zone, to: pieza.portal.to, spawn: pieza.portal.spawn });
        }
      }
    }
    solids.refresh();
    if (!spawnFound && spawnChar) {
      // Si no está el carácter de spawn, aparece en 'P' o al centro.
      startX = worldW / 2;
      startY = worldH / 2;
    }

    // Noche: velo oscuro + resplandor de ventanas.
    if (def.noche) {
      const veil = this.add.rectangle(0, 0, worldW, worldH, 0x0a0a1e, 0.38).setOrigin(0, 0).setDepth(5000);
      this.layers.push(veil);
      for (let r = 0; r < rows; r++) {
        const c = def.tiles[r].indexOf('H');
        if (c >= 0) {
          const hx = c * TILE;
          const hy = (r + 1) * TILE;
          for (const [gx, gy] of [[56, -126], [232, -126], [56, -46], [232, -46], [144, -126], [144, -4]]) {
            const g = this.add.image(hx + gx, hy + gy, 'glow').setBlendMode(Phaser.BlendModes.ADD).setDepth(5001).setAlpha(0.9);
            this.layers.push(g);
          }
        }
      }
    }

    this.physics.world.setBounds(0, 0, worldW, worldH);

    // Benja en la banca (afuera).
    if (benchPos) {
      const bp = benchPos as { x: number; y: number };
      this.benja = createCharacter(this, 'benja', bp.x - 24, bp.y - 2);
      this.benja.sprite.body!.enable = false;
      this.benja.sprite.setDepth(bp.y - 1); // la banca (depth = bp.y) le tapa las piernas: "sentado"
      faceDir(this.benja, 'down');
    }

    if (this.opts.modo === 'prologo' && benchPos) {
      const bp = benchPos as { x: number; y: number };
      this.player = createCharacter(this, 'belen', bp.x + 24, bp.y - 2);
      this.player.sprite.body!.enable = false;
      this.player.sprite.setDepth(bp.y - 1);
      faceDir(this.player, 'down');
      const cam = this.cameras.main;
      cam.setBounds(0, 0, worldW, worldH);
      cam.centerOn(bp.x, bp.y - 60);
      this.applyZoom();
      return;
    }

    this.player = createCharacter(this, 'belen', startX, startY);
    this.physics.add.collider(this.player.sprite, solids);
    const cam = this.cameras.main;
    cam.setBounds(0, 0, worldW, worldH);
    cam.startFollow(this.player.sprite, true, 0.12, 0.12);
    cam.setRoundPixels(true);
    this.applyZoom();
    this.portalArmed = false; // hasta salir del portal donde aparece
    this.opts.events.onMapChange?.(id, def.nombre);
  }

  private applyZoom() {
    const w = this.scale.width;
    const base = w < 480 ? 1.15 : w < 900 ? 1.3 : 1.5;
    this.cameras.main.setZoom(this.opts.modo === 'prologo' ? base * 1.15 : base);
  }

  // ---------------------------------------------------------------- juego

  setPaused(v: boolean) {
    this.paused = v;
    if (v && this.player) moveCharacter(this.player, 0, 0);
  }

  /** Cambia de mapa con un pequeño fundido. */
  private goToMap(to: MapId, spawn: string) {
    if (this.pendingSpawn !== null) return;
    this.pendingSpawn = spawn;
    this.setPaused(true);
    this.cameras.main.fadeOut(250, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.buildMap(to, spawn);
      this.cameras.main.fadeIn(250, 0, 0, 0);
      this.pendingSpawn = null;
      this.setPaused(false);
    });
  }

  update() {
    if (this.paused || !this.player || this.opts.modo !== 'juego') return;

    let vx = pad.x;
    let vy = pad.y;
    if (this.cursors && this.wasd) {
      if (this.cursors.left.isDown || this.wasd.A.isDown) vx = -1;
      else if (this.cursors.right.isDown || this.wasd.D.isDown) vx = 1;
      if (this.cursors.up.isDown || this.wasd.W.isDown) vy = -1;
      else if (this.cursors.down.isDown || this.wasd.S.isDown) vy = 1;
    }
    moveCharacter(this.player, vx, vy);

    // Portales
    const body = this.player.sprite.body as Phaser.Physics.Arcade.Body;
    let onPortal: Portal | null = null;
    for (const p of this.portals) {
      const zb = p.zone.body as Phaser.Physics.Arcade.StaticBody;
      if (Phaser.Geom.Intersects.RectangleToRectangle(
        new Phaser.Geom.Rectangle(body.x, body.y, body.width, body.height),
        new Phaser.Geom.Rectangle(zb.x, zb.y, zb.width, zb.height),
      )) {
        onPortal = p;
        break;
      }
    }
    if (!onPortal) this.portalArmed = true;
    else if (this.portalArmed) {
      this.goToMap(onPortal.to, onPortal.spawn);
      return;
    }

    // Objeto cercano
    const px = this.player.sprite.x;
    const py = this.player.sprite.y;
    let best: Interactable | null = null;
    let bestD = 72;
    for (const it of this.interactables) {
      const d = Math.hypot(it.x - px, it.y - py);
      if (d < bestD) {
        bestD = d;
        best = it;
      }
    }
    if (best !== this.near) {
      this.near = best;
      this.opts.events.onNear?.(best ? this.resolveObjeto(best.objeto) : null);
    }

    const pressed =
      (this.wasd && Phaser.Input.Keyboard.JustDown(this.wasd.E)) ||
      (this.cursors && Phaser.Input.Keyboard.JustDown(this.cursors.space)) ||
      consumeAction();
    if (pressed && this.near) {
      const objeto = this.resolveObjeto(this.near.objeto);
      this.setPaused(true);
      this.opts.events.onInteract?.(objeto, () => this.setPaused(false));
    }
  }

  /** La banca cambia de diálogo cuando el final está listo. */
  private resolveObjeto(o: Objeto): Objeto {
    if (o.id === 'banca' && this.opts.finalListo?.()) return OBJETOS['banca-final'];
    return o;
  }
}
