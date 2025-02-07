import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import Box from '../components/Box';
import { GRID_SIZE } from '../utils/constants';
import Switch from '../components/Switch';
import useLocalStorage from '../hooks/useLocalStorage';
import useTheme from '../hooks/useTheme';
import { ThemeName } from '../themes/types';

type Configuration = {
  theme: ThemeName;
};

export const GameLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [config, setConfig] = useLocalStorage<Configuration>('theme', {
    theme: ThemeName.DEFAULT,
  });
  const [{ name: themeName, value: themeValue }, setTheme] = useTheme(
    config.theme,
  );
  useEffect(() => {
    setConfig({ theme: themeName });
  }, [themeName, setConfig]);
  return (
    <ThemeProvider theme={themeValue}>
      <Box
        justifyContent="center"
        inlineSize="100%"
        blockSize="100%"
        alignItems="start"
        borderRadius={0}
        overflow="hidden"
      >
        <Box
          justifyContent="center"
          flexDirection="column"
          inlineSize={`${GRID_SIZE}px`}
        >
          <Box marginBlockStart="s6" inlineSize="100%" justifyContent="end">
            <Switch
              title="dark mode"
              checked={themeName === ThemeName.DARK}
              activeValue={ThemeName.DARK}
              inactiveValue={ThemeName.DEFAULT}
              onChange={setTheme}
            />
          </Box>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
