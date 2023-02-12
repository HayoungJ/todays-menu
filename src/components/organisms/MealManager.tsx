import { useState, useEffect } from 'react';
import ImageButton from '../atoms/ImageButton';

import styled, { css } from 'styled-components';
import { lighten } from 'polished';

import { ArrowBarLeft } from '@styled-icons/bootstrap';

const StyledManager = styled.aside<{ isOpen: boolean }>`
  ${({ theme, isOpen }) => {
    const { palette } = theme;
    return css`
      position: fixed;
      top: 0;
      right: 0;

      display: flex;
      flex-flow: row nowrap;
      align-items: center;

      margin-left: 1rem;

      background-color: ${lighten(0.15, palette.beige)};

      width: calc(100% - 2rem);
      height: 100vh;

      border-radius: 1rem 0 0 1rem;

      z-index: ${isOpen ? 50 : 0};

      transform: translateX(${isOpen ? 0 : `calc(100% - 3.5rem)`});
      transition: transform 330ms ease-in-out;
    `;
  }};
`;

const ManagerButton = styled(ImageButton)`
  ${({ theme }) => {
    return css`
      padding: 1rem;

      box-sizing: content-box;
    `;
  }};
`;

const CustomIcon = ({ isOpen, ...props }: { isOpen: boolean }) => (
  <ArrowBarLeft {...props} />
);
const StyledIcon = styled(CustomIcon)<{ isOpen: boolean }>`
  ${({ theme, isOpen }) => {
    const { palette } = theme;
    return css`
      color: ${palette.red};

      transform: ${isOpen ? 'rotate(-180deg)' : 'rotate(0)'};
      transition: transform 330ms ease-in-out;
    `;
  }}
`;

const ManagerContainer = styled.section`
  ${({ theme }) => {
    const { palette } = theme;
    return css`
      flex: 1;
      height: 100%;
    `;
  }}
`;

function MealManager({ ...props }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledManager isOpen={isOpen} {...props}>
      <ManagerButton
        iconElement={<StyledIcon isOpen={isOpen} />}
        action="open meal manager"
        width={1.5}
        shape="square"
        onClick={() => setIsOpen(!isOpen)}
      />
      <ManagerContainer></ManagerContainer>
    </StyledManager>
  );
}

export default MealManager;
