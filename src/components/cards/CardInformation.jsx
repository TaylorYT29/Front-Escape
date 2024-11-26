import { useState, useEffect, useRef } from "react";
import "../../index.css";
//import a from "../../assets/imgs/Place1.jpg";
import start from "../../assets/imgs/start.svg";
import greyStar from "../../assets/imgs/greyStar.svg";
import location from "../../assets/imgs/location.svg";
import money from "../../assets/imgs/money.svg";
import guide from "../../assets/imgs/guide.svg";
import heart from "../../assets/imgs/heart.svg";
import fav from "../../assets/imgs/favorite.svg";
import { NavLink, useNavigate } from "react-router-dom";

import back from "../../assets/imgs/back.svg";
import { useUser } from '../../context/UserContext.jsx';
import { useTranslation } from 'react-i18next';

import propTypes from "prop-types";

export function CardInformation({ onClose, favorite, hearts, setHearts, placeData, starsData, arrayStartPlace, starts}) {

  const { user } = useUser();
  const { t } = useTranslation();
  const [travelTime, setTravelTime] = useState(null);
  const [travelMode, setTravelMode] = useState('pedestrian');
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef(null);
  const [hoveredStar, setHoveredStar] = useState(0); 
  const [userRating, setUserRating] = useState(0);
  const [rating, setRating] = useState(0);

  useEffect(() => {

    if (!placeData || !placeData[0] || !user) return;

    const place = placeData[0];
    ControlRating();

    if (place.longitude && place.latitude && user.longitude && user.latitude) {

      /* 
      const origin = [user.longitude, user.latitude];
      const destination = [place.longitude, place.latitude];
  
      const routeUrl = `https://api.tomtom.com/routing/1/calculateRoute/${origin[1]},${origin[0]}:${destination[1]},${destination[0]}/json?key=dd8qO1N1bSR7yu4ShWlBi4HDup4MKSwi&traffic=true&travelMode=${travelMode}`;
  
      fetch(routeUrl)
        .then(response => response.json())
        .then(data => {
          const travelTimeInSeconds = data.routes[0].summary.travelTimeInSeconds;
          const travelTimeInMinutes = Math.round(travelTimeInSeconds / 60);
          const travelTimeFormatted = convertirMinutosAHoras(travelTimeInMinutes);
          setTravelTime(travelTimeFormatted);
        })
        .catch(error => console.error('Error al calcular la ruta:', error));*/

      setTravelTime(t('Calculating'));
    } else {
      setTravelTime(t('Calculating'));
    }

    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, [placeData, user, travelMode]);


  function convertirMinutosAHoras(minutos) {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return horas >= 1 ? `${horas}h ${mins}min` : `${mins}min`;
  }


  if (!placeData || !placeData[0]) {
    return <p>No data found</p>;
  }

  const place = placeData[0];

  const close = () => {
    setHearts(false);
    onClose();
  }

  const handleTravelModeChange = (mode) => {
    console.log(mode);
    setTravelMode(mode);
  };

  const goToMapCard = () => {
    navigate('/mapWithRoute', { state: { placeId: place.id } })
  };

  const handleStarClick = (value) => {

    setVisible(false);
    calculateAverageRating(value);

  };

  const calculateAverageRating = (value) => {

      const updatedDataStart = arrayStartPlace.map((r) => 
      r.post_place_id === place.id && r.user_id === user.id
        ? { ...r, rating: value }
        : r
    );

    if (updatedDataStart.length > 0) {
      const average = updatedDataStart.reduce((sum, r) => sum + r.rating, 0) / updatedDataStart.length;
      const result = average.toFixed(1);
      starts(place.id, result, value);
    }else{
      const result = value.toFixed(1);
      console.log(place.id, result, value);
      starts(place.id, result, value); //Si no hay datos se guarda el rating
    }

  }

  const renderStars = () => {
    
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      return (
        <img
          key={starValue}
          src={starValue <= (hoveredStar || userRating) ? start : greyStar} 
          alt={`star-${starValue}`}
          onClick={() => handleStarClick(starValue)} 
          onMouseEnter={() => setHoveredStar(starValue)} 
          onMouseLeave={() => setHoveredStar(0)} 
          style={{ cursor: "pointer", width: "28px", height: "28px" }}
        />
      );
    });
  };

  const ControlRating = () => {

    if(starsData){
      setUserRating(starsData.rating);
      setRating(parseFloat(starsData.post_place_average_rating).toFixed(1));
    }else{
      setUserRating(0);
      setRating(0);
    }
  
  };

  return (
    <div>
      <div className="relative">
        <img className="rounded-lg object-cover h-[50vh] w-full" src={place.image} alt="" />
        <img onClick={favorite} className="absolute top-4 right-4 p-2 rounded-lg bg-white dark:bg-[#404040]" src={hearts == false ? heart : fav} alt="" />
        <img onClick={close} className="absolute top-2 left-2 rounded-full bg-neutral-300 dark:bg-neutral-700 " src={back} alt="" />
      </div>
      
      <div className="flex justify-between mt-4">
        <h3 className="text-black font-semibold text-3xl dark:text-white">{place.name}</h3>
        <div className="flex items-center gap-1 relative">
          <img onClick={() => setVisible(!visible)} style={{ cursor: 'pointer', fontSize: '24px' }} src={start} alt="start" />

          {visible && (
            <div ref={tooltipRef} className="absolute left-1/2 transform -translate-x-[150px] -top-10 z-10 w-48 bg-white dark:bg-[#404040] shadow-lg p-2 rounded-lg text-sm text-gray-700">
              <p className="font-semibold dark:text-[#BCBCBC]">Rating</p>
              <div className="flex gap-1 mt-1">
                {renderStars()}
              </div>
            </div>
          )}

          <p className="text-[#9A9797] font-semibold text-xl dark:text-[#BCBCBC]">
            {rating}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">

      <div className="flex items-center gap-2 my-3">

        <NavLink to="/InformationCompany" state={place.id} >
        <img src={place.image} alt="profile" className="w-10 h-10 rounded-full" />
        </NavLink>
      

        <div className="flex items-center gap-2" >
          <img src={location} alt="location" />
          <p className="text-[#9A9797] font-semibold text-xl dark:text-[#BCBCBC]">
            {place.canton_id}, {place.district_id}
          </p>
        </div>

      </div>

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

      <div className="flex items-center justify-between bg-white dark:bg-[#404040] dark:border-gray-600 border border-gray-200 rounded-lg shadow  ">
        <div className="flex items-center gap-4 my-3 mx-8">
          <img src={money} alt="location" />
          <p className="text-black font-semibold text-xl md:text-2xl dark:text-[#BCBCBC] grid">
            ₡2500
            <span className="text-[#9A9797] font-semibold text-base dark:text-[#BCBCBC]">
              {t('pPerson')}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-4 my-3 mx-8">
          <img src={guide} alt="location" />
          <p className="text-black font-semibold text-xl md:text-2xl dark:text-[#BCBCBC]">
            {travelTime ? travelTime : 'Calculando...'}
          </p>
        </div>
      </div>
      <p className="mt-4 dark:text-white">{place.description}</p>
      <div className="flex align-bottom gap-2 ">
        <a href={place.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center  bg-green-500 text-white font-bold p-2 rounded-lg mt-4 text-lg transition duration-300 hover:bg-green-600">
          <svg className="w-8 h-8 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" fillRule="evenodd" d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z" clipRule="evenodd" />
            <path fill="currentColor" d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z" />
          </svg>
        </a>
        <button onClick={goToMapCard} className="w-full bg-sky-500 text-white font-bold py-2 rounded-lg mt-4 text-lg">{t('Go')}</button>
      </div>

    </div>
  );
}

CardInformation.propTypes = {
  id: propTypes.number,
  onClose: propTypes.func,
  favorite: propTypes.func,
  placeData: propTypes.array,
  hearts: propTypes.bool,
  setHearts: propTypes.func
};
