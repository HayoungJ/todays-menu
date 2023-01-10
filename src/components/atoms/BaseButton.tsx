import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';

interface StyledButtonProps {
  color: 'red' | 'gray';
  width: number;
  height: number;
}

const StyledButton = styled.button<StyledButtonProps>`
  cursor: pointer;
  padding: 1rem 0;

  ${({ theme, color, width, height }) => {
    const selected = theme.palette[color];
    return css`
      background: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }

      width: ${width}rem;
      height: ${height}rem;

      border-radius: ${theme.borderRadius};
    `;
  }}
`;

interface ButtonProps extends StyledButtonProps {
  label: string;
}

function BaseButton({ label, ...rest }: ButtonProps) {
  return <StyledButton {...rest}>{label}</StyledButton>;
}

export default BaseButton;
