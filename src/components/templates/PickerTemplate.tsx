import MealPicker from '../organisms/MealPicker';
import MealManager from '../organisms/MealManager';

import styled from 'styled-components';

const StyledTemplate = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  width: 50rem;
`;

function PickerTemplate({ ...props }) {
  return (
    <StyledTemplate {...props}>
      <MealPicker />
      <MealManager />
    </StyledTemplate>
  );
}

export default PickerTemplate;
