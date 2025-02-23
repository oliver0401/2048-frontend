import React, { useEffect, useMemo, useState } from 'react';
import { useMainContext } from '../../../context';

type TMaxTile = {
  count: number;
  rate: number;
};

type TileValue = 65536 | 32768 | 16384 | 8192 | 4096 | 2048;

export const MaxTileTab: React.FC = () => {
  const { handleGetMaxTile, user } = useMainContext();
  const colorClass = useMemo(
    () => ({
      65536: 'bg-tile-65536 dark:bg-tile-65536-dark',
      32768: 'bg-tile-32768 dark:bg-tile-32768-dark',
      16384: 'bg-tile-16384 dark:bg-tile-16384-dark',
      8192: 'bg-tile-8192 dark:bg-tile-8192-dark',
      4096: 'bg-tile-4096 dark:bg-tile-4096-dark',
      2048: 'bg-tile-2048 dark:bg-tile-2048-dark',
    }),
    [],
  );
  const [tileData, setTileData] = useState<TMaxTile[]>([]);
  useEffect(() => {
    handleGetMaxTile().then((data) => {
      console.log('handleGetMaxTile', data);
      setTileData(data);
    });
  }, []);

  const tiles = Object.keys(colorClass)
    .map((key) => Number(key))
    .reverse() as TileValue[];

  const getTileClass = (value: TileValue) => {
    return colorClass[value];
  };

  return (
    <div className="w-full flex flex-col items-center justify-start gap-4 overflow-auto h-[calc(100vh-272px)] px-1">
      {tiles.map((tile, idx) => (
        <div
          key={tile}
          className={`w-full max-w-2xl flex items-center justify-between p-2 bg-white dark:bg-gray-800/80 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
            tile === user?.maxTile ? 'border-2 border-primary-dark' : ''
          }`}
        >
          <div className="flex items-center gap-6">
            <div
              className={`text-2xl font-bold ${getTileClass(
                tile,
              )} text-foreground dark:text-foreground-dark w-20 h-20 flex items-center justify-center rounded-2xl shadow-md animate-pop`}
            >
              {tile}
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-lg font-semibold text-primary dark:text-primary-dark">
                Players
              </div>
              <div className="text-2xl font-bold text-primary/50 dark:text-primary-dark/50">
                {tileData[idx]?.count || 0}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-2 bg-primary dark:bg-primary-dark text-white rounded-lg font-medium min-w-32 flex items-center justify-between">
              <div className="">Rate:</div>
              <div className="">{tileData[idx]?.rate * 100 || 0}%</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
