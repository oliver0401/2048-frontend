import { useState, useEffect } from 'react';
import { randInt } from '../utils/randInt';

export const useRandom = () => {
  const [random, setRandom] = useState<number[]>([]);

  useEffect(() => {
    const randomNumbers: number[] = [];
    while (randomNumbers.length < 3) {
      const num = randInt(0, 11);
      if (!randomNumbers.includes(num)) {
        randomNumbers.push(num);
      }
    }
    setRandom(randomNumbers);
  }, []);

  return { random };
};
