import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import ForecastDisplay from '../comps/ForecastDisplay';
import Sidebar from '../comps/Sidebar';
import backgrounds from '../data/backgrounds';
import Forecast from '../types/forecast';
import Context from '../utils/Context';

const Header = styled.header`
  padding: 0 3em 1em;
  grid-area: head;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));

  & h1 {
    margin-bottom: 0;
    font-size: 1.5em;
  }

  & p {
    margin: 0;
    color: #aaa;

    & a {
      color: #ccc;

      &:hover {
        color: #ddd;
      }
    }
  }
`;

const MainContentContainer = styled.div<{ backgroundUrl: string }>`
  height: 100%;
  display: grid;
  grid-template-areas:
    'head sidebar'
    'main sidebar';
  grid-template-columns: 4fr 2fr;
  grid-template-rows: auto 1fr;
  background: url(${({ backgroundUrl }) => backgroundUrl}) center;
  background-size: cover;
  background-repeat: no-repeat;
  overflow-x: hidden;

  @media (orientation: portrait) {
    grid-template-areas:
      'head'
      'main'
      'sidebar';
    grid-template-columns: auto;
    grid-template-rows: auto;
  }
`;

type Props = {
  forecast: Forecast;
  city: string;
};

const Home: NextPage<Props> = ({ forecast, city }: Props) => {
  const { setWeather, setCityName } = useContext(Context);

  useEffect(() => {
    setWeather(forecast);
    setCityName(city);
  });

  return (
    <MainContentContainer
      backgroundUrl={backgrounds[forecast.current.weather[0].icon]}
    >
      <Head>
        <title>Yet Another Weather App</title>
        <meta
          name="description"
          content="Another forecast app made to enrich my portfolio"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>
        <h1>Yet Another Weather App</h1>
        <p>
          Design by&nbsp;
          <a href="https://dribbble.com/shots/7118235-Weather-DailyUI-037">
            Arthur K
          </a>
        </p>
      </Header>
      <ForecastDisplay />
      <Sidebar />
    </MainContentContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const { lat, lon, units, name } = query;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat || 51.8}&lon=${
      lon || 0
    }&appid=${process.env.FORECAST_API_KEY}&units=${
      units || 'metric'
    }&exclude=minutely,hourly`
  );

  const forecast = await res.json();

  console.log(`${lat} ${lon}`);
  console.log(forecast);

  return {
    props: {
      forecast,
      city: name || 'London',
    },
  };
};

export default Home;
