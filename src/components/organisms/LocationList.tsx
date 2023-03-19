import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";

import styled, { css } from "styled-components";
import { lighten } from 'polished';

import BaseButton from "../atoms/BaseButton";

import useDebounce from "../../hooks/useDebounce";

import { ISearchResult } from "../../types/types";

const LocationItems = styled.ul`
  ${({ theme }) => {
    const { palette, borderRadius } = theme;
    return css`
      display: flex;
      flex-flow: column nowrap;
    
      border: 1px solid ${palette.black};
      border-radius: ${borderRadius};
    `;
  }}
`;

const LocationItem = styled.li`
  ${({ theme }) => {
    const { palette } = theme;
    return css`
      display: flex;
      flex-flow: row nowrap;

      line-height: 30px;

      padding: 0.5rem 0.7rem;
    
      border-bottom: 1px dashed ${palette.black};

      &:last-child {
        border-bottom: none;
      }
    `;
  }}
`;

const LocationName = styled.h5`
  ${({ theme }) => {
    const { palette } = theme;
    return css`
      width: 100px;

      text-align: center;

      padding: 0 0.7rem 0 0;

      border-right: 1px solid ${palette.gray};
    `;
  }}
`;

const Location = styled.p`
  ${({ theme }) => {
    const { palette } = theme;
    return css`
      flex: 1;

      padding: 0 1rem;
    `;
  }}
`;

const LocationForm = styled.form`
  ${({ theme }) => {
    const { palette } = theme;
    return css`
      display: flex;
      flex-flow: row nowrap;

      line-height: 30px;

      padding: 0.5rem 0.7rem;
    
      border-bottom: 1px dashed ${palette.black};

      &:last-child {
        border-bottom: none;
      }
    `;
  }}
`;

const LocationNameInput = styled.input`
  ${({ theme }) => {
    const { palette } = theme;
    return css`
      width: 100px;

      text-align: center;

      line-height: 30px;

      padding: 0 0.7rem 0 0;

      border: none;
      border-right: 1px solid ${palette.gray};
      outline: none;
    `;
  }}
`;

const LocationSearch = styled.input`
  flex: 1;

  line-height: 30px;

  padding: 0 1rem;

  border: none;
  outline: none;
`;

const SearchResults = styled.ul`
  display: flex;
  flex-flow: column nowrap;

  margin: 0.5rem 0 0 calc(100px + 0.7rem);
  padding: 0 0.5rem;
`;

const SearchResult = styled.li`
  ${({ theme }) => {
    const { palette, borderRadius } = theme;
    return css`
      line-height: 30px;
    
      padding: 0.5rem 0.5rem;

      border-radius: ${borderRadius};
    
      &:hover {
        background-color: ${lighten(0.4, palette.red)};
      }
    `
  }} 
`;

type location = {
  name: string,
  address: string,
};

interface ILocationList {
  locations: location[];
  searchResult: ISearchResult[];
  selectedResult: ISearchResult | null;
  handleSumbit: (name: string, address: string) => void;
  handleSearch: (value: string) => void;
  handleSearchSelect: (value: ISearchResult) => void;
}

const LocationList: FC<ILocationList> = ({ locations, searchResult, selectedResult, handleSumbit, handleSearch, handleSearchSelect }) => {
  const [name, setName] = useState('');
  const [keyword, setKeyword] = useState('');

  const debouncedKeyword = useDebounce(keyword, 1000);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSumbit(name, keyword);
    setName('');
    setKeyword('');
  }

  const onInputName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  };

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setKeyword(value);
  };

  useEffect(() => {
    handleSearch(debouncedKeyword);
  }, [debouncedKeyword]);

  useEffect(() => {
    if (!selectedResult) {
      setKeyword('');
      return;
    }
    setKeyword(selectedResult.address);
  }, [selectedResult])

  return (
    <>
      <LocationItems>
        {
          locations.map((location) => (
            <LocationItem>
              <LocationName className='text-limit'>{ location.name }</LocationName>
              <Location>{ location.address } </Location>
            </LocationItem>
          ))
        }
        {
          (locations.length < 3) && (
            <LocationForm onSubmit={onSubmit}>
              <LocationNameInput
                value={name}
                placeholder="장소 이름"
                onInput={onInputName}
              />
              <LocationSearch
                placeholder="주소"
                value={keyword}
                onInput={onSearch}
              />
              <BaseButton
                label="등록"
                isDisabled={name === '' || !selectedResult}
                color={selectedResult && name !== '' ? 'red' : 'gray'}
                width={5}
                onClick={() => onSubmit}
              />
            </LocationForm>
          )
        }
      </LocationItems>
      <SearchResults>
        { searchResult.map((result, index) =>
          <SearchResult
            key={index}
            onClick={() => handleSearchSelect(result)}
          >
            { `${result.address} (${result.name})` }
          </SearchResult>) }
      </SearchResults>
    </>
  )
}

export default LocationList;