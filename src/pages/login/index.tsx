import { useEffect } from 'react';
import { useRouter } from 'next/router';

import LoginTemplate from '../../components/templates/LoginTemplate';

import { AuthError as IAuthError } from 'firebase/auth';

import { googleLogin } from '../../api/auth';
import { getCookie } from '../../utils/cookie';

export default function LoginPage() {
  const router = useRouter();

  const token = getCookie('token');

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
    } catch (error) {
      const { code, message } = error as unknown as IAuthError;
      console.error(`Google Login ${code} error: ${message}`);
    }
  };

  useEffect(() => {
    if (token) router.push('/');
  }, []);

  return (
    <LoginTemplate
      logoURL="/assets/images/logo.png"
      buttonLabel="Google Login"
      loginEvent={handleGoogleLogin}
    />
  );
}
