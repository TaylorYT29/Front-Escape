import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';

export const useFetchSearchHistory = () => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const fetchSearchHistory = async () => {
    setLoading(true);

    const userId = user?.user_type_id === 2 ? user.id : null;
    const companyId = user?.user_type_id === 1 ? user.id : null;

    const url = new URL('http://localhost/escape-desarrollo-backend/public/api/searches/recent');
    if (userId) url.searchParams.append('user_id', userId);
    if (companyId) url.searchParams.append('company_id', companyId);
    
    try {
      const response = await fetch(url,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setRecentSearches(data);
      } else {
        console.error('Error fetching search history');
      }
    } catch (error) {
      console.error('Error fetching search history:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteSearch = async (searchId) => {
    try {
      const response = await fetch(`http://localhost/escape-desarrollo-backend/public/api/search/destroy/${searchId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedSearches = recentSearches.filter(search => search.id !== searchId);
        setRecentSearches(updatedSearches);
      } else {
        console.error('Error eliminando búsqueda');
      }
    } catch (error) {
      console.error('Error eliminando búsqueda:', error);
    }
  };

  useEffect(() => {
    fetchSearchHistory();
  }, []);

  return { recentSearches, loading, handleDeleteSearch, fetchSearchHistory };
};
