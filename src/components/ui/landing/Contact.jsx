import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

export function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [formStatus, setFormStatus] = useState("");

    const { t } = useTranslation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus("¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.");
    };

    return (
        <div className="min-h-screen bg-white text-gray-800 py-16 px-8 lg:px-32">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-blue-600 mb-4">{t('ContactUs')}</h2>
                <p className="text-lg text-gray-700 mb-8">
                    {t('contactDes')}
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 mt-12">
                <section className="flex-1 bg-blue-50 p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold text-blue-700 mb-4">{t('sendMessage')}</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 mb-2">{t('iName')}</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">{t('iEmail')}</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">{t('message')}</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                rows="5"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            {t('send')}
                        </button>
                        {formStatus && <p className="text-green-500 mt-4">{formStatus}</p>}
                    </form>
                </section>

                <section className="flex-1 bg-blue-50 p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold text-blue-700 mb-4">{t('contactInfo')}</h3>
                    <p className="text-gray-700 mb-4">
                        {t('contactInfoDes')}
                    </p>
                    <ul className="space-y-4">
                        <li>
                            <span className="font-semibold text-gray-800">{t('iEmail')+ ":"}</span>
                            <a href="mailto:info@tudominio.com" className="text-blue-600 ml-2">escapeteamassociation@gmail.com</a>
                        </li>
                        <li>
                            <span className="font-semibold text-gray-800">{t('iPhone')+ ":"}</span>
                            <span className="ml-2 text-gray-700">+506 89852631</span>
                        </li>
                        <li>
                            <span className="font-semibold text-gray-800">{t('followUs')}</span>
                            <div className="flex space-x-4 mt-2">
                                <a href="#" className="text-blue-600 hover:text-blue-800">LinkedIn</a>
                                <a href="#" className="text-blue-600 hover:text-blue-800">Facebook</a>
                                <a href="#" className="text-blue-600 hover:text-blue-800">Twitter</a>
                                <a href="#" className="text-blue-600 hover:text-blue-800">Instagram</a>
                            </div>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
