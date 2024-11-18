import "../../index.css";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function PostDropdown({ postId, onDelete }) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 dark:text-white cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-[#404040] shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">
                    <MenuItem onClick={() => {
                        console.log(postId);
                        navigate(`/update-post/${postId}`);
                    }}>
                        <span className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-200 hover:dark:bg-[#5a5a5a]">
                           {t('Edit')}
                        </span>
                    </MenuItem>
                    <MenuItem onClick={() => onDelete(postId)}>
                        <span className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-200 hover:dark:bg-[#5a5a5a]">
                            {t('Delete')}
                        </span>
                    </MenuItem>

                </div>
            </MenuItems>
        </Menu>
    );
}