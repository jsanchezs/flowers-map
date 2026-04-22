import { useEffect, useMemo, useState } from 'react'
import AudioPlayer from './components/AudioPlayer'
import LocationPanel from './components/LocationPanel'
import MapView from './components/MapView'
import soundPoints from './data/soundPoints'

function getPointIdFromUrl() {
  const params = new URLSearchParams(window.location.search)
  return params.get('p')
}

function getValidPointId(pointId) {
  return soundPoints.some((point) => point.id === pointId) ? pointId : null
}

function App() {
  const [selectedPointId, setSelectedPointId] = useState(() => {
    const pointIdFromUrl = getValidPointId(getPointIdFromUrl())
    return pointIdFromUrl ?? soundPoints[0]?.id ?? null
  })

  const selectedPoint = useMemo(
    () => soundPoints.find((point) => point.id === selectedPointId) ?? null,
    [selectedPointId],
  )

  useEffect(() => {
    const nextUrl = new URL(window.location.href)

    if (selectedPointId) {
      nextUrl.searchParams.set('p', selectedPointId)
    } else {
      nextUrl.searchParams.delete('p')
    }

    window.history.replaceState({}, '', nextUrl)
  }, [selectedPointId])

  useEffect(() => {
    const handlePopState = () => {
      setSelectedPointId(getValidPointId(getPointIdFromUrl()))
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

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
          selectedPoint={selectedPoint}
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
