import { useEffect, useState } from 'react';
import { WeatherData } from './data/interfaces';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const cityName = 'Gothenburg';
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const resData: WeatherData = await response.json();
        setData(resData);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    getWeatherData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className='text-center text-2xl font-bold p-4'>My Weather App</h1>
      {data && (
        <div className=' max-w-screen-lg p-8'>
          <h2 className=' text-xl font-bold mb-5'>
            Weather in {data.name}, {data.sys.country}
          </h2>
          <p>Temperature: {data.main.temp}°C</p>
          <p>Feels Like: {data.main.feels_like}°C</p>
          <p>Humidity: {data.main.humidity}%</p>
          <p>Pressure: {data.main.pressure} hPa</p>
          <p>Wind Speed: {data.wind.speed} m/s</p>
          <p>Weather: {data.weather[0].description}</p>
          <p>Sunrise: {data.sys.sunrise}</p>
        </div>
      )}
    </div>
  );
}

export default App;
