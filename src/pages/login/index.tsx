import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import LoginTemplate from '../../components/templates/LoginTemplate';

import { authError, firebaseUser } from '../../types/user';

import { googleLogin } from '../../api/auth';
import { useUser } from '../../contexts/UserContext';

export default function LoginPage() {
  const router = useRouter();

  const user = useUser();

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
    } catch (error) {
      const { code, message } = error as unknown as authError;
      console.error(`Google Login ${code} error: ${message}`);
    }
  };

  useEffect(() => {
    if (user) router.push('/');
  }, [user]);

  return (
    <LoginTemplate
      logoURL="/assets/images/logo.png"
      buttonLabel="Google Login"
      decorationColor="#e8d1ac"
      loginEvent={handleGoogleLogin}
    />
  );
}
