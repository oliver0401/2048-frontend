import React from 'react';
import { IoArrowBack } from 'react-icons/io5';
import Tabs from '../../components/Tabs';
import Button from '../../components/Button';
import { PATH } from '../../consts';
import { useNavigate } from 'react-router-dom';
import { MdDashboard, MdOutlineScore } from 'react-icons/md';
import { IoMdMove } from 'react-icons/io';
import { MaxMoveTab, MaxTileTab } from './components';
import { MaxScoreTab } from './components/MaxScoreTab';

export const LeaderboardContainer: React.FC = () => {
  const navigate = useNavigate();
  const tabs = [
    {
      label: (
        <div className="flex justify-center items-center gap-2">
          <MdDashboard size={20} />
          Max Tile
        </div>
      ),
      content: <MaxTileTab />,
    },
    {
      label: (
        <div className="flex justify-center items-center gap-2">
          <MdOutlineScore size={20} />
          Max Score
        </div>
      ),
      content: <MaxScoreTab />,
    },
    {
      label: (
        <div className="flex justify-center items-center gap-2">
          <IoMdMove size={20} />
          Max Moves
        </div>
      ),
      content: <MaxMoveTab />,
    },
  ];
  return (
    <div className="relative flex flex-col items-center justify-start h-[calc(100vh-144px)] w-full gap-3">
      <Tabs tabs={tabs} />
      <Button
        onClick={() => navigate(PATH.GAME)}
        className="absolute bottom-0 group w-full flex items-center justify-center gap-2"
      >
        <IoArrowBack
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Return to Game
      </Button>
    </div>
  );
};
