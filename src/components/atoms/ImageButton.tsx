import styled, { css } from 'styled-components';

interface IStyledImageButton {
  width?: number;
  height?: number;
}

const StyledImageButton = styled.button<IStyledImageButton>`
  ${({ width, height }) => {
    return css`
      width: ${width ? `${width}rem` : '100%'};
      height: ${height ? `${height}rem` : width ? `${width}rem` : 'auto'};

      border-radius: 50%;

      overflow: hidden;

      cursor: pointer;
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
