export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
}

export interface Sys {
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherData {
  weather: Weather[];
  main: Main;
  wind: Wind;
  sys: Sys;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
}

export interface ForecastData {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: {
    all: number;
  };
  wind: Wind;
  visibility: number;
  pop: number; // Probability of precipitation
  rain?: {
    '3h': number;
  };
  snow?: {
    '3h': number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface DailyForecast {
  date: string;
  minTemp: number;
  maxTemp: number;
  weather: Weather[];
}

export interface WeatherDetailsProps {
  windSpeed: number | undefined;
  humidity: number | undefined;
  pressure: number | undefined;
  precipitation: number | undefined;
}
