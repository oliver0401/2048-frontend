import React from 'react';
import { GameLayout } from '../layouts';
import Button from '../components/Button';
import Text from '../components/Text';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../consts';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <GameLayout>
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <Text
          as="h1"
          color="primary"
          fontSize={24}
          className="text-2xl font-bold"
        >
          Welcome to 2048!
        </Text>
        <Text as="p" color="primary" fontSize={16} className="text-sm">
          Join the numbers and get to the 2048 tile!
        </Text>
        <Button onClick={() => navigate(PATH.SIGN_IN)} color="primary">
          Start Game
        </Button>
      </div>
    </GameLayout>
  );
};
