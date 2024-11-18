import React from "react";
import { useTranslation } from 'react-i18next';

export function TermsAndConditions() {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen bg-white text-gray-800 py-16 px-8 lg:px-32">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold text-blue-600 mb-6 text-center">{t('termsConditions')}</h2>
                <p className="text-lg text-gray-700 mb-8 text-center">
                    {t('termDes')}
                </p>

                <section className="mb-10">
                    <h3 className="text-2xl font-semibold text-blue-700 mb-4">{t('term1')}</h3>
                    <p className="text-gray-600">
                        {t('term1Des')}
                    </p>
                </section>

                <section className="mb-10">
                    <h3 className="text-2xl font-semibold text-blue-700 mb-4">{t('term2')}</h3>
                    <p className="text-gray-600">
                        {t('term2Des')}
                    </p>
                </section>

                <section className="mb-10">
                    <h3 className="text-2xl font-semibold text-blue-700 mb-4">{t('term3')}</h3>
                    <p className="text-gray-600">
                        {t('term3Des')}
                    </p>
                </section>

                <section className="mb-10">
                    <h3 className="text-2xl font-semibold text-blue-700 mb-4">{t('term4')}</h3>
                    <p className="text-gray-600">
                        {t('term4Des')}
                    </p>
                </section>

                <section className="mb-10">
                    <h3 className="text-2xl font-semibold text-blue-700 mb-4">{t('term5')}</h3>
                    <p className="text-gray-600">
                        {t('term5Des')}
                    </p>
                </section>

                <section className="mb-10">
                    <h3 className="text-2xl font-semibold text-blue-700 mb-4">{t('term6')}</h3>
                    <p className="text-gray-600">
                        {t('term6Des')}
                    </p>
                </section>

                <div className="text-center mt-12">
                    <p className="text-gray-600">
                        {t('lastUpdated')} <span className="font-semibold">{t('date')}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
