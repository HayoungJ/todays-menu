import { useState, useEffect, FC } from 'react';
import ImageButton from '../atoms/ImageButton';

import styled, { css } from 'styled-components';
import { lighten } from 'polished';

import {
  ArrowBarLeft,
  Trash3Fill,
  PencilSquare,
} from '@styled-icons/bootstrap';

const StyledManager = styled.aside<{ isOpen: boolean }>`
  ${({ theme, isOpen }) => {
    const { palette } = theme;
    return css`
      position: fixed;
      top: 0;
      right: 0;

      display: flex;
      flex-flow: row nowrap;
      align-items: center;

      margin-left: 1rem;

      background-color: ${lighten(0.15, palette.beige)};

      width: calc(100% - 2rem);
      height: 100vh;

      border-radius: 1rem 0 0 1rem;

      z-index: ${isOpen ? 50 : 0};

      transform: translateX(${isOpen ? 0 : `calc(100% - 3.5rem)`});
      transition: transform 330ms ease-in-out;
    `;
  }};
`;

const ManagerButton = styled(ImageButton)`
  padding: 1rem;

  box-sizing: content-box;
`;

const CustomIcon = ({ isOpen, ...props }: { isOpen: boolean }) => (
  <ArrowBarLeft {...props} />
);
const StyledIcon = styled(CustomIcon)<{ isOpen: boolean }>`
  ${({ theme, isOpen }) => {
    const { palette } = theme;
    return css`
      color: ${palette.red};

      transform: ${isOpen ? 'rotate(-180deg)' : 'rotate(0)'};
      transition: transform 330ms ease-in-out;
    `;
  }}
`;

const ManagerContainer = styled.section`
  flex: 1;
  height: 100%;
`;

const RestaurantsWrap = styled.ul`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  padding: 3rem 4rem 1rem 2rem;
`;

const RestaurantCard = styled.li`
  ${({ theme }) => {
    const { palette } = theme;
    return css`
      display: flex;
      flex-flow: column nowrap;

      width: 30%;

      margin-bottom: 2rem;
      padding: 1rem 1.5rem;

      border: 1px solid ${palette.red};
      border-radius: 4px;

      background-color: ${palette.white};

      .title,
      .food,
      .distance {
        line-height: 2rem;
      }

      strong {
        font-weight: 600;
      }

      .title {
        display: flex;
        flex-flow: row nowrap;

        strong {
          margin-right: 1rem;
        }

        span {
          flex: 1;
        }
      }

      .foods {
        margin: 0.7rem 0;
        padding-left: 1rem;

        border-left: 1px solid ${palette.gray};

        .food {
          display: flex;
          flex-flow: row nowrap;

          strong {
            display: inline-block;

            flex: 1 1 20rem;

            text-align: left;
          }

          span {
            display: inline-block;

            flex: 0 0 4.5rem;

            margin-left: 1rem;

            text-align: right;
          }
        }
      }

      .distance {
        margin-top: auto;

        strong {
          margin-right: 0.1rem;

          color: ${palette.red};
        }
      }
    `;
  }};
`;

const CardButtons = styled.div`
  margin-left: auto;

  button {
    margin-left: 1rem;
  }
`;

const DeleteIcon = styled(Trash3Fill)`
  ${({ theme }) => {
    const { palette } = theme;
    return css`
      color: ${palette.gray};

      &:hover {
        color: ${palette.red};
      }
    `;
  }}
`;

const EditIcon = styled(PencilSquare)`
  ${({ theme }) => {
    const { palette } = theme;
    return css`
      color: ${palette.black};

      &:hover {
        color: ${palette.red};
      }
    `;
  }}
`;

const MealManager: FC = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledManager isOpen={isOpen} {...props}>
      <ManagerButton
        iconElement={<StyledIcon isOpen={isOpen} />}
        action="open meal manager"
        width={1.5}
        shape="square"
        onClick={() => setIsOpen(!isOpen)}
      />
      <ManagerContainer>
        <RestaurantsWrap>
          <RestaurantCard>
            <h5 className="title">
              <strong>양식</strong>
              <span className="text-limit">
                파스타어쩌구파스타어쩌구파스타어쩌구파스타어쩌구파스타어쩌구파스타어쩌구파스타어쩌구파스타어쩌구
              </span>
            </h5>
            <ul className="foods">
              <li className="food">
                <strong className="text-limit">
                  알리오 올리오알리오 올리오알리오 올리오알리오 올리오알리오
                  올리오알리오 올리오알리오 올리오
                </strong>
                <span>18000원</span>
              </li>
              <li className="food">
                <strong className="text-limit">로제 파스타</strong>
                <span>8000원</span>
              </li>
              <li className="food">
                <strong className="text-limit">알리오 올리오</strong>
                <span>8000원</span>
              </li>
              <li className="food">
                <strong className="text-limit">알리오 올리오</strong>
                <span>8000원</span>
              </li>
            </ul>
            <p className="distance">
              걸어서 <strong>5</strong>분 거리
            </p>
            <CardButtons>
              <ImageButton
                iconElement={<DeleteIcon />}
                action="delete"
                width={1.3}
                shape="square"
                onClick={() => {}}
              />
              <ImageButton
                iconElement={<EditIcon />}
                action="edit"
                width={1.3}
                shape="square"
                onClick={() => {}}
              />
            </CardButtons>
          </RestaurantCard>
        </RestaurantsWrap>
      </ManagerContainer>
    </StyledManager>
  );
}

export default MealManager;
