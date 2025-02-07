import React, { FC, useEffect, useRef, useState } from 'react';

export interface ScoreBoardProps {
  title: string;
  total: number;
}

const ScoreBoard: FC<ScoreBoardProps> = ({ total, title }) => {
  const totalRef = useRef(total);
  const [score, setScore] = useState(() => total - totalRef.current);

  useEffect(() => {
    setScore(total - totalRef.current);
    totalRef.current = total;
  }, [total]);

  return (
    <div className="mx-2 py-3 w-[92px] bg-secondary dark:bg-secondary-dark flex flex-col relative justify-center items-center box-border rounded-md">
      <span className="text-xs uppercase font-bold text-tertiary dark:text-tertiary-dark">
        {title}
      </span>
      <span className="text-lg font-bold text-foreground dark:text-foreground-dark">
        {total}
      </span>
      {score > 0 && (
        <div 
          key={total}
          className="
            absolute left-0 bottom-[10px] w-full 
            text-center bg-transparent 
            transition-all duration-200 ease-in
            animate-fade-out
          "
        >
          <span className="text-lg font-bold text-primary dark:text-primary-dark">
            +{score}
          </span>
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;
