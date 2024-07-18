import { DailyForecast, ForecastData } from '../data/interfaces';

export const processForecastData = (data: ForecastData[]): DailyForecast[] => {
  const dailyData: { [date: string]: DailyForecast } = {};

  data.forEach((entry) => {
    const date = new Date(entry.dt * 1000).toISOString().split('T')[0];
    if (!dailyData[date]) {
      dailyData[date] = {
        date,
        minTemp: entry.main.temp_min,
        maxTemp: entry.main.temp_max,
        weather: entry.weather,
      };
    } else {
      dailyData[date].minTemp = Math.min(
        dailyData[date].minTemp,
        entry.main.temp_min
      );
      dailyData[date].maxTemp = Math.max(
        dailyData[date].maxTemp,
        entry.main.temp_max
      );
    }
  });

  return Object.values(dailyData);
};
