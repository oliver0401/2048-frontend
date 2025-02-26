import React, { useEffect, useState } from 'react';
import { useMainContext } from '../../../context';

type TMove = {
  topUsers: { email: string; username: string; maxMoves: number }[];
  userRank: number;
};

export const MaxMoveTab: React.FC = () => {
  const { handleGetMaxMove } = useMainContext();

  const [scores, setScores] = useState<TMove>({
    topUsers: [],
    userRank: 0,
  });

  useEffect(() => {
    handleGetMaxMove().then((data) => {
      setScores(data);
    });
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-start gap-4 overflow-auto h-[calc(100vh-272px)] px-1">
      <h2 className="text-2xl font-bold text-primary dark:text-primary-dark">
        Max Moves Ranking
      </h2>
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800/80 rounded-lg shadow-md">
        <div className="p-4 border-b border-primary dark:border-primary-dark">
          <h3 className="text-lg font-semibold text-primary dark:text-primary-dark">
            Top Players
          </h3>
        </div>
        <ul className="divide-y divide-primary dark:divide-primary-dark">
          {scores.topUsers.map((score, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                scores.userRank === index + 1
                  ? 'font-bold text-red-600'
                  : 'text-primary dark:text-primary-dark'
              }`}
            >
              <div>
                <div
                  className={`capitalize font-medium ${
                    scores.userRank === index + 1
                      ? 'text-red-500'
                      : 'text-primary dark:text-primary-dark'
                  }`}
                >
                  {score.username}
                </div>
              </div>
              <div className="text-lg font-bold">{score.maxMoves}</div>
            </li>
          ))}
        </ul>
        <div className="p-4 text-primary dark:text-primary-dark">
          <span className="font-semibold">Your Rank: </span>
          <span>{scores.userRank}</span>
        </div>
      </div>
    </div>
  );
};
