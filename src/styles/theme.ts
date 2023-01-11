import { DefaultTheme } from 'styled-components';

const fontSize = {
  xs: '0.5rem',
  sm: '0.75rem',
  base: '1rem',
  md: '1.25rem',
  lg: '1.5rem',
};

const palette = {
  red: '#dd2b1f',
  gray: '#dedede',
  white: '#fefefe',
};

export const theme: DefaultTheme = {
  fontSize,
  palette,
  borderRadius: '4px',
};
