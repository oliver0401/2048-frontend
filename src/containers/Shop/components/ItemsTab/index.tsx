import React, { useMemo, useState } from 'react';
import { IoDiamondOutline, IoHammerSharp } from 'react-icons/io5';
import { FaBolt } from 'react-icons/fa';
import { GiUpgrade } from 'react-icons/gi';
import { Item } from './Item';
import Button from '../../../../components/Button';
import { TUser } from '../../../../types';

const items = [
  {
    name: 'Hammer',
    price: 10,
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
    name: 'Upgrade',
    price: 50,
    description: 'Double your tile value!',
    Icon: <GiUpgrade className="text-red-500 min-w-16 min-h-16" />,
  },
];

interface ItemsTabProps {
  handlePurchase: (item: {
    name: string;
    price: number;
    type: 'item' | 'theme' | 'border-rows' | 'border-cols';
    quantity: Partial<TUser>;
    id?: string;
  }) => void;
  isPaying: boolean;
}
const ItemsTab: React.FC<ItemsTabProps> = ({ handlePurchase, isPaying }) => {

  const [quantity, setQuantity] = useState<Record<string, number>>({
    hammer: 0,
    powerup: 0,
    upgrade: 0,
  });

  const totalQuantity = useMemo(
    () =>
      items.reduce(
        (acc, item) => acc + quantity[item.name.toLowerCase()] * item.price,
        0,
      ),
    [quantity],
  );

  const updateQuantity = (item: string, delta: number) =>
    setQuantity((prev) => ({
      ...prev,
      [item]: Math.max(0, prev[item] + delta), // Ensure quantity doesn't go below 0
    }));

  return (
    <div className="grid grid-cols-1 gap-3 w-full">
      {items.map((item) => {
        const itemKey = item.name.toLowerCase();
        return (
          <Item
            key={item.name}
            item={item}
            quantity={quantity[itemKey]}
            increaseQuantity={() => updateQuantity(itemKey, 1)}
            decreaseQuantity={() => updateQuantity(itemKey, -1)}
          />
        );
      })}
      <div className="flex justify-between items-center pl-28">
        <div className="text-left font-bold flex items-center gap-2 text-primary-dark dark:text-primary-dark text-xl">
          Total: {totalQuantity}
          <IoDiamondOutline size={20} />
        </div>
        <Button
          color="primary"
          onClick={async () => {
              handlePurchase({
                name: 'items',
                price: totalQuantity,
                type: 'item',
                quantity: quantity
              })
            }
          }
          disabled={isPaying}
        >
          {isPaying ? "Paying..." : "Purchase"}
        </Button>
      </div>
    </div>
  );
};

export default ItemsTab;
