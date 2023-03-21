import { useState, useEffect, FC } from 'react';
import ImageButton from '../atoms/ImageButton';

import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import Image from 'next/image';

import { ArrowCounterclockwise } from '@styled-icons/bootstrap';

interface IStyledMenu {
  index: number;
  animation: boolean;
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
  ${({ index, animation }) => {
    return css`
      position: absolute;
      top: 0;
      display: flex;
      flex-flow: column nowrap;
      width: 100%;
      transform: translateY(calc((-4rem + 6px) * ${index}));
      ${animation && 'transition: transform 2s ease-in-out'};

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
        margin: -2px 5px 0;
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

const ResetIcon = styled(ArrowCounterclockwise)`
  ${({ theme }) => {
    const { palette } = theme;
    return css`
      width: 3.5rem;
      height: 3.5rem;

      color: ${palette.red};
    `;
  }}
`;

const ResetButton = styled(ImageButton)`
  &:hover {
    animation: rotate 700ms ease-in-out;

    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(-360deg);
      }
    }
  }
`;

interface IMealPlaceholder {
  type: 'image';
  image: string;
}

interface IMealPicked {
  type: 'text';
  text: string;
}

interface IMealPicker {
  meal: string | null;
  handlePick: () => any;
}

const MealPicker: FC<IMealPicker> = ({ meal, handlePick, ...props }) => {
  const [mealIndex, setMealIndex] = useState(0);
  const [isPicked, setIsPicked] = useState(false);
  const [meals, setMeals] = useState<(IMealPlaceholder | IMealPicked)[]>([]);

  const createMealsList = () => {
    
  }

  const handleRandom = () => {
    handlePick();
  };

  const handleReset = () => {
    setMealIndex(0);
    setTimeout(() => setIsPicked(false), 10);
  };

  useEffect(() => {
    const meals = [];
    for (let i = 1; i < 10; i++) {
      const placeholder: IMealPlaceholder = {
        type: 'image',
        image: `/assets/images/foods/food${i}.png`,
      };
      meals.push(placeholder);
    }
    if (meal) {
      meals.push({
        type: 'text',
        text: meal,
      } as IMealPicked);
    }
    setMeals(meals);

    if (!meal) return;
    setMealIndex(meals.length - 1);
    setTimeout(() => setIsPicked(true), 2000);
  }, [meal]);

  return (
    <StyledPicker {...props}>
      <StyledMenu>
        <MenuContainer index={mealIndex} animation={!isPicked}>
          {meals.map((meal, index) => (
            <li key={index}>
              {meal.type === 'text' && <span>{meal.text}</span>}
              {meal.type === 'image' && (
                <>
                  <Image src={meal.image} alt="" width={30} height={30} />
                  <Image src={meal.image} alt="" width={30} height={30} />
                  <Image src={meal.image} alt="" width={30} height={30} />
                </>
              )}
            </li>
          ))}
        </MenuContainer>
      </StyledMenu>
      {isPicked ? (
        <ResetButton
          iconElement={<ResetIcon />}
          action="reset meal"
          width={4}
          shape="square"
          onClick={handleReset}
        />
      ) : (
        <PickButton
          imageURL="/assets/images/roll.png"
          action="pick meal"
          width={4}
          shape="square"
          onClick={handleRandom}
        />
      )}
    </StyledPicker>
  );
}

export default MealPicker;
