import type { AppProps } from 'next/app';
import Head from 'next/head';

import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/global-style';
import { theme } from '../styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
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
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
