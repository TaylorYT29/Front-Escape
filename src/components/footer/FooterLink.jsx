import { NavLink } from "react-router-dom";
import "../../index.css";
import { Link } from "react-router-dom";


export function FooterLink({link, to}) {

    return (
        <Link to={to} className="text-white lg:text-lg text-base font-medium">
            {link}
        </Link>
    )
    
}