import { useCallback, useRef, useState } from 'react';
import {
  clamp,
  createIndexArray,
  nextTileIndex,
  getId,
  resetTileIndex,
  shuffle,
  create2DArray,
} from '../utils/common';
import { Vector } from '../utils/types';
import type { GameState } from './useGameState';
import useLazyRef from './useLazyRef';
import { useMainContext } from '../context';

export interface Location {
  r: number;
  c: number;
}

export interface Tile extends Location {
  index: number; // self increment index
  id: string;
  isNew: boolean;
  isMerging: boolean;
  canMerge: boolean;
  value: number;
}

export type Cell = Tile | undefined;

export type GameBoardParams = {
  rows: number;
  cols: number;
  gameState: GameState;
  addScore: (score: number) => void;
  addCount: () => void;
  initialTiles?: Tile[];
  initialGrid?: Cell[][];
};



const createNewTile = (r: number, c: number): Tile => {
  const index = nextTileIndex();
  const id = getId(index);
  return {
    index,
    id,
    r,
    c,
    isNew: true,
    canMerge: false,
    isMerging: false,
    value: Math.random() > 0.99 ? 4 : 2,
  };
};

const getEmptyCellsLocation = (grid: Cell[][]) =>
  grid.flatMap((row, r) =>
    row.flatMap<Location>((cell, c) => (cell == null ? { r, c } : [])),
  );

const createNewTilesInEmptyCells = (
  emptyCells: Location[],
  tilesNumber: number,
) => {
  const actualTilesNumber =
    emptyCells.length < tilesNumber ? emptyCells.length : tilesNumber;

  if (!actualTilesNumber) return [];

  return shuffle(emptyCells)
    .slice(0, actualTilesNumber)
    .map(({ r, c }) => createNewTile(r, c));
};

const createTraversalMap = (rows: number, cols: number, dir: Vector) => {
  const rowsMap = createIndexArray(rows);
  const colsMap = createIndexArray(cols);
  return {
    // Always start from the last cell in the moving direction
    rows: dir.r > 0 ? rowsMap.reverse() : rowsMap,
    cols: dir.c > 0 ? colsMap.reverse() : colsMap,
  };
};

const sortTiles = (tiles: Tile[]) =>
  [...tiles].sort((t1, t2) => t1.index - t2.index);

const mergeAndCreateNewTiles = (grid: Cell[][]) => {
  const tiles: Tile[] = [];
  let score = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  const newGrid = grid.map((row) =>
    row.map((tile) => {
      if (tile != null) {
        const { canMerge, value, index, ...rest } = tile;
        const newValue = canMerge ? 2 * value : value;
        const mergedTile = {
          ...rest,
          index,
          value: newValue,
          isMerging: canMerge,
          canMerge: false,
          isNew: false,
        };

        tiles.push(mergedTile);

        if (canMerge) {
          score += newValue;
        }

        return mergedTile;
      }

      return tile;
    }),
  );

  const emptyCells = getEmptyCellsLocation(newGrid);
  const newTiles = createNewTilesInEmptyCells(
    emptyCells,
    Math.ceil((rows * cols) / 16),
  );
  newTiles.forEach((tile) => {
    newGrid[tile.r][tile.c] = tile;
    tiles.push(tile);
  });

  return {
    grid: newGrid,
    tiles,
    score,
  };
};

const moveInDirection = (grid: Cell[][], dir: Vector) => {
  const newGrid = grid.slice(0);
  const totalRows = newGrid.length;
  const totalCols = newGrid[0].length;
  const tiles: Tile[] = [];
  const moveStack: number[] = [];

  const traversal = createTraversalMap(totalRows, totalCols, dir);
  traversal.rows.forEach((row) => {
    traversal.cols.forEach((col) => {
      const tile = newGrid[row][col];
      if (tile != null) {
        const pos = {
          currRow: row,
          currCol: col,
          // clamp to ensure next row and col are still in the grid
          nextRow: clamp(row + dir.r, 0, totalRows - 1),
          nextCol: clamp(col + dir.c, 0, totalCols - 1),
        };

        while (pos.nextRow !== pos.currRow || pos.nextCol !== pos.currCol) {
          const { nextRow, nextCol } = pos;
          const nextTile = newGrid[nextRow][nextCol];
          if (nextTile != null) {
            // Move to the next cell if the tile inside has the same value and not been merged
            if (nextTile.value === tile.value && !nextTile.canMerge) {
              pos.currRow = nextRow;
              pos.currCol = nextCol;
            }
            break;
          }
          // We keep moving to the next cell until the cell contains a tile
          pos.currRow = nextRow;
          pos.currCol = nextCol;
          pos.nextRow = clamp(nextRow + dir.r, 0, totalRows - 1);
          pos.nextCol = clamp(nextCol + dir.c, 0, totalCols - 1);
        }

        const { currRow, currCol } = pos;
        const currentTile = newGrid[currRow][currCol];
        // If the tile has been moved
        if (currRow !== row || currCol !== col) {
          const canMerge = currentTile?.value === tile.value && !currentTile?.canMerge;
          const updatedTile = {
            ...tile,
            r: currRow,
            c: currCol,
            canMerge: canMerge,
            isNew: false,
            isMerging: false,
          };
          
          if (canMerge && currentTile) {
            newGrid[currRow][currCol] = {
              ...currentTile,
              canMerge: true
            };
          }
          
          newGrid[currRow][currCol] = updatedTile;
          newGrid[row][col] = undefined;
          tiles.push(updatedTile);
          moveStack.push(updatedTile.index);
        } else if (currentTile != null) {
          tiles.push({ ...currentTile, isNew: false, isMerging: false });
        }
      }
    });
  });

  return {
    tiles,
    grid: newGrid,
    moveStack,
  };
};

const createInitialTiles = (grid: Cell[][]) => {
  const emptyCells = getEmptyCellsLocation(grid);
  const rows = grid.length;
  const cols = grid[0].length;
  return createNewTilesInEmptyCells(emptyCells, Math.ceil((rows * cols) / 8));
};

const resetGameBoard = (rows: number, cols: number) => {
  // Index restarts from 0 on reset
  resetTileIndex();
  const grid = create2DArray<Cell>(rows, cols);
  const newTiles = createInitialTiles(grid);

  newTiles.forEach((tile) => {
    grid[tile.r][tile.c] = tile;
  });

  return {
    grid,
    tiles: newTiles,
  };
};

const useGameBoard = ({ rows, cols, gameState, addScore, initialTiles, initialGrid, addCount }: GameBoardParams) => {
  const { powerupStatus } = useMainContext();
  const gridMapRef = useLazyRef(() => {
    let grid: Cell[][];
    let tiles: Tile[];

    if (initialGrid && initialTiles) {
      // Validate grid dimensions
      console.log("initialGrid", initialGrid);
      console.log("initialTiles", initialTiles);
      if (initialGrid.length !== rows || initialGrid[0].length !== cols) {
        console.warn('Invalid initialGrid dimensions, falling back to default initialization');
        return initializeEmptyBoard(rows, cols);
      }

      // Validate that all tiles in initialTiles exist in initialGrid
      const isValidInitialState = initialTiles.every(tile => 
        initialGrid[tile.r]?.[tile.c]?.id === tile.id
      );

      if (!isValidInitialState) {
        console.warn('Inconsistent initialGrid and initialTiles, falling back to default initialization');
        return initializeDefaultBoard(rows, cols);
      }

      grid = initialGrid.map(row => [...row]);
      tiles = initialTiles.map(tile => ({ ...tile }));
    } else {
      return initializeEmptyBoard(rows, cols);
      // return initializeDefaultBoard(rows, cols);
    }

    return { grid, tiles };
  });

  const [tiles, setTiles] = useState<Tile[]>(gridMapRef.current.tiles);
  const pendingStackRef = useRef<number[]>([]);
  const pauseRef = useRef(gameState.pause);
  const isProcessingMove = useRef(false);

  const onMove = useCallback(
    (dir: Vector) => {
      if (isProcessingMove.current || pendingStackRef.current.length > 0 || pauseRef.current) {
        return;
      }
      
      isProcessingMove.current = true;
      try {
        const {
          tiles: newTiles,
          moveStack,
          grid,
        } = moveInDirection(gridMapRef.current.grid, dir);
        gridMapRef.current = { grid, tiles: newTiles };
        pendingStackRef.current = moveStack;

        if (moveStack.length > 0) {
          setTiles(sortTiles(newTiles));
        }
      } finally {
        isProcessingMove.current = false;
      }
    },
    [gridMapRef],
  );

  const onMovePending = useCallback(() => {
    pendingStackRef.current.pop();
    if (pendingStackRef.current.length === 0) {
      const {
        tiles: newTiles,
        score,
        grid,
      } = mergeAndCreateNewTiles(gridMapRef.current.grid);
      gridMapRef.current = { grid, tiles: newTiles };
      powerupStatus.enabled ? addScore(score * 2) : addScore(score);
      addCount();
      pendingStackRef.current = newTiles
        .filter((tile) => tile.isMerging || tile.isNew)
        .map((tile) => tile.index);
      setTiles(sortTiles(newTiles));
    }
  }, [addScore, addCount, powerupStatus.enabled, gridMapRef]);

  const onMergePending = useCallback(() => {
    pendingStackRef.current.pop();
  }, []);

  const breakTile = useCallback((tile: Location) => {
    if (pendingStackRef.current.length > 0 || pauseRef.current) {
      return;
    }
    
    const { r, c } = tile;
    if (r < 0 || r >= rows || c < 0 || c >= cols) {
      return;
    }

    const targetTile = gridMapRef.current.grid[r][c];
    if (!targetTile) {
      return;
    }

    const newGrid = gridMapRef.current.grid.map(row => [...row]);
    newGrid[r][c] = undefined;

    const updatedTiles = gridMapRef.current.tiles.filter(t => t.r !== r || t.c !== c);
    gridMapRef.current = { grid: newGrid, tiles: updatedTiles };
    setTiles(sortTiles(updatedTiles));
    addScore((targetTile.value * 2 - 2) * -1);
  }, [gridMapRef, addScore, rows, cols]);

  const x2Tile = useCallback((tile: Location) => {
    if (pendingStackRef.current.length > 0 || pauseRef.current) {
      return;
    }
    const { r, c } = tile;
    if (r < 0 || r >= rows || c < 0 || c >= cols) {
      return;
    }

    const targetTile = gridMapRef.current.grid[r][c];
    if (!targetTile) {
      return;
    }

    const newGrid = gridMapRef.current.grid.map(row => [...row]);
    newGrid[r][c] = { 
      ...targetTile,
      value: targetTile.value * 2,
      isNew: true,
      canMerge: false,
      isMerging: false,
    };

    const updatedTiles = gridMapRef.current.tiles.map(t => t.r === r && t.c === c ? { ...t, value: targetTile.value * 2 } : t);
    gridMapRef.current = { grid: newGrid, tiles: updatedTiles };
    setTiles(sortTiles(updatedTiles));
  }, [gridMapRef, rows, cols]);

  if (pauseRef.current !== gameState.pause) {
    pauseRef.current = gameState.pause;
  }

  if (gameState.status === 'restart') {
    const { grid, tiles: newTiles } = resetGameBoard(rows, cols);
    gridMapRef.current = { grid, tiles: newTiles };
    pendingStackRef.current = [];
    setTiles(newTiles);
  }

  return {
    tiles,
    grid: gridMapRef.current.grid,
    onMove,
    onMovePending,
    onMergePending,
    breakTile,
    x2Tile,
  };
};

// Helper function
const initializeDefaultBoard = (rows: number, cols: number) => {
  const grid = create2DArray<Cell>(rows, cols);
  const tiles = createInitialTiles(grid);
  tiles.forEach((tile) => {
    grid[tile.r][tile.c] = tile;
  });
  return { grid, tiles };
};

const initializeEmptyBoard = (rows: number, cols: number) => {
  const grid = create2DArray<Cell>(rows, cols);
  const tiles: Tile[] = [];
  return { grid, tiles };
};

export default useGameBoard;
