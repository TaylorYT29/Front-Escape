import React, { useEffect } from 'react';
import { useUser } from '../../context/UserContext.jsx';
import { Navigation } from "../navigation/Navigation";

import { useDarkModeContext } from "../../context/AppContext.jsx";
import tt from '@tomtom-international/web-sdk-maps';

export const MapPage = () => {
  
  const { user } = useUser();
  const center = [user.longitude, user.latitude]; 

  const { darkMode } = useDarkModeContext(); // Accede al estado del modo oscuro
  const mapContainer = React.useRef(null); // Referencia al contenedor del mapa
  let map;

  useEffect(() => {
    
    if (mapContainer.current) {
      map = tt.map({
      key: 'dd8qO1N1bSR7yu4ShWlBi4HDup4MKSwi', 
      container: mapContainer.current,
      style: darkMode
      ? 'https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBASFZaaHBtUFdrS3QyR3E5bzthZjVkMTI5Yy0wNzdhLTQyODktYTIwYy05NGI4MDFkNDZlOGE=/drafts/0.json?key=dd8qO1N1bSR7yu4ShWlBi4HDup4MKSwi' // Estilo oscuro
      : 'https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBASFZaaHBtUFdrS3QyR3E5bzs3YTdiYzkwNi03ZTFhLTQwOWMtYjM5ZS1lODcxYmY1MzliMDI=/drafts/0.json?key=dd8qO1N1bSR7yu4ShWlBi4HDup4MKSwi', // Estilo claro 
      center: center, 
      zoom: 15
    });

    //Create a Marker 
    map.on('load', () => {
      new tt.Marker().setLngLat(center).addTo(map);
    });

   
    return () => {
      map.remove();
    };
  }
}, [center, darkMode]); 

  return (
    <div>
      <div className="flex-shrink-0 fixed top-0 left-0 z-20 h-full">
                <Navigation />
      </div>
      {/* Contenedor del mapa */}
      <div ref={mapContainer} style={{ width: '100%', height: '100vh' }}></div>
    </div>
  );
};
