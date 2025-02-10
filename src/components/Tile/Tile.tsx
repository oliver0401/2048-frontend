import React, { FC } from 'react';
import { getTileFontSize } from '../../utils/common';

export interface TileProps {
  value: number;
  x: number;
  y: number;
  width: number;
  height: number;
  isNew?: boolean;
  isMerging?: boolean;
}

const Tile: FC<TileProps> = ({
  value,
  x,
  y,
  width,
  height,
  isNew = false,
  isMerging = false,
}) => {
  // Safelist the tile color classes
  const getTileColorClass = (val: number) => {
    const colorMap: Record<number, string> = {
      2: 'bg-tile-2 dark:bg-tile-2-dark',
      4: 'bg-tile-4 dark:bg-tile-4-dark',
      8: 'bg-tile-8 dark:bg-tile-8-dark',
      16: 'bg-tile-16 dark:bg-tile-16-dark',
      32: 'bg-tile-32 dark:bg-tile-32-dark',
      64: 'bg-tile-64 dark:bg-tile-64-dark',
      128: 'bg-tile-128 dark:bg-tile-128-dark',
      256: 'bg-tile-256 dark:bg-tile-256-dark',
      512: 'bg-tile-512 dark:bg-tile-512-dark',
      1024: 'bg-tile-1024 dark:bg-tile-1024-dark',
      2048: 'bg-tile-2048 dark:bg-tile-2048-dark',
    };
    return colorMap[val] || colorMap[2]; // fallback to 2 if value not found
  };

  return (
    <div
      className="absolute top-0 left-0 flex justify-center transition-transform duration-100 ease-in-out bg-transparent"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        fontSize: `${getTileFontSize(width, height, value)}px`,
        transform: `translate(${x}px, ${y}px)`,
      }}

    >
      <div
        className={`
          w-full h-full flex items-center justify-center
          rounded select-none
          ${getTileColorClass(value)}
          ${value > 4 ? 'text-foreground dark:text-foreground-dark' : 'text-primary dark:text-primary-dark'}
          ${isMerging ? 'animate-pop' : isNew ? 'animate-expand' : ''}
        `}
      >
        {value}
      </div>
    </div>
  );
};

export default Tile;
