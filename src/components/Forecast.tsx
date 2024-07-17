const Forecast = ({ forecast }: { forecast: any[] }) => {
  return (
    <div className='grid grid-cols-7 gap-2 mt-8'>
      {forecast.map((day, index) => (
        <div
          key={index}
          className='flex flex-col items-center justify-evenly bg-black bg-opacity-20 rounded-lg p-4 shadow-lg'
        >
          <div className='text-xl font-bold'>{day.day}</div>
          <div className='text-lg'>{day.temperature}°C</div>
          <div className='text-sm'>{day.description}</div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
