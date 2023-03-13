import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    font-size: 16px;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    color: ${theme.palette.black};
    -webkit-text-size-adjust: none;
    font-family: -apple-system,BlinkMacSystemFont,helvetica,Apple SD Gothic Neo,sans-serif;       
    font-display: fallback;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  button {
    color: ${theme.palette.black};
    background: none;
    padding: 0;
    border: none;
    cursor: pointer;
    &:disabled {
        cursor: default;
        fill: #f2f3f4;
    }
  }

  .text-limit {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :focus {
    outline: none;
  }
  
  ::-webkit-scrollbar {
    display: none;
  }
`;
