import "../../index.css";
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export function CategoryCard({ title = 'Sodas',id = 0 }) {
    return (
        <NavLink to="/Categories" state={id} >
            <div className="bg-white dark:bg-[#404040] p-4 rounded-xl">
            <h3 className="text-black dark:text-white dark:hover:text-sky-500 hover:text-sky-500 text-center font-semibold text-base">{title}</h3>
            </div>
        </NavLink>
    );
}

CategoryCard.propTypes = {
    title: PropTypes.string,
    id: PropTypes.number
};
