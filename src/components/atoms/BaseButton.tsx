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
    const { palette, fontSize, borderRadius } = theme;
    return css`
      background: ${palette[color]};

      width: ${width ? `${width}rem` : '100%'};
      height: ${height ? `${height}rem` : 'auto'};

      padding: 1rem 1.5rem;

      border-radius: ${borderRadius};

      color: ${palette.white};
      font-weight: 600;
      font-size: ${textSize ? `${fontSize[textSize]}` : 'base'};

      cursor: pointer;

      &:hover {
        background: ${lighten(0.1, palette[color])};
      }
      &:active {
        background: ${darken(0.1, palette[color])};
      }
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
