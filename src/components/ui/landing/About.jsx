import React from "react";
import "../../../index.css";
import { useTranslation } from 'react-i18next';

export function About() {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen bg-white text-gray-800 py-16 px-8 lg:px-32">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-blue-600 mb-4">{t('aboutTitle')}</h2>
                <p className="text-lg text-gray-700 mb-8">
                    {t('aboutDescription')}
                </p>
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-12 gap-8 mt-12">
                <section className="flex-1 bg-blue-50 p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold text-blue-700 mb-4">{t('mision')}</h3>
                    <p className="text-gray-600">
                        {t('misionDes')}
                    </p>
                </section>
                
                <section className="flex-1 bg-blue-50 p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold text-blue-700 mb-4">{t('vision')}</h3>
                    <p className="text-gray-600">
                        {t('visionDes')}
                    </p>
                </section>
            </div>

            <div className="mt-16 text-center">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">{t('HowItWorks')}</h3>
                <p className="text-gray-700 max-w-3xl mx-auto">
                    {t('HIWdescription')}
                </p>
            </div>
        </div>
    );
}
