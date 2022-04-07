import * as React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from '@/pages/IndexPage';
import { PaletteMode } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getDesignTokens } from '@/theme';
//
export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});
//
const App = () => {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const timer = React.useRef<number>();

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const UpdateTheme = () => {
    const nowDate = new Date();
    if (nowDate.getMinutes() === 0) {
      if (nowDate.getHours() === 18) {
        setMode('dark');
      } else if (nowDate.getHours() === 6) {
        setMode('light');
      }
    }
  };

  React.useEffect(() => {
    if (new Date().getHours() >= 18 || new Date().getHours() <= 6) {
      setMode('dark');
    } else {
      setMode('light');
    }
    timer.current = window.setInterval(UpdateTheme, 60 * 1000);
    return () => {
      window.clearInterval(timer.current);
    };
  }, []);

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
