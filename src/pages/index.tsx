import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getCookie } from '../utils/cookie';
import MainPage from './main';

function Home() {
  const router = useRouter();

  const token = getCookie('token');

  useEffect(() => {
    if (token) return;

    router.push({
      pathname: 'login',
    });
  });

  return <MainPage></MainPage>;
}

export default Home;
