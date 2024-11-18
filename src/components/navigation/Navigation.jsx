import "../../index.css";
import { useFetchMenubar } from  "../hooks/useFetchMenubar.js";
import { Sidebar } from "./Sidebar.jsx";
import { Menubar } from "./Menubar.jsx";
import propTypes from "prop-types";

export function Navigation() {

    const { isMobile } = useFetchMenubar();


    return(
        <div>
            {isMobile ? <Menubar /> : <Sidebar  />}
        </div>
    )

}

Navigation.propTypes = {
    darkMode: propTypes.func

}