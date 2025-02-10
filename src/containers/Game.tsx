import React, { FC, useCallback, useEffect } from 'react';
import Control from '../components/Control';
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';
import Text from '../components/Text';
import useGameBoard from '../hooks/useGameBoard';
import useGameScore from '../hooks/useGameScore';
import useGameState, { GameStatus } from '../hooks/useGameState';
import useScaleControl from '../hooks/useScaleControl';
import { GRID_SIZE, MIN_SCALE, SPACING } from '../utils/constants';
import useLocalStorage from '../hooks/useLocalStorage';
import { canGameContinue, isWin } from '../utils/rules';

export type Configuration = {
  bestScore: number;
  rows: number;
  cols: number;
};

const APP_NAME = 'react-2048';

export const GameContainer: FC = () => {
  const [gameState, setGameStatus] = useGameState({
    status: 'running',
    pause: false,
  });

  const [config, setConfig] = useLocalStorage<Configuration>(APP_NAME, {
    bestScore: 0,
    rows: MIN_SCALE,
    cols: MIN_SCALE,
  });

  const [rows, setRows] = useScaleControl(config.rows);
  const [cols, setCols] = useScaleControl(config.cols);

  const { total, best, addScore, setTotal } = useGameScore(config.bestScore);

  const { tiles, grid, onMove, onMovePending, onMergePending } = useGameBoard({
    rows,
    cols,
    gameState,
    addScore,
  });

  const onResetGame = useCallback(() => {
    setGameStatus('restart');
  }, [setGameStatus]);

  const onCloseNotification = useCallback(
    (currentStatus: GameStatus) => {
      setGameStatus(currentStatus === 'win' ? 'continue' : 'restart');
    },
    [setGameStatus],
  );

  if (gameState.status === 'restart') {
    setTotal(0);
    setGameStatus('running');
  } else if (gameState.status === 'running' && isWin(tiles)) {
    setGameStatus('win');
  } else if (gameState.status !== 'lost' && !canGameContinue(grid, tiles)) {
    setGameStatus('lost');
  }

  useEffect(() => {
    setGameStatus('restart');
  }, [rows, cols, setGameStatus]);

  useEffect(() => {
    setConfig({ rows, cols, bestScore: best });
  }, [rows, cols, best, setConfig]);

  return (
    <>
      <div className="w-full flex justify-between mt-2">
        <div className="flex justify-center items-center">
          <Text fontSize={64} fontWeight="bold" color="primary">
            2048
          </Text>
          <ScoreBoard total={total} title="score" />
          <ScoreBoard total={best} title="best" />
        </div>
      </div>
      <div className="w-full mt-2 mb-6">
        <Control
          rows={rows}
          cols={cols}
          onReset={onResetGame}
          onChangeRow={setRows}
          onChangeCol={setCols}
        />
      </div>
      <GameBoard
        tiles={tiles}
        boardSize={GRID_SIZE}
        rows={rows}
        cols={cols}
        spacing={SPACING}
        gameStatus={gameState.status}
        onMove={onMove}
        onMovePending={onMovePending}
        onMergePending={onMergePending}
        onCloseNotification={onCloseNotification}
      />
      <div className="my-4 flex justify-center flex-col">
        <Text fontSize={16} as="p" color="primary">
          ✨ Join tiles with the same value to get 2048
        </Text>
        <Text fontSize={16} as="p" color="primary">
          🕹️ Play with arrow keys or swipe
        </Text>
      </div>
    </>
  );
};
