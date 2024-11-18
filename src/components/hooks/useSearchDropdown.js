import { useState, useEffect, useRef } from 'react';

export const useSearchDropdown = (backendRecentSearches, storeSearchTerm, navigate, isMobileSearchVisible, toggleMobileSearch) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Referencia para el contenedor principal
  const searchRef = useRef(null);

  // Manejar cambios en el campo de entrada
  const handleInputChange = async (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value === '') {
      setSuggestions([]);
      setShowRecentSearches(true);
    } else {
      try {
        const response = await fetch(`http://localhost/escape-desarrollo-backend/public/api/companies/suggestions?query=${value}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setSuggestions(data);
        setShowRecentSearches(false);
      } catch (error) {
        console.error('Error fetching company suggestions:', error);
      }
    }
  };

  // Manejar la selección de una sugerencia
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    setShowRecentSearches(false);
    storeSearchTerm(suggestion);
    navigate(`/search-results?name=${suggestion}`);
    setQuery('');
    if (isMobileSearchVisible) {
      toggleMobileSearch();
    }
  }

  // Mostrar búsquedas recientes al enfocar el input
  const handleFocus = () => {
    setShowRecentSearches(true);
    setIsInputFocused(true);
  };

  // Manejar el desenfoque del campo de entrada
  const handleBlur = () => {
    setTimeout(() => {
      if (!isInputFocused) {
        setShowRecentSearches(false);
        setSuggestions([]);
      }
    }, 100);
  };

  // Botón de devolverse, restablece el estado original del componente. 
  const handleBackButtonClick = () => {
    setIsInputFocused(false);
    setShowRecentSearches(false);
    setSuggestions([]);
    setQuery('');
  };

  // Manejar clics fuera del componente para restablecer el estado original del componente
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsInputFocused(false);
        setShowRecentSearches(false);
        setSuggestions([]);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return {
    query, suggestions, backendRecentSearches, showRecentSearches, isInputFocused, searchRef,
    handleInputChange, handleSuggestionClick, handleFocus, handleBlur, handleBackButtonClick,
  };
};