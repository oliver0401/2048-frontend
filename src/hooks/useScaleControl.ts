import { useReducer } from 'react';
import { clamp } from '../utils/common';
import { MIN_SCALE } from '../utils/constants';

const scaleReducer = (s: number, change: number, maxScale: number) =>
  clamp(s + change, MIN_SCALE, maxScale);

const useScaleControl = (
  initScale: number,
  maxScale: number,
): [number, (change: number) => void] =>
  useReducer(
    (s: number, change: number) => scaleReducer(s, change, maxScale),
    initScale,
    (s) => clamp(s, MIN_SCALE, maxScale)
  );

export default useScaleControl;
