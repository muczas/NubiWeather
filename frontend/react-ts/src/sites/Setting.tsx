import React, { useEffect, useState } from 'react';

const Setting = () => {
  // DARK MODE
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };


  

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen text-black dark:text-white transition-all">
      <h1 className="text-3xl font-bold mb-6">Ustawienia</h1>

      {/*Przełącznik trybu ciemny/jasny*/}
      <div className="mb-6 flex items-center">
        <span className="mr-3">Tryb:</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleTheme}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer dark:bg-gray-600 peer-checked:bg-blue-600 transition"></div>
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-full"></div>
        </label>
        <span className="ml-3 text-sm">
          {darkMode ? 'Ciemny' : 'Jasny'}
        </span>
    </div>
    </div>
  );
};

export default Setting;
