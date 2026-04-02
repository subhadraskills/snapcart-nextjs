'use client';
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import { LatLngExpression } from "leaflet";

export default function MapView({ position }: { position: [number, number] | null }) {
  if (!position) return null;

  return (
    <MapContainer center={position as LatLngExpression} zoom={13} scrollWheelZoom={false} className="w-full h-full">
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                      </MapContainer>
    
  );
}
