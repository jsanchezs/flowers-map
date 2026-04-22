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
