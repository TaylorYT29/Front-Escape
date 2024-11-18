import "../../index.css";

export function RecommendedCard({ image, name, city }) {
    return (
        <div className="relative rounded-xl bg-cover bg-center p-4 h-80 flex flex-col justify-end" style={{ backgroundImage: `url(${image})` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-xl"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold lg:text-base text-sm">{name}</h3>
                <hr className="my-1 border-1 border-white" />
                <p className="text-white lg:text-base text-sm">{city}</p>
            </div>
        </div>
    )
}