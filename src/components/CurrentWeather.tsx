const CurrentWeather = ({ data }: { data: any }) => {
  return (
    <div className='flex flex-col items-end justify-center bg-black bg-opacity-10 rounded-l-full p-16 shadow-lg w-1/2 h-52'>
      <div className='text-5xl font-semibold'>
        {Math.round(data.main.temp)}°C
      </div>
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
