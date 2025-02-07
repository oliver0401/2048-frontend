import React from 'react';
import { GameLayout } from '../layouts';
import Text from '../components/Text';
import Box from '../components/Box';
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
      <Box
        inlineSize="100%"
        flexDirection="column"
        justifyContent="center"
        margin="s4"
        gap="s4"
        zIndex={10}
        background='transparent'
      >
        <Text fontSize={32} as="p" color="primary">
          Sign In
        </Text>
        <Box
          gap="s1"
          inlineSize={'100%'}
          flexDirection="column"
          alignItems="start"
        >
          <Text fontSize={16} as="p" color="primary">
            Email:
          </Text>
          <Input placeholder="Enter your email" width={'100%'} fontSize={18} />
        </Box>
        <Box
          gap="s1"
          inlineSize={'100%'}
          flexDirection="column"
          alignItems="start"
        >
          <Text fontSize={16} as="p" color="primary">
            Password:
          </Text>
          <Input
            placeholder="Enter your password"
            width={'100%'}
            fontSize={18}
          />
        </Box>
        <Button onClick={() => {}} width={'100%'}>
          Sign In
        </Button>
      </Box>
      <img
        src={config.theme === ThemeName.DEFAULT ? LightBg : DarkBg}
        style={{
          position: 'absolute',
          top: 325,
          left: 25,
          width: '400px',
          height: '700px',
          opacity: 0.5,
          rotate: '30deg',
        }}
        alt="Background"
      />
    </GameLayout>
  );
};
