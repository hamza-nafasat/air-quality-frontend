import React, { useEffect, useState } from "react";
import {
    FeatureGroup,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

const StepperMap = ({ lat, lng }) => {
  const [position, setPosition] = useState(null);

  const MapClickHandler = () => {
    useMapEvents({
      click() {
        this.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        this.flyTo(e.latlng, this.getZoom());
      },
    });
    return null;
  };

  const MoveMapPosition = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.flyTo(position, map.getZoom());
      }
    }, [position, map]);
    return null;
  };

  useEffect(() => {
    if (lat && lng) {
      const newPosition = { lat: parseFloat(lat), lng: parseFloat(lng) };
      setPosition(newPosition);
    }
  }, [lat, lng]);

  return (
    <MapContainer
      style={{ width: "100%", height: "325px", borderRadius: "12px" }}
      center={position || { lat: 51.505, lng: -0.09 }}
      zoom={10}
      scrollWheelZoom={false}
      attributionControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup>
        <EditControl
          position="topright"
          draw={{
            polygon: true,
            rectangle: false,
            circle: false,
            polyline: false,
            marker: false,
            circlemarker: false,
          }}
        />
      </FeatureGroup>
      <MapClickHandler />
      <MoveMapPosition position={position} />
      {position !== null && (
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default StepperMap;
