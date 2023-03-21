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
  handlePickMeal: () => any;
  handleAddMeal: () => any;
  handleDeleteMeal: (meal: IMeal) => any;
}

const PickerTemplate: FC<IPicker> = ({ meals, meal, handlePickMeal, handleAddMeal, handleDeleteMeal, ...props }) => {
  return (
    <StyledTemplate {...props}>
      <MealPicker
        meal={meal ? meal.name : null}
        handlePick={handlePickMeal}
      />
      <MealManager
        meals={meals}
        handleAdd={handleAddMeal}
        handleDelete={handleDeleteMeal}
      />
    </StyledTemplate>
  );
}

export default PickerTemplate;
