
import "../../index.css";
import { Button, Drawer } from "flowbite-react";
import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useTranslation } from 'react-i18next';
import { useUser } from "../../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { useDarkModeContext } from "../../context/AppContext.jsx";

export function DrawerMenu({position, positionX, positionY}) {
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);

    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    const { logout } = useUser();
    const navigate = useNavigate();
    const { toggleDarkMode } = useDarkModeContext();

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

    return (
        <>
            <div className={`${position} ${positionX} ${positionY}`}>
                <div onClick={() => setIsOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 dark:text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </div>
            </div>
            <Drawer open={isOpen} onClose={handleClose} position="bottom" className="dark:bg-[#2a2a2a]">
                <Drawer.Items as="div">
                    <div className="flex mb-[10px] mt-[10px]">
                        <div className="w-full h-[45px] flex items-center rounded-lg hover:bg-[#E8DEF8] dark:hover:bg-[#484848] transition-colors duration-300 cursor-pointer" onClick={toggleDarkMode(1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 min-w-[50px] group-hover:stroke-white transition-colors duration-300 dark:stroke-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>
                            <span className="dark:text-white ml-2 flex transition-all duration-500 whitespace-nowrap group-hover:text-white">{t('darkMode')}</span>
                        </div>
                    </div>

                    <div className="flex mb-[10px] mt-[10px]">
                        <div className="w-full h-auto flex flex-col items-center">
                            <Menu as="div" className="w-full">
                                <MenuButton className="w-full flex items-center h-[45px] rounded-lg hover:bg-[#E8DEF8] dark:hover:bg-[#484848] transition-colors duration-300 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-gray-800 dark:text-white min-w-[50px] dark:stroke-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                                    </svg>

                                    <span className="dark:text-white text-black ml-2 flex transition-all duration-500 whitespace-nowrap">{t('language')}</span>

                                </MenuButton>
                                <MenuItems className="w-full divide-y rounded-lgpx-2">
                                    <div className="py-1">
                                        <MenuItem as="div" className="hover:bg-[#E8DEF8] dark:hover:bg-[#484848] w-full flex items-center h-[35px] rounded-lg mb-1">
                                            <button className="w-full flex items-center" onClick={() => changeLanguage('en')}>
                                                <span className="text-gray-800 dark:text-white min-w-[50px] font-medium">EN</span>
                                                <span className="dark:text-white ml-2 flex transition-all duration-500 whitespace-nowrap">{t('English')}</span>
                                            </button>
                                        </MenuItem>

                                        <MenuItem as="div" className="hover:bg-[#E8DEF8] dark:hover:bg-[#484848] w-full flex items-center h-[35px] rounded-lg">
                                            <button className="w-full flex items-center" onClick={() => changeLanguage('es')}>
                                                <span className="text-gray-800 dark:text-white min-w-[50px] font-medium">ES</span>
                                                <span className="dark:text-white ml-2 flex transition-all duration-500 whitespace-nowrap">{t('Spanish')}</span>
                                            </button>
                                        </MenuItem>

                                    </div>
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>

                    <div onClick={handleLogout} className="flex mb-[10px] mt-[10px]">
                        <div className="w-full h-[45px] flex items-center rounded-lg hover:bg-[#E8DEF8] dark:hover:bg-[#484848] transition-colors duration-300 cursor-pointer">
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="w-6 h-6 text-gray-800 dark:text-white size-6 min-w-[50px] dark:stroke-white">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
                            </svg>
                            <span className="dark:text-white ml-2 flex transition-all duration-500 whitespace-nowrap">{t('logout')}</span>
                        </div>
                    </div>
                </Drawer.Items>
            </Drawer>
        </>
    );
}
