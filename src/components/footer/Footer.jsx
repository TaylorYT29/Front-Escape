import "../../index.css";
import { FooterLink } from "./FooterLink";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function Footer(){
    const { t } = useTranslation();
    return(
        <footer className="bg-black w-full grid lg:p-12 p-8 pt-5">
            <div className="grid gap-10 w-full grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] text-white">
                <section className="max-w-[250px] text-justify">
                    <img className="w-1/2" src="../src/assets/imgs/logo-celeste.png" alt="Logo" />
                    <p className="text-white text-base mt-8">{t('footerEslogan')}</p>
                </section>

                <div className="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(75px,_1fr))] lg:text-right text-center mt-2">
                    <FooterLink link={t('about')} to="/about"/>
                    <FooterLink link={t('contact')} to="/contact"/>
                    <FooterLink link={t('terms')} to="/terms"/>
                </div>
            </div>

            



                
        </footer>
    )
}