import { useState , useEffect }  from "react";
 
export const useProfile = () => {
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const [modal, setModal] = useState(false);

    const openModal = () => {
        setModal(!modal);
      };

    
    
    useEffect(() => {
        const sidebarTimer = setTimeout(() => {
            setIsSidebarVisible(true);
        }, 100);
        const profileTimer = setTimeout(() => {
            setIsProfileVisible(true);
        }, 100);

        return () => {
            clearTimeout(sidebarTimer);
            clearTimeout(profileTimer);
        };
    }, []);

    return { modal, openModal , sidebarToggle ,isSidebarVisible, isProfileVisible,setIsProfileVisible,setIsSidebarVisible, setSidebarToggle};

    
}
