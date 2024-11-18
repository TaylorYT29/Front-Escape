import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { translateText } from './translateText';

export const useFetchSearch = (search_term) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const { i18n } = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost/escape-desarrollo-backend/public/api/companies/search?name=${search_term}`);
                const result = await response.json();
                
                const translatedData = await Promise.all(result.map(async (item) => {
                    if (i18n.language !== 'es') {
                        const translatedDescription = await translateText(item.description, 'es', i18n.language);
                        const translateCategory = await translateText(item.category_id, 'es', i18n.language);
                        const translateSubCategory = await translateText(item.sub_category_id, 'es', i18n.language);
                        return { ...item, description: translatedDescription, category_id: translateCategory, sub_category_id: translateSubCategory }; 
                    }
                    return item; 
                }));

                setData(translatedData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        };

        if (search_term) {
            fetchData();
        }
    }, [search_term, i18n.language]);

    return { data, loading, setData, setLoading };
};
