import { useState, useEffect, useRef } from "react";
import "../../index.css";
import { CardLocationHome } from "../cards/CardLocationHome";
//import logo from "../../assets/imgs/Place1.jpg";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import propTypes from "prop-types";
import { Pagination ,Navigation,} from 'swiper/modules';
import useFetchData from "../hooks/useFetchData";
import { useUser } from '../../context/UserContext.jsx';


export function CarouselCard({setIsOpen}) {
  const { user } = useUser();

  const url = `https://myescape.online/api/companies/`+user.id;
  const urlStars = `https://myescape.online/api/rating`;
  const { data: companies, loading, error } = useFetchData(url);
  const data = useFetchData(urlStars);
  const dataStart = data.data;

  if (loading) {
    return <p>Loading...</p>; // Mostrar un mensaje mientras se cargan los datos
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>; // Mostrar error si hay uno
  }
  
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        pagination={{
          clickable: true,  
        }}
        breakpoints={{
          554: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          915: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        
          1115: {
            slidesPerView: 3,
            spaceBetween: 20,
          },

          1500: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
          {companies.map(company => {
          // Filtra las calificaciones para la compañía actual
          const ratings = dataStart.filter(r => r.post_place_id === company.id);

          // Calcula el promedio de ratings para la compañía actual y conviértelo a string
          const averageRating = ratings.length > 0
            ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
            : "0";

          return (
            <SwiperSlide key={company.id} className="pb-[3rem]">
              <CardLocationHome
                image={company.image}
                name={company.name}
                city={company.canton_id}
                starts={averageRating}  // Ahora `averageRating` es una cadena
                setIsOpen={setIsOpen}
                id={company.id}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

CarouselCard.propTypes = {
  
  setIsOpen: propTypes.func

};


