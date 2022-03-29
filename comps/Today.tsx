import React, { useContext } from 'react';
import styled from 'styled-components';
import Context from '../utils/Context';

const Degrees = styled.span`
  font-size: 8em;
`;

const Info = styled.div`
  display: flex;
  flex-flow: column;
`;

const CityName = styled.p`
  margin: 0;
  font-size: 3.5em;
`;

const Time = styled.p`
  margin: 0;
`;

const Figure = styled.figure`
  margin: 0;
`;

const ForecastIcon = styled.img``;

const CurrentCondition = styled.figcaption`
  margin-top: -1.5em;
  width: 100%;
  text-align: center;
`;

const TodayContainer = styled.div<{ state?: string }>`
  width: calc(100% - 6em);
  display: flex;
  align-items: center;
  opacity: ${({ state }) => (state === 'entered' ? 1 : 0)};
  position: absolute;
  bottom: 3em;
  transition: 0.5s;
`;

type Props = {
  state: string;
};

const Today = ({ state }: Props) => {
  const {
    weather: { current, timezone_offset },
    cityName,
  } = useContext(Context);

  if (!current) return null;

  const date = new Date((current.dt + timezone_offset) * 1000);

  return (
    <TodayContainer state={state}>
      <Degrees>{current && Math.round(current.temp)}&deg;</Degrees>
      <Info>
        <CityName>{cityName}</CityName>
        <Time>
          {date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC',
          }) +
            ' - ' +
            date.toLocaleDateString('en-US', {
              weekday: 'long',
              day: 'numeric',
              month: 'short',
              timeZone: 'UTC',
            }) +
            ` '` +
            (date.getFullYear() % 1000)}
        </Time>
      </Info>
      <Figure>
        <ForecastIcon
          src={`http://openweathermap.org/img/wn/${
            current && current.weather[0].icon
          }@2x.png`}
        />
        <CurrentCondition>
          {current && current.weather[0].main}
        </CurrentCondition>
      </Figure>
    </TodayContainer>
  );
};

export default Today;
