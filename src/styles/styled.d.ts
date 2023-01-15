import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      md: string;
      lg: string;
    };

    palette: {
      red: string;
      gray: string;
      white: string;
      black: string;
    };

    borderRadius: string;
  }
}
