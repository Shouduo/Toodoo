import * as colors from '@mui/material/colors';
import { PaletteMode, ThemeOptions } from '@mui/material';

//
const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    error: {
      main: colors.red[500],
      light: colors.red[200],
      dark: colors.red[800],
      contrastText: '#fff',
    },
    success: {
      main: colors.green[500],
      light: colors.green[200],
      dark: colors.green[800],
      contrastText: '#fff',
    },
    warning: {
      main: colors.orange[500],
      light: colors.orange[200],
      dark: colors.orange[800],
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      main: colors.blue[500],
      light: colors.blue[200],
      dark: colors.blue[800],
      contrastText: '#fff',
    },
    text: {
      primary: '#1A2027',
      secondary: '#3E5060',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
      paper: colors.common.white,
      default: colors.common.white,
    },
  },
};
//
const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    error: {
      main: colors.red[600],
      light: colors.red[200],
      dark: colors.red[900],
      contrastText: '#fff',
    },
    success: {
      main: colors.green[600],
      light: colors.green[200],
      dark: colors.green[900],
      contrastText: '#fff',
    },
    warning: {
      main: colors.orange[600],
      light: colors.orange[200],
      dark: colors.orange[900],
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      main: colors.blue[600],
      light: colors.blue[200],
      dark: colors.blue[900],
      contrastText: '#fff',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
      // paper: colors.common.black,
      // default: colors.common.black,
      paper: '#282c34',
      default: '#282c34',
    },
  },
};
//
export const getDesignTokens = (mode: PaletteMode): ThemeOptions =>
  mode === 'light' ? lightTheme : darkTheme;
