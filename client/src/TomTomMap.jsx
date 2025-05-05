import React, { useEffect, useRef } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import { calculateRoute } from '@tomtom-international/web-sdk-services';
import './TomTomMap.css'; // Create this CSS file



const TomTomMap = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const API_KEY ='z5DQpwdWA9GYRAPpS2fmtIU86H8GVSJn'; // Use environment variable

  useEffect(() => {
    if (!mapRef.current) return;
  
    mapInstance.current = tt.map({
      key: API_KEY,
      container: mapRef.current,
      center: [73.8567, 18.5204], // Pune
      zoom: 6,
      style: 'tomtom://vector/1/basic-main'
    });
  
    mapInstance.current.on('load', () => {
      console.log('Map loaded successfully');
      calculateAndDisplayRoute([73.8567, 18.5204], [76.6394, 12.2958]); // Pune to Mysore
    });
  
    mapInstance.current.on('error', (error) => {
      console.error('Map error:', error);
    });
  
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
      }
    };
  }, []);
  

  const calculateAndDisplayRoute = async (start, end) => {
    try {
      const response = await calculateRoute({
        key: API_KEY,
        locations: `${start.join(',')}:${end.join(',')}`,
        travelMode: 'car'
      });

      const geojson = response.toGeoJson();
      
      // Remove existing route if present
      if (mapInstance.current.getSource('route')) {
        mapInstance.current.removeLayer('route');
        mapInstance.current.removeSource('route');
      }

      // Add route layer
      mapInstance.current.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: geojson
        },
        paint: {
          'line-color': '#3388ff',
          'line-width': 5
        }
      });

      // Fit bounds to route
      const coordinates = geojson.features[0].geometry.coordinates;
      const bounds = coordinates.reduce((bounds, coord) => {
        return bounds.extend(coord);
      }, new tt.LngLatBounds(coordinates[0], coordinates[0]));

      mapInstance.current.fitBounds(bounds, { padding: 50 });

    } catch (error) {
      console.error('Routing error:', error);
    }
  };

  return (
    <div className="map-container">
      <div 
        ref={mapRef} 
        className="map-element"
      />
    </div>
  );
};

export default TomTomMap;