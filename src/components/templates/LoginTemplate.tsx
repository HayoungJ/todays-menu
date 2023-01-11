import Image from 'next/image';
import BaseButton from '../atoms/BaseButton';

import styled, { css } from 'styled-components';

interface StyledLoginTemplateProps {
  decorationColor: string;
}

const StyledTemplate = styled.div`
  display: flex;

  width: 100vw;
  height: 100vh;
`;

const StyledMain = styled.main`
  display: flex;
  flex-flow: column nowrap;

  width: 300px;
  height: auto;

  margin: auto;
  padding-bottom: 50px;
`;

const Decoration = styled.div<StyledLoginTemplateProps>`
  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -5px;
    margin-left: -5px;
    width: 10px;
    height: 10px;
    background-color: ${(props) => props.decorationColor};
    border-radius: 50%;
    transform: scale(1);
    transition: transform 330ms ease-in-out;
    z-index: -1;
  }

  &:hover {
    &::after {
      transform: scale(100);
    }
  }
`;

const LoginButton = styled(BaseButton)`
  margin-top: 20px;
`;

interface LoginTemplateProps extends StyledLoginTemplateProps {
  logoURL: string;
  buttonLabel: string;
  loginEvent(): any;
}

function LoginTemplate({
  logoURL,
  buttonLabel,
  decorationColor,
  loginEvent,
}: LoginTemplateProps) {
  return (
    <StyledTemplate>
      <StyledMain>
        <Decoration decorationColor={decorationColor}>
          <Image src={logoURL} alt="logo" width={300} height={300} />
          <LoginButton
            label={buttonLabel}
            color="red"
            textSize="lg"
            onClick={loginEvent}
          />
        </Decoration>
      </StyledMain>
    </StyledTemplate>
  );
}

export default LoginTemplate;
