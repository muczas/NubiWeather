import React from 'react';
import { Link } from 'react-router-dom';
import nubisoftLogo from './assets/nubisoft.svg';

const Nav = () => {
  return (
    <nav className="flex justify-between items-center flex-wrap p-4 bg-gray-200 dark:text-whitebg-gray-800 dark:text-white bg-gray-800">
      
      {/* Lewa strona – logo */}
      <div className="flex items-center gap-2">
        <a href="https://nubisoft.io/" target="_blank" rel="noreferrer" className="flex items-center text-white dark:text-white no-underline">
          <img src={nubisoftLogo} alt="Nubisoft logo" style={{ height: '40px' }} />
          <span className="font-bold text-xl ml-2">NubiWeather</span>
        </a>
      </div>

      {/* Prawa strona – linki */}
      <div className="flex gap-4 flex-wrap justify-end">
        <Link
          to="/"
          className="text-black dark:text-white bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded transition-colors duration-300"
        >
          Strona Główna
        </Link>
        <Link
          to="/Weather"
          className="text-black dark:text-white bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded transition-colors duration-300"
        >
          Pogoda
        </Link>
        <Link
          to="/favorites"
          className="text-black dark:text-white bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded transition-colors duration-300"
        >
          Ulubione
        </Link>
        <Link
          to="/settings"
          className="text-black dark:text-white bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded transition-colors duration-300"
        >
          Ustawienia
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
