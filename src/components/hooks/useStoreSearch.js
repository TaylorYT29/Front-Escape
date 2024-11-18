import { useState } from 'react';
import { useUser } from '../../context/UserContext';

export const useStoreSearch = () => {
    const [error, setError] = useState(null);
    const [isStored, setIsStored] = useState(false);
    const { user } = useUser();

    const storeSearchTerm = async (search_term) => {
        try {
            const body = {
                search_term
            };

            if (user?.user_type_id === 1) {
                body.company_id = user.id;
              } else if (user?.user_type_id === 2) {
                body.user_id = user.id;
              }

            const response = await fetch('http://localhost/escape-desarrollo-backend/public/api/search/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
                credentials: 'include',
            });
            const responseData = await response.json();
            console.log(responseData);
    
            if (response.ok) {
                setIsStored(true);
            } else {
                throw new Error('Failed to store search term');
            }
        } catch (err) {
            setError(err.message);
            console.error(err);
        }
    };

    return { storeSearchTerm, error, isStored };
};