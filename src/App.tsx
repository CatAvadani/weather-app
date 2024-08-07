import { MapPinIcon } from '@heroicons/react/16/solid';
import { useEffect, useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import SearchWeatherInput from './components/SearchWeatherInput';
import WeatherDetails from './components/WeatherDetails';
import { WeatherData } from './data/interfaces';
import { useWeatherData } from './hooks/useWeatherData';
import { currentDate } from './utils/currentDate';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const { data, forecastData, loading, error } = useWeatherData(coords, unit);
  const [searchLoading, setSearchLoading] = useState(false);

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
          console.error(
            `Geolocation not supported or permission denied. ${err}`
          );
        }
      );
    } else {
      console.error('Geolocation not supported by this browser');
    }
  }, []);

  const handleSearch = async (query: string) => {
    setSearchLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const resData: WeatherData = await response.json();
      setCoords({ lat: resData.coord.lat, lon: resData.coord.lon });
      setSearchLoading(false);
    } catch (err) {
      console.error((err as Error).message);
      setSearchLoading(false);
    }
  };

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
      <nav className='flex flex-col lg:flex-row h-6 w-[90vw] justify-between items-center mx-auto mb-40 lg:mb-20 pt-10'>
        <div className='flex  justify-center items-center p-4 gap-4'>
          <h1 className='text-center text-sm sm:text-2xl font-bold p-2'>
            Weather Watch
          </h1>
          <MapPinIcon className='w-6 h-6 text-yellow-500' />
          <h1 className='text-sm sm:text-xl p-2 text-stone-300'>
            Weather in{' '}
            <span className='sm:font-bold text-white'>
              {' '}
              {data?.name}, {data?.sys.country}
            </span>
          </h1>
          <div className='flex items-center'>
            <button
              className={`p-2  ${
                unit === 'metric' ? 'text-yellow-500' : ' text-stone-300'
              }`}
              onClick={() => setUnit('metric')}
            >
              °C
            </button>
            <span className='mx-2'>|</span>
            <button
              className={` p-2 ${
                unit === 'imperial' ? 'text-yellow-500' : ' text-stone-300'
              }`}
              onClick={() => setUnit('imperial')}
            >
              °F
            </button>
          </div>
        </div>

        <SearchWeatherInput onSearch={handleSearch} />
      </nav>

      {loading || searchLoading ? (
        <div className='flex justify-center items-center'>
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className='flex justify-center items-center'>
          <p>Error: {error}</p>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center p-8'>
          <h1 className='text-xl font-bold'>{currentDate}</h1>
          <div className='flex flex-col sm:flex-row items-center justify-center w-[90vw] lg:w-[80vw] gap-4 p-8 border-b-2 border-black border-opacity-20'>
            {data && <CurrentWeather data={data} unit={unit} />}
            {data && <WeatherDetails details={weatherDetails} />}
          </div>
          {forecastData && <Forecast forecast={forecastData} unit={unit} />}
        </div>
      )}
    </div>
  );
}

export default App;
