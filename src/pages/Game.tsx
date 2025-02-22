import React from 'react';
import { GameContainer } from '../containers';
import { GameLayout } from '../layouts';

export const Game: React.FC = () => {
  return (
    <GameLayout>
      <GameContainer />
    </GameLayout>
  );
};
