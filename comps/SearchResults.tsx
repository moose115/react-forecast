import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import City from '../types/city';

const ResultsContainer = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    padding: 0;
  }
`;

const CityButton = styled.a`
  padding: 0.5em 1em;
  display: block;
  background: none;
  border: none;
  color: #454545;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
`;

type Props = {
  cities: City[];
  close: Function;
};

const SearchResults = (props: Props) => {
  return (
    <ResultsContainer>
      {props.cities.map((city, i) => (
        <li key={i}>
          <Link
            href={`/?lat=${city.coord.lat}&lon=${city.coord.lon}&name=${city.name}`}
            passHref
          >
            <CityButton onClick={() => props.close()}>
              <h4>{city.name}</h4>
              <p>
                {city.state ? `${city.state}, ${city.country}` : city.country}
              </p>
            </CityButton>
          </Link>
        </li>
      ))}
    </ResultsContainer>
  );
};

export default SearchResults;
