import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";

const API_KEY = "817b7fcd23804ddeb36154923250204";
const API_URL = "https://api.weatherapi.com/v1/current.json";

const cityDefault = ["Gliwice", "Hamburg", "Londyn", "Praga", "Paryż", "Rzym"];

const LikeCity = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem("favoriteCities");
    return stored ? JSON.parse(stored) : ["Gliwice", "Hamburg"];
  });

  const [newCity, setNewCity] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("favoriteCities", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setDarkMode(theme === "dark");
  }, []);

  const normalizeCityName = (city: string) => {
    const diacriticsMap: { [key: string]: string } = {
      ł: "l",
      Ł: "L",
      ą: "a",
      Ą: "A",
      ę: "e",
      Ę: "E",
      ś: "s",
      Ś: "S",
      ć: "c",
      Ć: "C",
      ń: "n",
      Ń: "N",
      ó: "o",
      Ó: "O",
      ż: "z",
      Ż: "Z",
      ź: "z",
      Ź: "Z",
    };

    return city
      .split("")
      .map((char) => diacriticsMap[char] || char)
      .join("");
  };

  const fetchCityValidation = async (city: string) => {
    try {
      const normalizedCity = normalizeCityName(city);
      await axios.get(API_URL, {
        params: { q: normalizedCity, key: API_KEY, lang: "pl" },
      });
      return true;
    } catch {
      return false;
    }
  };

  const capitalizeCity = (city: string) => {
    return city
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const addCity = async (city: string) => {
    const formattedCity = capitalizeCity(city.trim());
    if (!formattedCity) return;

    if (favorites.includes(formattedCity)) {
      setError("To miasto jest już na liście.");
      return;
    }

    const isValid = await fetchCityValidation(formattedCity);
    if (isValid) {
      setFavorites([...favorites, formattedCity]);
      setNewCity("");
      setError(null);
    } else {
      setError("Nie znaleziono takiego miasta.");
    }
  };

  const removeCity = (city: string) => {
    setFavorites(favorites.filter((c) => c !== city));
  };

  return (
    <div
      className={`flex flex-col items-center gap-6 p-6 transition-all ${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="cursor-pointer font-semibold hover:underline">
        <h1 className="text-3xl font-bold">Ulubione miasta</h1>
      </div>
      <ul className="flex flex-wrap gap-3">
        {favorites.map((city) => (
          <li
            key={city}
            className={`flex items-center gap-2 px-4 py-2 rounded shadow ${
              darkMode
                ? "bg-gray-700 text-gray-200"
                : "bg-indigo-100 text-indigo-800"
            }`}
          >
            <span
              className="cursor-pointer font-semibold hover:underline"
              onClick={() => navigate(`/weather/${city}`)}
            >
              {city}
            </span>
            <button
              className="text-red-500 font-bold text-xl"
              onClick={() => removeCity(city)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex gap-4">
        <input
          type="text"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          placeholder="Dodaj nowe miasto"
          className={`px-4 py-2 rounded shadow border ${
            darkMode ? "bg-gray-700 text-white" : "text-black"
          }`}
        />
        <button
          onClick={() => addCity(newCity)}
          className={`px-4 py-2 rounded shadow ${
            darkMode
              ? "bg-indigo-700 text-white hover:bg-indigo-800"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          Dodaj
        </button>
      </div>

      {error && <p className="text-red-500 font-semibold">{error}</p>}

      <h2 className="text-xl mt-4 font-semibold">Dostępne miasta</h2>
      <div className="flex flex-wrap gap-3">
        {cityDefault.map((city) => (
          <button
            key={city}
            onClick={() => addCity(city)}
            className={`px-4 py-2 rounded shadow hover:bg-gray-100 ${
              darkMode
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-white text-indigo-600"
            }`}
          >
            Dodaj {capitalizeCity(city)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LikeCity;
