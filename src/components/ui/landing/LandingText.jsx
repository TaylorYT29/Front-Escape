import "../../../index.css";

export function LandingText({title, description, titleSize, hrSize, pFont}) {
    return (
        <>
            <h2 className={`text-center text-white lg:text-[2.5rem] text-3xl font-bold ${titleSize}`}>{title}</h2>
            <hr className={`w-1/2 mx-auto my-4 border-2 border-sky-500 ${hrSize}`}/>
            <p className={`text-white text-base text-center ${pFont}`}>{description}</p>
        </>
        )
}