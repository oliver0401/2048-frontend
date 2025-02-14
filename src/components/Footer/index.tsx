import React from 'react';
import Text from '../Text';
import { IoArrowUndo, IoHammerSharp } from 'react-icons/io5';
import { FaBolt } from 'react-icons/fa';
import { useMainContext } from '../../context/MainContext';
import { MOUSE } from '../../consts';

const Footer: React.FC = () => {
  const { cursor, setCursor, onBoltOpen, boltStatus, setBoltStatus } =
    useMainContext();
  return (
    <div className="fixed bottom-0 w-full grid grid-cols-3 border-t-2 border-primary dark:border-primary-dark">
      <div
        onClick={() =>
          setCursor(cursor === MOUSE.Hammer ? MOUSE.Default : MOUSE.Hammer)
        }
        className="w-full flex items-center justify-center gap-2 py-2 border-r border-primary dark:border-primary-dark hover:bg-tile-4/80 dark:hover:bg-tile-64/10 transition-colors"
      >
        <Text as="h1" color="primary" fontSize={16} className="font-bold">
          <IoHammerSharp />
        </Text>
        <Text as="h1" color="primary" fontSize={16} className="font-bold">
          0
        </Text>
      </div>
      <div className="w-full flex items-center justify-center gap-2 border-r border-primary dark:border-primary-dark hover:bg-tile-4/80 dark:hover:bg-tile-64/10 transition-colors">
        <Text as="h1" color="primary" fontSize={16} className="font-bold">
          <IoArrowUndo />
        </Text>
        <Text as="h1" color="primary" fontSize={16} className="font-bold">
          0
        </Text>
      </div>
      <div
        onClick={() => {
          if (!boltStatus.enabled) {
            setBoltStatus({
              enabled: true,
              currentStart:
                JSON.parse(localStorage.getItem('react-2048') || '{}').count ||
                0,
            });
            onBoltOpen();
          }
        }}
        className="w-full flex items-center justify-center gap-2 hover:bg-tile-4/80 dark:hover:bg-tile-64/10 transition-colors"
      >
        <div
          className={`text-lg ${
            boltStatus.enabled
              ? 'text-blue-500'
              : 'text-primary dark:text-primary-dark font-bold'
          }`}
        >
          <FaBolt />
        </div>
        <div
          className={`text-lg ${
            boltStatus.enabled
              ? 'text-blue-500'
              : 'text-primary dark:text-primary-dark font-bold'
          }`}
        >
          0
        </div>
      </div>
    </div>
  );
};

export default Footer;
