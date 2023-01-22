import ImageButton from '../atoms/ImageButton';

import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import { useEffect, useState } from 'react';

interface IStyledMenu {
  index: number;
}

const StyledPicker = styled.article`
  display: flex;
  flex-flow: row nowrap;

  width: 34rem;
`;

const StyledMenu = styled.div`
  ${({ theme }) => {
    const { palette, fontSize } = theme;
    return css`
      position: relative;

      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;

      height: 4rem;

      padding: 0.5rem 1.7rem 0.7rem;
      margin-right: 1.5rem;

      border: 3px solid ${lighten(0.2, palette.red)};
      border-radius: 2rem;

      font-size: ${fontSize.lg};
      font-weight: 600;
      letter-spacing: 1px;

      overflow: hidden;
    `;
  }}
`;

const MenuContainer = styled.ul<IStyledMenu>`
  ${({ index }) => {
    return css`
      position: absolute;
      top: 0;
      display: flex;
      flex-flow: column nowrap;
      width: 100%;
      transform: translateY(calc((-4rem + 6px) * ${index}));
      transition: transform 1s ease-in-out;

      li {
        display: flex;
        flex: 0 0 calc(4rem - 6px);
        justify-content: center;
        align-items: center;
        width: 100%;
        border-radius: 2rem;
      }

      span {
        display: flex;

        line-height: calc(4rem - 10px);
      }

      img {
        margin-top: -2px;
      }
    `;
  }}
`;

const PickButton = styled(ImageButton)`
  transition: transform 30ms ease-in-out;

  &:hover {
    transform: rotate(30deg);
  }
`;

function MenuPicker({ ...props }) {
  const [menuIndex, setMenuIndex] = useState(0);
  const [updateIndex, setUpdateIndex] = useState(false);

  const testList = [
    {
      type: 'text',
      label: 'test1',
    },
    {
      type: 'text',
      label: 'test2',
    },
    {
      type: 'text',
      label: 'test3',
    },
    {
      type: 'text',
      label: 'test4',
    },
    {
      type: 'text',
      label: 'test5',
    },
    {
      type: 'image',
      label: 'https://via.placeholder.com/36',
    },
  ];

  const handlePick = () => {
    setMenuIndex(0);
    setUpdateIndex(true);
  };

  useEffect(() => {
    if (!updateIndex) return;
    setMenuIndex(testList.length - 1);
    setUpdateIndex(false);
  }, [updateIndex]);

  return (
    <StyledPicker {...props}>
      <StyledMenu>
        <MenuContainer index={menuIndex}>
          {testList.map((list, index) => (
            <li key={index}>
              {list.type === 'text' && <span>{list.label}</span>}
              {list.type === 'image' && <img src={list.label} />}
            </li>
          ))}
        </MenuContainer>
      </StyledMenu>
      <PickButton
        imageURL="/assets/images/roll.png"
        action="pick menu"
        width={4}
        shape="square"
        onClick={handlePick}
      />
    </StyledPicker>
  );
}

export default MenuPicker;
