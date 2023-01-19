import Image from 'next/image';
import BaseButton from '../atoms/BaseButton';

import styled from 'styled-components';

const StyledTemplate = styled.div`
  display: flex;

  width: 100vw;
  height: 100vh;
`;

const StyledMain = styled.main`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  width: 300px;
  height: auto;

  margin: auto;
  padding-bottom: 50px;
  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;
    height: 300px;
    background-color: ${(props) => props.theme.palette.beige};
    border-radius: 50%;
    transform: scale(1);
    transition: transform 330ms ease-in-out;
    z-index: -1;
  }

  &:hover {
    &::after {
      transform: scale(4);
    }
  }
`;

const LoginButton = styled(BaseButton)`
  margin-top: 20px;
`;

interface ILoginTemplate {
  logoURL: string;
  buttonLabel: string;
  loginEvent(): any;
}

function LoginTemplate({ logoURL, buttonLabel, loginEvent }: ILoginTemplate) {
  return (
    <StyledTemplate>
      <StyledMain>
        <Image src={logoURL} alt="logo" width={300} height={300} />
        <LoginButton
          label={buttonLabel}
          width={15}
          color="red"
          textSize="md"
          onClick={loginEvent}
        />
      </StyledMain>
    </StyledTemplate>
  );
}

export default LoginTemplate;
