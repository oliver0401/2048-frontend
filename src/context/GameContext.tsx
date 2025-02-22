import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GameStatus } from '../hooks/useGameState';

interface GameState {
  status: GameStatus;
  pause: boolean;
  total: number; // Add total score
  best: number; // Add best score
  tiles: any[]; // Define a more specific type based on your tile structure
  grid: any[][]; // Define a more specific type based on your grid structure
}

interface GameContextType {
  gameStatus: GameState;
  setGameStatus: (state: GameState) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [gameStatus, setGameStatus] = useState<GameState>({
    status: 'running',
    pause: false,
    total: 0,
    best: 0,
    tiles: [],
    grid: [],
  });

  return (
    <GameContext.Provider value={{ gameStatus, setGameStatus }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
