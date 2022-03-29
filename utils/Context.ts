import { createContext } from 'react';
import Forecast from '../types/forecast';

const Context = createContext<{
  weather: Forecast;
  cityName: string;
  setWeather: (forecast: Forecast) => void;
  setCityName: (name: string) => void;
}>({
  weather: {} as Forecast,
  cityName: '',
  setWeather: (forecast: Forecast) => {},
  setCityName: (name: string) => {},
});

export default Context;
