import React, { useState, useEffect } from 'react';
import "../../index.css";
import { useUser } from '../../context/UserContext.jsx';
import useFetchData from "../hooks/useFetchData";
import { MapCard } from "../cards/MapCard.jsx";
import { Navigation } from "../navigation/Navigation";
import { useLocation } from 'react-router-dom';
import { useDarkModeContext } from "../../context/AppContext.jsx";
import tt from '@tomtom-international/web-sdk-maps';


export const RouteMap = () => {

  
  const { user } = useUser();
  let url = `http://localhost/escape-desarrollo-backend/public/api/companies/`+user.id;
  const location = useLocation();
  const placeId = location.state?.placeId;
  const origin = [user.longitude, user.latitude];
  const [destination, setDestination] = useState([]);
  const [travelTime, setTravelTime] = useState(null);
  const [EstimatedHour, setEstimatedHour] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const { data } = useFetchData(url);
  const [inputValue, setInputValue] = useState('');
  const [travelMode, setTravelMode] = useState('pedestrian');

  const { darkMode } = useDarkModeContext(); // Accede al estado del modo oscuro
  const mapContainer = React.useRef(null); // Referencia al contenedor del mapa
  let map;

  console.log(data);

  useEffect(() => {
    if (placeId != null) {

      url = `http://localhost/escape-desarrollo-backend/public/api/company/${placeId}/${user.id}`;

      console.log(placeId);

      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setFilteredPlaces(data);
          setInputValue(data.name); // Almacena el lugar específico
          setDestination([data[0].longitude, data[0].latitude]); // Establece el destino
          calculateRouteWithTraffic(origin, destination);
        })
        .catch(error => console.error('Error al cargar el lugar:', error));
    }
  }, [placeId]);

  useEffect(() => {
    if (mapContainer.current) {
      map = tt.map({
      key: 'dd8qO1N1bSR7yu4ShWlBi4HDup4MKSwi',
      container: mapContainer.current,
      style: darkMode
      ? 'https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBASFZaaHBtUFdrS3QyR3E5bzthZjVkMTI5Yy0wNzdhLTQyODktYTIwYy05NGI4MDFkNDZlOGE=/drafts/0.json?key=dd8qO1N1bSR7yu4ShWlBi4HDup4MKSwi' // Estilo oscuro
      : 'https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBASFZaaHBtUFdrS3QyR3E5bzs3YTdiYzkwNi03ZTFhLTQwOWMtYjM5ZS1lODcxYmY1MzliMDI=/drafts/0.json?key=dd8qO1N1bSR7yu4ShWlBi4HDup4MKSwi', // Estilo claro
      center: origin,
      zoom: 15
    });

    //Create a Marker 
    map.on('load', () => {

      new tt.Marker().setLngLat(origin).addTo(map);

      if (destination.length > 0) {
        new tt.Marker().setLngLat(destination).addTo(map);
        calculateRouteWithTraffic(origin, destination);
      }

    });

    function drawRoute(routeCoordinates) {
      map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: routeCoordinates
            }
          }
        },
        paint: {
          'line-color': '#4a90e2',
          'line-width': 6
        }
      });
    }

    function calculateRouteWithTraffic(origin, destination) {

      //Link para traer información según el tipo de viaje seleccionado
      const routeUrl = `https://api.tomtom.com/routing/1/calculateRoute/${origin[1]},${origin[0]}:${destination[1]},${destination[0]}/json?key=dd8qO1N1bSR7yu4ShWlBi4HDup4MKSwi&traffic=true&travelMode=${travelMode}`;

        fetch(routeUrl)
          .then(response => response.json())
          .then(data => {

            const routeCoordinates = data.routes[0].legs[0].points.map(point => [point.longitude, point.latitude]);

            //Tiempo que dura el viaje
            const travelTimeInSeconds = data.routes[0].summary.travelTimeInSeconds;
            const travelTimeInMinutes = Math.round(travelTimeInSeconds / 60);
            const travelTimeFormatted = convertirMinutosAHoras(travelTimeInMinutes);
            setTravelTime(travelTimeFormatted);

            const horaDeLlegada = estimatedHour(travelTimeInMinutes);
            setEstimatedHour(horaDeLlegada);

            // Dibujar la ruta en el mapa
            drawRoute(routeCoordinates);

          })
          .catch(error => console.error('Error al calcular la ruta:', error));

    }

    //Funciones de conversión
    const convertirMinutosAHoras = (minutos) => {
      const horas = Math.floor(minutos / 60);
      const mins = minutos % 60;
      return horas >= 1 ? `${horas}h ${mins}min` : `${mins}min`;
    };

    function estimatedHour(minutos) {

      const ahora = new Date(); // Hora actual
      const tiempoDeViajeEnMs = minutos * 60 * 1000;
      const horaDeLlegada = new Date(ahora.getTime() + tiempoDeViajeEnMs); // Sumar el tiempo de viaje a la hora actual

      // Formatear la hora de llegada
      const horasLlegada = horaDeLlegada.getHours().toString().padStart(2, '0');
      const minutosLlegada = horaDeLlegada.getMinutes().toString().padStart(2, '0');
      //const segundosLlegada = horaDeLlegada.getSeconds().toString().padStart(2, '0');

      //return `${horasLlegada}:${minutosLlegada}:${segundosLlegada}`;
      return `${horasLlegada}h ${minutosLlegada}min`;
    }


    return () => {
      map.remove();
    };

  }
}, [origin, destination, travelMode, darkMode]);

  const handleDestinationInput = (e) => {
    const query = e.target.value.toLowerCase();
    setInputValue(e.target.value);
    const filtered = Array.isArray(data)
      ? data.filter((d) => d.name && d.name.toLowerCase().includes(query))
      : [];

    setFilteredPlaces(filtered);
  };

  const handlePlaceSelect = (d) => {
    setDestination([d.longitude, d.latitude]);
    setInputValue(d.name);
    setFilteredPlaces([]);
  };

  const handleTravelModeChange = (mode) => {
    console.log(mode);
    setTravelMode(mode);
  };

  return (
    <div>
      <div className="flex-shrink-0 fixed top-0 left-0 z-20 h-full">
        <Navigation />
      </div>

      <MapCard
        inputValue={inputValue}
        handleDestinationInput={handleDestinationInput}
        filteredPlaces={filteredPlaces}
        handlePlaceSelect={handlePlaceSelect}
        travelTime={travelTime}
        EstimatedHour={EstimatedHour}
        handleTravelModeChange={handleTravelModeChange}
        placeId={placeId}
      />

    <div ref={mapContainer} className="relative w-full h-screen z-8"></div>
    </div>
  );


};