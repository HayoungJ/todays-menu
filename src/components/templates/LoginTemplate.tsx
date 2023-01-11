import Image from 'next/image';
import BaseButton from '../atoms/BaseButton';

import styled, { css } from 'styled-components';

interface StyledLoginTemplateProps {}

const StyledTemplate = styled.div`
  display: flex;

  width: 100vw;
  height: 100vh;
`;

const StyledMain = styled.main<StyledLoginTemplateProps>`
  display: flex;
  flex-flow: column nowrap;

  width: 300px;
  height: auto;

  margin: auto;
  padding-bottom: 50px;
`;

const LoginButton = styled(BaseButton)`
  margin-top: 50px;
`;

interface LoginTemplateProps extends StyledLoginTemplateProps {
  logoURL: string;
  buttonLabel: string;
  loginEvent(): any;
}

function LoginTemplate({
  logoURL,
  buttonLabel,
  loginEvent,
}: LoginTemplateProps) {
  return (
    <StyledTemplate>
      <StyledMain>
        <Image src={logoURL} alt="logo" width={300} height={300} />
        <LoginButton
          label={buttonLabel}
          color="red"
          textSize="lg"
          onClick={loginEvent}
        />
      </StyledMain>
    </StyledTemplate>
  );
}

export default LoginTemplate;
