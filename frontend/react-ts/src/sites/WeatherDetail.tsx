import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

const API_KEY = "817b7fcd23804ddeb36154923250204";
const API_URL = "https://api.weatherapi.com/v1/forecast.json";

interface ForecastDay {
  date: string;
  day: {
    avgtemp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

const WeatherDetail = () => {
  const { city } = useParams<{ city: string }>();
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const normalizeCityName = (city: string | undefined): string => {
    if (!city) return "";
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

  useEffect(() => {
    const fetchForecast = async () => {
      if (!city) {
        setError("Nie podano miasta.");
        setLoading(false);
        return;
      }

      try {
        const normalizedCity = normalizeCityName(city);
        const response = await axios.get(API_URL, {
          params: {
            key: API_KEY,
            q: normalizedCity,
            days: 5,
            lang: "pl",
          },
        });

        setForecast(response.data.forecast.forecastday);
        setError(null);
      } catch {
        setError("Nie udało się pobrać prognozy pogody. Sprawdź nazwę miasta.");
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  if (loading) return <p className="p-8 text-white">Ładowanie prognozy...</p>;
  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="p-8 text-red-500 font-semibold">{error}</p>
        <button
          onClick={() => navigate("/weather")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Powrót
        </button>
      </div>
    );

  return (
    <div
      className={`min-h-screen py-8 transition-all ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-gray-100 to-gray-200 text-black"
      }`}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">
          Prognoza pogody dla {city}
        </h1>
        <button
          onClick={() => navigate("/weather")}
          className="mb-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          ← Powrót
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {forecast.map((day) => (
            <div
              key={day.date}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg flex flex-col items-center"
            >
              <h2 className="text-xl font-semibold mb-2">{day.date}</h2>
              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
                className="w-16 h-16"
              />
              <p className="mt-2">{day.day.condition.text}</p>
              <p className="text-lg font-bold mt-1">{day.day.avgtemp_c}°C</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDetail;
