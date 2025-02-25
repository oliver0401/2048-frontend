import React from 'react';
import { FiMinus } from 'react-icons/fi';
import { FiPlus } from 'react-icons/fi';
import { IoDiamondOutline } from 'react-icons/io5';
import Text from '../../../../components/Text';

export const Item: React.FC<{
  item: {
    name: string;
    price: number;
    description: string;
    Icon: React.ReactNode;
  };
  quantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
}> = ({ item, quantity, increaseQuantity, decreaseQuantity }) => {
  return (
    <div
      key={item.name}
      className="p-4 flex gap-8 items-start transition-transform transform w-full border-b border-primary dark:border-primary-dark"
    >
      {item.Icon}
      <div className="flex flex-col items-start gap-2 w-full">
        <div className="flex justify-between w-full">
          <Text as="h2" color="tile32" fontSize={20} className="font-semibold">
            {item.name}
          </Text>
          <div className="bg-transparent hover:scale-110 transition-transform max-w-min flex items-center gap-2 text-nowrap font-bold text-primary-dark dark:text-primary-dark rounded-md px-2 py-1">
            {item.price}
            <IoDiamondOutline size={20} />
          </div>
        </div>
        <Text as="p" color="primary" fontSize={14} className="text-left">
          {item.description}
        </Text>
        <div className="flex justify-between w-full">
          <div className="flex items-center">
            <FiMinus
              size={36}
              onClick={decreaseQuantity}
              className="cursor-none hover:bg-primary/20 dark:hover:bg-primary-dark/20 bg-transparent transition-transform max-w-min flex items-center text-nowrap font-bold text-primary-dark dark:text-primary-dark rounded-l-md p-1 border border-primary-dark dark:border-primary-dark"
            />
            <input
              value={quantity}
              readOnly
              className="text-center max-w-9 bg-transparent transition-transform leading-[34px] flex items-center text-lg text-nowrap font-bold text-primary-dark dark:text-primary-dark border-x-0 border-y border-primary-dark dark:border-primary-dark"
            />
            <FiPlus
              size={36}
              onClick={increaseQuantity}
              className="hover:bg-primary/20 dark:hover:bg-primary-dark/20 bg-transparent transition-transform max-w-min flex items-center text-nowrap font-bold text-primary-dark dark:text-primary-dark rounded-r-md p-1 border border-primary-dark dark:border-primary-dark"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
