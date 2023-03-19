import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";

import styled, { css } from "styled-components";
import { lighten } from 'polished';

import BaseButton from "../atoms/BaseButton";
import ImageButton from "../atoms/ImageButton";

import useDebounce from "../../hooks/useDebounce";

import { ILocation } from "../../types/types";

import { Trash3Fill } from '@styled-icons/bootstrap';

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
      display: flex;
      flex-flow: row nowrap;
      flex: 1;
      justify-content: space-between;

      padding: 0 0.3rem 0 1rem;
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

const DeleteIcon = styled(Trash3Fill)`
  ${({ theme }) => {
    const { palette } = theme;
    return css`
      color: ${palette.gray};

      &:hover {
        color: ${palette.red};
      }
    `;
  }}
`;

const DeleteButton = styled(ImageButton)`
  margin-top: 5px;
`;

interface ILocationList {
  locations: ILocation[];
  searchResult: ILocation[];
  selectedResult: ILocation | null;
  handleSubmit: (location: ILocation) => void;
  handleSearch: (value: string) => void;
  handleSearchSelect: (value: ILocation) => void;
  handleDelete: (location: ILocation) => void;
}

const LocationList: FC<ILocationList> = ({ locations, searchResult, selectedResult, handleSubmit, handleSearch, handleSearchSelect, handleDelete }) => {
  const [name, setName] = useState('');
  const [keyword, setKeyword] = useState('');

  const debouncedKeyword = useDebounce(keyword, 1000);

  const onSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (name === '' || !selectedResult) return;
    handleSubmit({
      ...selectedResult,
      name,
    });
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
          locations.map((location, index) => (
            <LocationItem key={index}>
              <LocationName className='text-limit'>{ location.name }</LocationName>
              <Location>
                <span>{ location.address }</span>
                <DeleteButton
                  iconElement={<DeleteIcon />}
                  action="delete"
                  width={1.2}
                  shape="square"
                  onClick={() => {handleDelete(location)}}
                />
              </Location>
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