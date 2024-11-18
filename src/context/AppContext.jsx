import  { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();
const SidebarContext = createContext();

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : null;
  });

  const [selecItem, setSelecItem] = useState(() => {
    const savedItem = localStorage.getItem('navItem');
    return savedItem ? JSON.parse(savedItem) : 0;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);
  const toggleDarkMode = (id) => () =>{
    if (id != null) {
      setDarkMode(!darkMode);
      localStorage.setItem('darkMode', JSON.stringify(!darkMode));
    }
  };

  const selectItem = (id) => {
    setSelecItem(id);
    localStorage.setItem('navItem', JSON.stringify(id)); 
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <SidebarContext.Provider value={{ selecItem, selectItem }}>
        {children}
      </SidebarContext.Provider>
    </DarkModeContext.Provider>
  );
};

export const useDarkModeContext = () => useContext(DarkModeContext);
export const useSidebarContext = () => useContext(SidebarContext);
