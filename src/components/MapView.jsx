import { useEffect } from 'react'
import { divIcon } from 'leaflet'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'

const lavapiesCenter = [40.4085, -3.7007]
const selectedZoom = 17

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

function MapView({ points, selectedPoint, selectedPointId, onSelectPoint }) {
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
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

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

      <div className="map-hint">
        <span className="map-hint-dot" />
        <p>Toca un punto para abrir su audio.</p>
      </div>
    </div>
  )
}

export default MapView
