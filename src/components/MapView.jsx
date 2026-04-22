import { divIcon } from 'leaflet'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

const lavapiesCenter = [40.4085, -3.7007]

const createMarkerIcon = (isSelected) =>
  divIcon({
    className: 'sound-marker-wrapper',
    html: `<span class="sound-marker${isSelected ? ' is-selected' : ''}"></span>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  })

function MapView({ points, selectedPointId, onSelectPoint }) {
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
