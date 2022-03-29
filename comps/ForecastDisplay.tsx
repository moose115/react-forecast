import React, { useState } from 'react';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';
import sample from '../data/sample';
import Today from './Today';
import WeatherCards from './WeatherCards';
import Week from './Week';

const DisplayContainer = styled.main`
  padding: 0 3em 3em;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  grid-area: main;
  position: relative;

  @media (orientation: portrait) {
    height: 75vh;
  }
`;

const ButtonsContainer = styled.div``;

type ButtonProps = {
  active: boolean;
};
const PeriodButton = styled.button<ButtonProps>`
  margin-right: 1em;
  padding: 0.25em 0.75em;
  background-color: ${({ active }) => (active ? '#46518f' : 'transparent')};
  border: 2px solid ${({ active }) => (active ? '#46518f' : '#eee')};
  border-radius: 10em;
  color: #eee;
  font-size: 1.25em;
  transition: 0.3s ease-out;
  cursor: pointer;

  &:hover {
    background-color: #46518f;
    border-color: #46518f;
  }
`;

type Props = {};

const ForecastDisplay = (props: Props) => {
  const [view, setView] = useState('today');

  return (
    <DisplayContainer>
      <ButtonsContainer>
        <PeriodButton
          active={view === 'today'}
          onClick={() => setView('today')}
        >
          Today
        </PeriodButton>
        <PeriodButton active={view === 'week'} onClick={() => setView('week')}>
          5 days
        </PeriodButton>
      </ButtonsContainer>
      <Transition
        in={view === 'today'}
        timeout={500}
        unmountOnExit
        mountOnEnter
      >
        {(state) => <Today state={state} />}
      </Transition>
      <Transition in={view === 'week'} timeout={500} unmountOnExit mountOnEnter>
        {(state) => <Week state={state} />}
      </Transition>
    </DisplayContainer>
  );
};

export default ForecastDisplay;
