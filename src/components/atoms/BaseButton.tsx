import { FC, MouseEvent } from 'react';

import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';

interface IStyledButton {
  color: 'red' | 'gray';
  width?: number;
  height?: number;
  textSize?: 'xs' | 'sm' | 'base' | 'md' | 'lg';
}

const StyledButton = styled.button<IStyledButton>`
  ${({ theme, color, width, height, textSize }) => {
    const { palette, fontSize, borderRadius } = theme;
    return css`
      background: ${palette[color]};

      width: ${width ? `${width}rem` : '100%'};
      height: ${height ? `${height}rem` : 'auto'};

      padding: 0.7rem 1.3rem;

      border-radius: ${borderRadius};

      color: ${palette.white};
      font-weight: 600;
      font-size: ${textSize ? `${fontSize[textSize]}` : `${fontSize.base}`};

      &:hover {
        background: ${lighten(0.1, palette[color])};
      }
      &:active {
        background: ${darken(0.1, palette[color])};
      }
      &:disabled {
        cursor: not-allowed;
        pointer-events: none;
      }
    `;
  }}
`;

interface IButton extends IStyledButton {
  label: string;
  isDisabled?: boolean;
  onClick: (event: MouseEvent) => any;
}

const BaseButton: FC<IButton> = ({ label, isDisabled = false, onClick, ...props }) => {
  return (
    <StyledButton {...props} onClick={onClick} disabled={isDisabled}>
      {label}
    </StyledButton>
  );
}

export default BaseButton;
