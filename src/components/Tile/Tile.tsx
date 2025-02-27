import React, { FC, useState } from 'react';
import { getTileFontSize } from '../../utils/common';
import { ThemeImage, useMainContext } from '../../context/MainContext';
import { MOUSE } from '../../consts';
import { useToggle } from '../../hooks/useToggle';
import { Location } from '../../hooks/useGameBoard';
import { GiUpgrade } from 'react-icons/gi';

export interface TileProps {
  value: ThemeImage;
  x: number;
  y: number;
  width: number;
  height: number;
  isNew?: boolean;
  isMerging?: boolean;
  breakTile: (tile: Location) => void;
  x2Tile: (tile: Location) => void;
}

const glass = [
  'https://i.postimg.cc/pL4qDqP3/glass1.png',
  'https://i.postimg.cc/66PLLMNS/glass2.png',
  'https://i.postimg.cc/nzjK6m4T/glass3.png',
  'https://i.postimg.cc/QM5xwxB1/glass4.png',
];

const Tile: FC<TileProps> = ({
  value,
  x,
  y,
  width,
  height,
  isNew = false,
  isMerging = false,
  breakTile,
  x2Tile,
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
      4096: 'bg-tile-4096 dark:bg-tile-4096-dark',
      8192: 'bg-tile-8192 dark:bg-tile-8192-dark',
      16384: 'bg-tile-16384 dark:bg-tile-16384-dark',
      32768: 'bg-tile-32768 dark:bg-tile-32768-dark',
      65536: 'bg-tile-65536 dark:bg-tile-65536-dark',
    };
    return colorMap[val] || colorMap[2]; // fallback to 2 if value not found
  };
  const { cursor, setCursor, themeImages, theme, handleUpdateUser, user, itemUsed, setItemUsed } =
    useMainContext();
  const { open, onOpen, onClose } = useToggle(false);
  const {
    open: openX2,
    onOpen: onOpenX2,
    onClose: onCloseX2,
  } = useToggle(false);
  const [breakImg, setBreakImg] = useState<string>(
    glass[Math.floor(Math.random() * 4)],
  );

  const handleClick = () => {
    if (cursor === MOUSE.Hammer) {
      breakTile({ r: Math.floor(y / height), c: Math.floor(x / width) });
      setCursor(MOUSE.Default);
      handleUpdateUser({ hammer: user?.hammer ? user?.hammer - 1 : 0 });
    }
    if (cursor === MOUSE.X2) {
      x2Tile({ r: Math.floor(y / height), c: Math.floor(x / width) });
      setCursor(MOUSE.Default);
      handleUpdateUser({ upgrade: user?.upgrade ? user?.upgrade - 1 : 0 });
      setItemUsed({ ...itemUsed, upgrade: true });
    }
  };

  return (
    <div
      className="absolute top-0 left-0 flex justify-center transition-transform duration-100 ease-in-out bg-transparent"
      onMouseOver={() => {
        if (cursor === MOUSE.Hammer) {
          onOpen();
        }
        if (cursor === MOUSE.X2) {
          onOpenX2();
        }
      }}
      onMouseLeave={() => {
        if (cursor === MOUSE.Hammer) {
          setBreakImg(glass[Math.floor(Math.random() * 4)]);
        }
        onCloseX2();
        onClose();
      }}
      onClick={handleClick}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        fontSize: `${getTileFontSize(width, height, value)}px`,
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      {open && (
        <img
          src={breakImg}
          alt="break"
          className="absolute top-0 left-0 w-full h-full z-20"
        />
      )}
      {openX2 && (
        <div className="bg-black/60 text-primary/80 dark:text-primary-dark/80 animate-pulse absolute top-0 left-0 w-full h-full z-20 flex items-center justify-center">
          <GiUpgrade className="animate-bounce" />
        </div>
      )}
      <div
        className={`
          w-full h-full flex items-center justify-center
          rounded-3xl select-none
          ${getTileColorClass(value)}
          ${
            value > 4
              ? 'text-foreground dark:text-foreground-dark'
              : 'text-primary dark:text-primary-dark'
          }
          ${isMerging ? 'animate-pop' : isNew ? 'animate-expand' : ''}
        `}
      >
        {theme === 'default' ? (
          value
        ) : (
          <img
            src={themeImages[value]?.sm}
            alt="evolve"
            className="w-full h-full"
          />
        )}
      </div>
    </div>
  );
};

export default Tile;
