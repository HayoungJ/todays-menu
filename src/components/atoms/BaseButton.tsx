import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';

interface StyledButtonProps {
  color: 'red' | 'gray';
  width?: number;
  height?: number;
}

const StyledButton = styled.button<StyledButtonProps>`
  cursor: pointer;
  padding: 1rem;

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

      width: ${width ? `${width}rem` : 'auto'};
      height: ${height ? `${height}rem` : 'auto'};

      border-radius: ${theme.borderRadius};
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
