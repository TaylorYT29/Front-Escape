// hooks/useFetchData.js
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { translateText } from './translateText';

const useFetchData = (url, fieldsToTranslate = []) => {
    const { i18n } = useTranslation();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Error: ${response.statusText}`);

                const result = await response.json();
                const translatedData = await Promise.all(
                    result.map(async (item) => {
                        const translatedItem = { ...item };
                        for (const field of fieldsToTranslate) {
                            if (item[field] && i18n.language !== 'es') {
                                const text = item[field];
                                const sourceLang = 'es';
                                const targetLang = i18n.language;

                                translatedItem[field] = await translateText(text, sourceLang, targetLang);
                            }
                        }
                        return translatedItem;
                    })
                );

                setData(translatedData);
            } catch (error) {
                setError(error);
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, i18n.language]); 

    return { data, loading, error, setData, setLoading };
};

export default useFetchData;
