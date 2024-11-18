import { useEffect, useState } from "react";

export const useFetchSidebar = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [sidebarWidth, setSidebarWidth] = useState("80px");

    useEffect(() => {
        const logo = document.getElementById("logo");

        const handleClick = () => {
            if (isExpanded) {
                setSidebarWidth("250px");
            } else {
                setSidebarWidth("80px");
            }
            setIsExpanded(!isExpanded); 
        };

        if (logo) {
            logo.addEventListener("click", handleClick);
        }

        return () => {
            if (logo) {
                logo.removeEventListener("click", handleClick);
            }
        };
    }, [isExpanded]);

    return { sidebarWidth };
};
