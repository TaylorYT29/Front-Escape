import "../../index.css";
import logoCeleste from '../../assets/imgs/logo-celeste.png';
import { useFetchSidebar } from  "../hooks/useFetchSidebar.js";
import propTypes from "prop-types";
import { useUser } from "../../context/UserContext.jsx";
import { useDarkModeContext,useSidebarContext } from "../../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageDropdown } from "../dropdown/LanguageDropdown.jsx";


export function Sidebar() {
    const { t } = useTranslation();
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const { toggleDarkMode } = useDarkModeContext();
    const {selecItem,selectItem}=useSidebarContext();
    const { sidebarWidth } = useFetchSidebar();
    const profileUrl = user && user.user_type_id === 1 ? "/PersonalInformationCompany" : "/PersonalInformation";

    const handleLogout = async () => {
        const response = await fetch('http://localhost/escape-desarrollo-backend/public/api/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        if (response.ok) {
            logout(); 
            //localStorage.removeItem('token'); 
            navigate('/landing');
        } else {
            console.error('Error al hacer logout');
        }
    };

    return(
        <div className={`bg-white dark:bg-[#2a2a2a] h-[100vh] pt-5 pb-5 pl-3 pr-4 cursor-pointer fixed top-0 left-0`} style={{ width: sidebarWidth, transition: "width 0.5s ease" }}>
            <div className="w-full h-[60px] flex items-center relative overflow-hidden">
                <img id="logo" className="max-w-[150px]" src={logoCeleste} alt="logo" />
                <div className={`absolute right-0 top-0 bottom-0 bg-gradient-to-l from-white dark:from-[#2a2a2a] to-transparent pointer-events-none transition-opacity duration-500 ${sidebarWidth === "80px" ? 'opacity-0' : 'opacity-100'}`}
                     style={{ width: "50px" }} 
                />
            </div>
            {user && user.user_type_id === 1 && (
                <a href="/create-post" className="relative group mt-[10px] mb-[10px] w-full h-[45px] flex justify-center items-center rounded-lg bg-[#FFD8E4] hover:bg-[#f8c3d4] dark:hover:bg-[##404040] transition-colors duration-300 cursor-pointer" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                    <span className={`ml-2 flex transition-all duration-500 whitespace-nowrap ${sidebarWidth === "80px" ? 'hidden' : 'inline'}`}>{t('createNew')}</span>
                    <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-3 bg-white dark:bg-[#2a2a2a] dark:text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {t('createNew')}
                    </span>
                </a>
            )}
            
            <nav>
                <ul>
                    <li className="flex mb-[10px] mt-[10px]">
                        <a onClick={() => selectItem(0)} href="/home" className={`relative group w-full h-[45px] flex items-center rounded-lg transition-colors duration-300 cursor-pointer ${selecItem === 0 ? 'bg-[#E8DEF8] dark:bg-[#484848]' : 'hover:bg-[#E8DEF8] dark:hover:bg-[#484848]'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 min-w-[50px] dark:stroke-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        <span className={`dark:text-white ml-2 flex transition-all duration-500 whitespace-nowrap ${sidebarWidth === "80px" ? 'hidden' : 'inline'}`}>{t('sHome')}</span>
                        <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-3 bg-white dark:bg-[#2a2a2a] dark:text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {t('sHome')}
                        </span>
                        </a>
                    </li>
                    <li className="flex mb-[10px] mt-[10px]">
                        <a onClick={() => selectItem(1)} href={profileUrl} className={`relative group w-full h-[45px] flex items-center rounded-lg transition-colors duration-300 cursor-pointer ${selecItem === 1 ? 'bg-[#E8DEF8] dark:bg-[#484848]' : 'hover:bg-[#E8DEF8] dark:hover:bg-[#484848]'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 min-w-[50px] dark:stroke-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        <span className={`dark:text-white ml-2 flex transition-all duration-500 whitespace-nowrap ${sidebarWidth === "80px" ? 'hidden' : 'inline'}`}>{t('profile')}</span>
                        <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-3 bg-white dark:bg-[#2a2a2a] dark:text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {t('profile')}
                        </span>
                        </a>
                    </li>
                    <li className="flex mb-[10px] mt-[10px]">
                        <a onClick={() => selectItem(2)} href="/mapWithRoute" className={`relative group w-full h-[45px] flex items-center rounded-lg transition-colors duration-300 cursor-pointer ${selecItem === 2 ? 'bg-[#E8DEF8] dark:bg-[#484848]' : 'hover:bg-[#E8DEF8] dark:hover:bg-[#484848]'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 min-w-[50px] dark:stroke-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                        </svg>
                        <span className={`dark:text-white ml-2 flex transition-all duration-500 whitespace-nowrap ${sidebarWidth === "80px" ? 'hidden' : 'inline'}`}>{t('Places')}</span>
                        <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-3 bg-white dark:bg-[#2a2a2a] dark:text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {t('Places')}
                        </span>
                        </a>
                    </li>
                    <li className="flex mb-[10px] mt-[10px]">
                        <a onClick={() => selectItem(3)} href="/favorites" className={`relative group w-full h-[45px] flex items-center rounded-lg transition-colors duration-300 cursor-pointer ${selecItem === 3 ? 'bg-[#E8DEF8] dark:bg-[#484848]' : 'hover:bg-[#E8DEF8] dark:hover:bg-[#484848]'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 min-w-[50px] dark:stroke-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        <span className={`dark:text-white ml-2 flex transition-all duration-500 whitespace-nowrap ${sidebarWidth === "80px" ? 'hidden' : 'inline'}`}>{t('favorites')}</span>
                        <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-3 bg-white dark:bg-[#2a2a2a] dark:text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {t('favorites')}
                        </span>
                        </a>
                    </li>
                    
                </ul>
            </nav>

            <div className="w-full border-t-2 border-gray-200 my-4"></div>

            <div className="flex mb-[10px] mt-[10px]">
                <div className="relative group w-full h-[45px] flex items-center rounded-lg hover:bg-[#E8DEF8] dark:hover:bg-[#484848] transition-colors duration-300 cursor-pointer group" onClick={toggleDarkMode(1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 min-w-[50px] group-hover:stroke-white transition-colors duration-300 dark:stroke-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                    </svg>
                    <span className={`dark:text-white ml-2 flex transition-all duration-500 whitespace-nowrap group-hover:text-white ${ sidebarWidth === "80px" ? "hidden" : "inline" }`}>{t('darkMode')}</span>
                    <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-3 bg-white dark:bg-[#2a2a2a] dark:text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {t('darkMode')}
                    </span>
                </div>
            </div>

            <div className="flex mb-[10px] mt-[10px]">
                <LanguageDropdown />
            </div>

            <div onClick={handleLogout} className="flex mb-[10px] mt-[10px]">
                <div className="relative group w-full h-[45px] flex items-center rounded-lg hover:bg-[#E8DEF8] dark:hover:bg-[#484848] transition-colors duration-300 cursor-pointer group">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="w-6 h-6 text-gray-800 dark:text-white size-6 min-w-[50px] dark:stroke-white">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
                    </svg>
                    <span className={`dark:text-white ml-2 flex transition-all duration-500 whitespace-nowrap ${sidebarWidth === "80px" ? 'hidden' : 'inline'}`}>{t('logout')}</span>
                    <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-3 bg-white dark:bg-[#2a2a2a] dark:text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {t('logout')}
                    </span>
                </div>
            </div>

        </div>
    );
}

Sidebar.propTypes = {
    darkMode: propTypes.func
}

