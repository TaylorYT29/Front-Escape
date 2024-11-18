import "../../index.css";
import { useTranslation } from 'react-i18next';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

export function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const { t } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <>
            <Menu as="div" className="relative">
                <div>
                    <MenuButton className="flex justify-center items-center bg-none border-none text-white text-xl cursor-pointer">
                        {t('language')}
                    </MenuButton>
                </div>

                <MenuItems
                    transition
                    className="lg:absolute right-0 lg:right-[-2rem] mt-2 lg:mt-5 lg:bg-[#132443] lg:bg-opacity-10 lg:rounded-b-2xl rounded-lg lg:shadow-lg z-10 
                    transition data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 
                    data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                    <div >
                        <MenuItem> 
                            <button
                                className="block w-full text-left text-white text-base hover:bg-gray-200 hover:text-[#132443] py-2 lg:px-8 px-4"
                                onClick={() => changeLanguage('en')}
                            >
                                {t('English')}
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button
                                className="block w-full text-left text-white text-base hover:bg-gray-200 hover:text-[#132443] py-2 lg:px-8 px-4"
                                onClick={() => changeLanguage('es')}
                            >
                                {t('Spanish')}
                            </button>
                        </MenuItem>
                    </div>
                </MenuItems>
            </Menu>

        </>
    )
}