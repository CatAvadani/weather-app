const CurrentWeather = ({ data }: { data: any }) => {
  return (
    <div className='flex flex-col items-center bg-black bg-opacity-20 rounded-lg p-8 shadow-lg'>
      <div className='text-6xl font-bold'>{Math.round(data.main.temp)}°C</div>
      <div className='text-xl'>{data.weather[0].description}</div>
      <div className='flex mt-4'>
        <div className='mr-4'>
          <p>
            Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
          </p>
          <p>Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
        <div>
          <p>Feels like: {Math.round(data.main.feels_like)}°C</p>
          <p>Humidity: {data.main.humidity}%</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
