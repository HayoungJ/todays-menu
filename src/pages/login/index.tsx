import { FC } from 'react';

import { useRouter } from 'next/router';

import LoginTemplate from '../../components/templates/LoginTemplate';

import { AuthError as IAuthError } from 'firebase/auth';

import { googleLogin } from '../../api/auth';

const LoginPage: FC = () => {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      router.push('/');
    } catch (error) {
      const { code, message } = error as unknown as IAuthError;
      console.error(`Google Login ${code} error: ${message}`);
    }
  };

  return (
    <LoginTemplate
      logoURL="/assets/images/logo.png"
      buttonLabel="Google Login"
      loginEvent={handleGoogleLogin}
    />
  );
}

export default LoginPage;