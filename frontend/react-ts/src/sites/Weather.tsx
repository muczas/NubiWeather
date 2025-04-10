import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import WeatherImages, { WeatherCodeMap } from "./BackGround/WeatherImages";

const API_KEY = "817b7fcd23804ddeb36154923250204";
const API_URL = "https://api.weatherapi.com/v1/current.json";

function sanitizeCityName(city: string): string {
  const polishMap: Record<string, string> = {
    ą: "a", ć: "c", ę: "e", ł: "l", ń: "n", ó: "o", ś: "s", ź: "z", ż: "z",
    Ą: "A", Ć: "C", Ę: "E", Ł: "L", Ń: "N", Ó: "O", Ś: "S", Ź: "Z", Ż: "Z",
  };

  const replaced = city
    .split("")
    .map((char) => polishMap[char] || char)
    .join("");

  return replaced.charAt(0).toUpperCase() + replaced.slice(1).toLowerCase();
}

export default function Weather() {
  const [cities, setCities] = useState<string[]>([]);
  const [weatherData, setWeatherData] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [backgrounds, setBackgrounds] = useState<{ [key: string]: string }>({});
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("favoriteCities");
    if (stored) {
      const parsed: string[] = JSON.parse(stored);
      setCities(parsed);
      parsed.forEach((city) => {
        const sanitized = sanitizeCityName(city);
        fetchWeather(sanitized);
      });
    }

    // Sync theme with local storage
    const theme = localStorage.getItem("theme");
    setDarkMode(theme === "dark");
  }, []);

  const fetchWeather = async (city: string) => {
    try {
      const response = await axios.get(API_URL, {
        params: { q: city, key: API_KEY, lang: "pl" },
      });

      const code = response.data.current.condition.code;
      const imageKey = WeatherCodeMap[code] || "Default";

      setWeatherData((prev) => ({ ...prev, [city]: response.data }));
      setBackgrounds((prev) => ({
        ...prev,
        [city]: WeatherImages[imageKey] || WeatherImages["Default"],
      }));
      setErrors((prev) => ({ ...prev, [city]: null }));
    } catch {
      setErrors((prev) => ({ ...prev, [city]: "Nie udało się pobrać danych." }));
    }
  };

  return (
    <div
      className={`min-h-screen py-8 transition-all ${
        darkMode
          ? "bg-gray-700 text-white"
          : "bg-gradient-to-r from-gray-500 to-gray-400 text-black"
      }`}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Pogoda w ulubionych miastach</h1>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {cities.map((originalCity) => {
            const sanitized = sanitizeCityName(originalCity);
            const data = weatherData[sanitized];
            const error = errors[sanitized];
            const bg = backgrounds[sanitized] || "";

            return (
              <div
                key={originalCity}
                onClick={() => navigate(`/weather/${originalCity}/detail`)}
                className="aspect-square rounded-2xl overflow-hidden shadow-lg bg-contain bg-no-repeat bg-center relative cursor-pointer"
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundColor: darkMode ? "#2c2c2c" : "#1c1c1c",
                }}
              >
                <div
                  className={`absolute inset-0 p-4 flex flex-col justify-center items-center rounded-2xl ${
                    darkMode ? "bg-gray-700/80 text-white" : "bg-white/80 text-black"
                  }`}
                >
                  <h2 className="text-xl font-bold mb-2">{originalCity}</h2>
                  {error && <p className="text-red-600">{error}</p>}
                  {data ? (
                    <>
                      <p>{data.current.condition.text}</p>
                      <p>Temperatura: {data.current.temp_c}°C</p>
                    </>
                  ) : (
                    !error && <p>Ładowanie...</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
