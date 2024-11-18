import "../../../index.css";
import logo from '../../../assets/imgs/logo-celeste.png';
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { LanguageSwitcher } from "../../dropdown/LanguageSwitcher";
import { useTranslation } from 'react-i18next';

export function HeaderLanding() {
    const { t } = useTranslation();
    const [isLanguageSwitcherActive, setIsLanguageSwitcherActive] = useState(false);
    const [isLoginMenuVisible, setIsLoginMenuVisible] = useState(false);
    const [isRegisterMenuVisible, setIsRegisterMenuVisible] = useState(false);
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLanguageSwitch = () => {
        setIsLanguageSwitcherActive(!isLanguageSwitcherActive);
        if (isLargeScreen && !isLanguageSwitcherActive) {
            setIsLoginMenuVisible(false); 
            setIsRegisterMenuVisible(false);
        }
    };

    const toggleLoginMenu = () => {
        setIsLoginMenuVisible(!isLoginMenuVisible);
        if (isLargeScreen && !isLoginMenuVisible) {
            setIsRegisterMenuVisible(false); 
            setIsLanguageSwitcherActive(false);
        }
    };

    const toggleRegisterMenu = () => {
        setIsRegisterMenuVisible(!isRegisterMenuVisible);
        if (isLargeScreen && !isRegisterMenuVisible) {
            setIsLoginMenuVisible(false); 
            setIsLanguageSwitcherActive(false);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuVisible(!isMobileMenuVisible);
    };

    return (
        <header className="bg-[url('./assets/imgs/escape.jpg')] bg-cover bg-center text-white">
            <div className="bg-[url('./assets/imgs/a.svg')] bg-cover p-8">
                <div className="flex justify-between bg-[#132443] bg-opacity-10 items-center px-8 py-3 rounded-full">
                    <img className="md:w-[7rem] w-[6rem]" src={logo} alt="Logo" />

                   
                    <button 
                        className="md:hidden block text-white focus:outline-none" 
                        onClick={toggleMobileMenu}
                    >
                        {isMobileMenuVisible ? <span className="text-white font-extrabold">X</span> : '☰'}
                    </button>

                    <div className="hidden md:flex md:gap-8 gap-4">
                        <div className="relative">
                            <span
                                className="text-white md:text-xl text-xs cursor-pointer"
                                onClick={toggleLoginMenu} 
                            >
                                {t('login')}
                            </span>
                            {isLoginMenuVisible && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-[#132443] bg-opacity-10 text-white rounded-lg shadow-lg">
                                    <NavLink
                                        to="/signIn"
                                        className="block px-4 py-2 hover:bg-gray-200 hover:text-[#132443]"
                                        onClick={() => setIsLoginMenuVisible(false)} 
                                    >
                                        {t('escapist')}
                                    </NavLink>
                                    <NavLink
                                        to="/signInCompanies"
                                        className="block px-4 py-2 hover:bg-gray-200 hover:text-[#132443]"
                                        onClick={() => setIsLoginMenuVisible(false)}
                                    >
                                        {t('company')}
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <span
                                className="text-white md:text-xl text-xs cursor-pointer"
                                onClick={toggleRegisterMenu} 
                            >
                                {t('signup')}
                            </span>
                            {isRegisterMenuVisible && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-[#132443] bg-opacity-10 text-white rounded-lg shadow-lg">
                                    <NavLink
                                        to="/signUpUser"
                                        className="block px-4 py-2 hover:bg-gray-200 hover:text-[#132443]"
                                        onClick={() => setIsRegisterMenuVisible(false)} 
                                    >
                                        {t('rEscapist')}
                                    </NavLink>
                                    <NavLink
                                        to="/signUpCompanies"
                                        className="block px-4 py-2 hover:bg-gray-200 hover:text-[#132443]"
                                        onClick={() => setIsRegisterMenuVisible(false)} 
                                    >
                                        {t('rCompany')}
                                    </NavLink>
                                </div>
                            )}
                        </div>
                        <div onClick={handleLanguageSwitch}>
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>

                {isMobileMenuVisible && (
                    <div className="md:hidden mt-4 bg-[#132443] bg-opacity-90 text-white rounded-lg p-4">
                        <div className="mb-4">
                            <span
                                className="block text-lg cursor-pointer"
                                onClick={toggleLoginMenu}
                            >
                                {t('login')}
                            </span>
                            {isLoginMenuVisible && (
                                <div>
                                    <NavLink
                                        to="/signIn"
                                        className="block px-4 py-2 mt-2 hover:bg-gray-200 hover:text-[#132443]"
                                        onClick={() => {
                                            setIsLoginMenuVisible(false);
                                            setIsMobileMenuVisible(false);
                                        }}
                                    >
                                        {t('escapist')}
                                    </NavLink>
                                    <NavLink
                                        to="/signInCompanies"
                                        className="block px-4 py-2 hover:bg-gray-200 hover:text-[#132443]"
                                        onClick={() => {
                                            setIsLoginMenuVisible(false);
                                            setIsMobileMenuVisible(false);
                                        }}
                                    >
                                        {t('company')}
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <span
                                className="block text-lg cursor-pointer"
                                onClick={toggleRegisterMenu}
                            >
                                {t('signup')}
                            </span>
                            {isRegisterMenuVisible && (
                                <div>
                                    <NavLink
                                        to="/signUpUser"
                                        className="block px-4 py-2 mt-2 hover:bg-gray-200 hover:text-[#132443]"
                                        onClick={() => {
                                            setIsRegisterMenuVisible(false);
                                            setIsMobileMenuVisible(false);
                                        }}
                                    >
                                        {t('rEscapist')}
                                    </NavLink>
                                    <NavLink
                                        to="/signUpCompanies"
                                        className="block px-4 py-2 hover:bg-gray-200 hover:text-[#132443]"
                                        onClick={() => {
                                            setIsRegisterMenuVisible(false);
                                            setIsMobileMenuVisible(false);
                                        }}
                                    >
                                        {t('rCompany')}
                                    </NavLink>
                                </div>
                            )}
                        </div>
                        <div onClick={handleLanguageSwitch}>
                            <LanguageSwitcher />
                        </div>
                    </div>
                )}

                <h1 className="text-5xl md:text-8xl font-bold lg:w-[18ch] mt-20 mb-16 md:mb-28">{t('headerTitle')}</h1>
                <h2 className="text-white md:text-7xl text-5xl font-bold md:m-20 mt-8 grid justify-end">
                    100+ <span className="md:text-3xl text-xl md:ml-4 ml-2 mb-8">{t('activities')}</span>
                </h2>
            </div>
        </header>
    );
}
