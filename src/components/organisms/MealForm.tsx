import { useState, FC, ChangeEvent, MouseEvent, FormEvent, useEffect } from 'react';
import ImageButton from '../atoms/ImageButton';
import BaseButton from '../atoms/BaseButton';
import SelectBox from '../atoms/SelectBox';

import styled, { css } from 'styled-components';
import { lighten } from 'polished';

import { HddNetwork, Trash3Fill } from '@styled-icons/bootstrap';
import { IMeal } from '../../types/types';

const RestaurantForm = styled.form`
  ${({ theme }) => {
    const { palette, borderRadius } = theme;
    return css`
      display: flex;
      flex-flow: column nowrap;

      padding: 1rem 0;

      input {
        border: 1px solid ${palette.black};
        border-radius: ${borderRadius};

        line-height: 1.5rem;
        padding: 0.7rem 1.3rem;

        &:hover, &:active, &:focus {
          border: 1px solid ${palette.red};
        }
      }
    `;
  }}
`;

const TitleForm = styled.section`
  display: flex;
  flex-flow: row nowrap;

  input {
    width: 100%;
    margin-right: 10px;
  }
`;

const LocationForm = styled.section`
  position: relative;

  margin-top: 10px;

  input {
    width: 100%;
  }
`;

const SearchResults = styled.ul`
${({ theme }) => {
  const { palette, borderRadius } = theme;
  return css`
    display: flex;
    flex-flow: column nowrap;

    position: absolute;

    width: 100%;

    background-color: ${palette.white};

    margin: 0.5rem 0 0 0;
    padding: 0.5rem;

    border-radius: ${borderRadius};

    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  `;
}}
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

const CategorySelectBox = styled(SelectBox)`
  flex: 0 0 200px;
`;

const FoodForm = styled.ul`
  display: flex;
  flex-flow: column nowrap;

  margin-top: 20px;

  li {
    display: flex;
    flex-flow: row nowrap;
    
    margin-bottom: 10px;

    input {
      flex: 1 1 auto;
      margin-right: 10px;
    }

    span {
      line-height: 1.5rem;
      padding: 0.7rem 0;
      margin-right: 1rem;
    }

    button {
      margin-left: auto;
    }

    &:nth-child(2) {
      padding-right: 1.2rem;
    }
  }
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
  margin-top: 0.7rem;
`;

interface IMealForm {
  meal: IMeal;
  handleMealChange: (value: string | { food: string, price: string }[], key: 'name' | 'category' | 'address' | 'foods') => any;
}

const MealForm: FC<IMealForm> = ({ meal, handleMealChange, ...props }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [foods, setFoods] = useState<{ food: string, price: string }[]>([{ food: '', price: '' }]);

  const addNewFood = (event: MouseEvent) => {
    event.preventDefault();
    const foods = [
      ...meal.foods,
      {
        food: '',
        price: '',
      }
    ];
    handleMealChange(foods, 'foods');
  }

  const deleteFood = (deleteIndex: number) => {
    setFoods(foods.filter((food, index) => index !== deleteIndex));
  }

  const onInput = (event: ChangeEvent<HTMLInputElement>, key: 'name' | 'address') => {
    const value = event.target.value;
    switch(key) {
      case 'name':
        handleMealChange(value, 'name');
        break;
      case 'address':
        handleMealChange(value, 'address');
        break;
    }
  }

  const selectCategory = (option: string) => {
    handleMealChange(option, 'category')
  }

  const onFoodInput = (event: ChangeEvent<HTMLInputElement>, index: number, key: 'food' | 'price') => {
    const value = event.target.value;
    const newFoods = [...foods];
    newFoods[index][key] = value;
    setFoods(newFoods);
  }

  const searchResult = [] as { name: string, address: string}[];

  return (
    <RestaurantForm {...props}> 
      <TitleForm>
        <input
          value={name}
          placeholder="식당 이름"
          onInput={(event: ChangeEvent<HTMLInputElement>) => onInput(event, 'name')}
        />
        <CategorySelectBox
          label={category === '' ? "분류" : category}
          options={['한식', '양식', '중식', '일식', '기타']}
          handleSelect={selectCategory}
        />
      </TitleForm>
      <LocationForm>
        <input
          value={address}
          placeholder="위치"
          onInput={(event: ChangeEvent<HTMLInputElement>) => onInput(event, 'address')}
        />
        { SearchResults.length > 0 && <SearchResults>
          { searchResult.map((result, index) =>
            <SearchResult
              key={index}
              onClick={() => {}}
            >
              { `${result.address} (${result.name})` }
            </SearchResult>) }
        </SearchResults>}
      </LocationForm>
      <FoodForm>
        <>
        <li>메뉴</li>
        { foods.map((food, index) => 
          <li key={index}>
            <input
              value={food.food}
              placeholder="메뉴"
              onInput={(event: ChangeEvent<HTMLInputElement>) => onFoodInput(event, index, 'food')}
            />
            <input
              value={food.price}
              placeholder="가격"
              onInput={(event: ChangeEvent<HTMLInputElement>) => onFoodInput(event, index, 'price')}
            />
            <span>원</span>
            { index !== 0 && <DeleteButton
              iconElement={<DeleteIcon />}
              action="delete"
              width={1.2}
              shape="square"
              onClick={() => deleteFood(index)}
            /> }
          </li>)
        }
        <li>
          <BaseButton
            label="추가"
            color="red"
            width={5}
            textSize="sm"
            onClick={(event: MouseEvent) => addNewFood(event)}
          />
        </li>
        </>
      </FoodForm>
    </RestaurantForm>
  );
}

export default MealForm;