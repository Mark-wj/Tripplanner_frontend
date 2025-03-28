import React, { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerStop from '/public/assets/markeStop.png';
import markerRest from "/public/assets/markerRest.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const stopIcon = L.icon({
  iconUrl: markerStop,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: markerShadow,
});
const restIcon = L.icon({
  iconUrl: markerRest,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: markerShadow,
});


const Legend = () => {
  const map = useMap();
  useEffect(() => {
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'info legend');
      div.style.background = 'white';
      div.style.padding = '6px 8px';
      div.style.fontSize = '12px';
      div.style.color = '#333';
      div.style.boxShadow = '0 0 15px rgba(0,0,0,0.2)';
      div.innerHTML +=
        '<h4>Legend</h4>' +
        `<i style="background: url(${markerStop}) no-repeat center center; background-size: 25px 41px; width: 25px; height: 41px; display: inline-block; margin-right: 8px;"></i> Stop<br>` +
        `<i style="background: url(${markerRest}) no-repeat center center; background-size: 25px 41px; width: 25px; height: 41px; display: inline-block; margin-right: 8px;"></i> Rest`;
      return div;
    };
    legend.addTo(map);
    return () => legend.remove();
  }, [map]);
  return null;
};

const RouteMap = ({ routeData }) => {
  console.log('RouteMap: routeData', routeData);
  if (
    !routeData ||
    !routeData.geometry ||
    !Array.isArray(routeData.geometry.coordinates) ||
    routeData.geometry.coordinates.length === 0
  ) {
    return <div>No route data available</div>;
  }
  let rawCoords = routeData.geometry.coordinates;
  if (routeData.geometry.type === 'MultiLineString') {
    rawCoords = rawCoords.flat();
  }


  const validCoords = rawCoords.filter(
    (coord) =>
      Array.isArray(coord) &&
      coord.length >= 2 &&
      coord[0] != null &&
      coord[1] != null
  );
  if (validCoords.length === 0) {
    return <div>No valid route coordinates available</div>;
  }
  const formattedCoords = validCoords
    .map((coord) => {
      const [lng, lat] = coord;
      if (lat === undefined || lng === undefined) {
        console.error('Invalid coordinate:', coord);
        return null;
      }
      return [lat, lng];
    })
    .filter((coord) => coord !== null);

  if (formattedCoords.length === 0) {
    return <div>No formatted coordinates available</div>;
  }
  const defaultLocation = [37.7749, -122.4194];
  const currentLocation = formattedCoords[0] || defaultLocation;
  const dropoffLocation =
    formattedCoords[formattedCoords.length - 1] || defaultLocation;
  const pickupLocation =
    formattedCoords[Math.floor(formattedCoords.length / 2)] || defaultLocation;

  const markers = [
    { position: currentLocation, name: 'Current Location', type: 'stop' },
    { position: pickupLocation, name: 'Pickup Location', type: 'rest' },
    { position: dropoffLocation, name: 'Dropoff Location', type: 'stop' },
  ];

  return (
    <MapContainer
      center={currentLocation}
      zoom={7}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          icon={marker.type === 'stop' ? stopIcon : restIcon}
        >
          <Popup>{marker.name}</Popup>
        </Marker>
      ))}
      <Polyline positions={formattedCoords} color="blue" />
      <Legend />
    </MapContainer>
  );
};

export default RouteMap;
