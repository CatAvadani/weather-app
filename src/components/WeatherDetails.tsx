const WeatherDetails = ({ details }: { details: any }) => {
  return (
    <div className='flex flex-col items-left p-4 justify-center bg-black bg-opacity-10 rounded-r-full shadow-lg w-1/2 h-52 pl-8'>
      <h1 className=' font-bold mb-4'>Weather Details</h1>
      <p>Wind speed: {details.windSpeed} m/s</p>
      <p>Air humidity: {details.humidity}%</p>
      <p>Pressure: {details.pressure} hPa</p>
      <p>Precipitation probability: {details.precipitation}%</p>
    </div>
  );
};

export default WeatherDetails;
