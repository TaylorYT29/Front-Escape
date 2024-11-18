import "../../index.css";
import { Accordion } from "flowbite-react";
import propTypes from "prop-types";
import { useTranslation } from "react-i18next";

export function Filter({
  categories,
  setsubcategories,
  subcategories,
  canton,
  setdistrict,
  district,
  idDistrict,
  idCategory,
  idCategorySub,
  setIdCategorySub,
  setIdDistrict
}) {
  const handleSelectChangeDistrict = (e) => {
    const selectedValue = e.target.value;
    setIdDistrict(selectedValue); 
    console.log(idDistrict);
  };

  const handleSelectChangeCanton = (e) => {
    const selectedValue = e.target.value;
    setdistrict(selectedValue);
  };

  const setsubCategoriesID = (id) => () => {
    if (idCategorySub === id) {
      setIdCategorySub(0);
    }else{
      setIdCategorySub(id);
    }
    console.log(idCategorySub);
  
  };

  const { t } = useTranslation();

  return (

      <div className="flex flex-col h-[100vh] right-0 w-full md:w-[25vw] bg-white dark:bg-[#404040] dark:hover:bg-[#404040] md:fixed ">
            
        <h3 className="font-semibold text-center text-xl my-3 dark:text-white">
          {t("Filters")}
        </h3>
        <Accordion
          alwaysOpen={true}
          className="dark:border-[#4F4F4F] rounded-none mt-0"
        >
          <Accordion.Panel className="dark:border-[#4F4F4F] rounded-none">
            <Accordion.Title className="font-semibold text-lg text-black dark:text-white focus:ring-0 dark:focus:bg-[#4F4F4F] dark:hover:bg-[#4F4F4F] dark:bg-[#404040] dark:focus:ring-0 p-4 dark:border-[#4F4F4F] first:rounded-t-none ">
              {t("SCategories")}
            </Accordion.Title>
            <Accordion.Content className="dark:focus:bg-[#404040] dark:bg-[#404040] dark:border-[#4F4F4F] dark:hover:bg-[#404040] px-0 py-4  border-0">
              <div className="ml-4">
                {categories.map((item) => (
                  <button
                    key={item.id}
                    id= {item.id}
                  className={item.id==idCategory ? 'text-sky-500 border-2 border-sky-500 hover:text-sky-500 px-6 py-1 mr-2 rounded-lg shadow-sm dark:bg-[#404040] dark:hover:text-sky-500 mt-2' : 'text-[#706E6E] dark:text-[#BCBCBC] hover:text-sky-500 px-6 py-1 mr-2 rounded-lg shadow-sm dark:bg-[#404040] dark:hover:text-sky-500 mt-2'}
                    onClick={setsubcategories(item.id)}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </Accordion.Content>
          </Accordion.Panel>
          {subcategories == null || subcategories.length == 0 ? (
            <></>
          ) : (
            <Accordion.Panel className="dark:border-[#4F4F4F] rounded-none">
              <Accordion.Title className="font-semibold text-lg text-black dark:text-white focus:ring-0 dark:focus:bg-[#4F4F4F] dark:hover:bg-[#4F4F4F] dark:bg-[#404040] dark:focus:ring-0 p-4 dark:border-[#4F4F4F] first:rounded-t-none ">
                {t("SubCategory")}
              </Accordion.Title>
              <Accordion.Content className="dark:focus:bg-[#404040] dark:bg-[#404040] dark:border-[#4F4F4F] dark:hover:bg-[#404040] px-0 py-4  border-0">
                <div className="ml-4">
                  {subcategories.map((item) => (
                    <button
                      key={item.id}
                      className={item.id==idCategorySub ? 'text-sky-500 border-2 border-sky-500 hover:text-sky-500 px-6 py-1 mr-2 rounded-lg shadow-sm dark:bg-[#404040] dark:hover:text-sky-500 mt-2' : 'text-[#706E6E] dark:text-[#BCBCBC] hover:text-sky-500 px-6 py-1 mr-2 rounded-lg shadow-sm dark:bg-[#404040] dark:hover:text-sky-500 mt-2'}
                      onClick={setsubCategoriesID(item.id)}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          )}

          <Accordion.Panel className="dark:border-[#4F4F4F] rounded-none">
            <Accordion.Title className="font-semibold text-lg text-black dark:text-white focus:ring-0 dark:focus:bg-[#4F4F4F] dark:hover:bg-[#4F4F4F] dark:bg-[#404040] dark:focus:ring-0 p-4 dark:border-[#4F4F4F] first:rounded-t-none ">
              {t("Location")}
            </Accordion.Title>
            <Accordion.Content className="dark:focus:bg-[#404040] dark:bg-[#404040] dark:border-[#4F4F4F] dark:hover:bg-[#404040] px-0 py-4  border-0">
              <div className="ml-4">
                <label
                  htmlFor="canton"
                  className="block mb-2 text-sm font-medium text-black dark:text-white"
                >
                  {t("Canton")}
                </label>
                <select
                  id="canton"
                  className="bg-gray-50 border border-gray-300 text-[#706E6E] dark:text-[#BCBCBC] text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5 dark:bg-[#404040] dark:border-[#4F4F4F] dark:hover:bg-[#4F4F4F] dark:placeholder-gray-400   dark:focus:bg-[#4F4F4F]"
                  onChange={handleSelectChangeCanton}
                >
                  <option value="0">{t("selectCanton")}</option>
                  {canton.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {district.length === 0  ? (
                  <></>
                ) : (
                    <>
                  <label
                    htmlFor="district"
                    className="block my-2 text-sm font-medium text-black dark:text-white"
                  >
                    {t("District")}
                  </label>
                  <select
                  id="district"
                  onChange={handleSelectChangeDistrict}
                  className="bg-gray-50 border border-gray-300 text-[#706E6E] dark:text-[#BCBCBC] text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5 dark:bg-[#404040] dark:border-[#4F4F4F] dark:hover:bg-[#4F4F4F] dark:placeholder-gray-400   dark:focus:bg-[#4F4F4F]"
                >
                  <option value="0">{t("selectDistrict")}</option>
                  {district.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                </>
                )}

              </div>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </div>
  );
}

Filter.propTypes = {
  categories: propTypes.array,
  setsubcategories: propTypes.func,
  subcategories: propTypes.array,
  canton: propTypes.array,
  setdistrict: propTypes.func,
  district: propTypes.array,
  idCategorySub: propTypes.number,
  idCanton: propTypes.number,
  idDistrict: propTypes.number,
  idCategory: propTypes.number,
  setIdCategorySub: propTypes.func,
  setIdDistrict: propTypes.func
};
