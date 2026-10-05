# Our Little World — GDD técnico

Complemento de `CLAUDE.md` (el brief manda). Aquí va cómo está construido y dónde se toca cada cosa.

## Flujo

```
LOGIN → PRÓLOGO (Phaser, cinemática) → NIVEL 1 (memorias) → NIVEL 2 (trivia) → NIVEL 3 (Phaser, explorable) → FINAL (carta)
```

- Los niveles se desbloquean en orden. Un nivel completado queda abierto para siempre.
- Menú persistente de niveles: botón `≡` arriba a la derecha (oculto en el login).
- Con todo completado: el menú muestra modo libre y el prólogo dice "¿Otra vez, mo?".

## Dónde está cada cosa

| Qué | Archivo |
|---|---|
| Clave de entrada, rutas de assets, nombre del amigo | `src/data/config.ts` |
| Memorias del Nivel 1 (texto, fechas, fotos, canciones) | `src/data/memorias.ts` |
| Preguntas de la trivia | `src/data/trivia.ts` |
| Diálogos del prólogo y del final, la carta | `src/data/dialogos.ts` |
| Objetos interactivos del mundo (qué dice cada cosa) | `src/data/objetos.ts` |
| Mapas en ASCII (terreno, primer piso, segundo piso) y leyenda | `src/data/mapas.ts` |
| Texturas placeholder dibujadas en canvas | `src/game/textures.ts` |
| Lógica del mundo: mapa, colisiones, portales, interacción, noche | `src/game/WorldScene.ts` |
| Personajes (animaciones del spritesheet) | `src/game/player.ts` |
| Joystick táctil + botón E | `src/game/input.ts` |
| Guardado en localStorage y desbloqueo | `src/progress.ts` |
| Router de escenas con fundido | `src/router.ts` |
| Caja de diálogo RPG y pantalla de fecha | `src/ui/dialogPlayer.ts` |

## Mapas ASCII

Cada carácter es un tile de 32 px. La leyenda está en `src/data/mapas.ts` (`LEYENDA`).
Piezas grandes: un carácter ancla en la esquina inferior izquierda y `#` en el resto de la huella.

- `terreno`: casa `H` (9×6 tiles + techo), puerta `D`, banca `B` (ahí se sienta Benja), autos `C` (Benja) y `M` (Mini), cartel `S`, jardín `f`/`g`, huerto `h`/`v`, maceteros `p`, árboles `T`, inicio `P`.
- `casa1`: cocina `K`, mesa `t`, sofá `L`, cuadros `F`, **foto del matrimonio con el padrino `X`**, alfombra `r`, escalera `U`, salida `d`.
- `casa2`: cama `E`, cuadro `R`, escritorio `O`, pared interior `|` con puerta `+`, **placa de la habitación vacía `Q`**, escalera `u`.

Portales: `D`→`casa1`, `d`→`terreno`, `U`→`casa2`, `u`→`casa1`. `salida` en la leyenda dice dónde aparece el jugador al llegar.

## Cierre del Nivel 3

- El Nivel 3 se completa al mirar la foto del matrimonio (`OBJETO_FINAL` en `objetos.ts`).
- Después, Benja en la banca dice "¿Vamos, mo?" y al aceptar pasa al Final.
- Antes de eso, la banca dice "Anda a mirar la casa, mo. Yo te espero aquí."

## Sprites

- Spritesheets 312×768, celdas 104×192, filas down/left/right/up, columnas idle/stepA/stepB. Ciclo idle, A, idle, B a 180 ms.
- Se dibujan a escala 0.5 sobre tiles de 32 px.
- Versiones mayores: si existen `benja_mayor_spritesheet.png` y `belen_mayor_spritesheet.png` en `public/assets/sprites/` (mismo formato), el prólogo y el Nivel 3 las usan solas.

## Assets opcionales (se detectan solos, si faltan no rompe nada)

- `public/assets/bubu-dudu/bubu.png`, `dudu.png` → stickers en login, trivia y carta.
- `public/assets/fotos/m01.webp … m04.webp` → fotos de las memorias.
- `public/assets/fotos/living.webp`, `matrimonio.webp`, `dormitorio.webp` → cuadros de la casa.
- `public/assets/musica/2-3.mp3`, `one-less-lonely-girl.mp3` → versiones 8-bit en las tarjetas de canción.

## Pendientes marcados en el código (buscar `TODO_`)

`TODO_CLAVE`, `TODO_CARTA`, `TODO_RECUERDOS_2025_2026`, `TODO_TRIVIA` (revisar preguntas), `TODO_FOTO_*`, `TODO_MUSICA_8BIT`, `TODO_AUTO_BENJA`, `TODO_NOMBRE_AMIGO`.

## Comandos

```bash
npm run dev      # desarrollo (http://localhost:5173, accesible desde el celular en la misma red)
npm run build    # typecheck + build a dist/
npm run preview  # servir dist/
```

Deploy: repo privado en GitHub → Vercel (framework Vite, build `npm run build`, output `dist`). No necesita variables de entorno.
