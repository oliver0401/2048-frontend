import { useCallback, useState } from 'react';

const useGameScore = (initialBest: number, initialTotal: number, initialCount: number) => {
  const [total, setTotal] = useState(initialTotal);
  const [best, setBest] = useState(initialBest);
  const [count, setCount] = useState(initialCount);

  const addScore = useCallback((s: number) => setTotal((t) => t + s), []);
  const addCount = useCallback(() => setCount((c) => c + 1), []);

  if (total > best) {
    setBest(total);
  }

  return {
    total,
    best,
    count,
    setTotal,
    addScore,
    addCount,
    setCount,
  };
};

export default useGameScore;
