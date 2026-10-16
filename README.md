# Chess Master — Alpha 01

Un primer ajedrez de Txuwa: azules nocturnos, morados, piezas de plata y obsidiana. Tablero y piezas geométricas en 3D real (WebGL / Three.js), con movimientos animados. Sin instalación, cuentas ni servidor de partidas.

## Subir a GitHub Pages

1. Descomprime el ZIP.
2. Crea un repositorio, por ejemplo `chess-master`.
3. Sube **el contenido** de la carpeta `chess-master`: `index.html` debe quedar en la raíz del repositorio, junto a los demás archivos y la carpeta `vendor`. No subas solamente el ZIP ni solamente el HTML.
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
- Desplazamiento animado, vista cenital, giro de orientación y tablero 2D alternativo.
- Juego contra IA con blancas, o dos personas en el mismo dispositivo.
- Dos niveles sencillos: Aprendiz (evalúa una jugada) y Escudero (considera también la respuesta rival). No es Stockfish ni una IA experta.
- Movimientos legales iluminados, explicaciones por pieza y sugerencia de jugada.
- Jaque, mate, ahogado, enroque, captura al paso y promoción a dama, torre, alfil o caballo.
- Tablas automáticas por repetición triple, 50 jugadas y material insuficiente. Esta automatización simplifica el procedimiento de reclamación de un torneo.
- Historial en notación algebraica internacional, capturas y deshacer (turno completo contra IA).
- Sonidos opcionales generados en el navegador, apagados inicialmente.
- Guardado automático local de la partida y modalidad; se recupera al volver a la misma URL con el mismo navegador. No sincroniza dispositivos y se pierde al borrar los datos del sitio.
- Compatibilidad con la preferencia de reducir movimiento.

## Primer test sugerido

1. Mueve un peón del centro y espera a que responda el guardián.
2. Selecciona un caballo: comprueba sus destinos iluminados.
3. Pulsa **Dame una pista**, juega la sugerencia y prueba **Deshacer**.
4. Cambia entre 3D y 2D, gira el tablero y prueba la vista cenital.
5. Recarga la página: la partida debe continuar donde la dejaste.
6. Prueba el modo de dos jugadores y el sonido.

Si algo falla, comparte captura, dispositivo/navegador y qué movimiento o botón usaste. En equipos con pocos recursos, usa el tablero 2D.

## Organización para próximas versiones

- `index.html`: interfaz en español.
- `style.css`: tema visual y adaptación a móvil.
- `app.js`: turnos, interfaz, promoción y persistencia.
- `scene.js`: modelos 3D, cámara, selección y animación.
- `ai.js` / `worker.js`: búsqueda de jugadas en un hilo separado.
- `vendor/chess.js`: reglas del ajedrez (chess.js 1.0.0, BSD-2-Clause).
- `vendor/three.module.js`: motor gráfico (Three.js 0.160.1, MIT).
- `tests.mjs`: comprobaciones automatizadas; ejecutar `node tests.mjs` o `npm test`.

## Verificación de esta entrega

Han pasado: árbol de 8.902 posiciones legales a profundidad 3, jaque mate, ambos enroques, captura al paso, cuatro promociones, ahogado, repetición, material insuficiente, 20 medias jugadas de IA, recuperación PGN y elección de mate en una jugada por la IA. Sintaxis JavaScript comprobada.

Pendiente: prueba visual y de interacción en navegador y en tu dispositivo. Esta entrega no se ha publicado automáticamente.

## Después

Las peleas entre piezas, personajes, efectos de captura especiales y multijugador online quedan para próximas versiones. La base actual usa piezas geométricas, sin animaciones de combate. El objetivo de esta primera entrega es jugar, aprender y ajustar controles y aspecto juntos.
