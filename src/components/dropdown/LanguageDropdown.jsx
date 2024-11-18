import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useTranslation } from 'react-i18next';
import { useFetchSidebar } from '../hooks/useFetchSidebar.js';
export function LanguageDropdown() {
  const { t, i18n } = useTranslation();
  const { sidebarWidth } = useFetchSidebar();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="w-full h-auto flex flex-col items-center">
      <Menu as="div" className="w-full">
        <MenuButton className="w-full flex items-center h-[45px] relative group rounded-lg hover:bg-[#E8DEF8] dark:hover:bg-[#484848] transition-colors duration-300 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-gray-800 dark:text-white min-w-[50px] dark:stroke-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
          </svg>

          <span className={`dark:text-white ml-2 flex transition-all duration-500 whitespace-nowrap ${sidebarWidth === "80px" ? 'hidden' : 'inline'}`}>{t('language')}</span>

          <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-3 bg-white dark:bg-[#2a2a2a] dark:text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {t('language')}
          </span>
        </MenuButton>
        <MenuItems className={`w-full divide-y rounded-lg ${sidebarWidth === "80px" ? 'p-0' : 'px-2'}`}>
          <div className="py-1">
            <MenuItem as="div" className="relative group hover:bg-[#E8DEF8] dark:hover:bg-[#484848] w-full flex items-center h-[35px] rounded-lg mb-1">
              <button className="w-full flex items-center" onClick={() => changeLanguage('en')}>
                <span className="text-gray-800 dark:text-white min-w-[50px] font-medium">EN</span>
                <span className={`dark:text-white ml-2 flex transition-all duration-500 whitespace-nowrap ${sidebarWidth === "80px" ? 'hidden' : 'inline'}`}>{t('English')}</span>
              </button>
              <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-3 bg-white dark:bg-[#2a2a2a] dark:text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {t('English')}
              </span>
            </MenuItem>

            <MenuItem as="div" className="relative group hover:bg-[#E8DEF8] dark:hover:bg-[#484848] w-full flex items-center h-[35px] rounded-lg">
              <button className="w-full flex items-center" onClick={() => changeLanguage('es')}>
                <span className="text-gray-800 dark:text-white min-w-[50px] font-medium">ES</span>
                <span className={`dark:text-white ml-2 flex transition-all duration-500 whitespace-nowrap ${sidebarWidth === "80px" ? 'hidden' : 'inline'}`}>{t('Spanish')}</span>
              </button>
              <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-3 bg-white dark:bg-[#2a2a2a] dark:text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {t('Spanish')}
              </span>
            </MenuItem>

          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}