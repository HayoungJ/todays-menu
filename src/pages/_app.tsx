import type { AppProps } from 'next/app';
import Head from 'next/head';

import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

import { UserProvider } from '../contexts/UserContext';

import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/global-style';
import { theme } from '../styles/theme';
import { getCookie } from '../utils/cookie';
import LoginPage from './login';
import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';


const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const token = getCookie('token');

  useEffect(() => {
    const isLoginPage = router.pathname.includes('login');
    if (token && isLoginPage) router.push('/');
    else if (!token && !isLoginPage) router.push('/login');
  })

  return (
    <QueryClientProvider client={client}>
      <Head>
        <title>오늘 뭐 먹지</title>
        <meta
          name="description"
          content="오늘 먹을 메뉴를 정하는데 도움을 주는 애플리케이션"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <UserProvider>
          { token ? <Component {...pageProps} /> : <LoginPage /> }
        </UserProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;