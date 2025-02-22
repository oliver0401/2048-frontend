import React from 'react';
import { LeaderboardContainer } from '../containers';
import { GameLayout } from '../layouts';

export const Leaderboard: React.FC = () => {
  return (
    <GameLayout>
      <LeaderboardContainer />
    </GameLayout>
  );
};
