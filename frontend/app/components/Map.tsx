'use client'

import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const logoIcon = new L.Icon({
  iconUrl: '/static/images/logo/kriz-logo.jpg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
})

export default function LeafletMap() {
  return (
    <MapContainer center={[42.9425, 17.3383]} zoom={13} style={{height: '400px', width: '100%'}}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[42.958701, 17.323676]} icon={logoIcon}>
        <Popup>
          Vinarija Križ
          <br /> Prizdrina 10 20244 <br />
          Potomje
        </Popup>
      </Marker>
    </MapContainer>
  )
}
