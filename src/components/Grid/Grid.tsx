import React, { FC, useMemo } from 'react';
import { createIndexArray } from '../../utils/common';

export interface GridProps {
  width: number;
  height: number;
  rows: number;
  cols: number;
  spacing: number;
}

const Grid: FC<GridProps> = ({ width, height, rows, cols, spacing }) => {
  const Cells = useMemo(() => {
    const cells = createIndexArray(rows * cols);
    return cells.map((c) => (
      <div
        key={c}
        className="w-full h-full bg-tertiary dark:bg-tertiary-dark rounded-2xl opacity-30"
      />
    ));
  }, [rows, cols]);

  return (
    <div
      className="box-border grid bg-secondary dark:bg-secondary-dark rounded-md border-8 border-secondary dark:border-secondary-dark"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: `${spacing}px`,
      }}
    >
      {Cells}
    </div>
  );
};

export default Grid;
