import React, { useEffect, useState } from 'react';
import './itemboard.css';

interface ItemBoardProps {
  onClick?: () => void;
  icon: React.ReactNode;
  count: number;
  checktatus?: boolean;
  status?: boolean;
}

export const ItemBoard = ({
  onClick,
  icon,
  count,
  checktatus,
  status,
}: ItemBoardProps) => {
  const [change, setChange] = useState(false);
  const [prevCount, setPrevCount] = useState(count);

  useEffect(() => {
    setPrevCount(count);
  }, [count, prevCount]);

  useEffect(() => {
    if (prevCount > count) {
      setChange(true);
    }
  }, [prevCount, count]);

  useEffect(() => {
    console.log('change', change);
  }, [change]);

  return (
    <div
      onClick={onClick}
      className="relative w-full flex items-center justify-center gap-2 py-2 border-r border-primary dark:border-primary-dark hover:bg-tile-4/80 dark:hover:bg-tile-8/10 transition-colors"
    >
      <div
        className={`text-lg ${
          checktatus && status
            ? 'text-blue-500'
            : 'text-primary dark:text-primary-dark font-bold'
        }`}
      >
        {icon}
      </div>
      <div
        className={`text-lg ${
          checktatus && status
            ? 'text-blue-500'
            : 'text-primary dark:text-primary-dark font-bold'
        }`}
      >
        {count}
      </div>
      {change && (
        <div
          onAnimationEnd={() => setChange(false)}
          className="absolute text-3xl font-bold text-primary-dark itemboard-fade-out bg-transparent ease-in"
        >
          -1
        </div>
      )}
    </div>
  );
};
