import "../../index.css"
//import { Sidebar } from "../navigation/Sidebar";
import { Navigation } from "../navigation/Navigation";
import { SearchDropdown } from "../dropdown/SearchDropdown";
import { CarouselCard } from "../carousel/CarouselCard";
import { useFetchMenubar } from "../hooks/useFetchMenubar.js";
import { MapThumbnail } from "../map/MapThumbnail.jsx";
import { CategoriesCarousel } from "../carousel/CategoriesCarousel.jsx"
import { CardInformation } from "../cards/CardInformation";
("use client");
import { Drawer } from "flowbite-react";
import { useState } from "react";
import propTypes from "prop-types";
import { useUser } from '../../context/UserContext.jsx';
import { Posts } from "./Posts.jsx";

import { CardComments } from "../cards/CardComments.jsx";
import { useTranslation } from "react-i18next";
import { translateText } from "../hooks/translateText.js";

export function Home() {

  const { isMobile } = useFetchMenubar();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  }
  const [hearts, setHearts] = useState(false);

  const [id, setId] = useState(0);

  const { user } = useUser();
  const [isOpenComments, setOpenComments] = useState(false);
  const handleCloseComments = () => setOpenComments(false);
  const [postId, setPostId] = useState(null);
  const { t, i18n } = useTranslation();

  const openCardComments = (postId) => () => {
    if (postId) {
      setOpenComments(true);
      setPostId(postId);
    } else {
      console.error('Invalid postId:', postId);
    }
  };
  const [informationCard, setInformationCard] = useState(null);


  const openCard = async (id) => {
    try {
      const response = await fetch(`http://localhost/escape-desarrollo-backend/public/api/company/${id}/` + user.id);
      const result = await response.json();
      if (result[0].favorite != null) {
        setHearts(true);
        result[0].favorite = null;

      } else {
        setHearts(false);
      }

      if (i18n.language !== 'es') {
        result[0].description = await translateText(result[0].description, 'es', i18n.language);
      }

      setInformationCard(result);
      setIsOpen(true);
      setId(id)
    }
    catch (err) {
      console.error('Error al abrir la tarjeta:', err);
    }
  };
  const favorite = () => {
    fetch("http://localhost/escape-desarrollo-backend/public/api/favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company_id: id,
        user_id: user.id,
      }),
    });
    setHearts(!hearts);

  };

  return (

    <div className="flex dark:bg-[#2a2a2a]">

      <div className="flex-shrink-0 fixed top-0 left-0 z-10 h-full">
        <Navigation />
      </div>
      <Drawer open={isOpen} onClose={handleClose} position="right" className="w-full md:w-1/2 lg:w-1/3 dark:bg-[#2a2a2a]">
        <Drawer.Items>
          <CardInformation placeData={informationCard} hearts={hearts} favorite={favorite} setHearts={setHearts} onClose={handleClose} />
        </Drawer.Items>
      </Drawer>

      <Drawer open={isOpenComments} onClose={handleCloseComments} position="right" className="w-full md:w-1/2 lg:w-1/3 dark:bg-[#2a2a2a] overflow-hidden">
        <Drawer.Items>
          {postId ? (
            <CardComments postId={postId} onClose={handleCloseComments} />
          ) : (
            <p className="text-center dark:text-white">Cargando comentarios...</p>
          )}
        </Drawer.Items>
      </Drawer>

      <main className="flex flex-col lg:px-12 px-5 overflow-x-hidden transition-all duration-500 lg:mb-10 mb-20"
        style={{
          marginLeft: isMobile ? '0px' : '80px',
        }}>
        <div className="flex pt-4 justify-between">
          <h1 className="font-black dark:text-white text-3xl lg:text-4xl mt-2">ESCAPE</h1>
          <SearchDropdown />
        </div>

        <MapThumbnail />
        <div className="mt-10">
          <h2 className="font-bold md:text-2xl text-xl mb-8 dark:text-white">{t('SCategories')}</h2>
          <CategoriesCarousel />
        </div>

        <div className="mt-10">
          <h2 className="font-bold md:text-2xl text-xl mb-8 dark:text-white">
            {t('recommendations')}
          </h2>
          <CarouselCard setIsOpen={openCard} />
        </div>
        <h2 className="font-bold md:text-2xl text-xl mt-8 dark:text-white">
          {t('RecentPosts')}
        </h2>

        <div className="mt-10">
          <Posts setOpenComments={openCardComments} />
        </div>
      </main>
    </div>
  );
}

Home.propTypes = {
  toggleDarkMode: propTypes.func,
  darkMode: propTypes.bool
};