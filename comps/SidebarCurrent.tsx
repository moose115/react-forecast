import React, { useContext } from 'react';
import styled from 'styled-components';
import DetailsTable from './DetailsTable';
import sample from '../data/sample';
import Context from '../utils/Context';

const degToDirection = (degrees: number) => {
  const segment = 360 / 16;
  switch (true) {
    case degrees > segment * 15 && degrees < segment:
      return 'N';
    case degrees > segment && degrees < segment * 3:
      return 'NE';
    case degrees > segment * 3 && degrees < segment * 5:
      return 'E';
    case degrees > segment * 5 && degrees < segment * 7:
      return 'SE';
    case degrees > segment * 7 && degrees < segment * 9:
      return 'S';
    case degrees > segment * 9 && degrees < segment * 11:
      return 'SW';
    case degrees > segment * 11 && degrees < segment * 13:
      return 'W';
    case degrees > segment * 13 && degrees < segment * 15:
      return 'NW';
    default:
      return 'N';
  }
};

const Title = styled.h2<{ first?: Boolean }>`
  padding: 0 0 0.2em;
  width: calc(100% - 4em);
  ${({ first }) => first && 'border-bottom: 1px solid #ccc;'}
  color: #eee;
  font-size: 1.2em;
`;

type Props = {};

const SidebarCurrent = (props: Props) => {
  const {
    weather: { current, timezone_offset },
  } = useContext(Context);

  if (!current) return null;

  const localOffset = new Date().getTimezoneOffset() * 60;
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
  };
  return (
    <div>
      <Title first>Current conditions</Title>
      <DetailsTable>
        <tbody>
          <tr>
            <th>Pressure</th>
            <td>{current.pressure}hPa</td>
          </tr>
          <tr>
            <th>Humidity</th>
            <td>{current.humidity}%</td>
          </tr>
          <tr>
            <th>Clouds</th>
            <td>{current.clouds}%</td>
          </tr>
        </tbody>
      </DetailsTable>
      <Title>Air</Title>
      <DetailsTable>
        <tbody>
          <tr>
            <th>Wind speed</th>
            <td>{current.wind_speed}</td>
          </tr>
          <tr>
            <th>Wind direction</th>
            <td>
              {current.wind_deg}&deg; ({degToDirection(current.wind_deg)})
            </td>
          </tr>
          {current?.wind_gust && (
            <tr>
              <th>Wind gust</th>
              <td>{current.wind_gust}</td>
            </tr>
          )}
        </tbody>
      </DetailsTable>
      <Title>Sun</Title>
      <DetailsTable>
        <tbody>
          <tr>
            <th>UV Index</th>
            <td>{current.uvi}</td>
          </tr>
          <tr>
            <th>Sunrise</th>
            <td>
              {new Date(
                (current.sunrise + localOffset + timezone_offset) * 1000
              ).toLocaleTimeString('en-US', timeOptions)}
            </td>
          </tr>
          <tr>
            <th>Sunset</th>
            <td>
              {new Date(
                (current.sunset + localOffset + timezone_offset) * 1000
              ).toLocaleTimeString('en-US', timeOptions)}
            </td>
          </tr>
        </tbody>
      </DetailsTable>
    </div>
  );
};

export default SidebarCurrent;
