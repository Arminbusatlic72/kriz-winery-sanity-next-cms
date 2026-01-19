'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Custom icon
const logoIcon = new L.Icon({
  iconUrl: '/static/images/logo/kriz-logo.jpg', // path to your custom icon
  iconSize: [40, 40],       // size of the icon
  iconAnchor: [20, 40],     // point of the icon which will correspond to marker's location
  popupAnchor: [0, -40],    // popup position relative to the icon
})

export default function Map() {
  return (
    <MapContainer
      center={[42.9425, 17.3383]}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker
        position={[42.9425, 17.3383]}
        icon={logoIcon}
      >
        <Popup>Winery location</Popup>
      </Marker>
    </MapContainer>
  )
}
