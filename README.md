# Flores de Lavapiés

Mapa sonoro mobile-first para explorar puntos de escucha en Lavapiés desde una sola página.

## Stack

- React + Vite
- Leaflet + OpenStreetMap
- GitHub Pages

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

El deploy se ejecuta automaticamente al hacer push o merge en `master`.
El workflow `.github/workflows/deploy.yml` instala dependencias con `npm ci`, ejecuta `npm run build` y publica `dist/` en la rama `gh-pages`.

Para lanzar manualmente el mismo proceso desde GitHub, usa `Actions > Deploy to GitHub Pages > Run workflow`.

Si necesitas desplegar desde tu maquina:

```bash
npm run deploy
```

## Modo Lanzamiento (QR unico)

La URL principal puede mostrar una pantalla temporal o el mapa, sin cambiar el QR.
Guia completa: `docs/launch-mode.md`.

Configura `public/status.json`:

```json
{
  "mode": "coming_soon",
  "message": "Recopilando historias...",
  "previewToken": "token-largo-y-privado"
}
```

- `mode: "coming_soon"`: el publico ve el mensaje de espera.
- `mode: "live"`: el publico ve el mapa.
- `previewToken`: permite ver el mapa en produccion con `?preview=<token>` aunque siga en `coming_soon`.

Ejemplo de preview privada:

`https://<usuario>.github.io/flowers-map/?preview=token-largo-y-privado`

Cuando quieras lanzar:
1. Cambia `mode` a `"live"` en `public/status.json`.
2. Haz merge o push a `master` para que GitHub Actions publique el cambio.

## QR por punto

```bash
npm run generate:qrs
```

Esto genera un `SVG` por punto en `public/qrs/`, con la flor en el centro y la URL profunda del lugar.

## Datos

Los puntos sonoros de ejemplo están en `src/data/soundPoints.js`.

## Colores Del Mapa

El mapa usa Stamen Toner recoloreado desde `src/index.css`.

El rosa base se define en `.sound-map`:

```css
background: #f7c5c7;
```

El color del Toner recoloreado, el antiguo negro/gris del tile, se controla con el filtro de `.sound-map .leaflet-tile-pane`:

```css
filter: invert(83%) sepia(14%) saturate(1115%) hue-rotate(307deg) brightness(102%) contrast(91%);
```

Para ajustar el tono: sube `saturate(...)` para más intensidad, sube `brightness(...)` para aclarar, baja `contrast(...)` para suavizar y cambia `hue-rotate(...)` para mover el rosa hacia otro matiz.
