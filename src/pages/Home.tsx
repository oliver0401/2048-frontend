import React from 'react';
import { GameLayout } from '../layouts';
import Text from '../components/Text';
import Input from '../components/Input';
import Button from '../components/Button';
import useLocalStorage from '../hooks/useLocalStorage';
import { ThemeName } from '../themes/types';
import LightBg from '../assets/img/landing-light.png';
import DarkBg from '../assets/img/landing-dark.png';

export const Home: React.FC = () => {
  const [config] = useLocalStorage('theme', {
    theme: ThemeName.DEFAULT,
  });

  return (
    <GameLayout>
      <div className="w-full flex flex-col justify-center my-4 gap-4 z-10 bg-transparent">
        <Text fontSize={32} as="p" color="primary">
          Sign In
        </Text>
        <div className="w-full flex flex-col items-start gap-1">
          <Text fontSize={16} as="p" color="primary">
            Email:
          </Text>
          <Input placeholder="Enter your email" width="100%" fontSize={18} />
        </div>
        <div className="w-full flex flex-col items-start gap-1">
          <Text fontSize={16} as="p" color="primary">
            Password:
          </Text>
          <Input
            placeholder="Enter your password"
            width="100%"
            fontSize={18}
          />
        </div>
        <Button onClick={() => {}} width="w-full">
          Sign In
        </Button>
      </div>
      <img
        src={config.theme === ThemeName.DEFAULT ? LightBg : DarkBg}
        className="absolute opacity-50"
        style={{
          top: 325,
          left: 25,
          width: '400px',
          height: '700px',
          rotate: '30deg',
        }}
        alt="Background"
      />
    </GameLayout>
  );
};
