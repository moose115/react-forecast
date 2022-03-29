import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import Forecast, { Daily } from '../types/forecast';

const CardContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  flex-wrap: wrap;
`;

const CardDegrees = styled.p`
  margin: 0;
  font-size: 3em;
`;

const CardDescription = styled.p`
  font-size: 2em;
`;

type Props = { daily: Daily };

const WeatherCard = ({ daily }: Props) => {
  return (
    <CardContainer>
      <h3>
        {new Date(
          daily.dt * 1000 + new Date().getTimezoneOffset() * 60000
        ).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
        })}
      </h3>
      <Image
        src={`http://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`}
        alt={daily.weather[0].main}
        width="80px"
        height="80px"
      />
      <CardDegrees>{Math.round(daily.temp.max)}&deg;</CardDegrees>
      <CardDescription>{daily.weather[0].main}</CardDescription>
    </CardContainer>
  );
};

export default WeatherCard;
