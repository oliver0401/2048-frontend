import React from 'react';
import Button from '../../../components/Button';
import Text from '../../../components/Text';
import { IoDiamondOutline, IoHammerSharp } from 'react-icons/io5';
import { FaBolt, FaBomb } from 'react-icons/fa';

const items = [
  {
    name: 'Hammer',
    price: 20,
    description: 'A powerful tool to break obstacles.',
    Icon: <IoHammerSharp className="relative z-20 text-gray-800 dark:text-gray-500 min-h-16 min-w-16" />,
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

const ItemsTab: React.FC<{ handlePurchase: (price: number) => void }> = ({ handlePurchase }) => {
  return (
    <div className="grid grid-cols-1 gap-3 w-full">
      {items.map((item) => (
        <div
          key={item.name}
          className="p-4 flex gap-8 items-start transition-transform transform w-full border-b border-primary dark:border-primary-dark"
        >
          {item.Icon}
          <div className="flex flex-col items-start gap-2 w-full">
            <Text as="h2" color="tile32" fontSize={20} className="font-semibold">
              {item.name}
            </Text>
            <Text as="p" color="primary" fontSize={14} className="text-left">
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
  );
};

export default ItemsTab; 