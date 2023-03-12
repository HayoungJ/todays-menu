import { FC } from 'react';

import MealPicker from '../molecules/MealPicker';
import MealManager from '../organisms/MealManager';

import styled from 'styled-components';

const StyledTemplate = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  width: 50rem;
`;

const PickerTemplate: FC = ({ ...props }) => {
  return (
    <StyledTemplate {...props}>
      <MealPicker />
      <MealManager />
    </StyledTemplate>
  );
}

export default PickerTemplate;
