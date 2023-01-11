import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';

interface StyledButtonProps {
  color: 'red' | 'gray';
  width?: number;
  height?: number;
  textSize?: 'xs' | 'sm' | 'base' | 'md' | 'lg';
}

const StyledButton = styled.button<StyledButtonProps>`
  ${({ theme, color, width, height, textSize }) => {
    const selected = theme.palette[color];
    return css`
      background: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }

      width: ${width ? `${width}rem` : '100%'};
      height: ${height ? `${height}rem` : 'auto'};

      padding: 1rem 1.5rem;

      border-radius: ${theme.borderRadius};

      color: ${theme.palette.white};
      font-weight: 600;
      font-size: ${textSize ? `${theme.fontSize[textSize]}` : 'base'};

      cursor: pointer;
    `;
  }}
`;

interface ButtonProps extends StyledButtonProps {
  label: string;
  onClick(): any;
}

function BaseButton({ label, onClick, ...rest }: ButtonProps) {
  return (
    <StyledButton {...rest} onClick={onClick}>
      {label}
    </StyledButton>
  );
}

export default BaseButton;
