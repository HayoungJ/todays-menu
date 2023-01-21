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
  imageURL: string;
  action: string;
  onClick: () => any;
}

function ImageButton({ imageURL, action, onClick, ...props }: IImageButton) {
  return (
    <StyledImageButton {...props} onClick={onClick}>
      <img src={imageURL} alt={action} />
    </StyledImageButton>
  );
}

export default ImageButton;
