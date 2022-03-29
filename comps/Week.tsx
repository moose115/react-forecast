import React, { useContext } from 'react';
import styled from 'styled-components';
import Context from '../utils/Context';
import WeatherCards from './WeatherCards';

const WeekContainer = styled.div<{ state: string }>`
  display: flex;
  align-items: center;
  flex-grow: 1;
  opacity: ${({ state }) => (state === 'entered' ? 1 : 0)};
  transition: 0.5s;
`;

type Props = {};

const Week = ({ state }: { state: string }) => {
  const { weather } = useContext(Context);
  return (
    <WeekContainer state={state}>
      <WeatherCards forecast={weather.daily.slice(0, 5)} />
    </WeekContainer>
  );
};

export default Week;
