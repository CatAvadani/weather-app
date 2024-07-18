import { useEffect, useState } from 'react';
import { DailyForecast, WeatherData } from '../data/interfaces';
import { processForecastData } from '../utils/processData';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const useWeatherData = (coords: { lat: number; lon: number } | null) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<DailyForecast[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!coords) return;

    const getWeatherData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const resData: WeatherData = await response.json();
        setData(resData);

        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${API_KEY}`
        );
        if (!forecastResponse.ok) {
          const errorText = await forecastResponse.text();
          console.error(
            'Forecast API response:',
            forecastResponse.status,
            errorText
          );
          throw new Error('Failed to fetch forecast data');
        }

        const forecastData = await forecastResponse.json();
        setForecastData(processForecastData(forecastData.list));
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    getWeatherData();
  }, [coords]);

  return { data, forecastData, loading, error };
};
