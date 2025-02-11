import React, { useMemo, useState } from 'react';
import Button from '../components/Button';
import Text from '../components/Text';
import { IoDiamondOutline, IoHammerSharp } from 'react-icons/io5';
import { FaArrowsAltH, FaArrowsAltV, FaBolt, FaBomb } from 'react-icons/fa';
import Tabs from '../components/Tabs'; // Import the new Tabs component
import './Shop.css'; // Import the CSS file for styles
import { useMainContext } from '../context/MainContext';

export const ShopContainer: React.FC = () => {
  // State for token balance
  const [tokenBalance, setTokenBalance] = useState(100); // Example initial balance
  const { user } = useMainContext();

  const items = [
    {
      name: 'Hammer',
      price: 20,
      description: 'A powerful tool to break obstacles.',
      Icon: (
        <IoHammerSharp className="relative z-20 text-gray-800 dark:text-gray-500 min-h-16 min-w-16" />
      ),
    },
    {
      name: 'PowerUp',
      price: 30,
      description: 'Boost your game with extra power.',
      Icon: <FaBolt className="text-blue-500 min-w-16 min-h-16" />,
    },
    {
      name: 'Bomb',
      price: 50,
      description: 'Explosive item to clear the board.',
      Icon: <FaBomb className="text-red-500 min-w-16 min-h-16" />,
    },
  ];

  // Function to handle item purchase
  const handlePurchase = (price: number) => {
    if (tokenBalance >= price) {
      setTokenBalance(tokenBalance - price);
      alert('Purchase successful!');
    } else {
      alert('Not enough tokens!');
    }
  };

  // Define tabs
  const tabs = useMemo(
    () => [
      {
        label: 'Items',
        content: (
          <div className="grid grid-cols-1 gap-3 w-full">
            {items.map((item) => (
              <div
                key={item.name}
                className="p-4 flex gap-8 items-start transition-transform transform w-full border-b border-primary dark:border-primary-dark"
              >
                {item.Icon}
                <div className="flex flex-col items-start gap-2 w-full">
                  <Text
                    as="h2"
                    color="tile32"
                    fontSize={20}
                    className="font-semibold"
                  >
                    {item.name}
                  </Text>
                  <Text
                    as="p"
                    color="primary"
                    fontSize={14}
                    className="text-left"
                  >
                    {item.description}
                  </Text>
                  <div className="flex justify-end w-full">
                    <Button
                      onClick={() => handlePurchase(item.price)}
                      color="transparent"
                      className="hover:scale-110 transition-transform max-w-min flex items-center gap-2 text-nowrap font-bold text-primary-dark dark:text-primary-dark border-2 border-primary-dark dark:border-primary-dark rounded-md px-2 py-1"
                    >
                      Get For: {item.price}
                      <IoDiamondOutline size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ),
      },
      {
        label: 'Border Size',
        content: (
          <div className="flex flex-col items-center gap-4 w-full">
            <h2 className="font-semibold text-tile-64 dark:text-tile-128">
              Border Size Options
            </h2>
            <div className="text-center border-2 rounded-md border-tile-64 dark:border-tile-128 text-tile-64 dark:text-tile-128 w-full p-2">
              Explore our 2048 border sizes and make your moves stand out!
            </div>
            <div className="flex flex-col items-center gap-2 text-center border-2 rounded-md border-tile-64 dark:border-tile-128 text-tile-64 dark:text-tile-128 w-full p-2">
              <div className="flex items-center gap-4 w-full">
                <div className="flex items-center gap-2 bg-gradient-to-br from-tile-64 to-tile-128 rounded-full p-1 w-10 h-10 justify-center">
                  <FaArrowsAltH size={36} className="text-tile-128" />
                </div>
                <p>
                  Expand Your rows to{' '}
                  {user?.rows && (user.rows + 1 > 8 ? 8 : user.rows + 1)}
                </p>
              </div>
              <div className="flex justify-end w-full">
                <button
                  onClick={() => {}}
                  className="hover:scale-105 bg-transparent transition-transform max-w-min flex items-center gap-2 text-nowrap font-bold text-primary-dark dark:text-primary-dark border-2 border-primary-dark dark:border-primary-dark rounded-md px-2 py-1"
                >
                  Get For: {user?.rows && 100 * 2 ** user.rows}
                  <IoDiamondOutline size={20} />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 text-center border-2 rounded-md border-tile-64 dark:border-tile-128 text-tile-64 dark:text-tile-128 w-full p-2">
              <div className="flex items-center gap-4 w-full">
                <div className="flex items-center gap-2 bg-gradient-to-br from-tile-64 to-tile-128 rounded-full p-1 w-10 h-10 justify-center">
                  <FaArrowsAltV size={36} className="text-tile-128" />
                </div>
                <p>
                  Expand Your cols to{' '}
                  {user?.cols && (user.cols + 1 > 8 ? 8 : user.cols + 1)}
                </p>
              </div>
              <div className="flex justify-end w-full">
                <button
                  onClick={() => {}}
                  className="hover:scale-105 bg-transparent transition-transform max-w-min flex items-center gap-2 text-nowrap font-bold text-primary-dark dark:text-primary-dark border-2 border-primary-dark dark:border-primary-dark rounded-md px-2 py-1"
                >
                  Get For: {user?.cols && 100 * 2 ** user.cols}
                  <IoDiamondOutline size={20} />
                </button>
              </div>
            </div>
          </div>
        ),
      },
      {
        label: 'Theme',
        content: (
          <Text as="h2" color="tile32" fontSize={20} className="font-semibold">
            Theme Options
          </Text>
        ),
      },
    ],
    [user?.cols, user?.rows],
  );

  return (
    <div className="flex flex-col items-center justify-start h-[calc(100vh-112px)] w-full gap-3">
      <Tabs tabs={tabs} />
    </div>
  );
};
