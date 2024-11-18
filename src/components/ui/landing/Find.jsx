import "../../../index.css";
import country from "../../../assets/imgs/country.png";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Find() {
    const { t } = useTranslation();
    return (
     <div className="bg-white grid grid-cols-1 justify-center items-center lg:grid-cols-2 p-8">
        <img className="mx-auto" src={country} alt="Imagen de Costa Rica" />
        <div>
            <h3 className="text-blue-950 md:text-[3rem] text-[2rem] font-bold text-center">{t('findTitle1')}</h3>
            <h3 className="text-blue-950 md:text-[3rem] text-[1.8rem] font-bold text-center mb-2">{t('findTitle2')}</h3>
            <p className="text-center text-blue-950 italic font-normal text-lg ">{t('findDescription')}</p>
            <div className="flex justify-center mt-8">
            <NavLink className="text-blue-950 text-center text-2xl font-bold  px-6 py-2 rounded-full items-center  border-blue-950 border-2 hover:bg-blue-950 hover:text-white" to="/signUpUser">{t('findBtn')}</NavLink>
            </div>
           
        </div>
     </div>
    )
}
