import React, { useEffect } from 'react';
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
  const [{ name: themeName }, setTheme] = useTheme(config.theme);
  
  useEffect(() => {
    setConfig({ theme: themeName });
  }, [themeName, setConfig]);

  return (
    <div className="min-h-screen w-full bg-background dark:bg-background-dark transition-colors duration-200">
      <div className="flex justify-center w-full h-full items-start rounded-none overflow-hidden">
        <div className="flex justify-center flex-col" style={{ width: `${GRID_SIZE}px` }}>
          <div className="mt-6 w-full flex justify-end">
            <Switch
              title="dark mode"
              checked={themeName === ThemeName.DARK}
              activeValue={ThemeName.DARK}
              inactiveValue={ThemeName.DEFAULT}
              onChange={setTheme}
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
