import "../../index.css";
import location from "../../assets/imgs/location.svg";
import { useUser } from '../../context/UserContext.jsx';
import { useFetchTravelTime } from "../hooks/useFetchTravelTime.js";
import { useTranslation } from 'react-i18next';
import useFetchData from "../hooks/useFetchData";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";


export function CardResult({ image, name, city, followers, description, phone_number, email, category_id, sub_category_id, id }) {

    const { t } = useTranslation();

    /*const [travelMode, setTravelMode] = useState('pedestrian');
    const { t } = useTranslation();
     
    const url = `http://localhost/escape-desarrollo-backend/public/api/companies/` + user.id;
    const { data: companies, loading, error } = useFetchData(url);

    if (companies.name == name){

        placeData = companies;
        console.log(placeData);
    }
    

    const { travelTime } = useFetchTravelTime(placeData, travelMode);

    const handleTravelModeChange = (mode) => {
        console.log(mode);
        setTravelMode(mode);
    };*/

    return (
        <div className="lg:max-w-[800px] sm:max-w-[400px] w-full mx-auto grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-8 p-6 bg-white rounded-lg shadow dark:bg-[#404040]">
            <div className="flex justify-center items-center">
                <img className="lg:rounded-full lg:w-[20rem] lg:h-[20rem] lg:object-cover rounded-lg w-full h-[15rem]" src={image} alt={name} />
            </div>

            <div className="flex flex-col justify-center">
                <div className="flex items-center justify-between">
                    <h5 className="text-3xl font-semibold tracking-tight dark:text-white">{name}</h5>

                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-sky-500">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                        </svg>
                        <p className="text-[#9A9797] font-semibold text-base dark:text-[#BCBCBC]">{followers}</p>
                    </div>
                </div>
                <p className="text-lg text-[#9A9797] font-semibold dark:text-[#BCBCBC] mt-3">{category_id} - {sub_category_id}</p>

                <p className="text-lg tracking-tight dark:text-white my-4">{description}</p>

                <div className="flex gap-3 ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 dark:text-white">
                        <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                    </svg>

                    <p className="tracking-tight dark:text-white text-lg">{city}</p>
                </div>

                    <div className="flex gap-3 mt-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 dark:text-white">
                            <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                        </svg>
                        <p className="text-lg tracking-tight dark:text-white">{phone_number}</p>
                    </div>

                    <div className="flex gap-3 mt-3 mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 dark:text-white">
                            <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                            <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                        </svg>
                        <p className="text-lg tracking-tight dark:text-white">{email}</p>
                    </div>

                <div className="flex justify-center items-center">
                <NavLink to="/InformationCompany" state={id} className="w-full bg-sky-500 text-white font-bold py-2 rounded-lg text-lg text-center">
                    {t('categoriesBtn')}
                </NavLink>
                </div>

                
            </div>

            

        </div>
    );
}
