import "../../index.css";
//import { Sidebar } from "../navigation/Sidebar";
import { Navigation } from "../navigation/Navigation";
import { ContainerCards } from "../ui/home/ContainerCards.jsx";
import { useFetchMenubar } from "../hooks/useFetchMenubar.js";
import { CardInformation } from "../cards/CardInformation";
import { Filter } from "../navigation/Filter.jsx";
("use client");
import { Drawer } from "flowbite-react";
import { useState, useEffect } from "react";
import propTypes from "prop-types";
import useFetchData from "../hooks/useFetchData.js";
import { CategorieNav } from "../navigation/CategorieNav.jsx";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUser } from '../../context/UserContext.jsx';
import { translateText } from "../hooks/translateText.js";


export function Categories() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { user } = useUser();

  const [hearts, setHearts] = useState(false);

  const { isMobile } = useFetchMenubar();
  const { data: categories, loading: loadingCategories } = useFetchData(
    "http://localhost/escape-desarrollo-backend/public/api/categories",
    ["name"]
  );
  const [district, setDistrict] = useState([]);
  const { data: cantons, loading: loadingCantons } = useFetchData(
    "http://localhost/escape-desarrollo-backend/public/api/canton"
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [idCategory, setIdCategory] = useState(location.state);
  const { data: subCategories, setData: setSubCategories } = useFetchData(
    `http://localhost/escape-desarrollo-backend/public/api/subcategories/${idCategory}`,
    ["name"]
  );

  const [idCategorySub, setIdCategorySub] = useState(0);
  const [idCanton, setIdCanton] = useState(0);
  const [idDistrict, setIdDistrict] = useState(0);
  if(idCategory == null){
    setIdCategory(0);
  }
  const { data, loading, setData } = useFetchData(
    `http://localhost/escape-desarrollo-backend/public/api/items/${idCategory}/${idCategorySub}/${idCanton}/${idDistrict}/${user.id}`
  );

  const handleClose = () => setIsOpen(false);
  const handleClosFilter = () => setIsFilter(false);

  const [id, setId] = useState(0);
  const [informationCard, setInformationCard] = useState(null);


  const openCard = async (id) =>  {
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
  const favorite  = () => {
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

  const openFilter = (open) => {
    setIsFilter(open);
  };
  const fetchCategory = async (url, isCategory) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      if (isCategory == true) {
        setSubCategories(result);
      } else {
        setDistrict(result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost/escape-desarrollo-backend/public/api/items/${idCategory}/${idCategorySub}/${idCanton}/${idDistrict}/${user.id}`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Llamar la función asíncrona dentro del useEffect
  }, [idCategory, idCanton, idDistrict, idCategorySub]);

  const setsubcategories = (id) => () => {
    if (idCategory == id) {
      setIdCategory(0);
      fetchCategory(
        `http://localhost/escape-desarrollo-backend/public/api/subcategories/0`,
        true
      );
    } else {
      setIdCategory(id);
      fetchCategory(
        `http://localhost/escape-desarrollo-backend/public/api/subcategories/${id}`,
        true
      );
    }
  };

  const setdistrict = (id) => {
    setIdCanton(id);
    fetchCategory(
      `http://localhost/escape-desarrollo-backend/public/api/district/${id}`,
      false
    );
  };

  return (
    <div className=" dark:bg-[#2a2a2a]">
      <div className="flex-shrink-0 fixed top-0 left-0 z-10 h-full">
        <Navigation />
      </div>
      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="right"
        className="w-full md:w-1/2 lg:w-1/3 dark:bg-[#2a2a2a]"
      >
        <Drawer.Items>
          <CardInformation  placeData={informationCard} hearts={hearts} favorite={favorite} setHearts={setHearts} onClose={handleClose} />
        </Drawer.Items>
      </Drawer>
      <div className="grid lg:justify-between ">
        <main
          className="flex flex-col lg:pl-12 px-5 md:w-[70vw] overflow-x-hidden transition-all duration-500 mb-4"
          style={{
            marginLeft: isMobile ? "0px" : "80px",
          }}
        >
          {isMobile ? (
            <CategorieNav setIsFilter={openFilter} />
          ) : (
            <h1 className="font-black dark:text-white text-3xl lg:text-4xl mt-6">
              ESCAPE
            </h1>
          )}
          <h2 className="font-bold md:text-2xl text-xl mb-8 dark:text-white mt-16 md:mt-10">
            {t('SCategories')}
          </h2>

          {!loading ? (
            <ContainerCards data={data} setIsOpen={openCard} />
          ) : (
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900">Cargando...</div>
            </div>
          )}
        </main>
        {!loadingCategories && !loadingCantons ? (
          isMobile ? (
            <Drawer
              open={isFilter}
              onClose={handleClosFilter}
              position="right"
              className="w-[85vw] md:w-1/2 lg:w-1/3 dark:bg-[#2a2a2a] p-0"
            >
              <Drawer.Items>
                <Filter
                  categories={categories}
                  setsubcategories={setsubcategories}
                  subcategories={subCategories}
                  canton={cantons}
                  district={district}
                  setdistrict={setdistrict}
                  idCanton={idCanton}
                  idDistrict={idDistrict}
                  idCategory={idCategory}
                  idCategorySub={idCategorySub}
                  setIdCategorySub={setIdCategorySub}
                  setIdDistrict={setIdDistrict}
                />
              </Drawer.Items>
            </Drawer>
          ) : (
            <Filter
              categories={categories}
              setsubcategories={setsubcategories}
              subcategories={subCategories}
              canton={cantons}
              district={district}
              setdistrict={setdistrict}
              idCanton={idCanton}
              idDistrict={idDistrict}
              idCategory={idCategory}
              idCategorySub={idCategorySub}
              setIdCategorySub={setIdCategorySub}
              setIdDistrict={setIdDistrict}
            />
          )
        ) : (
          <p value="">loading</p>
        )}
      </div>
    </div>
  );
}

Categories.propTypes = {
  toggleDarkMode: propTypes.func,
  darkMode: propTypes.bool,
};
