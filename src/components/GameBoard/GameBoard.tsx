import React, { FC, useEffect, useRef, useState } from 'react';
import useArrowKeyPress from '../../hooks/useArrowKeyPress';
import type { Location, Tile } from '../../hooks/useGameBoard';
import type { GameStatus } from '../../hooks/useGameState';
import useSwipe from '../../hooks/useSwipe';
import { calcLocation, calcTileSize } from '../../utils/common';
import { Vector } from '../../utils/types';
import Grid from '../Grid';
import Notification from '../Notification';
import TileComponent from '../Tile';

export interface GameBoardProps {
  tiles?: Tile[];
  gameStatus: GameStatus;
  rows: number;
  cols: number;
  boardSize: number;
  spacing: number;
  onMove: (dir: Vector) => void;
  onMovePending: () => void;
  onMergePending: () => void;
  onCloseNotification: (currentStatus: GameStatus) => void;
  breakTile: (tile: Location) => void;
  x2Tile: (tile: Location) => void;
}

const GameBoard: FC<GameBoardProps> = ({
  tiles,
  gameStatus,
  rows,
  cols,
  boardSize,
  spacing,
  onMove,
  onMovePending,
  onMergePending,
  onCloseNotification,
  breakTile,
  x2Tile,
}) => {
  const [{ width: tileWidth, height: tileHeight }, setTileSize] = useState(() =>
    calcTileSize(boardSize, rows, cols, spacing),
  );
  const boardRef = useRef<HTMLDivElement>(null);
  useArrowKeyPress(onMove);
  useSwipe(boardRef, onMove);

  useEffect(() => {
    setTileSize(calcTileSize(boardSize, rows, cols, spacing));
  }, [boardSize, cols, rows, spacing]);

  return (
    <div className="relative" ref={boardRef}>
      <Grid
        width={boardSize}
        height={boardSize}
        rows={rows}
        cols={cols}
        spacing={spacing}
      />
      <div
        className="absolute top-0 left-0 bg-transparent w-full h-full"
        onTransitionEnd={onMovePending}
        onAnimationEnd={onMergePending}
      >
        {tiles?.map(({ r, c, id, value, isMerging, isNew }) => (
          <TileComponent
            key={id}
            width={tileWidth}
            height={tileHeight}
            x={calcLocation(tileWidth, c, spacing)}
            y={calcLocation(tileHeight, r, spacing)}
            value={value}
            isNew={isNew}
            isMerging={isMerging}
            breakTile={breakTile}
            x2Tile={x2Tile}
          />
        ))}
      </div>
      {(gameStatus === 'win' || gameStatus === 'lost') && (
        <Notification
          win={gameStatus === 'win'}
          onClose={() => onCloseNotification(gameStatus)}
        />
      )}
    </div>
  );
};

export default GameBoard;
