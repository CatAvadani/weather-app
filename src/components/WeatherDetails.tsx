const WeatherDetails = ({ details }: { details: any }) => {
  return (
    <div className='text-lg text-center mt-8 bg-black bg-opacity-20 rounded-lg p-4 shadow-lg'>
      <p>Wind speed: {details.windSpeed} m/s</p>
      <p>Air humidity: {details.humidity}%</p>
      <p>Pressure: {details.pressure} hPa</p>
      <p>Precipitation probability: {details.precipitation}%</p>
    </div>
  );
};

export default WeatherDetails;
