import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
  }
  html{
    font-size: 12px;
    -webkit-text-size-adjust: none;
    font-family: -apple-system,BlinkMacSystemFont,helvetica,Apple SD Gothic Neo,sans-serif;       
    font-display: fallback;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  button {
    background: none;
    padding: 0;
    border: none;
    cursor: pointer;
    &:disabled {
        cursor: default;
        fill: #f2f3f4;
    }
  }
  :focus {
    outline: none;
    border: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;
