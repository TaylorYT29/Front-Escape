import "../../../index.css";
import { CardCategoryLanding } from "../../cards/CardCategoryLanding";
import restaurant from '../../../assets/imgs/icon-restaurant.png';
import park from '../../../assets/imgs/icon-park.png';
import shops from '../../../assets/imgs/icon-shops.png';
import cafe from '../../../assets/imgs/icon-cafe.png';
import museum from '../../../assets/imgs/icon-museum.png';
import beach from '../../../assets/imgs/icon-beach.png';
import { LandingText } from "./LandingText";
import { useTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";


export function Categories() {
    const { t } = useTranslation();

    return (
        <div className="bg-blue-950 grid lg:p-12 p-8">
            <div className="grid gap-10 w-full grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]">
                
                <section className="justify-center content-center max-w-[380px] text-center mx-auto">
                    <LandingText title={t('categoriesTitle')} description={t('categoriesDescription')}/>
                    <NavLink className="text-white text-base font-bold inline-block p-[0.40rem_1.5rem] bg-sky-500 rounded-full text-center mt-4" to="/signUpUser">{t('categoriesBtn')}</NavLink>
                </section>

                <div className="grid gap-8 lg:gap-y-8 lg:gap-x-16 grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))]">
                    <CardCategoryLanding image={restaurant} title={t('restaurants')}/>
                    <CardCategoryLanding image={park} title={t('parks')}/>
                    <CardCategoryLanding image={shops} title={t('shops')}/>
                    <CardCategoryLanding image={cafe} title={t('cafes')}/>
                    <CardCategoryLanding image={beach} title={t('beaches')}/>
                    <CardCategoryLanding image={museum} title={t('museums')}/>
                </div> 
            </div>
        </div>
    )
}