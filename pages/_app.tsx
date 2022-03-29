import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Context from '../utils/Context';
import { useEffect, useState } from 'react';
import sample from '../data/sample';
import Forecast from '../types/forecast';

function MyApp({ Component, pageProps }: AppProps) {
  const [weather, setWeather] = useState({} as Forecast);
  const [cityName, setCityName] = useState('');

  return (
    <Context.Provider value={{ weather, cityName, setWeather, setCityName }}>
      <Component {...pageProps} />
    </Context.Provider>
  );
}

export default MyApp;
