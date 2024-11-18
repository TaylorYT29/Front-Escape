import "../../index.css";
import { CategoryCard } from "../cards/CategoryCard";
import { Swiper, SwiperSlide } from "swiper/react";
import useFetchData from "../hooks/useFetchData.js";

import "swiper/css";
import "swiper/css/navigation";

export function CategoriesCarousel() {
  const { data: categories, loading: loadingCategories } = useFetchData(
    "http://localhost/escape-desarrollo-backend/public/api/categories",
    ['name']
  );

  return (
    <div className="p-4">
      <Swiper
        spaceBetween={10}
        slidesPerView={2}
        navigation
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        className="mySwiper"
      >
        {!loadingCategories ? (
          categories.map((item) =>  (
            <SwiperSlide key={item.id}>
              <CategoryCard title={item.name} id={item.id} />
            </SwiperSlide>
          ))
        ) : (
          <p>Cargando...</p>
        )}
      </Swiper>
    </div>
  );
}
