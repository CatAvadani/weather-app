import { MapPinIcon } from '@heroicons/react/16/solid';
import { useEffect, useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import SearchWeatherInput from './components/SearchWeatherInput';
import WeatherDetails from './components/WeatherDetails';
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
          setError(`Geolocation not supported or permission denied.${err}`);
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

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`
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

  const forecastData = [
    {
      day: 'Friday',
      temperature: 22,
      description: 'Cloudy',
      icon: 'http://openweathermap.org/img/wn/04d@2x.png',
    },
    {
      day: 'Saturday',
      temperature: 25,
      description: 'Sunny',
      icon: 'http://openweathermap.org/img/wn/01d@2x.png',
    },
    {
      day: 'Sunday',
      temperature: 28,
      description: 'Partly Cloudy',
      icon: 'http://openweathermap.org/img/wn/03d@2x.png',
    },
    {
      day: 'Monday',
      temperature: 29,
      description: 'Rain',
      icon: 'http://openweathermap.org/img/wn/10d@2x.png',
    },
    {
      day: 'Tuesday',
      temperature: 27,
      description: 'Sunny',
      icon: 'http://openweathermap.org/img/wn/01d@2x.png',
    },
    {
      day: 'Wednesday',
      temperature: 26,
      description: 'Cloudy',
      icon: 'http://openweathermap.org/img/wn/04d@2x.png',
    },
    {
      day: 'Thursday',
      temperature: 24,
      description: 'Rain',
      icon: 'http://openweathermap.org/img/wn/10d@2x.png',
    },
  ];

  const weatherDetails = {
    windSpeed: data?.wind.speed,
    humidity: data?.main.humidity,
    pressure: data?.main.pressure,
    precipitation: 2,
  };

  return (
    <div
      className='min-h-screen bg-cover bg-center text-white'
      style={{ backgroundImage: `url('/app-background.jpg')` }}
    >
      <nav className='sm:flex h-6 w-[90vw] justify-between items-center mx-auto mb-52 sm:mb-8 pt-10'>
        <div className='flex justify-center items-center p-4'>
          <h1 className='text-center text-lg sm:text-2xl font-bold p-4'>
            Weather Watch
          </h1>
          <MapPinIcon className='w-6 h-6 text-yellow-500' />
          <h1 className='text-lg sm:text-xl p-4 text-stone-300'>
            Weather in{' '}
            <span className='sm:font-bold text-white'>
              {' '}
              {data?.name}, {data?.sys.country}
            </span>
          </h1>
        </div>
        <SearchWeatherInput onSearch={handleSearch} />
      </nav>

      {loading && (
        <div className='flex justify-center items-center'>
          <p>Loading...</p>
        </div>
      )}
      {error && (
        <div className='flex justify-center items-center'>
          <p>Error: {error}</p>
        </div>
      )}
      {!loading && !error && data && (
        <div className='flex flex-col items-center justify-center p-8'>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2 w-[90vw] sm:w-[80vw] p-8 border-b-2 border-black border-opacity-20'>
            {data && <CurrentWeather data={data} />}
            {data && <WeatherDetails details={weatherDetails} />}
          </div>
          <Forecast forecast={forecastData} />
        </div>
      )}
    </div>
  );
}

export default App;
