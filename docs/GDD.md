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

## Mapas

Los tres mapas (`terreno`, `casa1`, `casa2`) usan **fondo de imagen**: `public/assets/mapa/terreno.jpg` (1312×816), `casa1.jpg` y `casa2.jpg` (1104×960), generados con Gemini a partir de los prompts del chat. Todo lo demás se define en píxeles de esa imagen en `src/data/mapas.ts`:

- `solidos`: rectángulos que bloquean (paredes, muebles, autos, troncos).
- `capas`: recortes de la misma imagen que se dibujan por encima del jugador (banca, faroles, cartel, copas de árboles, mesa). Así el personaje pasa por detrás.
- `puntos`: objetos interactivos con centro y radio (el radio grande sirve para muebles con colisión amplia).
- `portales` y `entradas`: zonas que cambian de mapa y dónde aparece el jugador al llegar.
- `banca`: donde se sienta Benja (y los dos en el prólogo). La banca va en `capas` para que les tape las piernas.

Para reemplazar una imagen: misma ruta y mismo tamaño, o ajustar `ancho`/`alto` y las coordenadas. Para ajustar una colisión basta mover el rectángulo.

El modo anterior (ASCII con tiles dibujados en código, `tipo: 'tiles'` y `LEYENDA`) se mantiene como respaldo en el mismo archivo.

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
- `public/assets/fotos/primera_cita.webp`, `primer_beso.webp`, `primer_dia_de_novios.webp` → memorias 02–04 y cuadros de la casa (originales en `originales/fotos/`). Falta `matrimonio.webp` (cuadro del padrino) y una foto para la Memoria 01.
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
