import { useEffect, useState } from 'react'
import { divIcon } from 'leaflet'
import { GeoJSON, MapContainer, Marker, useMap } from 'react-leaflet'

const lavapiesCenter = [40.4085, -3.7007]
const selectedZoom = 17

const roadWeights = {
  primary: 9,
  secondary: 8,
  tertiary: 7,
  residential: 5,
  pedestrian: 6,
  living_street: 5,
  service: 3,
  footway: 2,
  path: 2,
}

const mapFeatureStyle = (feature) => {
  if (feature.properties.kind === 'building') {
    return {
      color: '#df777f',
      fillColor: '#e9828b',
      fillOpacity: 0.48,
      opacity: 0.2,
      weight: 1,
    }
  }

  return {
    color: '#fffafa',
    opacity: 0.96,
    weight: roadWeights[feature.properties.highway] ?? 4,
    lineCap: 'round',
    lineJoin: 'round',
  }
}

const createMarkerIcon = (isSelected) =>
  divIcon({
    className: 'sound-marker-wrapper',
    html: `
      <span class="sound-marker${isSelected ? ' is-selected' : ''}">
        <span class="petal petal-top"></span>
        <span class="petal petal-right"></span>
        <span class="petal petal-bottom"></span>
        <span class="petal petal-left"></span>
        <span class="flower-core"></span>
      </span>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  })

function CenterOnPoint({ point }) {
  const map = useMap()

  useEffect(() => {
    if (!point) {
      return
    }

    map.flyTo([point.lat, point.lng], selectedZoom, {
      duration: 0.8,
    })
  }, [map, point])

  return null
}

function useLavapiesGeometry() {
  const [geometry, setGeometry] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${import.meta.env.BASE_URL}lavapies-map.geojson`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Map geometry request failed: ${response.status}`)
        }

        return response.json()
      })
      .then(setGeometry)
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.error(error)
        }
      })

    return () => controller.abort()
  }, [])

  return geometry
}

function MapView({ points, selectedPoint, selectedPointId, onSelectPoint }) {
  const geometry = useLavapiesGeometry()

  return (
    <div className="map-card">
      <MapContainer
        center={lavapiesCenter}
        zoom={15}
        minZoom={13}
        zoomControl={false}
        scrollWheelZoom
        className="sound-map"
      >
        {geometry ? <GeoJSON data={geometry} style={mapFeatureStyle} /> : null}

        <CenterOnPoint point={selectedPoint} />

        {points.map((point) => (
          <Marker
            key={point.id}
            position={[point.lat, point.lng]}
            icon={createMarkerIcon(point.id === selectedPointId)}
            eventHandlers={{
              click: () => onSelectPoint(point.id),
            }}
          />
        ))}
      </MapContainer>

      <div className="map-tint" aria-hidden="true" />

      <div className="map-hint">
        <span className="map-hint-dot" />
        <p>Toca un punto para abrir su audio.</p>
      </div>
    </div>
  )
}

export default MapView
