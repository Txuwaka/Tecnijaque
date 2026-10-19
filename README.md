# Tecni Jaque — Alpha 06

Un primer ajedrez de Txuwa: azules nocturnos, morados, piezas de plata y obsidiana. Tablero y piezas geométricas en 3D real (WebGL / Three.js), con movimientos animados. Sin instalación, cuentas ni servidor de partidas.

## Alpha 06 — Más tablero en el móvil

- La partida ocupa la altura disponible, sin el hueco vacío sobre el tablero.
- Cámara 3D ajustada a las dimensiones reales del tablero, incluyendo las piezas altas; se adapta a vertical, horizontal, giro y vista cenital.
- Girar, Vista cenital y Tablero 2D/3D están visibles debajo del tablero, fuera del menú.
- Nox conserva su espacio inferior; en móviles horizontales pequeños pasa a la derecha.
- Sustituye todos los archivos y la carpeta `vendor` en GitHub, incluido el nuevo `camera-fit.js`. `index.html` debe quedar en la raíz. Recarga para cargar la Alpha 06.
- Verificación: pruebas del motor, interfaz y audio, y proyección matemática del tablero y sus piezas en varios tamaños. Pendiente la comprobación visual en un navegador móvil real.

## Alpha 05 — Tablero, Nox y tranquilidad

- Pantalla principal adaptada a la altura disponible: tablero, turno y consejos de Nox.
- Menú desplegable con modalidad, dificultad, ayudas, acciones, audio e historial; en Alpha 06 las vistas pasan al tablero. Se cierra con ✕, Escape o al pulsar fuera.
- Agua rediseñada como un murmullo grave y suave, sin gotas de grifo; entrada y salida progresivas. Es síntesis, no una grabación de campo.
- La melodía original no se ha modificado.

## Alpha 04 — Nox y su jardín

- Nox es un cuervo vectorial animado, sin imágenes externas: parpadea, inclina la cabeza y acompaña los comentarios de partida. Tócalo o pulsa «Nox, dame un consejo».
- Sus consejos usan el estado del tablero: jaque, pieza seleccionada, casillas atacadas o lecciones básicas. No sustituye un motor experto. Se pueden silenciar sus comentarios sin desactivar las ayudas.
- «El jardín de Nox»: composición instrumental original de 32 compases, tempo 72 BPM, con melodía, arpegios y acordes sintetizados mediante Web Audio. Se repite aproximadamente cada 107 segundos. Son timbres suaves de arpa/campanas y fondo sostenido; no es una grabación orquestal ni incluye voces.
- Música y río se activan por separado, con volúmenes independientes. Ambas empiezan apagadas y se pausan al ocultar la pestaña. El audio se crea al pulsar el botón; no se descarga ninguna pista al arrancar.
- Sigue el arranque ligero en 2D; el 3D se carga solo al solicitarlo.
- Sustituye todos los archivos del repositorio, incluyendo `music.js` y `vendor`. Recarga con Ctrl+Shift+R y comprueba que aparece ALPHA 06.

Verificación adicional: prueba de interfaz simulada para arranque, movimiento, respuesta IA y controles de Nox. Prueba del ciclo de audio con un contexto simulado: inicio, volumen, pausa, cambio de pestaña y reanudación. No se ha verificado el aspecto ni escuchado la mezcla en un navegador real.

## Subir a GitHub Pages

1. Descomprime el ZIP.
2. Crea un repositorio, por ejemplo `chess-master`.
3. Sube **el contenido** de la carpeta `tecni-jaque`: `index.html` debe quedar en la raíz del repositorio, junto a los demás archivos y la carpeta `vendor`. No subas solamente el ZIP ni solamente el HTML.
4. Abre **Settings → Pages**.
5. En **Source**, selecciona **Deploy from a branch**. Elige **main** y **/(root)** y pulsa **Save**.
6. Cuando termine la publicación, abre el enlace que muestra GitHub Pages.

Referencia oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

No requiere npm, compilación ni servicios externos. Las dos bibliotecas están incluidas dentro de `vendor` con sus licencias. Todos los enlaces son relativos, compatibles con repositorios de GitHub Pages.

## Probar en Linux antes de subir

Dentro de la carpeta del juego, ejecuta:

```bash
python3 -m http.server 8000
```

Abre http://localhost:8000. No abras `index.html` con doble clic: los módulos y la IA necesitan HTTP/HTTPS. Para parar el servidor: Ctrl+C.

## Qué incluye

- Tablero 3D y piezas modeladas mediante geometría, iluminación azul/violeta y sombras.
- Desplazamiento animado, saltos del caballo, balanceo de selección, retirada teatral de piezas capturadas y comentarios simpáticos. Vista cenital, giro y tablero 2D con ocho filas iguales y animación de movimiento.
- Juego contra IA con blancas, o dos personas en el mismo dispositivo.
- Cuatro niveles: Primeros pasos (aleatorio), Aprendiz (evaluación con despistes), Escudero (hasta dos medias jugadas) y Guardián (hasta tres, con presupuesto de tiempo y nodos). No es Stockfish ni una IA experta. La fuerza no está calibrada en Elo.
- Movimientos legales iluminados, explicaciones por pieza, sugerencia de jugada y maestro protector opcional: avisa antes de mover a una casilla atacada; permite reconsiderar o seguir. No detecta todos los errores tácticos ni sustituye una evaluación completa.
- Jaque, mate, ahogado, enroque, captura al paso y promoción a dama, torre, alfil o caballo.
- Tablas automáticas por repetición triple, 50 jugadas y material insuficiente. Esta automatización simplifica el procedimiento de reclamación de un torneo.
- Historial en notación algebraica internacional, capturas y deshacer (turno completo contra IA).
- Sonidos opcionales de movimiento y captura, apagados inicialmente. Río tranquilo sintetizado con corriente estéreo suave, sin gotas aisladas, con interruptor y volumen independientes. No es una grabación real ni una canción. Se activa mediante clic y se pausa al ocultar la pestaña.
- Fuente gótica Grenze Gotisch incluida localmente, con licencia OFL; textos de ayuda en tipografía sencilla para facilitar la lectura.
- Guardado automático local de la partida y modalidad; se recupera al volver a la misma URL con el mismo navegador. No sincroniza dispositivos y se pierde al borrar los datos del sitio.
- Compatibilidad con la preferencia de reducir movimiento.

## Correcciones de Alpha 03

- Corregida una referencia a `sq` fuera de su ámbito en los botones de promoción: detenía la inicialización de la interfaz.
- El juego arranca en 2D. Three.js y la escena solo se descargan al pulsar **Tablero 3D**.
- Sombras desactivadas y resolución de render limitada para reducir carga gráfica.
- Límite de espera para animaciones y recuperación de IA con jugada legal básica si el worker falla o no responde.
- Archivos de entrada versionados para evitar mezclar la interfaz anterior con la nueva en caché.
- Prueba de integración de arranque, movimiento humano y respuesta IA, deshacer, pista, persistencia y recuperación ante worker bloqueado. Se ejecuta con `node interface-tests.mjs`; usa un DOM simulado, no comprueba renderizado ni audio real.

## Actualizar

Sustituye todos los archivos del repositorio por los de este ZIP, incluyendo la carpeta `vendor`. Si ves la versión anterior, recarga con Ctrl+Shift+R. La partida anterior se conserva en el mismo navegador y URL. Se conservan la dificultad y las ayudas de Alpha 02; si vienes de Alpha 01 se selecciona Primeros pasos.

## Primer test sugerido

1. Mueve un peón del centro y espera a que responda el guardián.
2. Selecciona un caballo: comprueba sus destinos iluminados.
3. Pulsa **Dame una pista**, juega la sugerencia y prueba **Deshacer**.
4. Cambia entre 3D y 2D, gira el tablero y prueba la vista cenital.
5. Recarga la página: la partida debe continuar donde la dejaste.
6. Prueba el modo de dos jugadores y el sonido.
7. Activa el agua, ajusta el volumen y vuelve a silenciarla.
8. Comprueba que las ocho filas del tablero 2D conservan su tamaño cuando salen las piezas.
9. Cambia de dificultad. El maestro protector es opcional y puede desactivarse.

Si algo falla, comparte captura, dispositivo/navegador y qué movimiento o botón usaste. En equipos con pocos recursos, usa el tablero 2D.

## Organización para próximas versiones

- `index.html`: interfaz en español.
- `style.css`: tema visual y adaptación a móvil.
- `app.js`: turnos, interfaz, promoción y persistencia.
- `scene.js`: modelos 3D, cámara, selección y animación.
- `ai.js` / `worker.js`: búsqueda de jugadas en un hilo separado.
- `ambience.js`: ambiente de río sintetizado, sin descargas ni archivos sonoros externos.
- `vendor/chess.js`: reglas del ajedrez (chess.js 1.0.0, BSD-2-Clause).
- `vendor/three.module.js`: motor gráfico (Three.js 0.160.1, MIT).
- `tests.mjs`: comprobaciones automatizadas; ejecutar `node tests.mjs` o `npm test`.

## Verificación de esta entrega

Han pasado: árbol de 8.902 posiciones legales a profundidad 3, jaque mate, ambos enroques, captura al paso, cuatro promociones, ahogado, repetición, material insuficiente, 20 medias jugadas de IA, recuperación PGN y elección de mate en una jugada por la IA. Sintaxis JavaScript comprobada. Pruebas adicionales de las cuatro dificultades, diversidad del nivel inicial y detección de una casilla atacada para el maestro protector.

Pendiente: prueba visual y de interacción en navegador y en tu dispositivo. Esta entrega no se ha publicado automáticamente.

## Después

Las peleas entre piezas, personajes, efectos de captura especiales y multijugador online quedan para próximas versiones. La base actual usa piezas geométricas, sin animaciones de combate. El objetivo de esta primera entrega es jugar, aprender y ajustar controles y aspecto juntos.

Nuevos archivos: `music.js` contiene la composición y su reproductor; `music-tests.mjs` comprueba el ciclo de audio. Ejecuta `npm test` para las pruebas de reglas, interfaz y audio.
