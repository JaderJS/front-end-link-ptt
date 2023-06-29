import React from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ coordinates }) => {
    const key = JSON.stringify(coordinates)
    return (
        <MapContainer key={key} center={coordinates} zoom={13} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
            />
            <Marker position={coordinates} />
        </MapContainer>
    );
}

export default Map