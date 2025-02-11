import React, { useEffect } from 'react';
import { GRID_SIZE } from '../utils/constants';
import Switch from '../components/Switch';
import useLocalStorage from '../hooks/useLocalStorage';
import useTheme from '../hooks/useTheme';
import { ThemeName } from '../themes/types';
import LightBg from '../assets/img/landing-light.png';
import DarkBg from '../assets/img/landing-dark.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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
    <div className="min-h-screen h-full w-full bg-background dark:bg-background-dark transition-colors duration-200">
      <div className="relative z-20 flex flex-col justify-start w-full h-full items-center rounded-none overflow-hidden">
        <Navbar />
        <div className="flex justify-start flex-col h-full items-center" style={{ width: `${GRID_SIZE}px` }}>
          <div className="w-full flex justify-end relative z-10 py-2">
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
        <Footer />
      </div>
      <img
        src={config.theme === ThemeName.DEFAULT ? LightBg : DarkBg}
        className="absolute opacity-30 left-8 top-1/2 transform -translate-y-1/2"

        style={{
          width: '450px',
          height: '750px',
          rotate: '30deg',
        }}
      />
      <div className="w-screen h-screen backdrop-blur-sm absolute top-0 left-0"></div>
    </div>
  );
};
