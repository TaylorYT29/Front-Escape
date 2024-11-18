import "../../index.css";
//import { Sidebar } from "../navigation/Sidebar";
import { Navigation } from "../navigation/Navigation";
import { SearchDropdown } from "../dropdown/SearchDropdown";
import { CarouselCard } from "../carousel/CarouselCard";
import { useFetchMenubar } from "../hooks/useFetchMenubar.js";
import { useUser } from "../../context/UserContext.jsx";
import { NavLink } from "react-router-dom";
import { CardInformation } from "../cards/CardInformation";
("use client");
import propTypes from "prop-types";
import { Drawer } from "flowbite-react";
import { useState } from "react";
import { Modal } from "flowbite-react";
import  useFetchData  from "../hooks/useFetchData.js";

import { useTranslation } from "react-i18next";
export function PersonalInformation() {
  const { t } = useTranslation();
  const { isMobile } = useFetchMenubar();
  const [openModal, setOpenModal] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const { user } = useUser();
  const [followStatus, setFollowStatus] = useState({});

  const [id, setId] = useState(0);
  const openCard = (id) => () => {
    setIsOpen(true);
    console.log(id);
    setId(id);
  };

  const { data, loading } = useFetchData(
    `http://localhost/escape-desarrollo-backend/public/api/following/` + user.id
 
   );

   const follower = async (idCompany) => {
    try {
        fetch(`http://localhost/escape-desarrollo-backend/public/api/follower`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                company_id: idCompany,
                user_id: user.id,
            }),
        })
        .then(response => response.json())
        .then(data => {
            setFollowStatus(prevState => ({
                ...prevState,
                [idCompany]: data.isFollowing ? t('Following') : t('Follow'),
            }));
        })
        .catch(error => console.error('Error al seguir:', error));
     
    } catch (error) {
        console.error("Network error:", error);
    }
};

  return (
    <div className="flex overflow-x-hidden dark:bg-[#2a2a2a]">
      <div className="flex-shrink-0 fixed top-0 left-0 z-10 h-full">
        <Navigation />
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)} className="dark:bg-black ">
        <Modal.Header  className="dark:bg-[#2a2a2a] grid grid-cols-[95%_5%] text-center justify-center">{t('Following')}</Modal.Header>
        <Modal.Body  className="dark:bg-[#2a2a2a] ">
            {loading ? (
                <p className='text-center dark:text-white'>Loading...</p>
            ) : (
                data.map((item) => (
                <div key={item.id} className="flex justify-between items-center dark:bg-[#2a2a2a] mb-3">
                  <NavLink to="/InformationCompany" state={item.id} className="grid grid-cols-[auto_auto] gap-4 justify-center items-center " >
                 <img src={item.image} alt="profile" className="w-14 h-14 rounded-full" />
                 <p className="font-bold text-lg text-center p-0 m-0 dark:text-white">{item.name}</p>
                 </NavLink>
                 <button onClick={() =>follower(item.id)} className="bg-[#E0E1E3] font-semibold rounded-xl px-8 py-2 dark:text-white dark:bg-[#404040]">  {followStatus[item.id] || t('Following')}</button>
                </div>
            ))
            )}
            
        </Modal.Body>
      </Modal>

      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="right"
        className="w-full md:w-1/2 lg:w-1/3 dark:bg-[#2a2a2a]"
      >
        <Drawer.Items>
          <CardInformation id={id} onClose={handleClose} />
        </Drawer.Items>
      </Drawer>

      <main
        className="flex flex-col lg:px-12 px-5 overflow-x-hidden transition-all duration-500"
        style={{
          marginLeft: isMobile ? "0px" : "80px",
        }}
      >
        <div className="flex pt-4 justify-between">
          <h1 className="font-black text-3xl lg:text-4xl mt-2 dark:text-white">
            ESCAPE
          </h1>
          <SearchDropdown />
        </div>

        <div className="flex items-center justify-between  dark:bg-[#2a2a2a]">
          <div>
            <img
              src={
                user && user.image
                  ? `http://localhost/escape-desarrollo-backend/public/imgs/${user.image}`
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile_Img"
              className="rounded-full h-[7rem] w-[7rem] mt-[2rem]"
            />
            <h3 className="font-bold lg:text-2xl text-xl mt-[2rem] dark:text-white">
              {user.name}
            </h3>
            <div className="col-span-3 text-left lg:pt-[2rem] pt-[1rem] dark:text-white">
              <p>{user.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 text-center gap-4">
            <button className="bg-[#E0E1E3] font-semibold rounded-xl px-2 md:px-12  py-[0.5rem] mt-[1rem] lg:mt-[0rem] dark:text-white dark:bg-[#404040] dark:hover:text-sky-500 hover:text-sky-500">
              <NavLink to="/accountSettings">{t("Edit")}</NavLink>
            </button>
            <button
              onClick={() => setOpenModal(true)}
              className="bg-[#E0E1E3] font-semibold rounded-xl px.2 md:px-12  py-[0.5rem] mt-[1rem] lg:mt-[0rem] dark:text-white dark:bg-[#404040] dark:hover:text-sky-500 hover:text-sky-500"
            >
              {t("Following")}
            </button>
          </div>
        </div>

        <div className="mt-10 pb-[5rem]">
          <h2 className="font-bold lg:text-2xl text-xl mb-8 dark:text-white">
            {t("companies")}
          </h2>

          <CarouselCard setIsOpen={openCard} />
        </div>
      </main>
    </div>
  );
}

PersonalInformation.propTypes = {
  toggleDarkMode: propTypes.func,
};
