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
  handleAdd: () => any;
  handleDelete: (meal: IMeal) => any;
}

const PickerTemplate: FC<IPicker> = ({ meals, meal, handleAdd, handleDelete, ...props }) => {
  return (
    <StyledTemplate {...props}>
      <MealPicker meal={meal ? meal.name : null} />
      <MealManager
        meals={meals}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
      />
    </StyledTemplate>
  );
}

export default PickerTemplate;
