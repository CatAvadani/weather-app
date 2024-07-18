import { DailyForecast } from '../data/interfaces';

interface ForecastProps {
  forecast: DailyForecast[];
  unit: 'metric' | 'imperial';
}

const Forecast = ({ forecast, unit }: ForecastProps) => {
  const temperatureUnit = unit === 'metric' ? '°C' : '°F';
  return (
    <div className='grid grid-cols-6 gap-4 mt-8'>
      {forecast.map((day, index) => {
        const date = new Date(day.date).toLocaleDateString(undefined, {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        });
        const iconUrl = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

        return (
          <div
            key={index}
            className='flex flex-col items-center bg-black bg-opacity-30 rounded-lg p-4 shadow-lg'
          >
            <div className='text-lg font-bold'>{date}</div>
            <img
              src={iconUrl}
              alt={day.weather[0].description}
              className='w-12 h-12'
            />
            <div className='text-md'>
              Min: {Math.round(day.minTemp)}
              {temperatureUnit}
            </div>
            <div className='text-md'>
              Max: {Math.round(day.maxTemp)}
              {temperatureUnit}
            </div>
            <div className='text-md capitalize mt-4 text-stone-400'>
              {day.weather[0].description}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Forecast;
