import "../../index.css";
import { useUser } from "../../context/UserContext.jsx";
import { useTranslation } from "react-i18next";
import { DrawerMenu } from "./DrawerMenu.jsx";
import { useLocation } from "react-router-dom";

export function Menubar(){
    const { user } = useUser();
    const profileUrl = user && user.user_type_id === 1 ? "/PersonalInformationCompany" : "/PersonalInformation";

    const { t } = useTranslation();
    const location = useLocation();

    const isDrawerHidden = location.pathname === "/favorites" || location.pathname === "/Categories";

    return(
        <>
        {!isDrawerHidden && <DrawerMenu position="fixed" positionX="right-16" positionY="top-8" />}
        <div className="bg-white dark:bg-[#2a2a2a] w-full h-[70px] fixed bottom-0">
            <nav>
                <ul className="flex justify-between ml-4 mr-4">
                    <li className="mb-[10px] mt-[10px]">
                        <a href="/home" className="relative group w-full h-[45px] flex justify-center items-center rounded-lg hover:bg-[#E8DEF8] transition-colors duration-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 min-w-[50px] dark:stroke-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        <span className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-full mb-2 p-3 bg-white dark:bg-[#2a2a2a] dark:text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {t('sHome')}
                        </span>
                        </a>
                    </li>
                    <li className="mb-[10px] mt-[10px]">
                        <a href="/mapWithRoute" className="relative group w-full h-[45px] flex justify-center items-center rounded-lg hover:bg-[#E8DEF8] transition-colors duration-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 min-w-[50px] dark:stroke-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                        </svg>
                        <span className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-full mb-2 p-3 bg-white dark:bg-[#2a2a2a] dark:text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {t('Places')}
                        </span>
                        </a>
                    </li>
                    {user && user.user_type_id === 1 && (
                    <li className="mb-[10px] mt-[10px]">
                        <a href="/create-post" className="relative group w-full h-[45px] flex justify-center items-center rounded-lg bg-[#FFD8E4] hover:bg-[#f8c3d4] transition-colors duration-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 m-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                        <span className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-full mb-2 p-3 bg-white dark:bg-[#2a2a2a] dark:text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {t('createNew')}
                        </span>
                        </a>
                    </li>
                    )}
                    <li className="mb-[10px] mt-[10px]">
                        <a href="/favorites" className="relative group w-full h-[45px] flex justify-center items-center rounded-lg hover:bg-[#E8DEF8] transition-colors duration-300 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 min-w-[50px] dark:stroke-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        <span className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-full mb-2 p-3 bg-white dark:bg-[#2a2a2a] dark:text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {t('favorites')}
                        </span>
                        </a>
                    </li>
                    <li className="mb-[10px] mt-[10px]">
                        <a href={profileUrl} className="relative group w-full h-[45px] flex justify-center items-center rounded-lg hover:bg-[#E8DEF8] transition-colors duration-300 cursor-pointer">       
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 min-w-[50px] dark:stroke-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        <span className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-full mb-2 p-3 bg-white dark:bg-[#2a2a2a] dark:text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {t('profile')}
                        </span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        </>
        
    );
}
