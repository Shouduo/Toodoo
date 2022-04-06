import * as React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from '@/pages/IndexPage';
import { IconButton, PaletteMode, ThemeOptions } from '@mui/material';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { getDesignTokens } from '@/theme';
import * as colors from '@mui/material/colors';
//
export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});
//
const App = () => {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<IndexPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
