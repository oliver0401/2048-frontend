import React from 'react';
import { FaArrowsAltH, FaArrowsAltV } from 'react-icons/fa';
import { IoDiamondOutline } from 'react-icons/io5';

const BorderSizeTab: React.FC<{ user: any, handlePurchase: (item: {
  name: string;
  price: number;
  type: 'item' | 'theme' | 'border';
  id?: string;
}) => void;
}> = ({ user, handlePurchase }) => {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <h2 className="font-semibold text-tile-64 dark:text-tile-128">Border Size Options</h2>
      {/* Row Expansion */}
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
            onClick={() => handlePurchase({
              name: 'Row Expansion',
              price: 100 * 2 ** user.rows,
              type: 'border',
            })}
            className="hover:scale-105 bg-transparent transition-transform max-w-min flex items-center gap-2 text-nowrap font-bold text-primary-dark dark:text-primary-dark border-2 border-primary-dark dark:border-primary-dark rounded-md px-2 py-1"
          >
            Get For: {user?.rows && 100 * 2 ** user.rows}
            <IoDiamondOutline size={20} />
          </button>
        </div>
      </div>
      {/* Column Expansion */}
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
  );
};

export default BorderSizeTab; 