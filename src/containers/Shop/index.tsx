import React, { useMemo, useState } from 'react';
import Button from '../../components/Button';
import { IoArrowBack } from 'react-icons/io5';
import Tabs from '../../components/Tabs';
import { useMainContext } from '../../context/MainContext';
import { PATH } from '../../consts';
import ItemsTab from './components/ItemsTab'; // Import the new ItemsTab component
import BorderSizeTab from './components/BorderSizeTab'; // Import the new BorderSizeTab component
import ThemeTab from './components/ThemeTab'; // Import the new ThemeTab component
import { useNavigate } from 'react-router-dom';

export const ShopContainer: React.FC = () => {
  // State for token balance
  const [tokenBalance, setTokenBalance] = useState(100); // Example initial balance
  const { user } = useMainContext();
  const navigate = useNavigate();

  const handlePurchase = (price: number) => {
    if (tokenBalance >= price) {
      setTokenBalance(tokenBalance - price);
      alert('Purchase successful!');
    } else {
      alert('Not enough tokens!');
    }
  };

  const tabs = useMemo(
    () => [
      {
        label: 'Items',
        content: <ItemsTab handlePurchase={handlePurchase} />, // Use ItemsTab component
      },
      {
        label: 'Border Size',
        content: <BorderSizeTab user={user} />, // Use BorderSizeTab component
      },
      {
        label: 'Theme',
        content: <ThemeTab />, // Use ThemeTab component
      },
    ],
    [user],
  );

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
