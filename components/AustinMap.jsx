"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from "react-leaflet";
import L from "leaflet";
import { LOCATIONS, SERVICE_POLYGON } from "./locations";
import { useTheme } from "./ThemeProvider";
import "leaflet/dist/leaflet.css";

const pin = L.divIcon({
  className: "map-pin",
  html: "<span></span>",
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

function FlyTo({ place }) {
  const map = useMap();
  useEffect(() => {
    if (!place) return;
    map.flyTo([place.lat, place.lng], 12, { duration: 0.8 });
  }, [place, map]);
  return null;
}

export default function AustinMap({ selected }) {
  const { theme } = useTheme();
  const tiles = theme === "light"
    ? "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  return (
    <MapContainer center={[30.32, -97.74]} zoom={9} className="leaflet-host h-full min-h-[520px]" scrollWheelZoom>
      <TileLayer
        key={theme}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        url={tiles}
      />
      <Polygon
        positions={SERVICE_POLYGON}
        pathOptions={{ color: "#c45c26", weight: 2, fillColor: "#c45c26", fillOpacity: 0.12 }}
      />
      {LOCATIONS.map((place) => (
        <Marker key={place.name} position={[place.lat, place.lng]} icon={pin}>
          <Popup>
            <strong>{place.name}</strong>
            <br />
            {place.address}
          </Popup>
        </Marker>
      ))}
      <FlyTo place={selected} />
    </MapContainer>
  );
}
