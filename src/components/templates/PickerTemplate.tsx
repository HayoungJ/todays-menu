import { FC } from 'react';

import MealPicker from '../molecules/MealPicker';
import MealManager from '../organisms/MealManager';

import styled from 'styled-components';
import { IMeal } from '../../types/types';

const StyledTemplate = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  width: 50rem;
`;

interface IPicker {
  meals: IMeal[];
  meal: IMeal | null;
  handleMealPick: () => any;
  handleMealAdd: () => any;
  handleMealDelete: (meal: IMeal) => any;
}

const PickerTemplate: FC<IPicker> = ({ meals, meal, handleMealPick, handleMealAdd, handleMealDelete, ...props }) => {
  return (
    <StyledTemplate {...props}>
      <MealPicker
        meal={meal ? meal.name : null}
        handlePick={handleMealPick}
      />
      <MealManager
        meals={meals}
        handleAdd={handleMealAdd}
        handleDelete={handleMealDelete}
      />
    </StyledTemplate>
  );
}

export default PickerTemplate;
