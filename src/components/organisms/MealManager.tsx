import { useState, FC } from 'react';
import ImageButton from '../atoms/ImageButton';
import BaseButton from '../atoms/BaseButton';

import styled, { css } from 'styled-components';
import { lighten } from 'polished';

import {
  ArrowBarLeft,
  Trash3Fill,
  PencilSquare,
} from '@styled-icons/bootstrap';
import { IMeal } from '../../types/types';

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

      z-index: ${isOpen ? 15 : 0};

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

  position: relative;
`;

const RestaurantsWrap = styled.ul`
  display: flex;
  flex-flow: row wrap;

  height: 100vh;

  padding: 3rem 4rem 1rem 2rem;

  overflow: auto;
`;

const RestaurantAddButton = styled(BaseButton)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const RestaurantCard = styled.li`
  ${({ theme }) => {
    const { palette } = theme;
    return css`
      display: flex;
      flex-flow: column nowrap;

      width: 30%;

      margin: 0 5% 2rem 0;
      padding: 1rem 1.5rem;

      border: 1px solid ${palette.red};
      border-radius: 4px;

      background-color: ${palette.white};

      &:nth-child(3n) {
        margin-right: 0;
      }

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
  margin: auto 0 0 auto;

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

interface IMealManager {
  meals: IMeal[];
  handleAdd: () => any;
  handleDelete: (meal: IMeal) => any;
}

const MealManager: FC<IMealManager> = ({ meals, handleAdd, handleDelete, ...props }) => {
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
        <RestaurantAddButton
          label="추가"
          color="red"
          width={5}
          onClick={() => handleAdd()}
        />
        <RestaurantsWrap>
          {
            meals.map((meal, index) => (
              <RestaurantCard key={index}>
                <h5 className="title">
                  <strong>{ meal.name }</strong>
                  <span className="text-limit">{ meal.category }</span>
                </h5>
                <ul className="foods">
                  {
                    meal.foods.map((food, index) => (
                      <li
                        key={`${meal.name}-${index}`}
                        className="food"
                      >
                        <strong className="text-limit">{ food.food }</strong>
                        <span>{ food.price }원</span>
                      </li>
                    ))
                  }
                </ul>
                {/* <p className="distance">
                  걸어서 <strong>{ meal.far }</strong>분 거리
                </p> */}
                <CardButtons>
                  <ImageButton
                    iconElement={<DeleteIcon />}
                    action="delete"
                    width={1.3}
                    shape="square"
                    onClick={() => handleDelete(meal)}
                  />
                  {/* <ImageButton
                    iconElement={<EditIcon />}
                    action="edit"
                    width={1.3}
                    shape="square"
                    onClick={() => {}}
                  /> */}
                </CardButtons>
              </RestaurantCard>
            ))
          }
        </RestaurantsWrap>
      </ManagerContainer>
    </StyledManager>
  );
}

export default MealManager;
