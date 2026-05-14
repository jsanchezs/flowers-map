# Modo lanzamiento con un unico QR

Esta app permite imprimir un solo QR y controlar que ve la gente:

- Pantalla temporal: `Recopilando historias...`
- Mapa en vivo cuando decidas publicar

Todo se controla desde `public/status.json`.

## 1. Configuracion base

Archivo: `public/status.json`

```json
{
  "mode": "coming_soon",
  "message": "Recopilando historias...",
  "previewToken": "token-largo-y-privado"
}
```

Campos:

- `mode`
  - `coming_soon`: la URL publica muestra pantalla temporal.
  - `live`: la URL publica muestra el mapa.
- `message`
  - Texto visible en pantalla temporal.
- `previewToken`
  - Token para preview en produccion mientras `mode` es `coming_soon`.

## 2. URL publica y URL de preview

- URL publica (para QR):
  - `https://<usuario>.github.io/flowers-map/`
- URL preview privada:
  - `https://<usuario>.github.io/flowers-map/?preview=<previewToken>`

Notas:

- La preview por token es ofuscacion por URL, no autenticacion fuerte.
- Si el token se comparte, terceros podrian abrir el mapa.

## 3. Flujo recomendado

1. Antes de imprimir:
   - Pon `mode: "coming_soon"`.
   - Define un `previewToken` largo y no obvio.
   - Despliega.
2. Imprime QR con la URL publica.
3. Durante preparacion:
   - Publico ve `Recopilando historias...`.
   - Equipo revisa el mapa en produccion con la URL de preview.
4. Lanzamiento:
   - Cambia `mode` a `"live"`.
   - Despliega de nuevo.
   - El mismo QR pasa a mostrar el mapa.

## 4. Operacion de deploy

```bash
npm install
npm run deploy
```

Si cambias `status.json`, tienes que volver a desplegar para que el cambio llegue a GitHub Pages.

## 5. Checklist rapido

- `status.json` en `coming_soon` antes de imprimir.
- `previewToken` cambiado (no dejar placeholder).
- URL publica del QR comprobada.
- URL de preview comprobada.
- En lanzamiento: `mode` cambiado a `live` y deploy ejecutado.

## 6. Resolucion de problemas

- Veo mapa en lugar de pantalla temporal:
  - Revisa `mode` en `status.json`.
  - Verifica que no tengas `?preview=...` en la URL.
- No funciona preview:
  - Revisa que `previewToken` y query param sean exactos.
  - Asegura que el ultimo deploy contiene el `status.json` actualizado.
- Mensaje no cambia:
  - Cambia `message` en `status.json` y despliega de nuevo.
