// components/MapCard.jsx
import React from 'react';
import { useFetchMenubar } from "../hooks/useFetchMenubar.js";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
//<h1 className='dark:text-white mt-2'>Buscar Ruta</h1>
//<img className="rounded-lg object-cover h-[50vh]  md:w-full" src={d.image} alt="" />
export const MapCard = ({ inputValue, handleDestinationInput, filteredPlaces, handlePlaceSelect, travelTime, EstimatedHour, handleTravelModeChange, placeId }) => {

  const { isMobile } = useFetchMenubar();
  const { t } = useTranslation();

  const [placeInformation, setPlaceInformation] = useState({
    name: '',
    description: '',
    image: ''
  });

  // Efecto para buscar automáticamente el lugar cuando placeId está presente
  useEffect(() => {
    if (placeId != null) {
      const selectedPlace = filteredPlaces.find(place => place.id === placeId);
      if (selectedPlace) {
        setPlaceInformation({
          name: selectedPlace.name,
          description: selectedPlace.description || 'Descripción no disponible',
          image: selectedPlace.image || ''
        });
      }
    }
  }, [placeId, filteredPlaces]); // Actualizar si cambia el placeId o filteredPlaces

  return (

    <div className='absolute right-0 bg-white p-4 rounded shadow-lg z-10 dark:bg-[#2a2a2a] md:w-[25vw] w-full h-[100vh]'>

      <h1 className="font-black flex justify-center dark:text-white text-3xl lg:text-4xl mt-2">ESCAPE</h1>

      <div>
        <label htmlFor="destination" className='dark:text-white'>{t('Destination')} </label>
        <input
          type="text"
          id="destination"
          value={inputValue}
          placeholder={t('search')}
          onChange={handleDestinationInput}
          className="border p-2 rounded w-full"
        />

        {filteredPlaces.length > 0 && (
          <ul className="mt-2 border p-2 rounded bg-gray-100 max-h-48 overflow-auto">
            {filteredPlaces.map((place) => (
              <li
                key={place.id}
                onClick={() => {
                  handlePlaceSelect(place);
                  setPlaceInformation({
                    name: place.name,
                    description: place.description || 'Descripción no disponible',
                    image: place.image || ''
                  });
                }}
                className="cursor-pointer p-2 hover:bg-gray-200"
              >
                {/* Mostrar solo el nombre en la lista */}
                <p>{place.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Mostrar la imagen y descripción fuera de la lista */}
      {placeInformation.image && (
        <div className="p-4 rounded-lg bg-gray-100 dark:bg-[#404040] shadow-lg md:w-[100%] my-4">
          <div className="flex justify-center">
            <img
              className="lg:object-cover rounded-lg w-full h-[15rem]"
              src={placeInformation.image}
              alt={placeInformation.name}
            />
          </div>

          <div className="flex items-center justify-between mt-2">

          <p className="dark:text-white mt-2 font-bold text-2xl">{placeInformation.name}</p>

          <div className="flex gap-2 my-4">
            <button
              className="p-2 rounded-lg hover:bg-gray-200 transition duration-300"
              onClick={() => handleTravelModeChange('pedestrian')} // Modo caminar
            >
             <svg 
             viewBox="0 0 24 24" 
             fill="none" 
             xmlns="http://www.w3.org/2000/svg"
             className="w-6 h-6 fill-current text-sky-500 hover:text-sky-600"
             >
              <path 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M13 6C14.1046 6 15 5.10457 15 4C15 2.89543 14.1046 2 13 2C11.8955 2 11 2.89543 11 4C11 5.10457 11.8955 6 13 6ZM11.0528 6.60557C11.3841 6.43992 11.7799 6.47097 12.0813 6.68627L13.0813 7.40056C13.3994 7.6278 13.5559 8.01959 13.482 8.40348L12.4332 13.847L16.8321 20.4453C17.1384 20.9048 17.0143 21.5257 16.5547 21.8321C16.0952 22.1384 15.4743 22.0142 15.168 21.5547L10.5416 14.6152L9.72611 13.3919C9.58336 13.1778 9.52866 12.9169 9.57338 12.6634L10.1699 9.28309L8.38464 10.1757L7.81282 13.0334C7.70445 13.575 7.17759 13.9261 6.63604 13.8178C6.09449 13.7094 5.74333 13.1825 5.85169 12.641L6.51947 9.30379C6.58001 9.00123 6.77684 8.74356 7.05282 8.60557L11.0528 6.60557ZM16.6838 12.9487L13.8093 11.9905L14.1909 10.0096L17.3163 11.0513C17.8402 11.226 18.1234 11.7923 17.9487 12.3162C17.7741 12.8402 17.2078 13.1234 16.6838 12.9487ZM6.12844 20.5097L9.39637 14.7001L9.70958 15.1699L10.641 16.5669L7.87159 21.4903C7.60083 21.9716 6.99111 22.1423 6.50976 21.8716C6.0284 21.6008 5.85768 20.9911 6.12844 20.5097Z" 
              fill="#0CB0ED"/></svg>
            </button>

            <button
              className="p-2 rounded-lg hover:bg-gray-200 transition duration-300"
              onClick={() => handleTravelModeChange('bicycle')} // Modo bicicleta
            >
              <svg viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 fill-current text-sky-500 hover:text-sky-600"
              >
               <path 
               fillRule="evenodd" 
               clipRule="evenodd" 
               d="M12 3C11.4477 3 11 3.44772 11 4C11 4.55228 11.4477 5 12 5H13.5585C13.9889 5 14.3711 5.27543 14.5072 5.68377L15.2792 8H8.75009L8.00009 7C8.55233 6.99995 9 6.55226 9 6C9 5.44772 8.55228 5 8 5H5C4.44772 5 4 5.44772 4 6C4 6.55228 4.44772 7 5 7H5.50009L6.95959 8.94601C6.90736 9.0303 6.86098 9.11916 6.82112 9.21216L6.01107 11.1023C5.68453 11.0352 5.34638 11 5 11C2.23858 11 0 13.2386 0 16C0 18.7614 2.23858 21 5 21C7.76142 21 10 18.7614 10 16C10 15.8706 9.99509 15.7424 9.98544 15.6155L11.9679 15.0491C12.3671 14.9351 12.7209 14.6996 12.9802 14.3755L16.1032 10.4718L16.5019 11.6678C15.0063 12.5321 14 14.1485 14 16C14 18.7614 16.2386 21 19 21C21.7614 21 24 18.7614 24 16C24 13.2386 21.7614 11 19 11C18.7967 11 18.5963 11.0121 18.3993 11.0357L16.4045 5.05132C15.9962 3.82629 14.8498 3 13.5585 3H12ZM17.1458 13.5998L18.0513 16.3162C18.226 16.8402 18.7923 17.1233 19.3162 16.9487C19.8402 16.774 20.1233 16.2077 19.9487 15.6838L19.0432 12.9674C20.6983 12.9906 22.0329 14.3394 22.0329 16C22.0329 17.675 20.675 19.0329 19 19.0329C17.325 19.0329 15.9671 17.675 15.9671 16C15.9671 15.0233 16.4288 14.1545 17.1458 13.5998ZM7.84914 11.8906L8.32875 10.7715L10.3283 13.4376L9.43675 13.6923C9.06058 12.9706 8.51348 12.3521 7.84914 11.8906ZM10.2501 10L12.0255 12.3673L13.9193 10L10.2501 10ZM7.45806 14.2576C7.33518 14.0846 7.19448 13.9251 7.03865 13.7818L6.74774 14.4606L7.45806 14.2576ZM5.28731 16.9579C5.0705 17.023 4.83046 17.0153 4.60609 16.9191C4.09846 16.7016 3.86331 16.1137 4.08087 15.6061L5.2004 12.9938C5.13416 12.9895 5.06734 12.9873 5 12.9873C3.33612 12.9873 1.98728 14.3361 1.98728 16C1.98728 17.6639 3.33612 19.0127 5 19.0127C6.60321 19.0127 7.91394 17.7605 8.00739 16.1807L5.28731 16.9579Z" 
               fill="#0CB0ED"
              />
              </svg>
            </button>

            <button
              className="p-2 rounded-lg hover:bg-gray-200 transition duration-300"
              onClick={() => handleTravelModeChange('car')} // Modo carro
            >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 fill-current text-sky-500 hover:text-sky-600"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 14.803v6.447c0 .414.336.75.75.75h1.614a.75.75 0 0 0 .74-.627L5.5 19h13l.395 2.373a.75.75 0 0 0 .74.627h1.615a.75.75 0 0 0 .75-.75v-6.447a5.954 5.954 0 0 0-1-3.303l-.78-1.17a1.994 1.994 0 0 1-.178-.33h.994a.75.75 0 0 0 .671-.415l.25-.5A.75.75 0 0 0 21.287 8H19.6l-.31-1.546a2.5 2.5 0 0 0-1.885-1.944C15.943 4.17 14.141 4 12 4c-2.142 0-3.943.17-5.405.51a2.5 2.5 0 0 0-1.886 1.944L4.399 8H2.714a.75.75 0 0 0-.67 1.085l.25.5a.75.75 0 0 0 .67.415h.995a1.999 1.999 0 0 1-.178.33L3 11.5c-.652.978-1 2.127-1 3.303zm15.961-4.799a4 4 0 0 0 .34.997H5.699c.157-.315.271-.65.34-.997l.632-3.157a.5.5 0 0 1 .377-.39C8.346 6.157 10 6 12 6c2 0 3.654.156 4.952.458a.5.5 0 0 1 .378.389l.631 3.157zM5.5 16a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM20 14.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                fill="currentColor"
              />
            </svg>
            </button>
            </div>
          </div>
            
          <div className="grid grid-cols-2 bg-white dark:bg-[#404040] dark:border-gray-600 border border-gray-200 rounded-lg shadow p-4">
            
          <h2 className="text-black font-semibold lg:text-xl md:text-2xl dark:text-[#BCBCBC]">{t('arrivalTime')}</h2>
          <p className='text-black font-semibold lg:text-xl md:text-2xl dark:text-[#BCBCBC]'>{EstimatedHour || 'N/A'}</p>
          
          <h2 className="text-black font-semibold lg:text-xl md:text-2xl dark:text-[#BCBCBC]">{t('Duration')}</h2>
          <p className='text-black font-semibold lg:text-xl md:text-2xl dark:text-[#BCBCBC]'>{travelTime || 'N/A'}</p>
        </div>

        </div>
    )}

    </div>
  );
};