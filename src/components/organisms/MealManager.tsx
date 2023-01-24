import { useState, useEffect } from 'react';
import ImageButton from '../atoms/ImageButton';

import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import Image from 'next/image';

const StyledManager = styled.aside`
  position: fixed;
  top: 0;
  right: 0;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  width: 45rem;
  height: 100vh;

  z-index: 50;
`;

const ManagerButton = styled(ImageButton)`
  margin-top: 4rem;
`;

const ManagerContainer = styled.section`
  ${({ theme }) => {
    const { palette } = theme;
    return css`
      background-color: ${lighten(0.45, palette.red)};

      flex: 1;
      height: 100%;

      margin-left: 2rem;

      border-radius: 1rem 0 0 1rem;
    `;
  }}
`;

function MealManager({ ...props }) {
  return (
    <StyledManager {...props}>
      <ManagerButton
        imageURL="https://via.placeholder.com/32x160"
        action="open meal manager"
        width={2}
        height={10}
        shape="square"
        onClick={() => {}}
      />
      <ManagerContainer></ManagerContainer>
    </StyledManager>
  );
}

export default MealManager;
