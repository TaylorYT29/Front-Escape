import propTypes from "prop-types";
import "../../index.css";
import start from "../../assets/imgs/start.svg";
import location from "../../assets/imgs/location.svg";

export function CardLocation({ image, name, city ,starts,setIsOpen,id}) {
    return (
       
        <div className="md:w-[303px]  lg:max-w-sm sm:w-full bg-white  rounded-lg shadow-sm dark:bg-[#404040] cursor-pointer " onClick={ () => setIsOpen(id)}>
                <img className="px-3 py-2 object-cover rounded-2xl w-full h-[15rem] " src={image} alt={name} />
            
            <div className="p-3">
                <div className="grid grid-cols-[auto_auto] items-center justify-between">
                    <h5 className="text-2xl font-semibold tracking-tight dark:text-white">{name}</h5>
                    <div className="flex items-center gap-1">
                        <img src={start} alt="start" />
                        <p className="text-[#9A9797] font-semibold text-base dark:text-[#BCBCBC]">{starts}</p>
                    </div>
                </div>  
                <div className="flex items-center gap-2 my-3">
                <img src={location} alt="location" />
                <p className="text-[#9A9797] font-semibold text-lg dark:text-[#BCBCBC]">{city}</p>
                </div>
                </div>
        </div>

    )
}

CardLocation.propTypes = {
    image: propTypes.string,
    name: propTypes.string,
    city: propTypes.string,
    starts: propTypes.string,
    setIsOpen: propTypes.func,
    id: propTypes.number
};
    
  