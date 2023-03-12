import { FC, ReactElement, useEffect } from 'react';

import styled, { css } from 'styled-components';

interface IStyledImageButton {
  width?: number;
  height?: number;
  shape: 'round' | 'square';
}

const StyledImageButton = styled.button<IStyledImageButton>`
  ${({ width, height, shape }) => {
    return css`
      width: ${width ? `${width}rem` : '100%'};
      height: ${height ? `${height}rem` : width ? `${width}rem` : 'auto'};

      border-radius: ${shape === 'round' ? '50%' : '0'};

      overflow: hidden;

      cursor: pointer;

      img {
        width: ${width ? `${width}rem` : '100%'};
        height: ${height ? `${height}rem` : width ? `${width}rem` : 'auto'};
      }
    `;
  }}
`;

interface IImageButton extends IStyledImageButton {
  imageURL?: string;
  iconElement?: ReactElement;
  action: string;
  onClick: () => any;
}

const ImageButton: FC<IImageButton> = ({
  imageURL,
  iconElement,
  action,
  onClick,
  ...props
}) => {
  useEffect(() => {
    if (imageURL || iconElement) return;
    throw new Error(`One of 'imageURL' or 'iconElement' must be provided`);
  }, []);

  return (
    <StyledImageButton {...props} onClick={onClick}>
      {imageURL && <img src={imageURL} alt={action} />}
      {iconElement}
    </StyledImageButton>
  );
}

export default ImageButton;
