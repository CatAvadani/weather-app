import { WeatherData } from '../data/interfaces';

const CurrentWeather = ({ data }: { data: WeatherData }) => {
  const weatherIconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div className='flex flex-col items-end justify-center bg-black bg-opacity-10 rounded-l-full p-16 pr-8 shadow-lg w-1/2 h-52'>
      <div className='text-5xl font-semibold text-yellow-400'>
        {Math.round(data.main.temp)}°C
      </div>
      <img
        src={weatherIconUrl}
        alt={data.weather[0].description}
        className='w-10 h-10'
      />
      <div className='text-xl capitalize text-yellow-200'>
        {data.weather[0].description}
      </div>
      <div className='flex mt-4'>
        <div className='mr-4'>
          <p>
            Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
          </p>
          <p>Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
        <div>
          <p>RealFeel: {Math.round(data.main.feels_like)}°C</p>
          <p>Humidity: {data.main.humidity}%</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
