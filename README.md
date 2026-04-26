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

```bash
npm run deploy
```

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
