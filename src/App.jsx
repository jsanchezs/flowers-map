import { useEffect, useMemo, useState } from 'react'
import AudioPlayer from './components/AudioPlayer'
import ComingSoonView from './components/ComingSoonView'
import LocationPanel from './components/LocationPanel'
import MapView from './components/MapView'
import { fallbackFlowerImageUrl, flowerImageUrl, instagramUrl, storyFormUrl } from './config/links'
import soundPoints from './data/soundPoints'

function getPointIdFromUrl() {
  const params = new URLSearchParams(window.location.search)
  return params.get('p')
}

function getValidPointId(pointId) {
  return soundPoints.some((point) => point.id === pointId) ? pointId : null
}

function getPreviewTokenFromUrl() {
  const params = new URLSearchParams(window.location.search)
  return params.get('preview')
}

function App() {
  const [activeScreen, setActiveScreen] = useState('map')
  const [launchState, setLaunchState] = useState({
    isLoading: true,
    isLive: false,
  })
  const [selectedPointId, setSelectedPointId] = useState(() => {
    return getValidPointId(getPointIdFromUrl())
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

  useEffect(() => {
    let isMounted = true

    const loadLaunchState = async () => {
      try {
        const response = await fetch('./status.json', { cache: 'no-store' })
        const status = response.ok ? await response.json() : null
        const mode = status?.mode === 'live' ? 'live' : 'coming_soon'
        const previewToken = typeof status?.previewToken === 'string' ? status.previewToken : ''
        const previewFromUrl = getPreviewTokenFromUrl()
        const hasPreviewAccess = previewToken && previewFromUrl === previewToken

        if (!isMounted) {
          return
        }

        setLaunchState({
          isLoading: false,
          isLive: mode === 'live' || hasPreviewAccess,
        })
      } catch {
        if (!isMounted) {
          return
        }

        setLaunchState({
          isLoading: false,
          isLive: false,
        })
      }
    }

    loadLaunchState()

    return () => {
      isMounted = false
    }
  }, [])

  if (launchState.isLoading) {
    return null
  }

  if (!launchState.isLive) {
    return <ComingSoonView />
  }

  if (activeScreen === 'project') {
    return (
      <main className="project-screen">
        <button type="button" className="project-close" onClick={() => setActiveScreen('map')}>
          cerrar
        </button>

        <section className="project-content" aria-label="sobre el proyecto">
          <h1>sobre el proyecto</h1>

          <div className="project-block">
            <p>
              Cicatrizar el mapa nace como un proyecto personal con la necesidad de elaborar una
              cartografía del dolor en el barrio de Lavapiés para reconquistarlo, para sentirlo mío.
            </p>
            <p>
              Ahora se expande para abarcar todas las heridas, no solo las mías, también de quien
              quiera participar y cree necesaria dicha reparación. Hacerse con esos espacios.
            </p>
            <p>
              Por ello la flor.llama porque dicha reparación requiere TERNURA y la ACCIÓN DE
              PRENDER fuego a ese hilo de memoria.
            </p>
          </div>

          <img
            className="project-flower"
            src={flowerImageUrl}
            alt=""
            onError={(event) => {
              event.currentTarget.src = fallbackFlowerImageUrl
            }}
          />

          <div className="project-block">
            <h2>HOLA, soy Lou Romera</h2>
            <p>
              Artista multidisciplinar. Me muevo entre el arte plástico, la instalación y la
              interpretación. Siempre acabo llevando mis proyectos hacia lo colectivo porque me
              gusta ver al otro, escucharle, conocerle y si puedo, regalarle un espacio en el que
              pueda expresarse.
            </p>
          </div>

          <a className="instagram-button" href={instagramUrl} rel="noreferrer">
            visita mi perfil de instagram
          </a>
          <p className="instagram-handle">@louromera</p>
        </section>

        <p className="project-credit">Desarrollado con amor por Jesús, amén</p>
      </main>
    )
  }

  return (
    <main className="app-shell">
      <MapView
        points={soundPoints}
        selectedPoint={selectedPoint}
        selectedPointId={selectedPointId}
        onSelectPoint={setSelectedPointId}
      />

      <header className="hero-panel">
        <div className="hero-heading">
          <div>
            <h1>cicatrizar el mapa</h1>
            <p className="hero-copy">heridas emocionales anónimas situadas en Lavapiés</p>
            <p className="hero-label">MAPA SONORO</p>
          </div>
          <button type="button" className="project-link" onClick={() => setActiveScreen('project')}>
            conoce el proyecto
          </button>
        </div>

        <div className="map-hint" aria-hidden={selectedPoint ? 'true' : 'false'}>
          <p>Toca un punto para abrir su audio.</p>
        </div>
      </header>

      {selectedPoint ? null : (
        <a className="hero-cta" href={storyFormUrl}>
          dejar mi recuerdo
        </a>
      )}

      <LocationPanel
        point={selectedPoint}
        onClose={() => setSelectedPointId(null)}
      >
        {selectedPoint ? <AudioPlayer key={selectedPoint.id} src={selectedPoint.audioUrl} /> : null}
      </LocationPanel>
    </main>
  )
}

export default App
