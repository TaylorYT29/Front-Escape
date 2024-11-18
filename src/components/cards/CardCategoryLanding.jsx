import "../../index.css";

export function CardCategoryLanding({ image, title }) {
    return (
        <div className="border-2 border-white p-4 rounded-xl">
                <img className="mx-auto w-[8rem] h-[6rem]" src={image} alt="icon" />
                <h3 className="text-white text-center font-semibold mt-4 text-base">{title}</h3>
        </div>
    )
}