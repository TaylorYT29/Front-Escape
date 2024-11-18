import { useState, useEffect } from "react";
import { useUser } from '../../context/UserContext.jsx';
import { useTranslation } from 'react-i18next';

export const useFetchTravelTime = (place, travelMode) => {
  const { user } = useUser();
  const [travelTime, setTravelTime] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!place || !user) return;
    
    // Verifica que las coordenadas existan
    if (place && user.longitude && user.latitude) {

      const origin = [user.longitude, user.latitude];
      const destination = [place[1], place[0]];

      console.log("Hola probando");

      // URL de la API de TomTom para la ruta
      const routeUrl = `https://api.tomtom.com/routing/1/calculateRoute/${origin[1]},${origin[0]}:${destination[1]},${destination[0]}/json?key=dd8qO1N1bSR7yu4ShWlBi4HDup4MKSwi&traffic=true&travelMode=${travelMode}`;

      // Fetch de los datos de la ruta
      fetch(routeUrl)
        .then(response => response.json())
        .then(data => {
          const travelTimeInSeconds = data.routes[0].summary.travelTimeInSeconds;
          const travelTimeInMinutes = Math.round(travelTimeInSeconds / 60);
          const travelTimeFormatted = convertirMinutosAHoras(travelTimeInMinutes);
          setTravelTime(travelTimeFormatted);
        })
        .catch(error => console.error('Error al calcular la ruta:', error));

      setTravelTime(t('Calculating'));
    } else {
      setTravelTime(t('Calculating'));
    }
  }, [place, user, travelMode]);

  // Función para convertir los minutos en formato horas/minutos
  function convertirMinutosAHoras(minutos) {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return horas >= 1 ? `${horas}h ${mins}min` : `${mins}min`;
  }

  return { travelTime };
};
