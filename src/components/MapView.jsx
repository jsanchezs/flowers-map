import { useEffect } from 'react'
import { divIcon } from 'leaflet'
import { AttributionControl, MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import { fallbackFlowerImageUrl } from '../config/links'

const lavapiesCenter = [40.4085, -3.7007]
const selectedZoom = 17
const flowerMarkerUrls = [
  '/flowers/markers/flor01.webp',
  '/flowers/markers/flor02.webp',
  '/flowers/markers/flor03.webp',
  '/flowers/markers/flor04.webp',
  '/flowers/markers/flor05.webp',
]

const getStableFlowerMarkerUrl = (point) => {
  const markerKey = point.audioUrl || point.id
  let hash = 0

  for (let index = 0; index < markerKey.length; index += 1) {
    hash = (hash * 31 + markerKey.charCodeAt(index)) >>> 0
  }

  return flowerMarkerUrls[hash % flowerMarkerUrls.length]
}

const createMarkerIcon = (isSelected, flowerMarkerUrl) =>
  divIcon({
    className: 'sound-marker-wrapper',
    html: `
      <span class="sound-marker${isSelected ? ' is-selected' : ''}">
        <img src="${flowerMarkerUrl}" alt="" decoding="async" onerror="this.onerror=null;this.src='${fallbackFlowerImageUrl}'" />
      </span>
    `,
    iconSize: [56, 50],
    iconAnchor: [28, 25],
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
    <div className="map-stage">
      <MapContainer
        center={lavapiesCenter}
        zoom={15}
        minZoom={13}
        zoomControl={false}
        attributionControl={false}
        scrollWheelZoom
        className="sound-map"
      >
        <AttributionControl prefix="Con &lt;3 de jsanchezs" />

        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        <CenterOnPoint point={selectedPoint} />

        {points.map((point) => (
          <Marker
            key={point.id}
            position={[point.lat, point.lng]}
            icon={createMarkerIcon(
              point.id === selectedPointId,
              getStableFlowerMarkerUrl(point),
            )}
            eventHandlers={{
              click: () => onSelectPoint(point.id),
            }}
          />
        ))}
      </MapContainer>

    </div>
  )
}

export default MapView
