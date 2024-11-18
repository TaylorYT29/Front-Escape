import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../index.css";
import map from "../../assets/imgs/locateMap.jpg";
import { useUser } from '../../context/UserContext.jsx';
import { useTranslation } from 'react-i18next';

export const MapThumbnail = () => {
  const { t } = useTranslation();

  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const { user, updateUserLocation } = useUser();
  const handleMouseEnter = () => setTooltipVisible(true);
  const handleMouseLeave = () => setTooltipVisible(false);

  const requestUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateUserLocation({ latitude, longitude }); // Actualiza la ubicación del usuario
        },
        (error) => {
          console.error('Error obteniendo la ubicación: ', error);
          alert('No pudimos obtener tu ubicación. Por favor, actívala en tu navegador.');
        }
      );
    } else {
      alert('Geolocalización no es soportada por tu navegador.');
    }
  };

  useEffect(() => {
    // Si el usuario no tiene latitud o longitud, solicitamos la ubicación
    if (!user?.latitude || !user?.longitude) {
      requestUserLocation();
    }
  }, [user]);

  return (
    <div className="mt-6 bg-white dark:bg-[#404040] p-3 rounded-lg shadow-md grid grid-cols-[30%_70%] gap-4 lg:w-1/3 w-full relative">
      <Link to="/map">
        <img 
          className="rounded-lg" 
          src={map} 
          alt="map"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Link>
      
      <section className="justify-center content-center">
        <h3 className="text-lg text-sky-500 font-bold">{t('YourLocation')}</h3>
        <p className="text-gray-500 dark:text-white font-semibold">
          {user?.latitude && user?.longitude ? 'Esparza centro' : 'Ubicación no disponible'}
        </p>
      </section>

      {/* Tooltip */}
      {isTooltipVisible && (
        <div className="absolute left-0 top-full mt-2 z-10 w-48 bg-white shadow-lg p-3 rounded-lg text-sm text-gray-700">
          <p>Actualiza y ve tu ubicación en el mapa</p>
        </div>
      )}
    </div>
  );
};

