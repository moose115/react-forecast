import React, { ReactChildren } from 'react';
import styled from 'styled-components';
import { Daily } from '../types/forecast';
import WeatherCard from './WeatherCard';

const CardsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

type Props = {
  forecast: Daily[];
};

const WeatherCards = ({ forecast }: Props) => {
  return (
    <CardsContainer>
      {forecast.map((daily, i) => (
        <WeatherCard key={i} daily={daily} />
      ))}
    </CardsContainer>
  );
};

export default WeatherCards;
