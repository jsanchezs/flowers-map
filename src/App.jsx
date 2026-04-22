import { useMemo, useState } from 'react'
import AudioPlayer from './components/AudioPlayer'
import LocationPanel from './components/LocationPanel'
import MapView from './components/MapView'
import soundPoints from './data/soundPoints'

function App() {
  const [selectedPointId, setSelectedPointId] = useState(soundPoints[0]?.id ?? null)

  const selectedPoint = useMemo(
    () => soundPoints.find((point) => point.id === selectedPointId) ?? null,
    [selectedPointId],
  )

  return (
    <main className="app-shell">
      <header className="hero-panel">
        <div>
          <p className="eyebrow">Mapa sonoro</p>
          <h1>Flores de Lavapiés</h1>
        </div>
        <p className="hero-copy">
          Recorre Lavapiés a través de pequeñas piezas de audio situadas sobre el mapa.
          Toca un punto para abrir su escucha.
        </p>
      </header>

      <section className="map-layout" aria-label="Mapa sonoro de Lavapiés">
        <MapView
          points={soundPoints}
          selectedPointId={selectedPointId}
          onSelectPoint={setSelectedPointId}
        />

        <LocationPanel
          point={selectedPoint}
          onClose={() => setSelectedPointId(null)}
        >
          {selectedPoint ? <AudioPlayer key={selectedPoint.id} src={selectedPoint.audioUrl} /> : null}
        </LocationPanel>
      </section>
    </main>
  )
}

export default App
