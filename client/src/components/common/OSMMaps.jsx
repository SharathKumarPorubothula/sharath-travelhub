import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const OSRMRouteMap = ({ startLocation="Pune", endLocation="Mysore"}) => {
  const mapRef = useRef(null);
  const routeLayerRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map
      const map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India
      mapRef.current = map;

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Initialize route layer
      routeLayerRef.current = L.layerGroup().addTo(map);
    }

    // Fetch coordinates for start and end locations and draw route
    const getCoordinatesAndFetchRoute = async () => {
      try {
        const startCoords = await getCoordinates(startLocation);
        const endCoords = await getCoordinates(endLocation);

        if (startCoords && endCoords) {
          mapRef.current.setView(startCoords, 6); // Zoom to start location
          await fetchRoute(startCoords, endCoords);
        }
      } catch (error) {
        console.error('Error getting route:', error);
      }
    };

    getCoordinatesAndFetchRoute();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [startLocation, endLocation]);

  const getCoordinates = async (placeName) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}`
    );
    const data = await res.json();
    if (data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    } else {
      console.error('Location not found:', placeName);
      return null;
    }
  };

  const fetchRoute = async (start, end) => {
    try {
      routeLayerRef.current.clearLayers();

      L.marker(start).addTo(routeLayerRef.current).bindPopup('Start: ' + startLocation);
      L.marker(end).addTo(routeLayerRef.current).bindPopup('End: ' + endLocation);

      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
      );
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const routeCoordinates = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);

        L.polyline(routeCoordinates, {
          color: 'blue',
          weight: 5,
          opacity: 0.7
        }).addTo(routeLayerRef.current);

        const distance = (route.distance / 1000).toFixed(2);
        const duration = (route.duration / 60).toFixed(2);

        L.popup()
          .setLatLng(start)
          .setContent(`Distance: ${distance} km<br>Duration: ${duration} minutes`)
          .openOn(mapRef.current);
      }
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <div id="map" style={{ height: '100%', width: '100%' }}></div>
    </div>
  );
};

export default OSRMRouteMap;
