import React, { ChangeEventHandler, useRef, useState } from 'react';
import styled from 'styled-components';
import { Search } from '@styled-icons/evaicons-solid/Search';
import { Close } from '@styled-icons/evaicons-solid/Close';
import City from '../types/city';
import Loading from './Loading';
import SearchResults from './SearchResults';

type Props = {};

const SearchContainer = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  left: ${({ open }) => (open ? 0 : 'calc(100% - 5em)')};
  transition: 0.3s;
`;

const InputContainer = styled.div`
  display: flex;
`;

const Input = styled.input`
  padding: 0;
  width: calc(100% - 2.5em);
  height: 2.5em;
  background: #eee;
  border: none;
  border-bottom: 1px solid currentColor;
  color: #454545;
  font-size: 2em;
  transition: 0.3s;

  &:focus {
    padding: 0.2em;
  }

  &::placeholder {
    color: inherit;
  }
`;

const SearchButton = styled.button`
  padding: 0;
  width: 5em;
  height: 5em;
  border: none;
  background: orange;
  font-size: inherit;
  cursor: pointer;
  z-index: 1;
`;

const ResultsBox = styled.div<{ areResults: boolean }>`
  height: ${({ areResults }) => (areResults ? 'calc(100vh - 5em)' : 0)};
  background-color: #eee;
  overflow-y: scroll;
`;

const SidebarSearch = (props: Props) => {
  const input = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [locationList, setLocationList] = useState<City[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCities = async () => {
    const res = await fetch(`/api/find?city=${query}`);
    const locations = await res.json();
    setLocationList(locations.length > 0 ? locations : null);
    setLoading(false);
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.target.value);
    setLoading(true);
    setLocationList(null);
    if (query.length > 3) fetchCities();
  };

  const handleClose = () => {
    setLocationList(null);
    setIsOpen(false);
  };

  return (
    <SearchContainer open={isOpen}>
      <InputContainer>
        <SearchButton
          onClick={() => {
            if (isOpen) setLoading(false);
            setIsOpen(!isOpen);
            setLocationList(null);
          }}
        >
          {isOpen ? (
            <Close size={32} color="#454545" />
          ) : (
            <Search size={32} color="#454545" />
          )}
        </SearchButton>
        <Input
          ref={input}
          type={'text'}
          placeholder="Search city..."
          value={query}
          onChange={onChange}
          onBlur={() => {
            setTimeout(() => setQuery(''), 300);
          }}
        />
      </InputContainer>
      <ResultsBox areResults={!!locationList}>
        {loading && <Loading />}
        {!loading && locationList && (
          <SearchResults close={handleClose} cities={locationList} />
        )}
      </ResultsBox>
    </SearchContainer>
  );
};

export default SidebarSearch;
