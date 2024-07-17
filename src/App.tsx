import { MapPinIcon } from '@heroicons/react/16/solid';
import { useEffect, useState } from 'react';
import { WeatherData } from './data/interfaces';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          setError(`Geolocation not supported or permission denied.`);
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation not supported by this browser');
      setLoading(false);
    }
  }, []);

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
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    getWeatherData();
  }, [coords]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      className='min-h-screen bg-cover bg-center text-white'
      style={{ backgroundImage: `url('/app-background.jpg')` }}
    >
      <nav className=' flex h-6 w-[90vw] justify-between items-center mx-auto mb-8 pt-10'>
        <div className=' flex justify-center items-center  p-4'>
          <h1 className='text-center text-2xl font-bold p-4'>Weather Watch</h1>
          <MapPinIcon className=' w-6 h-6  text-yellow-500' />
          <h1 className=' text-xl  p-4 text-stone-300'>
            Weather in{' '}
            <span className=' font-bold text-white'>
              {' '}
              {data?.name}, {data?.sys.country}
            </span>
          </h1>
        </div>
        <form className='flex justify-center items-center '>
          <input
            type='text'
            placeholder='Enter city name'
            className='py-2 px-6 rounded-l-full'
          />
          <button
            type='submit'
            className='py-2 px-6 bg-yellow-500 text-black rounded-r-full'
          >
            Get Weather
          </button>
        </form>
      </nav>

      {data && (
        <div className=' max-w-[90vw] p-8 m-auto'>
          <p>Temperature: {data.main.temp}°C</p>
          <p>Feels Like: {data.main.feels_like}°C</p>
          <p>Humidity: {data.main.humidity}%</p>
          <p>Pressure: {data.main.pressure} hPa</p>
          <p>Wind Speed: {data.wind.speed} m/s</p>
          <p>Weather: {data.weather[0].description}</p>
          <p>
            Sunrise:
            {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
          </p>
          <p>Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  );
}

export default App;
