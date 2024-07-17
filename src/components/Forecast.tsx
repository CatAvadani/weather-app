const Forecast = ({ forecast }: { forecast: any[] }) => {
  return (
    <div className='flex justify-center gap-2 mt-16 w-auto'>
      {forecast.map((day) => (
        <div
          key={day.day}
          className='flex flex-col items-center bg-black bg-opacity-20 rounded-sm p-8 shadow-lg'
        >
          <div className='text-xl font-bold'>{day.day}</div>
          <div className='text-2xl'>{day.temperature}°C</div>
          <div className='text-lg'>{day.description}</div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
