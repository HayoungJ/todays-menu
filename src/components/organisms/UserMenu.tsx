import { Fragment, useState } from 'react';
import ImageButton from '../atoms/ImageButton';

import styled, { css } from 'styled-components';
import { lighten } from 'polished';

import { IMenu } from '../../types/types';

interface IStyledMenus {
  isOpen: boolean;
}

const StyledProfile = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  position: relative;
`;

const StyledMenus = styled.ul<IStyledMenus>`
  ${({ theme, isOpen }) => {
    const { palette, borderRadius } = theme;
    return css`
      position: absolute;
      right: 0;

      display: ${isOpen ? 'block' : 'none'};

      width: 12rem;
      height: auto;

      padding: 0.5rem;
      margin-top: 0.5rem;

      border: 1px solid ${palette.black};
      border-radius: ${borderRadius};

      background-color: ${palette.white};
    `;
  }}
`;

const StyledMenu = styled.li`
  ${({ theme }) => {
    const { palette, borderRadius } = theme;
    return css`
      width: 100%;

      padding: 0.7rem 0.8rem;
      margin: 0.25rem 0;

      border-radius: ${borderRadius};

      cursor: pointer;

      &.on {
        background-color: ${lighten(0.4, palette.red)};
      }

      &:hover {
        color: ${palette.white};
        background-color: ${lighten(0.2, palette.red)};
      }
    `;
  }}
`;

const Decoration = styled.hr`
  ${({ theme }) => {
    const { palette } = theme;
    return css`
      width: 90%;
      border-top: 1px solid ${lighten(0.1, palette.gray)};
    `;
  }}
`;

interface IUserMenu {
  profileURL: string;
  userMenus: IMenu[];
}

function UserMenu({ profileURL, userMenus, ...props }: IUserMenu) {
  const [isOpen, setIsOpen] = useState(false);

  const onProfileClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <StyledProfile {...props}>
      <ImageButton
        imageURL={profileURL}
        action="open profile menu"
        width={3.5}
        shape="round"
        onClick={onProfileClick}
      />
      <StyledMenus isOpen={isOpen}>
        {userMenus.map((menu, index) => (
          <Fragment key={index}>
            <StyledMenu onClick={menu.onClick}>{menu.label}</StyledMenu>
            {index !== userMenus.length - 1 && <Decoration />}
          </Fragment>
        ))}
      </StyledMenus>
    </StyledProfile>
  );
}

export default UserMenu;
