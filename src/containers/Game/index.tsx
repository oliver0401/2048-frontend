import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Control from '../../components/Control';
import GameBoard from '../../components/GameBoard';
import ScoreBoard from '../../components/ScoreBoard';
import Text from '../../components/Text';
import useGameBoard, { Cell, Tile } from '../../hooks/useGameBoard';
import useGameScore from '../../hooks/useGameScore';
import useGameState, { GameStatus } from '../../hooks/useGameState';
import useScaleControl from '../../hooks/useScaleControl';
import { GRID_SIZE, MIN_SCALE, SPACING } from '../../utils/constants';
import useLocalStorage from '../../hooks/useLocalStorage';
import { canGameContinue, isWin } from '../../utils/rules';
import { ThemeImage, useMainContext } from '../../context/MainContext';
import { BsLightningFill } from 'react-icons/bs';
import './game.css';
import Modal from '../../components/Modal';
import { useToggle } from '../../hooks/useToggle';

export type Configuration = {
  bestScore: number;
  totalScore: number;
  rows: number;
  cols: number;
  count: number;
  initialGrid: Cell[][];
  initialTiles: Tile[];
};

const APP_NAME = 'react-2048';

export const GameContainer: FC = () => {
  const {
    user,
    boltOpen,
    onBoltClose,
    boltStatus,
    setBoltStatus,
    themeImages,
    theme,
    handleUpdateUser,
  } = useMainContext();
  const [gameState, setGameStatus] = useGameState({
    status: 'running',
    pause: false,
  });

  const [config, setConfig] = useLocalStorage<Configuration>(APP_NAME, {
    bestScore: 0,
    totalScore: 0,
    count: 0,
    rows: MIN_SCALE,
    cols: MIN_SCALE,
    initialGrid: [
      Array(MIN_SCALE).fill(undefined),
      Array(MIN_SCALE).fill(undefined),
    ],
    initialTiles: [],
  });

  const [rows, setRows] = useScaleControl(config.rows, user?.rows || 4);
  const [cols, setCols] = useScaleControl(config.cols, user?.cols || 4);

  const { total, best, count, addScore, setTotal, addCount, setCount } =
    useGameScore(config.bestScore, config.totalScore, config.count);

  const {
    tiles,
    grid,
    onMove,
    onMovePending,
    onMergePending,
    breakTile,
    x2Tile,
  } = useGameBoard({
    rows,
    cols,
    gameState,
    addScore,
    addCount,
    initialGrid: config.initialGrid,
    initialTiles: config.initialTiles,
  });

  const [isUserChanging, setIsUserChanging] = useState(false);
  const [pendingFunction, setPendingFunction] = useState<Function | null>(null);

  const onResetGame = useCallback(() => {
    setGameStatus('restart');
  }, [setGameStatus]);

  const onCloseNotification = useCallback(
    (currentStatus: GameStatus) => {
      setGameStatus(currentStatus === 'win' ? 'continue' : 'restart');
    },
    [setGameStatus],
  );

  const onChangeRow = (newRows: number) => {
    onFinishOpen();
    setPendingFunction(() => {
      return () => {
        setRows(newRows);
        setIsUserChanging(true);
      };
    });
  };

  const onChangeCol = (newCols: number) => {
    onFinishOpen();
    setPendingFunction(() => {
      return () => {
        setCols(newCols);
        setIsUserChanging(true);
      };
    });
  };

  const {
    open: isFinishOpen,
    onOpen: onFinishOpen,
    onClose: onFinishClose,
  } = useToggle(false);

  if (gameState.status === 'restart') {
    setTotal(0);
    setCount(0);
    setGameStatus('running');
  } else if (gameState.status === 'running' && isWin(tiles)) {
    setGameStatus('win');
  } else if (gameState.status !== 'lost' && !canGameContinue(grid, tiles)) {
    setGameStatus('lost');
    onFinishOpen();
  }

  useEffect(() => {
    if (isUserChanging) {
      setGameStatus('restart');
      setIsUserChanging(false);
    }
  }, [rows, cols, isUserChanging, setGameStatus]);

  useEffect(() => {
    setConfig({
      rows,
      cols,
      count,
      bestScore: best,
      totalScore: total,
      initialGrid: grid.map((row) => row.map((cell) => cell || undefined)),
      initialTiles: tiles.map((tile) => ({ ...tile })),
    });
  }, [rows, cols, best, total, setConfig, count]);

  useEffect(() => {
    if (boltStatus.enabled && count - boltStatus.currentStart >= 10) {
      setBoltStatus({
        enabled: false,
        currentStart: 0,
      });
    }
  }, [count]);

  const [maxTile, setMaxTile] = useState(2);

  useEffect(() => {
    if (tiles.length > 0) {
      setMaxTile(Math.max(...tiles.map((tile) => tile.value)));
    }
  }, [tiles]);

  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    setIsImageLoading(true);
  }, [maxTile]);

  const totalEarnings = useMemo(
    () => (maxTile > 1024 ? Math.floor(total * 0.01 + maxTile * 0.1) : 0),
    [total, maxTile],
  );

  return (
    <div className="w-screen h-[calc(100vh-160px)] flex gap-4 justify-center">
      {theme !== 'default' && (
        <div className="min-w-96 max-w-96 max-h-min flex flex-col gap-4 p-2 rounded-md bg-black/30 dark:bg-white/10">
          <div className="relative w-full max-h-96">
            <img
              src={themeImages[maxTile as ThemeImage]?.lg}
              alt="theme"
              className={`z-20 absolute w-full max-h-96 inset-0 transition-all duration-300 ${
                isImageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setIsImageLoading(false)}
            />
            <img
              src={themeImages[maxTile as ThemeImage]?.sm}
              alt="theme"
              className={`z-10 absolute w-full max-h-96 inset-0 transition-all duration-300 ${
                isImageLoading ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
          <div className="mt-96 text-center text-2xl text-white dark:text-primary-dark font-bold">
            {themeImages[maxTile as ThemeImage]?.title}
          </div>
          <div className="text-white dark:text-primary-dark text-xl p-2 rounded-md bg-black/30 dark:bg-black/30">
            {themeImages[maxTile as ThemeImage]?.description}
          </div>
        </div>
      )}
      <div className="relative">
        <div
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
          onAnimationEnd={onBoltClose}
        >
          {boltOpen && (
            <BsLightningFill
              size={128}
              className="z-20 text-blue-500 bolt-fade-out pointer-events-none"
            />
          )}
        </div>
        <div className="w-full flex justify-between mt-2">
          <div className="flex w-full justify-center items-center">
            <ScoreBoard total={count} title="count" />
            <ScoreBoard total={total} title="score" />
            <ScoreBoard total={best} title="best" />
          </div>
        </div>
        <div className="w-full mt-2 mb-6">
          <Control
            rows={rows}
            cols={cols}
            onReset={onFinishOpen}
            onChangeRow={onChangeRow}
            onChangeCol={onChangeCol}
            maxScaleRows={user?.rows || 4}
            maxScaleCols={user?.cols || 4}
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
          breakTile={breakTile}
          x2Tile={x2Tile}
        />
        <div className="my-4 flex justify-center flex-col">
          <Text fontSize={16} as="p" color="primary">
            ✨ Join tiles with the same value to get 2048
          </Text>
          <Text fontSize={16} as="p" color="primary">
            🕹️ Play with arrow keys or swipe
          </Text>
        </div>
        <Modal isOpen={isFinishOpen} onClose={onFinishClose} title={'Finish'}>
          <div className="flex flex-col gap-2 w-full justify-center items-center">
            <Text fontSize={24} as="p" color="primary" className="font-bold border border-primary/50 dark:border-primary-dark/50 bg-primary/10 dark:bg-primary-dark/10 px-2 py-1 rounded-md">
              {gameState.status === 'lost' ? (
                "You can't move anymore."
              ) : pendingFunction ? (
                'Really Change Scale?'
              ) : (
                <p className='text-center'>
                  'You can continue game.
                  <br /> Do you really finish the game?'
                </p>
              )}
            </Text>
            <Text fontSize={24} as="p" color="primary" className="font-bold">
              Game Status
            </Text>
            <div className="w-1/2 flex items-center justify-between">
              <Text fontSize={20} as="p" color="primary">
                Current Count:
              </Text>
              <Text fontSize={20} as="p" color="primary">
                {count}
              </Text>
            </div>
            <div className="w-1/2 flex items-center justify-between">
              <Text fontSize={20} as="p" color="primary">
                Total Score:
              </Text>
              <Text fontSize={20} as="p" color="primary">
                {total}
              </Text>
            </div>
            <div className="w-1/2 flex items-center justify-between">
              <Text fontSize={20} as="p" color="primary">
                Max Tile:
              </Text>
              <Text fontSize={20} as="p" color="primary">
                {maxTile}
              </Text>
            </div>
            <hr className="w-full border-t border-primary dark:border-primary-dark" />
            <div className="w-2/3 flex items-center justify-between">
              <Text fontSize={20} as="p" color="primary">
                Total Earnings:
              </Text>
              <Text fontSize={20} as="p" color="primary">
                {totalEarnings}(GLD)
              </Text>
            </div>
            <div className="flex gap-4 w-full justify-end">
              <button
                onClick={onFinishClose}
                className="bg-primary hover:bg-primary/80 text-white px-2 py-1 rounded-md min-w-24 transition-all"
              >
                Continue
              </button>
              <button
                onClick={() => {
                  if (pendingFunction) {
                    pendingFunction();
                    setPendingFunction(null);
                  }
                  onResetGame();
                  onFinishClose();
                  if (user) {
                    if (
                      total > user.maxScore ||
                      count > user.maxMoves ||
                      maxTile > user.maxTile
                    ) {
                      handleUpdateUser({
                        maxScore: user.maxScore < total ? total : user.maxScore,
                        maxTile:
                          user.maxTile < maxTile ? maxTile : user.maxTile,
                        maxMoves: user.maxMoves < count ? count : user.maxMoves,
                      });
                    }
                  }
                }}
                className="bg-primary-dark hover:bg-primary-dark/80 text-white px-2 py-1 rounded-md min-w-24 transition-all"
              >
                Finish
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
