# OUR LITTLE WORLD — Brief para Claude Code

Eres el desarrollador de este proyecto. Lee este archivo completo antes de escribir cualquier línea de código. Todo lo que está aquí fue definido por Benja (el usuario) en conversaciones previas; no lo cambies sin preguntarle.

---

## 1. Qué es esto

Una página web interactiva de regalo de aniversario, hecha por **Benja** para **Belen**. Hoy es 5 de octubre de 2026: cumplen **2 años** de relación.

No es una galería de fotos ni un PowerPoint. Es una experiencia con tres niveles y una historia que los envuelve, inspirada en RPGs pixel-art tipo Pokémon antiguo / Stardew Valley.

**Premisa:** Benja y Belen, ya mayores, viven en el futuro que imaginaron (su terreno, su casa, sus autos). Una noche, sentados afuera, recuerdan cómo empezó todo. La página retrocede a 2024, recorre su historia, y vuelve al futuro para que Belen explore "el pequeño mundo" que construyeron juntos. Termina con una carta.

El mensaje central: *"No solo recuerdo cómo empezamos. Estoy imaginando todo lo que nos queda por vivir."*

---

## 2. La historia real (datos fijos, no inventar nada más)

**19 de agosto de 2024, ~13:30 — El comienzo**
- Patio/escaleras de la universidad, lleno de gente.
- Benja ya la había visto antes pero nunca se atrevió a hablarle.
- Su amigo (ver sección 6) le quitó la mochila y la chaqueta para obligarlo a ir a pedirle el Instagram.
- Benja dio el primer paso. Ella le dio su Instagram.
- Al día siguiente Benja le escribió primero. La primera conversación importante fue sobre videojuegos y sus edades.
- A la semana, los dos ya sentían que se gustaban. Desde el principio ambos tenían claro que iba en serio.

**29 de agosto de 2024, ~18:00 — Primera cita**

**Entre agosto y octubre**
- Muchas salidas, se veían en la universidad.
- Primer beso en la costanera de Puerto Montt.

**5 de octubre de 2024 — "Nosotros"**
- Viajaron de Puerto Montt a Puerto Varas.
- Patinaron en hielo, caminaron por la ciudad, comieron en el Mawhuen, se tomaron fotos.
- Llegaron a la escalera Eduardo Ricke. Benja dio el primer paso porque "no se podía aguantar de decírselo". Ahí empezó la relación.
- Justo después empezó a sonar Justin Bieber desde un restaurante cercano. Belen le dijo que Justin Bieber siempre sonaba en momentos especiales de su vida.
- Después, como pareja, pasaron Halloween juntos.

**Detalles de la relación**
- Apodo: se dicen **"mo"** en vez de "amor". Es el lenguaje secreto de toda la página (ver sección 5).
- Lo que Benja admira de Belen: su determinación y su madurez emocional.
- Símbolo de la relación: **Bubu y Dudu** (ver sección 5).
- Canciones: **"2! 3!" de BTS** (Benja se la dedicó; representa la relación) y **"One Less Lonely Girl" de Justin Bieber** (ella siempre quiso que se la dedicaran, y es la canción de ese 5 de octubre).
- Carreras: Benja informática, Belen diseño/marketing.

**El futuro que imaginan**
- Un terreno en el campo.
- Casa de dos pisos, bonita, maximalista, llena de plantas por dentro y por fuera.
- Autos: Benja un JDM o una camioneta (pendiente decidir cuál); Belen un Mini Cooper.
- Quizá una mascota.
- Se casan. Su amigo es el padrino (sección 6).

---

## 3. Estructura de la página

```
LOGIN  →  PRÓLOGO (futuro)  →  NIVEL 1  →  NIVEL 2  →  NIVEL 3  →  FINAL
```

### Login
- Pantalla simple, pixel-art, con stickers de Bubu y Dudu.
- Texto: **"Bienvenida, mo."**
- Clave: algo que solo Belen sabe (Benja la define; por ahora placeholder `TODO_CLAVE`).
- Si la clave es incorrecta: mensaje suave, nunca un error técnico.

### Prólogo — "Muchos años después"
- Casa pixel-art de noche, luces cálidas, plantas, terreno, dos autos.
- Benja y Belen **mayores** sentados afuera.
- Diálogo: Belen: "Mo..." / Benja: "¿Qué?" / Belen: "¿Te acuerdas de cómo nos conocimos?"
- Aparece `19 · 08 · 2024`, fundido a negro.

### Nivel 1 — "Nuestra historia" (recuerdos desbloqueables)
No es una timeline tradicional. Son tarjetas de memoria que se abren una a una, con fotos reales entre medio, y comentarios de los Benja/Belen del futuro.

- **MEMORIA 01** — El día que todo comenzó — 19.08.2024 (escena del patio, el amigo, la mochila, el Instagram)
- **MEMORIA 02** — La primera vez que salimos — 29.08.2024
- **MEMORIA 03** — El primer beso — Costanera, Puerto Montt
- **MEMORIA 04** — El día que dejamos de ser solamente dos — 05.10.2024, Puerto Varas (patinaje → ciudad → Mawhuen → fotos → escalera → Justin Bieber)
- **MEMORIAS 05+** — Los dos años siguientes (2025–2026). **PENDIENTE: Benja debe entregar estos recuerdos.** No inventarlos.
- Las canciones aparecen aquí como recuerdos, no como música de fondo: "Una canción que me recuerda a ti: 2! 3! — BTS" y "Una canción que siempre quisiste que te dedicaran: One Less Lonely Girl — Justin Bieber".

Ejemplos de comentarios desde el futuro, para el tono:
> Belen: "Éramos tan chicos." / Benja: "Y ya sabíamos." / Belen: "¿Sabíamos qué?" / Benja: "Que esto iba a durar."

### Nivel 2 — Trivia — "¿Cuánto sabes de nosotros, mo?"
- Preguntas sobre la historia (fechas, lugares, detalles). **PENDIENTE: Benja define las preguntas.**
- Si falla: pista cariñosa y reintento, nunca castigo.
- Al terminar desbloquea el Nivel 3. Pequeña animación de Bubu y Dudu al completarla.

### Nivel 3 — "Our Little World" (juego explorable)
Volvemos al futuro. Belen controla a su personaje y recorre el terreno.

**El terreno:** pasto, árboles, plantas, flores, maceteros, un pequeño huerto, una terraza, un lugar para sentarse (donde parte el prólogo), los dos autos estacionados, quizá una mascota.

**La casa (dos pisos, cada espacio representa algo):**
- Cocina → la vida cotidiana
- Living → fotos de ustedes; **aquí está la foto del matrimonio con el padrino** (sección 6)
- Jardín → lo que construyeron juntos
- Entrada → los autos. Interacción con el Mini: Benja: "¿Todavía te gusta?" / Belen: "Obviamente."
- Dormitorio → fotos y recuerdos
- Oficina/espacio creativo → sus carreras
- **Habitación vacía** → placa: "Todavía no sabemos qué habrá aquí." / "Y está bien."

Interacción con objetos mediante `[E]` (desktop) o botón táctil (móvil). Cada objeto muestra una foto, un texto corto o un mini-diálogo.

### Final
Belen encuentra a Benja. Se sientan frente a la casa.
> Belen: "Después de tantos años..." / Benja: "¿Todavía te acuerdas?" / Belen: "De todo."

Flashes breves: 19.08.2024 · 29.08.2024 · Puerto Montt · 05.10.2024 · Hoy.
> "Quizás algún día miremos hacia atrás y esto también sea un recuerdo. Pero quiero seguir llenando nuestra historia de ellos."
> "No sé exactamente cómo será el futuro. Pero sí sé con quién quiero descubrirlo."

Luego **la carta**. **La escribe Benja, no tú.** Deja un placeholder `TODO_CARTA`. Cierre: **"Feliz aniversario, mo. ❤️"**

---

## 4. Progresión y guardado

- Los niveles se desbloquean en orden: Prólogo → 1 → 2 → 3 → Final.
- Intentar abrir un nivel bloqueado muestra algo suave ("Todavía no, mo"), nunca un error.
- Un nivel completado queda abierto para siempre: puede volver, releer, repetir la trivia, pasearse por el mapa.
- Al completar todo se desbloquea un modo libre (menú/mapa para ir a cualquier parte, incluida la carta).
- Extra: con todo completado, el prólogo cambia sutilmente al volver a entrar (ej. "¿Otra vez, mo?").
- Guardado en **localStorage**: nivel actual, niveles completados, recuerdos abiertos, objetos encontrados, trivia completada. Envolver todo en try/catch; si está vacío, empezar desde cero sin romper nada.
- Un menú persistente de niveles con candados, siempre accesible.

---

## 5. Reglas de contenido

- **Idioma:** español de Chile, cercano, nada formal.
- **"mo":** aparece dosificado. Momentos clave: "Bienvenida, mo", "¿Cuánto sabes de nosotros, mo?", algún "¿Vamos, mo?" en el juego, "Si llegaste hasta aquí, mo...", "Feliz aniversario, mo." Algunos mensajes firmados solo "— Mo". Nunca explicar qué significa.
- **Bubu y Dudu:** son mascotas del sitio (stickers en login, entre fotos, animación en trivia, coleccionable en el juego, escena final juntos). **No los dibujes ni los recrees:** son personajes con derechos. Benja proveerá los stickers que ya tienen como imágenes en `public/assets/bubu-dudu/`. Los personajes pixel-art representan a Benja y Belen; Bubu y Dudu no se mezclan con ellos.
- **Música:** no usar las grabaciones comerciales. Benja proveerá versiones **8-bit/chiptune** en `public/assets/musica/`. Las canciones originales se mencionan como referencia dentro de la historia.
- **No inventar recuerdos, frases ni detalles** que no estén en este archivo. Si falta contenido, poner placeholder claro `TODO_...` y avisar a Benja.
- **Mensaje del Nivel 3:** no es "esto va a pasar", es "este es el mundo que quiero construir contigo".

---

## 6. El amigo de Benja (trátalo con cuidado)

El amigo que le quitó la mochila a Benja el 19 de agosto **falleció**. Belen solo lo conoció en su velorio. Benja dice: "si no fuera por él, nuestra relación quizás no hubiera existido".

Cómo aparece (nivel medio, discreto):
1. En la Memoria 01, como personaje sin nombre ("Amigo"), hace lo de la mochila. Sin más.
2. En el living de la casa del futuro hay una **foto del matrimonio** de Benja y Belen **con él al lado**. Al interactuar aparece una sola línea: **"Nuestro padrino."** Es el último objeto que se descubre antes del final.
3. Opcional, en el final: Belen: "¿Te acuerdas de él?" / Benja: "Siempre."

Nunca mencionar que murió. Belen lo sabe. Nombre: `TODO_NOMBRE_AMIGO` (Benja decide si aparece el nombre o no).

---

## 7. Assets existentes

En `public/assets/sprites/`:

| Archivo | Descripción |
|---|---|
| `benja_spritesheet.png` | 312×768. 4 filas × 3 columnas, celdas de **104×192 px** |
| `belen_spritesheet.png` | Mismo formato |
| `spritesheet.json` | Filas: down=0, left=1, right=2, up=3. Columnas: idle=0, stepA=1, stepB=2. Ciclo de caminata: idle, stepA, idle, stepB a ~180 ms por frame. Pies alineados a 4 px del borde inferior de la celda |
| `retrato_benja.png` / `retrato_belen.png` | Retratos grandes con fondo transparente, para las cajas de diálogo |
| `benja_preview.gif` / `belen_preview.gif` | Solo referencia visual, no usar en la página |

Diseño de personajes (para generar más assets coherentes):
- **Benja:** gorro negro tipo beanie, pelo castaño con flequillo, polerón negro con capucha, borde de polera blanca asomando, jeans azules, zapatillas negras con suela blanca, aro en la oreja.
- **Belen:** pelo negro corto estilo bob con flequillo recto, lentes, chaqueta de cuero negra sobre polerón negro, falda negra, medias de red, botas negras, aros.

**Versiones mayores (pendientes):** mismos sprites con cambios sutiles (pelo distinto o con canas, ropa más adulta, Benja quizá sin gorro, Belen quizá pelo más largo o recogido). No hacerlos ancianos.

**Pendientes de generar/entregar:** tileset del terreno, casa exterior e interiores, autos, árboles/plantas, sprite del amigo, Bubu y Dudu (los entrega Benja), fotos reales, música 8-bit.

---

## 8. Stack y decisiones técnicas

- **Vite** + vanilla JS (o TypeScript si lo prefieres, consúltalo). Deploy en **Vercel** desde un repo **privado** de GitHub.
- **Login, Nivel 1, Nivel 2, Final:** HTML/CSS/JS normales, una "escena" por pantalla, con transiciones tipo fundido a negro.
- **Nivel 3 y Prólogo:** **Phaser 3**. Tilemaps (idealmente editables con Tiled), cámara que sigue al jugador, colisiones, zonas de interacción, spritesheets según `spritesheet.json`.
- **Mobile-first.** Belen lo va a abrir casi seguro en el celular. Diseño vertical, controles táctiles (joystick o D-pad + botón de acción) en el Nivel 3, y teclado (flechas/WASD + E) en desktop. Probar en ambos.
- **Estilo visual:** pixel-art. Los sprites son de alta resolución (~100×180 por frame), así que los tiles del mapa deben ser de **32×32 o más** para que el mundo y los personajes se vean del mismo estilo. `image-rendering: pixelated` en todo. Paleta oscura y cálida (noche, luces de casa, plantas), consistente con la ropa negra de los dos.
- Fuente pixel (ej. Press Start 2P o similar) para títulos; una fuente legible para textos largos (la carta tiene que leerse cómoda en celular).
- Fotos: optimizar a web (WebP, máximo ~1200 px de ancho), lazy loading.
- Sin backend. Sin analytics. Sin dependencias innecesarias.

Estructura sugerida:
```
our-little-world/
├── public/assets/{sprites,fotos,musica,mapa,bubu-dudu}/
├── src/
│   ├── main.js            ← router de escenas + progreso
│   ├── progress.js        ← localStorage (try/catch)
│   ├── scenes/            ← login, prologo, nivel1, nivel2, nivel3, final
│   ├── game/              ← Phaser: mapa, jugador, interacciones, diálogos
│   └── data/              ← memorias.js, trivia.js, dialogos.js, objetos.js (todo el contenido en archivos de datos, no mezclado con lógica)
├── originales/            ← zips de Gemini (no se despliegan)
└── docs/GDD.md
```

---

## 9. Plan de trabajo

**Fase 1 — Esqueleto (empezar por aquí)**
1. Proyecto Vite + estructura de carpetas + `progress.js` con la lógica de desbloqueo.
2. Login con "Bienvenida, mo" y clave placeholder.
3. Menú de niveles con candados funcionando.
4. Nivel 3 mínimo en Phaser: un mapa de pasto placeholder donde Belen camina con su sprite real, en desktop y en celular.
5. Verificar que todo el flujo (login → menú → nivel → guardado → recarga) funciona.

**Fase 2 — Contenido**
6. Nivel 1 con las Memorias 01–04 y los diálogos desde el futuro.
7. Nivel 2 trivia (con preguntas placeholder hasta que Benja las entregue).
8. Prólogo y Final con los diálogos de este archivo.

**Fase 3 — El mundo**
9. Terreno, casa, interiores, objetos interactivos, autos, el padrino.
10. Versiones mayores de los personajes.

**Fase 4 — Pulido**
11. Fotos reales, música 8-bit, Bubu y Dudu, carta de Benja, clave real.
12. Pruebas en celular real. Deploy en Vercel.

---

## 10. Lo que debes pedirle a Benja cuando llegues a necesitarlo

- Recuerdos de 2025–2026 (5 a 10, grandes o tontos).
- Cosas pequeñas que ama/admira de Belen (para objetos y diálogos del mundo).
- Qué hacen juntos hoy y qué sueñan (lugares, proyectos).
- Las preguntas de la trivia.
- La carta final (escrita por él).
- La clave de entrada.
- Cómo es el terreno y la casa en su cabeza (campo abierto o bosque sureño, estilo y color de la casa, qué auto JDM/camioneta, mascota).
- Fotos (del inicio, de Puerto Varas, selfies, viajes, tontas, especiales, Bubu/Dudu).
- Stickers de Bubu y Dudu y las versiones 8-bit de las canciones.
- Si quiere que aparezca el nombre de su amigo.

Pregunta una cosa a la vez, cuando la necesites, no todo de golpe.
