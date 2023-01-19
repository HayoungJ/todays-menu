import { useState } from 'react';

import styled, { css } from 'styled-components';
import { lighten } from 'polished';

import { ChevronDown } from '@styled-icons/boxicons-regular';

interface IStyledSelectBox {
  isOpen: boolean;
  width?: number;
  height?: number;
}

const StyledSelectBox = styled.div<Omit<IStyledSelectBox, 'isOpen'>>`
  ${({ width, height }) => {
    return css`
      position: relative;

      width: ${width ? `${width}rem` : '100%'};
      height: ${height ? `${height}rem` : 'auto'};
    `;
  }}
`;

const StyledLabel = styled.button<Pick<IStyledSelectBox, 'isOpen'>>`
  ${({ theme, isOpen }) => {
    const { palette, fontSize, borderRadius } = theme;
    return css`
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      width: 100%;
      height: 100%;
      line-height: ${fontSize.lg};

      padding: 0.7rem 1.3rem;

      border: 1px solid ${isOpen ? lighten(0.2, palette.red) : palette.black};
      border-radius: ${borderRadius};

      cursor: pointer;

      &:hover {
        border-color: ${lighten(0.2, palette.red)};
      }

      &.disabled {
        background-color: ${palette.gray};

        cursor: default;

        &:hover {
          border-color: ${palette.black};
        }
      }
    `;
  }}
`;

const CustomIcon = ({ isOpen, ...props }: { isOpen: boolean }) => (
  <ChevronDown {...props} />
);
const StyledIcon = styled(CustomIcon)<Pick<IStyledSelectBox, 'isOpen'>>`
  ${({ theme, isOpen }) => {
    const { fontSize } = theme;
    return css`
      width: ${fontSize.lg};
      height: ${fontSize.lg};

      margin-right: -0.2rem;

      transform: ${isOpen ? 'rotate(-180deg)' : 'rotate(0)'};
      transition: transform 330ms ease-in-out;
    `;
  }}
`;

const StyledOptions = styled.ul<Pick<IStyledSelectBox, 'isOpen'>>`
  ${({ theme, isOpen }) => {
    const { palette, borderRadius } = theme;
    return css`
      position: absolute;

      display: ${isOpen ? 'block' : 'none'};

      width: 100%;
      height: auto;

      padding: 0.5rem;
      margin-top: 0.5rem;

      border: 1px solid ${palette.black};
      border-radius: ${borderRadius};

      background-color: ${palette.white};
    `;
  }}
`;

const StyledOption = styled.li<Pick<IStyledSelectBox, 'height'>>`
  ${({ theme, height }) => {
    const { palette, borderRadius } = theme;
    return css`
      width: 100%;
      height: ${height ? `${height}rem` : 'auto'};

      padding: 0.7rem 0.8rem;
      margin: 0.25rem 0 0.5rem;

      border-radius: ${borderRadius};

      cursor: pointer;

      &.on {
        background-color: ${lighten(0.4, palette.red)};
      }

      &:hover {
        color: ${palette.white};
        background-color: ${lighten(0.2, palette.red)};
      }

      &:last-child {
        margin-bottom: 0.25rem;
      }
    `;
  }}
`;

interface ISelectBox extends Omit<IStyledSelectBox, 'isOpen'> {
  isDisabled?: boolean;
  label: string;
  options: string[];
  handleSelect: (option: string, index: number) => any;
}

function SelectBox({
  isDisabled = false,
  label,
  options,
  handleSelect,
  ...props
}: ISelectBox) {
  const [isOpen, setIsOpen] = useState(false);

  const onSelectBoxClick = () => {
    if (isDisabled) return;
    setIsOpen(!isOpen);
  };

  return (
    <StyledSelectBox {...props}>
      <StyledLabel
        className={isDisabled ? 'disabled' : ''}
        isOpen={isOpen}
        onClick={onSelectBoxClick}
      >
        <span>{label}</span>
        <StyledIcon isOpen={isOpen} />
      </StyledLabel>
      <StyledOptions {...props} isOpen={isOpen}>
        {options.map((option, index) => (
          <StyledOption
            key={index}
            className={option === label ? 'on' : ''}
            onClick={() => handleSelect(option, index)}
          >
            {option}
          </StyledOption>
        ))}
      </StyledOptions>
    </StyledSelectBox>
  );
}

export default SelectBox;
