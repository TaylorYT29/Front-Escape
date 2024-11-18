import "../../index.css";
import { Footer } from "../footer/Footer";
import { Categories } from "../ui/landing/Categories";
import { Recommended } from "../ui/landing/Recommended";
import { TravelRoute } from "../ui/landing/TravelRoute";
import { Find } from "../ui/landing/Find";
import { HeaderLanding as Header} from "../ui/landing/HeaderLanding";

export function Landing() {
    return (
        <>
        <Header/>
        <Find/>
        <Categories/>
        <Recommended/>
        <TravelRoute/>
        <Footer/>
        </>
    )
}